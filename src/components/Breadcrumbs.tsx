import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/lib/routing';
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo';
import JsonLd from './JsonLd';

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({
  locale,
  homeLabel,
  items,
}: {
  locale: Locale;
  homeLabel: string;
  items: Crumb[];
}) {
  const all: Crumb[] = [{ label: homeLabel, href: localePath(locale, '/') }, ...items];
  const jsonLd = breadcrumbJsonLd(
    all.map((c) => ({
      name: c.label,
      url: `${siteUrl()}${c.href ?? ''}`,
    })),
  );

  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-paper">
      <div className="container py-3">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          {all.map((c, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-line">/</span>}
              {c.href && i < all.length - 1 ? (
                <Link href={c.href} className="hover:text-brand-600">
                  {c.label}
                </Link>
              ) : (
                <span className="text-navy-700" aria-current="page">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <JsonLd data={jsonLd} />
    </nav>
  );
}
