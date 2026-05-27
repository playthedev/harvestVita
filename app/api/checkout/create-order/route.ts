import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { z } from 'zod';
import { getSession } from '../../../lib/session';
import { supabase } from '../../../lib/supabase';
import { getProductById } from '../../../lib/products';

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const CartItemSchema = z.object({
  id: z.string().min(1),
  qty: z.number().int().min(1).max(99),
});

const AddressSchema = z.object({
  name: z.string().min(2).trim(),
  phone: z.string().trim().regex(/^\+?[\d\s-]{10,15}$/),
  address1: z.string().min(5).trim(),
  address2: z.string().trim().optional(),
  city: z.string().min(2).trim(),
  pin: z.string().regex(/^\d{6}$/),
  state: z.string().min(2).trim(),
});

const BodySchema = z.object({
  items: z.array(CartItemSchema).min(1),
  address: AddressSchema,
  guest: z.object({ name: z.string().min(2), email: z.email() }).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      return NextResponse.json({ error: first ?? 'Invalid request.' }, { status: 400 });
    }

    const { items, address, guest } = parsed.data;

    // Identity
    const session = await getSession();
    const userId = session?.userId ?? null;
    const customerName = session?.name ?? guest?.name;
    const customerEmail = session?.email ?? guest?.email;

    if (!customerName || !customerEmail) {
      return NextResponse.json({ error: 'Sign in or provide your name and email.' }, { status: 401 });
    }

    // Recompute totals server-side — never trust client prices
    const lines = [];
    for (const line of items) {
      const product = getProductById(line.id);
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${line.id}` }, { status: 400 });
      }
      lines.push({ ...product, qty: line.qty });
    }

    const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
    const shipping = subtotal >= 499 ? 0 : 60;
    const totalRupees = subtotal + shipping;
    const amountPaise = totalRupees * 100;

    // Receipt is a dedupe key: user|email + cart fingerprint
    const cartFingerprint = items.map((i) => `${i.id}:${i.qty}`).sort().join(',');
    const receipt = `hv_${(customerEmail).replace(/[^a-z0-9]/gi, '')}_${Buffer.from(cartFingerprint).toString('base64').slice(0, 12)}`.slice(0, 40);

    // Check for existing non-failed order with same receipt (prevents double-click duplicate orders)
    const { data: existing } = await supabase
      .from('razorpay_orders')
      .select('id, status, amount_paise')
      .eq('receipt', receipt)
      .in('status', ['created', 'attempted'])
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        orderId: existing.id,
        amount: existing.amount_paise,
        currency: 'INR',
        keyId: process.env.RAZORPAY_KEY_ID,
      });
    }

    // Create order on Razorpay
    const rzpOrder = await rzp.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt,
      notes: { customer_name: customerName, customer_email: customerEmail },
    });

    // Persist to DB
    const { error: dbErr } = await supabase.from('razorpay_orders').insert({
      id: rzpOrder.id,
      user_id: userId,
      customer_name: customerName,
      customer_email: customerEmail,
      amount_paise: amountPaise,
      currency: 'INR',
      receipt,
      status: 'created',
      cart_snapshot: { items: lines, address, subtotal, shipping },
    });

    if (dbErr) {
      console.error('[create-order] db insert failed:', dbErr);
      return NextResponse.json({ error: 'Could not initialise payment. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({
      orderId: rzpOrder.id,
      amount: amountPaise,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('[create-order] unexpected error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
