import { NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  findRazorpayOrderById,
  markRazorpayOrderPaid,
  markRazorpayOrderFailedIfAttempted,
  recordPaymentEventIfNew,
} from '../../../lib/payments-store';
import { saveOrder } from '../../../lib/user-store';
import { resend, FROM_ADDRESS, OWNER_EMAIL } from '../../../lib/resend';
import { orderConfirmationCustomer, orderNotificationOwner } from '../../../lib/email-templates';

// Razorpay sends webhooks with this header for deduplication
const EVENT_ID_HEADER = 'x-razorpay-event-id';
const SIGNATURE_HEADER = 'x-razorpay-signature';

export async function POST(req: Request) {
  const rawBody = await req.text();

  // ── 1. Verify webhook signature ───────────────────────────────────────────
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[webhook] RAZORPAY_WEBHOOK_SECRET not set');
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 500 });
  }

  const receivedSig = req.headers.get(SIGNATURE_HEADER) ?? '';
  const expectedSig = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  let sigValid = false;
  try {
    sigValid =
      receivedSig.length === expectedSig.length &&
      crypto.timingSafeEqual(Buffer.from(expectedSig), Buffer.from(receivedSig));
  } catch {
    sigValid = false;
  }

  if (!sigValid) {
    console.warn('[webhook] signature verification failed');
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  const eventId = req.headers.get(EVENT_ID_HEADER);
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const eventType = payload.event as string;
  const paymentEntity = (payload.payload as Record<string, unknown>)?.payment as Record<string, unknown> | undefined;
  const orderEntity = (payload.payload as Record<string, unknown>)?.order as Record<string, unknown> | undefined;
  const razorpayOrderId = (paymentEntity?.entity as Record<string, unknown>)?.order_id as string | undefined
    ?? (orderEntity?.entity as Record<string, unknown>)?.id as string | undefined;
  const razorpayPaymentId = (paymentEntity?.entity as Record<string, unknown>)?.id as string | undefined;

  // ── 2. Deduplicate via event_id ───────────────────────────────────────────
  if (eventId) {
    const isNew = await recordPaymentEventIfNew({
      event_id: eventId,
      event_type: eventType,
      razorpay_order_id: razorpayOrderId ?? null,
      razorpay_payment_id: razorpayPaymentId ?? null,
      payload,
    });

    if (!isNew) {
      // Already processed — acknowledge immediately
      return NextResponse.json({ ok: true });
    }
  }

  // ── 3. Handle events ─────────────────────────────────────────────────────
  if (eventType === 'payment.captured' || eventType === 'order.paid') {
    if (!razorpayOrderId) {
      console.error('[webhook] missing order_id in event:', eventType);
      return NextResponse.json({ ok: true });
    }

    const rzpRecord = await findRazorpayOrderById(razorpayOrderId);

    if (!rzpRecord) {
      console.error('[webhook] razorpay order not found:', razorpayOrderId);
      return NextResponse.json({ ok: true });
    }

    // Idempotent: already paid
    if (rzpRecord.status === 'paid') {
      return NextResponse.json({ ok: true });
    }

    try {
      const snap = rzpRecord.cart_snapshot;

      const hvOrder = await saveOrder({
        user_id: rzpRecord.user_id ?? null,
        guest_name: rzpRecord.user_id ? null : rzpRecord.customer_name,
        guest_email: rzpRecord.user_id ? null : rzpRecord.customer_email,
        items: snap.items,
        address: snap.address,
        total: snap.subtotal,
        shipping: snap.shipping,
      });

      await markRazorpayOrderPaid({
        id: razorpayOrderId,
        hv_order_id: hvOrder.id,
        razorpay_payment_id: razorpayPaymentId ?? rzpRecord.razorpay_payment_id ?? '',
      });

      // Send emails non-blocking
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
          if (r.status === 'rejected') console.error(`[webhook] email[${i}] threw:`, r.reason);
          else if (r.value.error) console.error(`[webhook] email[${i}] error:`, r.value.error);
        });
      });
    } catch (err) {
      console.error('[webhook] failed to create HV order:', err);
      // Return 200 to prevent Razorpay from retrying endlessly on a non-recoverable error
      return NextResponse.json({ ok: true });
    }
  }

  if (eventType === 'payment.failed') {
    if (razorpayOrderId) {
      await markRazorpayOrderFailedIfAttempted(razorpayOrderId);
    }
  }

  // Always respond 200 fast — Razorpay retries on non-2xx
  return NextResponse.json({ ok: true });
}
