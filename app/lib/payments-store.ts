import 'server-only';
import { getDb } from './mongodb';
import type { CartItem } from './CartContext';
import type { Address } from './user-store';

export type CartSnapshot = {
  items: CartItem[];
  address: Address;
  subtotal: number;
  shipping: number;
};

export type RazorpayOrderStatus = 'created' | 'attempted' | 'paid' | 'failed';

export type RazorpayOrder = {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  amount_paise: number;
  currency: string;
  receipt: string;
  status: RazorpayOrderStatus;
  cart_snapshot: CartSnapshot;
  hv_order_id: string | null;
  razorpay_payment_id: string | null;
  updated_at: string;
};

type RazorpayOrderDoc = {
  _id: string; // Razorpay order id
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  amount_paise: number;
  currency: string;
  receipt: string;
  status: RazorpayOrderStatus;
  cart_snapshot: CartSnapshot;
  hv_order_id: string | null;
  razorpay_payment_id: string | null;
  created_at: Date;
  updated_at: Date;
};

type PaymentEventDoc = {
  _id: string; // event_id
  event_type: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  payload: Record<string, unknown>;
  created_at: Date;
};

function toRazorpayOrder(doc: RazorpayOrderDoc): RazorpayOrder {
  return {
    id: doc._id,
    user_id: doc.user_id,
    customer_name: doc.customer_name,
    customer_email: doc.customer_email,
    amount_paise: doc.amount_paise,
    currency: doc.currency,
    receipt: doc.receipt,
    status: doc.status,
    cart_snapshot: doc.cart_snapshot,
    hv_order_id: doc.hv_order_id,
    razorpay_payment_id: doc.razorpay_payment_id,
    updated_at: doc.updated_at.toISOString(),
  };
}

async function razorpayOrders() {
  const db = await getDb();
  return db.collection<RazorpayOrderDoc>('razorpay_orders');
}

async function paymentEvents() {
  const db = await getDb();
  return db.collection<PaymentEventDoc>('payment_events');
}

export async function findActiveRazorpayOrderByReceipt(
  receipt: string
): Promise<Pick<RazorpayOrder, 'id' | 'status' | 'amount_paise'> | null> {
  const col = await razorpayOrders();
  const doc = await col.findOne(
    { receipt, status: { $in: ['created', 'attempted'] } },
    { projection: { _id: 1, status: 1, amount_paise: 1 } }
  );
  if (!doc) return null;
  return { id: doc._id, status: doc.status, amount_paise: doc.amount_paise };
}

export async function createRazorpayOrder(data: {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  amount_paise: number;
  currency: string;
  receipt: string;
  cart_snapshot: CartSnapshot;
}): Promise<void> {
  const col = await razorpayOrders();
  const now = new Date();
  await col.insertOne({
    _id: data.id,
    user_id: data.user_id,
    customer_name: data.customer_name,
    customer_email: data.customer_email,
    amount_paise: data.amount_paise,
    currency: data.currency,
    receipt: data.receipt,
    status: 'created',
    cart_snapshot: data.cart_snapshot,
    hv_order_id: null,
    razorpay_payment_id: null,
    created_at: now,
    updated_at: now,
  });
}

export async function findRazorpayOrderById(id: string): Promise<RazorpayOrder | null> {
  const col = await razorpayOrders();
  const doc = await col.findOne({ _id: id });
  return doc ? toRazorpayOrder(doc) : null;
}

export async function markRazorpayOrderPaid(data: {
  id: string;
  hv_order_id: string;
  razorpay_payment_id: string;
}): Promise<void> {
  const col = await razorpayOrders();
  await col.updateOne(
    { _id: data.id },
    {
      $set: {
        status: 'paid',
        hv_order_id: data.hv_order_id,
        razorpay_payment_id: data.razorpay_payment_id,
        updated_at: new Date(),
      },
    }
  );
}

export async function markRazorpayOrderFailedIfAttempted(id: string): Promise<void> {
  const col = await razorpayOrders();
  await col.updateOne(
    { _id: id, status: 'attempted' },
    { $set: { status: 'failed', updated_at: new Date() } }
  );
}

// ─── Payment events (webhook dedupe) ─────────────────────────────────────────

/**
 * Atomically records the event if it hasn't been seen before.
 * Returns true if this call recorded it (first time), false if it was already present.
 */
export async function recordPaymentEventIfNew(data: {
  event_id: string;
  event_type: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  payload: Record<string, unknown>;
}): Promise<boolean> {
  const col = await paymentEvents();
  try {
    await col.insertOne({
      _id: data.event_id,
      event_type: data.event_type,
      razorpay_order_id: data.razorpay_order_id,
      razorpay_payment_id: data.razorpay_payment_id,
      payload: data.payload,
      created_at: new Date(),
    });
    return true;
  } catch (err) {
    // Duplicate key (E11000) — event already processed
    if (err instanceof Error && 'code' in err && (err as { code?: number }).code === 11000) {
      return false;
    }
    throw err;
  }
}
