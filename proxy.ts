import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './app/lib/session';

const PROTECTED = ['/account'];
const AUTH_ONLY = ['/login', '/signup'];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('hv_session')?.value;
  const session = token ? await decrypt(token) : null;

  // Redirect unauthenticated users away from protected routes
  if (PROTECTED.some((p) => pathname.startsWith(p)) && !session) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from login/signup
  if (AUTH_ONLY.some((p) => pathname.startsWith(p)) && session) {
    const url = req.nextUrl.clone();
    url.pathname = '/account';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/login', '/signup'],
};
