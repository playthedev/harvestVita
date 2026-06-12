// Creates indexes required for correctness (uniqueness, TTL cleanup, lookups).
// Run with: node scripts/setup-mongo-indexes.mjs
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  console.error('Missing MONGODB_URI and/or MONGODB_DB environment variables.');
  process.exit(1);
}

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);

  await db.collection('users').createIndex({ email: 1 }, { unique: true });

  // TTL index — pending signups expire and are removed automatically
  await db.collection('pending_signups').createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 });

  await db.collection('orders').createIndex({ user_id: 1, placed_at: -1 });

  await db.collection('razorpay_orders').createIndex({ receipt: 1, status: 1 });

  console.log('MongoDB indexes created successfully.');
} finally {
  await client.close();
}
