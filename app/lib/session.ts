import 'server-only';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';

export type SessionPayload = {
  userId: string;
  name: string;
  email: string;
  expiresAt: string;
};

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET environment variable is not set.');
  }
  return new TextEncoder().encode(secret);
}

const COOKIE = 'hv_session';
const TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload } as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey());
}

export async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), { algorithms: ['HS256'] });
    const { userId, name, email, expiresAt } = payload as JWTPayload & SessionPayload;
    if (!userId || !name || !email || !expiresAt) return null;
    return { userId, name, email, expiresAt };
  } catch {
    return null;
  }
}

export async function createSession(userId: string, name: string, email: string) {
  const expiresAt = new Date(Date.now() + TTL).toISOString();
  const token = await encrypt({ userId, name, email, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(expiresAt),
    path: '/',
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return null;
  return decrypt(token);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
}
