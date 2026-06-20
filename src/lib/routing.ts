import type { Locale } from '@/i18n/config';

// Build a locale-prefixed internal path. Always use this for internal links
// so we never produce a broken, locale-less URL.
export function localePath(locale: Locale, path = '/'): string {
  if (!path.startsWith('/')) path = `/${path}`;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}
