'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { createHash, randomInt } from 'crypto';
import { z } from 'zod';
import { createSession, deleteSession, getSession } from './session';
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  saveOrder,
  upsertPendingSignup,
  findPendingSignup,
  deletePendingSignup,
  incrementPendingSignupAttempts,
  updatePendingSignupOtp,
} from './user-store';
import type { Address } from './user-store';
import type { CartItem } from './CartContext';
import { getProductById } from './products';
import { resend, FROM_ADDRESS, OWNER_EMAIL } from './resend';
import { safeRedirect } from './url';
import {
  orderConfirmationCustomer,
  orderNotificationOwner,
  otpEmail,
  welcomeEmail,
} from './email-templates';

const OTP_TTL_MS = 10 * 60 * 1000;   // 10 minutes
const MAX_ATTEMPTS = 5;               // lock after 5 wrong guesses

function generateOtp(): string {
  return String(randomInt(100000, 1000000)); // always 6 digits
}

function hashOtp(otp: string): string {
  return createHash('sha256').update(otp).digest('hex');
}

const SignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.email('Please enter a valid email').trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-zA-Z]/, 'Must contain at least one letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
});

const LoginSchema = z.object({
  email: z.email('Please enter a valid email').trim(),
  password: z.string().min(1, 'Password is required'),
});

const AddressSchema = z.object({
  name: z.string().min(2, 'Name is required').trim(),
  phone: z
    .string()
    .trim()
    .regex(/^\+\d{1,4}\d{5,15}$/, 'Enter a valid phone number'),
  address1: z.string().min(5, 'Address is required').trim(),
  address2: z.string().trim().optional(),
  city: z.string().min(2, 'City is required').trim(),
  pin: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit PIN code'),
  state: z.string().min(2, 'State is required').trim(),
});

const GuestSchema = z.object({
  name: z.string().min(2, 'Name is required').trim(),
  email: z.email('Please enter a valid email').trim(),
});

const CartItemSchema = z.object({
  id: z.string().min(1),
  qty: z.number().int().min(1).max(99),
});

const PlaceOrderInputSchema = z.object({
  items: z.array(CartItemSchema).min(1, 'Cart is empty'),
  address: AddressSchema,
  guest: GuestSchema.optional(),
});

export type AuthState = {
  errors?: Record<string, string[]>;
  message?: string;
};

// ─── Step 1: collect credentials, send OTP ───────────────────────────────────
export async function initiateSignup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const redirectTo = (() => {
    const r = formData.get('redirectTo') as string | null;
    return safeRedirect(r);
  })();

  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const parsed = SignupSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  try {
    const existing = await findUserByEmail(parsed.data.email);
    if (existing) {
      return { errors: { email: ['An account with this email already exists.'] } };
    }

    const password_hash = await bcrypt.hash(parsed.data.password, 12);
    const otp = generateOtp();
    const otp_hash = hashOtp(otp);
    const expires_at = new Date(Date.now() + OTP_TTL_MS).toISOString();

    // Upsert so a re-submit refreshes the OTP rather than erroring on the unique index
    await upsertPendingSignup({
      email: parsed.data.email,
      name: parsed.data.name,
      password_hash,
      otp_hash,
      expires_at,
    });

    const emailRes = await resend.emails.send({
      from: FROM_ADDRESS,
      to: parsed.data.email,
      ...otpEmail({ name: parsed.data.name, otp }),
    });
    if (emailRes.error) {
      console.error('[initiateSignup] resend error:', emailRes.error);
      return { message: 'Could not send verification email. Please try again.' };
    }
  } catch (err) {
    console.error('[initiateSignup] unexpected error:', err);
    return { message: 'Could not start sign-up. Please try again in a moment.' };
  }

  const dest = `/signup/verify?email=${encodeURIComponent(raw.email)}&redirectTo=${encodeURIComponent(redirectTo)}`;
  redirect(dest);
}

// ─── Step 2: verify OTP, create account ──────────────────────────────────────
export async function verifyOtp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = (formData.get('email') as string | null)?.toLowerCase().trim() ?? '';
  const otp = (formData.get('otp') as string | null)?.trim() ?? '';
  const redirectTo = (() => {
    const r = formData.get('redirectTo') as string | null;
    return safeRedirect(r);
  })();

  if (!email || !/^\d{6}$/.test(otp)) {
    return { errors: { otp: ['Please enter the 6-digit code.'] } };
  }

  try {
    const row = await findPendingSignup(email);

    if (!row) {
      return { errors: { otp: ['No pending sign-up found. Please start again.'] } };
    }

    if (new Date(row.expires_at) < new Date()) {
      await deletePendingSignup(email);
      return { errors: { otp: ['This code has expired. Please request a new one.'] } };
    }

    if (row.attempts >= MAX_ATTEMPTS) {
      return { errors: { otp: ['Too many incorrect attempts. Please request a new code.'] } };
    }

    if (hashOtp(otp) !== row.otp_hash) {
      // Increment attempt counter
      await incrementPendingSignupAttempts(email);
      const remaining = MAX_ATTEMPTS - row.attempts - 1;
      return {
        errors: {
          otp: [
            remaining > 0
              ? `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
              : 'Too many incorrect attempts. Please request a new code.',
          ],
        },
      };
    }

    // OTP correct — create the user and delete the pending row atomically
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      // Edge case: another tab completed the signup already
      await deletePendingSignup(email);
      await createSession(existingUser.id, existingUser.name, existingUser.email);
      redirect(redirectTo);
    }

    const user = await createUser({
      name: row.name,
      email: row.email,
      password_hash: row.password_hash,
    });

    // Delete pending row — if this fails we still proceed; cleanup cron will handle it
    await deletePendingSignup(email);

    await createSession(user.id, user.name, user.email);

    resend.emails
      .send({ from: FROM_ADDRESS, to: user.email, ...welcomeEmail({ name: user.name }) })
      .then((r) => { if (r.error) console.error('[verifyOtp] welcome email failed:', r.error); })
      .catch((e) => console.error('[verifyOtp] welcome email threw:', e));
  } catch (err) {
    console.error('[verifyOtp] unexpected error:', err);
    return { message: 'Verification failed. Please try again.' };
  }

  redirect(redirectTo);
}

// ─── Resend OTP ───────────────────────────────────────────────────────────────
export async function resendOtp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = (formData.get('email') as string | null)?.toLowerCase().trim() ?? '';
  if (!email) return { errors: { otp: ['Email missing. Please start sign-up again.'] } };

  try {
    const row = await findPendingSignup(email);
    if (!row) return { errors: { otp: ['No pending sign-up found. Please start again.'] } };

    const otp = generateOtp();
    const otp_hash = hashOtp(otp);
    const expires_at = new Date(Date.now() + OTP_TTL_MS).toISOString();

    await updatePendingSignupOtp({ email, otp_hash, expires_at });

    const emailRes = await resend.emails.send({
      from: FROM_ADDRESS,
      to: row.email,
      ...otpEmail({ name: row.name, otp }),
    });
    if (emailRes.error) {
      console.error('[resendOtp] resend error:', emailRes.error);
      return { message: 'Could not send email. Please try again.' };
    }
  } catch (err) {
    console.error('[resendOtp] unexpected error:', err);
    return { message: 'Could not resend code. Please try again.' };
  }

  return { message: 'A new code has been sent to your email.' };
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const redirectTo = (() => {
    const r = formData.get('redirectTo') as string | null;
    return safeRedirect(r);
  })();

  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const parsed = LoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  try {
    const user = await findUserByEmail(parsed.data.email);
    if (!user) {
      return { errors: { email: ['No account found with this email.'] } };
    }

    const valid = await bcrypt.compare(parsed.data.password, user.password_hash);
    if (!valid) {
      return { errors: { password: ['Incorrect password.'] } };
    }

    await createSession(user.id, user.name, user.email);
  } catch (err) {
    console.error('[signIn] unexpected error:', err);
    return { message: 'Could not sign in. Please try again in a moment.' };
  }

  redirect(redirectTo);
}

export async function signOut() {
  await deleteSession();
  redirect('/');
}

export async function saveAddress(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const session = await getSession();
  if (!session) return { message: 'Not authenticated' };

  const raw = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    address1: formData.get('address1') as string,
    address2: ((formData.get('address2') as string) ?? '').trim() || undefined,
    city: formData.get('city') as string,
    pin: formData.get('pin') as string,
    state: formData.get('state') as string,
  };

  const parsed = AddressSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  try {
    await updateUser(session.userId, { saved_address: parsed.data });
  } catch (err) {
    console.error('[saveAddress] failed:', err);
    return { message: 'Could not save address. Please try again.' };
  }
  return { message: 'Address saved.' };
}

export type PlaceOrderResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

/**
 * Server-authoritative order placement.
 * - For logged-in users: uses session for identity.
 * - For guests: requires { name, email } in `guest`.
 * - Cart prices, units, and totals are recomputed from the server-side catalogue.
 *   The client's `price` is never trusted.
 */
export async function placeOrder(input: {
  items: { id: string; qty: number }[];
  address: Address;
  guest?: { name: string; email: string };
}): Promise<PlaceOrderResult> {
  const parsed = PlaceOrderInputSchema.safeParse(input);
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return { ok: false, error: first ?? 'Invalid order data.' };
  }

  // Identity: session takes precedence, else guest payload
  const session = await getSession();
  const userId: string | null = session?.userId ?? null;
  let customerName = session?.name ?? null;
  let customerEmail = session?.email ?? null;

  if (!session) {
    if (!parsed.data.guest) {
      return { ok: false, error: 'Sign in or provide your name and email to place an order.' };
    }
    customerName = parsed.data.guest.name;
    customerEmail = parsed.data.guest.email;
  }

  // Resolve every cart line against the server catalogue
  const lines: CartItem[] = [];
  for (const line of parsed.data.items) {
    const product = getProductById(line.id);
    if (!product) {
      return { ok: false, error: `Product not found: ${line.id}` };
    }
    lines.push({ ...product, qty: line.qty });
  }

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const shipping = subtotal >= 499 ? 0 : 60;

  try {
    const order = await saveOrder({
      user_id: userId,
      items: lines,
      address: parsed.data.address,
      total: subtotal,
      shipping,
    });

    // Wait for emails so we can surface failures to the caller.
    const [ack, notify] = await Promise.allSettled([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: customerEmail!,
        ...orderConfirmationCustomer({
          orderId: order.id,
          customerName: customerName!,
          items: lines,
          address: parsed.data.address,
          total: subtotal,
          shipping,
        }),
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: OWNER_EMAIL,
        ...orderNotificationOwner({
          orderId: order.id,
          customerName: customerName!,
          customerEmail: customerEmail!,
          items: lines,
          address: parsed.data.address,
          total: subtotal,
          shipping,
        }),
      }),
    ]);

    if (ack.status === 'rejected' || (ack.status === 'fulfilled' && ack.value.error)) {
      console.error('[placeOrder] customer email failed:', ack.status === 'rejected' ? ack.reason : ack.value.error);
    }
    if (notify.status === 'rejected' || (notify.status === 'fulfilled' && notify.value.error)) {
      console.error('[placeOrder] owner email failed:', notify.status === 'rejected' ? notify.reason : notify.value.error);
    }

    return { ok: true, orderId: order.id };
  } catch (err) {
    console.error('[placeOrder] failed:', err);
    return { ok: false, error: 'Could not place your order. Please try again.' };
  }
}

export async function toggleWishlist(productId: string): Promise<{ wishlisted: boolean }> {
  const session = await getSession();
  if (!session) return { wishlisted: false };

  try {
    const user = await findUserById(session.userId);
    if (!user) return { wishlisted: false };

    const already = user.wishlist.includes(productId);
    const wishlist = already
      ? user.wishlist.filter((id) => id !== productId)
      : [...user.wishlist, productId];
    await updateUser(session.userId, { wishlist });
    return { wishlisted: !already };
  } catch (err) {
    console.error('[toggleWishlist] failed:', err);
    return { wishlisted: false };
  }
}
