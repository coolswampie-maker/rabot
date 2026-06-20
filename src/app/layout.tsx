import './globals.css';
import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { Manrope, Roboto_Slab } from 'next/font/google';

// Manrope for UI/body; Roboto Slab (solid slab serif) for headings — a heavy,
// authoritative, distinctive look. Both ship Cyrillic.
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});
const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'RUDN Business School',
    template: '%s · RUDN Business School',
  },
  description:
    'RUDN Business School — MBA programs, the accelerator and the ICEMR research center in one platform.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = headers().get('x-locale') || 'ru';
  return (
    <html lang={locale} className={`${manrope.variable} ${robotoSlab.variable}`}>
      <body>{children}</body>
    </html>
  );
}
