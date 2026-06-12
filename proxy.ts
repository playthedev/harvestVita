import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './app/lib/session';
import { locales, defaultLocale } from './app/i18n/config';

const PROTECTED = ['/account'];
const AUTH_ONLY = ['/login', '/signup'];

function getLocaleFromPathname(pathname: string): { locale: string | null; rest: string } {
  const segments = pathname.split('/');
  const maybeLocale = segments[1];
  if ((locales as readonly string[]).includes(maybeLocale)) {
    const rest = '/' + segments.slice(2).join('/');
    return { locale: maybeLocale, rest: rest === '/' ? '/' : rest.replace(/\/$/, '') || '/' };
  }
  return { locale: null, rest: pathname };
}

function getPreferredLocale(req: NextRequest): string {
  const acceptLanguage = req.headers.get('accept-language');
  if (acceptLanguage) {
    const preferred = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
    if ((locales as readonly string[]).includes(preferred)) return preferred;
  }
  return defaultLocale;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip API routes — they are not localized
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const { locale, rest } = getLocaleFromPathname(pathname);

  // No locale prefix — redirect to the preferred/default locale, preserving the path
  if (!locale) {
    const url = req.nextUrl.clone();
    const preferred = getPreferredLocale(req);
    url.pathname = `/${preferred}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  const token = req.cookies.get('hv_session')?.value;
  const session = token ? await decrypt(token) : null;

  // Redirect unauthenticated users away from protected routes
  if (PROTECTED.some((p) => rest.startsWith(p)) && !session) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from login/signup
  if (AUTH_ONLY.some((p) => rest.startsWith(p)) && session) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/account`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
