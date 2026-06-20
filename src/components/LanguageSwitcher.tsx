'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';

export default function LanguageSwitcher({ locale, tone = 'light' }: { locale: Locale; tone?: 'light' | 'dark' }) {
  const pathname = usePathname() || `/${locale}`;

  function swap(target: Locale): string {
    const parts = pathname.split('/');
    // parts[1] is the current locale segment
    if (locales.includes(parts[1] as Locale)) {
      parts[1] = target;
      return parts.join('/') || `/${target}`;
    }
    return `/${target}${pathname}`;
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium" aria-label="Language">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className={tone === 'dark' ? 'px-1 text-white/25' : 'px-1 text-line'}>/</span>}
          <Link
            href={swap(l)}
            aria-current={l === locale ? 'true' : undefined}
            className={
              tone === 'dark'
                ? l === locale
                  ? 'text-white'
                  : 'text-white/55 hover:text-white'
                : l === locale
                  ? 'text-navy-700'
                  : 'text-muted hover:text-brand-600'
            }
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
