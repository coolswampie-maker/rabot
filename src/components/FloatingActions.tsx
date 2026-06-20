'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/ru';
import { localePath } from '@/lib/routing';
import SubscribeModal from './SubscribeModal';

// Social channels (update with the school's real handles before launch).
const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: 'Telegram',
    href: 'https://t.me/MBAaccelerator',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.94 4.6 18.9 19.2c-.23 1-.83 1.26-1.68.78l-4.64-3.42-2.24 2.16c-.25.25-.46.46-.94.46l.33-4.73 8.6-7.77c.37-.33-.08-.52-.58-.19L7.42 13.1l-4.57-1.43c-1-.31-1-1 .21-1.48l17.86-6.88c.83-.31 1.56.19 1.02 1.29Z" />
      </svg>
    ),
  },
  {
    label: 'VK',
    href: 'https://vk.com/rudn_university',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.8 16.3c-5.1 0-8-3.5-8.1-9.3h2.6c.1 4.3 2 6.1 3.5 6.5V7h2.4v3.7c1.5-.2 3-1.8 3.6-3.7h2.4c-.4 2.3-2 3.9-3.1 4.6 1.1.5 2.9 1.9 3.6 4.7h-2.6c-.5-1.7-1.9-3-3.9-3.2v3.2h-.4Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@RUDN_University',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 12s0-3-.4-4.4a2.7 2.7 0 0 0-1.9-1.9C18.9 5.3 12 5.3 12 5.3s-6.9 0-8.7.4A2.7 2.7 0 0 0 1.4 7.6C1 9 1 12 1 12s0 3 .4 4.4c.2.9.9 1.6 1.9 1.9 1.8.4 8.7.4 8.7.4s6.9 0 8.7-.4a2.7 2.7 0 0 0 1.9-1.9C23 15 23 12 23 12ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z" />
      </svg>
    ),
  },
];

// Persistent action rail. On desktop it's docked to the right edge and stays
// visible while scrolling; on mobile it becomes a bottom bar.
export default function FloatingActions({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [subscribe, setSubscribe] = useState(false);
  const applyHref = localePath(locale, '/contacts#apply');
  const consentHref = localePath(locale, '/legal/consent');

  return (
    <>
      {/* Desktop: elegant floating action dock — rounded pills + soft shadow. */}
      <div className="fixed bottom-7 right-7 z-40 hidden flex-col items-end gap-3 md:flex">
        <div className="flex items-center gap-1.5 rounded-full border border-line bg-white/95 p-2 shadow-[0_14px_44px_rgba(20,40,80,0.18)] backdrop-blur">
          <Link
            href={applyHref}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.94 4.6 18.9 19.2c-.23 1-.83 1.26-1.68.78l-4.64-3.42-2.24 2.16c-.25.25-.46.46-.94.46l.33-4.73 8.6-7.77c.37-.33-.08-.52-.58-.19L7.42 13.1l-4.57-1.43c-1-.31-1-1 .21-1.48l17.86-6.88c.83-.31 1.56.19 1.02 1.29Z" />
            </svg>
            {dict.actions.apply}
          </Link>
          <button
            onClick={() => setSubscribe(true)}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
            {dict.actions.subscribe}
          </button>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-1 rounded-full border border-line bg-white/95 px-2 py-1.5 shadow-card backdrop-blur">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full text-navy-700 transition hover:bg-brand-50 hover:text-brand-600"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile: sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white/95 p-3 backdrop-blur md:hidden">
        <Link href={applyHref} className="btn-primary flex-1 py-2.5 text-xs">
          {dict.actions.apply}
        </Link>
        <button onClick={() => setSubscribe(true)} className="btn-secondary flex-1 py-2.5 text-xs">
          {dict.actions.subscribe}
        </button>
      </div>

      <SubscribeModal
        open={subscribe}
        onClose={() => setSubscribe(false)}
        locale={locale}
        dict={dict}
        consentHref={consentHref}
      />
    </>
  );
}
