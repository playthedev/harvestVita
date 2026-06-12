import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { supabase } from '../../../lib/supabase';
import { saveOrder } from '../../../lib/user-store';
import { resend, FROM_ADDRESS, OWNER_EMAIL } from '../../../lib/resend';
import { orderConfirmationCustomer, orderNotificationOwner } from '../../../lib/email-templates';

const BodySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

    // ── 1. Verify HMAC signature ──────────────────────────────────────────────
    const expectedSig = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const expectedBuf = Buffer.from(expectedSig, 'hex');
    const receivedBuf = Buffer.from(razorpay_signature, 'hex');

    if (
      expectedBuf.length !== receivedBuf.length ||
      !crypto.timingSafeEqual(expectedBuf, receivedBuf)
    ) {
      console.warn('[verify-payment] signature mismatch for order:', razorpay_order_id);
      return NextResponse.json({ error: 'Payment verification failed.' }, { status: 400 });
    }

    // ── 2. Load our Razorpay order record ────────────────────────────────────
    const { data: rzpRecord, error: fetchErr } = await supabase
      .from('razorpay_orders')
      .select('*')
      .eq('id', razorpay_order_id)
      .maybeSingle();

    if (fetchErr || !rzpRecord) {
      console.error('[verify-payment] order not found:', razorpay_order_id, fetchErr);
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    // Idempotent: already processed
    if (rzpRecord.status === 'paid' && rzpRecord.hv_order_id) {
      return NextResponse.json({ ok: true, orderId: rzpRecord.hv_order_id });
    }

    // ── 3. Create HarvestVita order in DB ────────────────────────────────────
    const snap = rzpRecord.cart_snapshot as {
      items: Array<{ id: string; name: string; price: number; unit: string; image: string; category: string; categorySlug: string; qty: number; short: string; badge?: string }>;
      address: { name: string; phone: string; address1: string; address2?: string; city: string; pin: string; state: string };
      subtotal: number;
      shipping: number;
    };

    const hvOrder = await saveOrder({
      user_id: rzpRecord.user_id ?? null,
      guest_name: rzpRecord.user_id ? null : rzpRecord.customer_name,
      guest_email: rzpRecord.user_id ? null : rzpRecord.customer_email,
      items: snap.items,
      address: snap.address,
      total: snap.subtotal,
      shipping: snap.shipping,
    });

    // ── 4. Mark Razorpay order as paid ───────────────────────────────────────
    await supabase
      .from('razorpay_orders')
      .update({
        status: 'paid',
        hv_order_id: hvOrder.id,
        razorpay_payment_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', razorpay_order_id);

    // ── 5. Send emails (non-blocking) ────────────────────────────────────────
    Promise.allSettled([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: rzpRecord.customer_email,
        ...orderConfirmationCustomer({
          orderId: hvOrder.id,
          customerName: rzpRecord.customer_name,
          items: snap.items,
          address: snap.address,
          total: snap.subtotal,
          shipping: snap.shipping,
        }),
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: OWNER_EMAIL,
        ...orderNotificationOwner({
          orderId: hvOrder.id,
          customerName: rzpRecord.customer_name,
          customerEmail: rzpRecord.customer_email,
          items: snap.items,
          address: snap.address,
          total: snap.subtotal,
          shipping: snap.shipping,
        }),
      }),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') console.error(`[verify-payment] email[${i}] threw:`, r.reason);
        else if (r.value.error) console.error(`[verify-payment] email[${i}] resend error:`, r.value.error);
      });
    });

    return NextResponse.json({ ok: true, orderId: hvOrder.id });
  } catch (err) {
    console.error('[verify-payment] unexpected error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
