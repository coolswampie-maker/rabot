'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/ru';

export default function SubscribeModal({
  open,
  onClose,
  locale,
  dict,
  consentHref,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
  consentHref: string;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('consentData') !== 'on') {
      setError(dict.form.consentRequired);
      return;
    }
    // Static review build has no backend — show success without POSTing.
    if (process.env.NEXT_PUBLIC_STATIC === '1') {
      setStatus('success');
      return;
    }
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'SUBSCRIPTION',
          name: String(fd.get('name') || ''),
          email: String(fd.get('email') || ''),
          consentData: true,
          consentMarketing: true,
          locale,
          sourcePath: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
      setError(dict.form.errorText);
    }
  }

  const input =
    'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-card-hover">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-muted hover:text-navy-700"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="py-6 text-center">
            <h2 className="font-serif text-2xl text-navy-700">{dict.subscribe.success}</h2>
            <button onClick={onClose} className="btn-secondary mt-6">
              OK
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl text-navy-700">{dict.subscribe.title}</h2>
            <p className="mt-2 text-sm text-muted">{dict.subscribe.text}</p>
            <form onSubmit={submit} className="mt-5 space-y-3">
              <input name="name" placeholder={dict.form.name} className={input} maxLength={120} />
              <input name="email" type="email" required placeholder={dict.form.email} className={input} maxLength={160} />
              <label className="flex items-start gap-2.5 text-sm text-muted">
                <input type="checkbox" name="consentData" required className="mt-0.5 h-4 w-4 accent-brand-500" />
                <span>
                  {dict.form.consentData}.{' '}
                  <Link href={consentHref} target="_blank" className="text-brand-600 underline">
                    {dict.form.consentDataLink}
                  </Link>
                </span>
              </label>
              {error && <p className="text-sm font-medium text-red-600">{error}</p>}
              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full">
                {status === 'sending' ? dict.form.sending : dict.subscribe.cta}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
