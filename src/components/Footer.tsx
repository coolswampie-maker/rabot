import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/ru';
import { localePath } from '@/lib/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const lp = (p: string) => localePath(locale, p);
  const year = 2026; // build-time constant; update on release

  const sections = [
    { label: dict.nav.programs, href: lp('/programs') },
    { label: dict.nav.accelerator, href: lp('/accelerator') },
    { label: dict.nav.subsidy, href: lp('/subsidy') },
    { label: dict.nav.research, href: lp('/research') },
    { label: dict.nav.news, href: lp('/news') },
    { label: dict.nav.publications, href: lp('/publications') },
    { label: dict.nav.faculty, href: lp('/faculty') },
    { label: dict.nav.partners, href: lp('/partners') },
    { label: dict.nav.contacts, href: lp('/contacts') },
  ];

  const legal = [
    { label: dict.footer.privacy, href: lp('/legal/privacy') },
    { label: dict.footer.consent, href: lp('/legal/consent') },
    { label: dict.footer.cookie, href: lp('/legal/cookie') },
    { label: dict.footer.terms, href: lp('/legal/terms') },
  ];

  return (
    <footer className="mt-24 border-t border-line bg-paper text-muted">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image src="/logo.svg" alt="" width={140} height={46} className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{dict.footer.about}</p>
          <div className="mt-6 inline-flex rounded-full border border-line bg-white px-3 py-1.5">
            <LanguageSwitcher locale={locale} tone="light" />
          </div>
        </div>

        <nav className="lg:col-span-3" aria-label="Footer sections">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-700">{dict.footer.sections}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {sections.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-muted hover:text-brand-600">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-2" aria-label="Legal">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-700">{dict.footer.legal}</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {legal.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-muted hover:text-brand-600">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-700">{dict.footer.contactsTitle}</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>{dict.footer.address}</li>
            <li>
              <a href="tel:+74957873803" className="hover:text-brand-600">+7 (495) 787-38-03</a>
            </li>
            <li>
              <a href="mailto:iWeb.mba@rudn.ru" className="hover:text-brand-600">iWeb.mba@rudn.ru</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted sm:flex-row">
          <p>© {year} {dict.brandName}. {dict.footer.rights}</p>
          <p>Москва · Moscow</p>
        </div>
      </div>
    </footer>
  );
}
