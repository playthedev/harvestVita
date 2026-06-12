/**
 * Validates a redirect target from user input (query params, form fields).
 * Only allows same-origin relative paths — rejects protocol-relative URLs
 * (e.g. "//evil.com") and absolute URLs, which `startsWith('/')` alone would miss.
 */
export function safeRedirect(target: string | null | undefined, fallback = '/account'): string {
  if (!target || !target.startsWith('/') || target.startsWith('//')) return fallback;
  return target;
}
