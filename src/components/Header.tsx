'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/ru';
import { localePath } from '@/lib/routing';

type SubLink = { label: string; href: string; desc?: string };
type NavItem = { key: string; label: string; shortLabel?: string; href: string; menu?: SubLink[] };

export default function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const lp = (p: string) => localePath(locale, p);
  const ru = locale === 'ru';

  const items: NavItem[] = [
    {
      key: 'programs',
      label: dict.nav.programs,
      href: lp('/programs'),
      menu: [
        { label: ru ? 'Все программы' : 'All programs', href: lp('/programs'), desc: ru ? 'Обзор направлений' : 'Overview' },
        { label: ru ? 'Классическая MBA' : 'Classic MBA', href: lp('/programs/mba-classic') },
        { label: 'Master of Business Acceleration', href: lp('/programs/master-of-business-acceleration') },
        { label: 'RUDN Global Expansion', href: lp('/programs/global-expansion'), desc: ru ? 'Корпоративная программа' : 'Corporate programme' },
        { label: ru ? 'MBA «Global Expansion. Выход на новые рынки»' : 'MBA “Global Expansion”', href: lp('/programs/mba-global-expansion'), desc: ru ? 'Классическая специализация, 22 модуля' : 'Classic specialisation, 22 modules' },
        { label: dict.nav.subsidy, href: lp('/subsidy'), desc: ru ? 'Субсидия до 95% на обучение' : 'Up to 95% training subsidy' },
        { label: dict.nav.faculty, href: lp('/faculty'), desc: ru ? 'Преподаватели и эксперты' : 'Faculty & experts' },
      ],
    },
    { key: 'accelerator', label: dict.nav.accelerator, href: lp('/accelerator') },
    {
      key: 'research',
      label: dict.nav.research,
      shortLabel: ru ? 'Наука' : 'Research',
      href: lp('/research'),
      menu: [
        { label: ru ? 'О центре ICEMR' : 'About ICEMR', href: lp('/research'), desc: ru ? 'Развивающиеся рынки' : 'Emerging markets' },
        { label: dict.nav.publications, href: lp('/publications') },
        { label: dict.nav.partners, href: lp('/partners') },
        { label: dict.nav.contacts, href: lp('/contacts') },
      ],
    },
    { key: 'news', label: dict.nav.news, shortLabel: ru ? 'Новости' : 'News', href: lp('/news') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <div className="container flex h-[76px] items-center justify-between gap-3 xl:gap-6">
        <Link href={lp('/')} aria-label={dict.brandName} className="flex shrink-0 items-center gap-3">
          <Image src="/logo.svg" alt="" width={132} height={44} priority className="h-9 w-auto xl:h-10" />
          <span className="hidden text-sm font-semibold leading-tight text-navy-700 xl:block">
            {dict.brandShort}
            <span className="block text-[11px] font-normal tracking-wide text-muted">MBA Business School</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden min-w-0 items-center gap-0.5 md:flex" aria-label="Primary">
          {items.map((item) => (
            <div
              key={item.key}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.menu ? item.key : null)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-medium text-navy-700 hover:bg-brand-50 hover:text-brand-600 xl:px-3.5 xl:text-[15px]"
              >
                {item.shortLabel ? (
                  <>
                    <span className="2xl:hidden">{item.shortLabel}</span>
                    <span className="hidden 2xl:inline">{item.label}</span>
                  </>
                ) : (
                  item.label
                )}
                {item.menu && (
                  <svg width="11" height="11" viewBox="0 0 12 12" className="mt-0.5 opacity-50">
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                )}
              </Link>

              {item.menu && openMenu === item.key && (
                <div className="absolute left-0 top-full w-72 pt-2">
                  <div className="overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-card-hover">
                    {item.menu.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block rounded-lg px-3 py-2.5 hover:bg-brand-50"
                      >
                        <span className="block text-sm font-medium text-navy-700">{s.label}</span>
                        {s.desc && <span className="mt-0.5 block text-xs text-muted">{s.desc}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher locale={locale} tone="light" />
          </div>
          <Link href={lp('/contacts#apply')} className="btn-primary hidden whitespace-nowrap px-3 py-2 text-xs md:inline-flex xl:px-5 xl:py-2.5 xl:text-[13px]">
            {dict.nav.apply}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-navy-700 md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line bg-white md:hidden">
          <nav className="container flex flex-col py-3" aria-label="Mobile">
            {[
              ...items,
              { key: 'subsidy', label: dict.nav.subsidy, href: lp('/subsidy') },
              { key: 'publications', label: dict.nav.publications, href: lp('/publications') },
              { key: 'faculty', label: dict.nav.faculty, href: lp('/faculty') },
              { key: 'partners', label: dict.nav.partners, href: lp('/partners') },
              { key: 'contacts', label: dict.nav.contacts, href: lp('/contacts') },
            ].map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-line py-3 text-navy-700"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4">
              <LanguageSwitcher locale={locale} tone="light" />
              <Link href={lp('/contacts#apply')} onClick={() => setMobileOpen(false)} className="btn-primary text-xs">
                {dict.nav.apply}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
