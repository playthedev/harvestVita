import type { Locale } from '../i18n/config';

/** Prefixes a route path with the current locale, e.g. ('/products', 'fr') -> '/fr/products'. */
export function localizedHref(path: string, locale: Locale): string {
  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
}

/** Strips a leading /en, /fr, or /de segment from a pathname. */
export function stripLocale(pathname: string, locales: readonly string[]): string {
  const segments = pathname.split('/');
  if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
    const rest = '/' + segments.slice(2).join('/');
    return rest === '/' ? '/' : rest.replace(/\/$/, '') || '/';
  }
  return pathname;
}
