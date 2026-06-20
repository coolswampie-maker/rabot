import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/routing';

export default function Logo({
  locale,
  variant = 'dark',
  label,
}: {
  locale: Locale;
  variant?: 'dark' | 'light';
  label: string;
}) {
  return (
    <Link
      href={localePath(locale, '/')}
      className="flex items-center gap-3"
      aria-label={label}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={132}
        height={44}
        priority
        className={variant === 'light' ? 'h-9 w-auto brightness-0 invert' : 'h-9 w-auto'}
      />
      <span className="sr-only">{label}</span>
    </Link>
  );
}
