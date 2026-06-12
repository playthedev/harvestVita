import 'server-only';
import { ObjectId } from 'mongodb';
import { getDb } from './mongodb';
import type { CartItem } from './CartContext';

export type Address = {
  name: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  pin: string;
  state: string;
};

export type Order = {
  id: string;
  user_id: string | null;
  guest_name: string | null;
  guest_email: string | null;
  items: CartItem[];
  address: Address;
  total: number;
  shipping: number;
  status: 'confirmed' | 'dispatched' | 'delivered';
  placed_at: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  saved_address: Address | null;
  wishlist: string[];
  created_at: string;
};

export type PendingSignup = {
  email: string;
  name: string;
  password_hash: string;
  otp_hash: string;
  attempts: number;
  expires_at: string;
};

type UserDoc = {
  _id: ObjectId;
  name: string;
  email: string;
  password_hash: string;
  saved_address: Address | null;
  wishlist: string[];
  created_at: Date;
};

type OrderDoc = {
  _id: ObjectId;
  user_id: ObjectId | null;
  guest_name: string | null;
  guest_email: string | null;
  items: CartItem[];
  address: Address;
  total: number;
  shipping: number;
  status: 'confirmed' | 'dispatched' | 'delivered';
  placed_at: Date;
};

type PendingSignupDoc = {
  _id: string; // email, lowercased
  name: string;
  password_hash: string;
  otp_hash: string;
  attempts: number;
  expires_at: Date;
};

function toUser(doc: UserDoc): User {
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    email: doc.email,
    password_hash: doc.password_hash,
    saved_address: doc.saved_address,
    wishlist: doc.wishlist,
    created_at: doc.created_at.toISOString(),
  };
}

function toOrder(doc: OrderDoc): Order {
  return {
    id: doc._id.toHexString(),
    user_id: doc.user_id ? doc.user_id.toHexString() : null,
    guest_name: doc.guest_name,
    guest_email: doc.guest_email,
    items: doc.items,
    address: doc.address,
    total: doc.total,
    shipping: doc.shipping,
    status: doc.status,
    placed_at: doc.placed_at.toISOString(),
  };
}

function toPendingSignup(doc: PendingSignupDoc): PendingSignup {
  return {
    email: doc._id,
    name: doc.name,
    password_hash: doc.password_hash,
    otp_hash: doc.otp_hash,
    attempts: doc.attempts,
    expires_at: doc.expires_at.toISOString(),
  };
}

function parseObjectId(id: string): ObjectId | null {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

async function users() {
  const db = await getDb();
  return db.collection<UserDoc>('users');
}

async function orders() {
  const db = await getDb();
  return db.collection<OrderDoc>('orders');
}

async function pendingSignups() {
  const db = await getDb();
  return db.collection<PendingSignupDoc>('pending_signups');
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const col = await users();
  const doc = await col.findOne({ email: email.toLowerCase() });
  return doc ? toUser(doc) : null;
}

export async function findUserById(id: string): Promise<User | null> {
  const objectId = parseObjectId(id);
  if (!objectId) return null;
  const col = await users();
  const doc = await col.findOne({ _id: objectId });
  return doc ? toUser(doc) : null;
}

export async function createUser(data: {
  name: string;
  email: string;
  password_hash: string;
}): Promise<User> {
  const col = await users();
  const doc: Omit<UserDoc, '_id'> = {
    name: data.name,
    email: data.email.toLowerCase(),
    password_hash: data.password_hash,
    wishlist: [],
    saved_address: null,
    created_at: new Date(),
  };
  const result = await col.insertOne(doc as UserDoc);
  return toUser({ ...doc, _id: result.insertedId } as UserDoc);
}

export async function updateUser(
  id: string,
  patch: { saved_address?: Address; wishlist?: string[] }
): Promise<void> {
  const objectId = parseObjectId(id);
  if (!objectId) throw new Error(`Invalid user id: ${id}`);
  const col = await users();
  await col.updateOne({ _id: objectId }, { $set: patch });
}

export async function saveOrder(order: {
  user_id: string | null;
  guest_name?: string | null;
  guest_email?: string | null;
  items: CartItem[];
  address: Address;
  total: number;
  shipping: number;
}): Promise<Order> {
  const col = await orders();
  const doc: Omit<OrderDoc, '_id'> = {
    user_id: order.user_id ? new ObjectId(order.user_id) : null,
    guest_name: order.guest_name ?? null,
    guest_email: order.guest_email ?? null,
    items: order.items,
    address: order.address,
    total: order.total,
    shipping: order.shipping,
    status: 'confirmed',
    placed_at: new Date(),
  };
  const result = await col.insertOne(doc as OrderDoc);
  return toOrder({ ...doc, _id: result.insertedId } as OrderDoc);
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const objectId = parseObjectId(userId);
  if (!objectId) return [];
  const col = await orders();
  const docs = await col.find({ user_id: objectId }).sort({ placed_at: -1 }).toArray();
  return docs.map(toOrder);
}

// ─── Pending signups (OTP flow) ──────────────────────────────────────────────

export async function upsertPendingSignup(data: {
  email: string;
  name: string;
  password_hash: string;
  otp_hash: string;
  expires_at: string;
}): Promise<void> {
  const col = await pendingSignups();
  await col.updateOne(
    { _id: data.email.toLowerCase() },
    {
      $set: {
        name: data.name,
        password_hash: data.password_hash,
        otp_hash: data.otp_hash,
        attempts: 0,
        expires_at: new Date(data.expires_at),
      },
    },
    { upsert: true }
  );
}

export async function findPendingSignup(email: string): Promise<PendingSignup | null> {
  const col = await pendingSignups();
  const doc = await col.findOne({ _id: email.toLowerCase() });
  return doc ? toPendingSignup(doc) : null;
}

export async function deletePendingSignup(email: string): Promise<void> {
  const col = await pendingSignups();
  await col.deleteOne({ _id: email.toLowerCase() });
}

export async function incrementPendingSignupAttempts(email: string): Promise<void> {
  const col = await pendingSignups();
  await col.updateOne({ _id: email.toLowerCase() }, { $inc: { attempts: 1 } });
}

export async function updatePendingSignupOtp(data: {
  email: string;
  otp_hash: string;
  expires_at: string;
}): Promise<void> {
  const col = await pendingSignups();
  await col.updateOne(
    { _id: data.email.toLowerCase() },
    { $set: { otp_hash: data.otp_hash, attempts: 0, expires_at: new Date(data.expires_at) } }
  );
}
