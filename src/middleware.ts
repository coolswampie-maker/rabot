import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

// Handles two things:
//  1. Locale prefixing — every public page lives under /ru or /en.
//  2. Subdomain → section mapping for the brand subdomains in production.
//     accelerator.<domain> serves the /accelerator section, research.<domain>
//     serves /research. Locally use the path-based routes directly.

const PUBLIC_FILE = /\.(.*)$/;

function localeFromPath(pathname: string): string | null {
  const seg = pathname.split('/')[1];
  return locales.includes(seg as (typeof locales)[number]) ? seg : null;
}

function brandPrefixForHost(host: string): string | null {
  const acc = process.env.NEXT_PUBLIC_ACCELERATOR_HOST;
  const res = process.env.NEXT_PUBLIC_RESEARCH_HOST;
  const bare = host.split(':')[0];
  if (acc && bare === acc.split(':')[0]) return 'accelerator';
  if (res && bare === res.split(':')[0]) return 'research';
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip API, admin, the leads viewer, Next internals and static files.
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/leads') ||
    pathname.startsWith('/_next') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const host = req.headers.get('host') || '';
  const brand = brandPrefixForHost(host);
  const currentLocale = localeFromPath(pathname);

  // Ensure a locale prefix exists.
  if (!currentLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  // Forward the active locale + path so the root layout can set <html lang>
  // and pages can build canonical URLs without re-parsing.
  const fwd = new Headers(req.headers);
  fwd.set('x-locale', currentLocale);
  fwd.set('x-pathname', pathname);

  // On a brand subdomain, rewrite the locale root onto the brand section so
  // accelerator.<domain>/ru shows the accelerator landing, etc.
  if (brand) {
    const rest = pathname.slice(`/${currentLocale}`.length); // e.g. "" or "/news"
    if (rest === '' || rest === '/') {
      const url = req.nextUrl.clone();
      url.pathname = `/${currentLocale}/${brand}`;
      return NextResponse.rewrite(url, { request: { headers: fwd } });
    }
  }

  return NextResponse.next({ request: { headers: fwd } });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
