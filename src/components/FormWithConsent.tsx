'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/ru';

type Kind = 'PROGRAM_APPLICATION' | 'ACCELERATOR_APPLICATION' | 'CONTACT' | 'SUBSCRIPTION';

export default function FormWithConsent({
  locale,
  dict,
  kind,
  consentHref,
  presetInterest,
  showOrganization = true,
  showPhone = true,
  showMessage = true,
  showSubscribe = true,
}: {
  locale: Locale;
  dict: Dictionary;
  kind: Kind;
  consentHref: string;
  presetInterest?: string;
  showOrganization?: boolean;
  showPhone?: boolean;
  showMessage?: boolean;
  showSubscribe?: boolean;
}) {
  const t = dict.form;
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if (fd.get('consentData') !== 'on') {
      setError(t.consentRequired);
      return;
    }

    setStatus('sending');
    setError(null);

    const payload = {
      kind,
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      organization: String(fd.get('organization') || ''),
      interest: String(fd.get('interest') || presetInterest || ''),
      message: String(fd.get('message') || ''),
      consentData: true,
      consentMarketing: fd.get('consentMarketing') === 'on',
      locale,
      sourcePath: typeof window !== 'undefined' ? window.location.pathname : '',
      company_website: String(fd.get('company_website') || ''), // honeypot
    };

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('request_failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError(t.errorText);
    }
  }

  if (status === 'success') {
    return (
      <div className="card border-brand-200 bg-brand-50 p-8 text-center">
        <h3 className="text-xl text-navy-700">{t.successTitle}</h3>
        <p className="mt-2 text-muted">{t.successText}</p>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-brand-400 focus:ring-2 focus:ring-brand-100';

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">{t.name} *</span>
          <input name="name" required maxLength={120} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">{t.email} *</span>
          <input name="email" type="email" required maxLength={160} className={inputClass} />
        </label>
        {showPhone && (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-navy-700">{t.phone}</span>
            <input name="phone" type="tel" maxLength={40} className={inputClass} />
          </label>
        )}
        {showOrganization && (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-navy-700">{t.organization}</span>
            <input name="organization" maxLength={160} className={inputClass} />
          </label>
        )}
      </div>

      {presetInterest ? (
        <input type="hidden" name="interest" value={presetInterest} />
      ) : (
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">{t.interest}</span>
          <input name="interest" maxLength={160} className={inputClass} />
        </label>
      )}

      {showMessage && (
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-navy-700">{t.message}</span>
          <textarea name="message" rows={4} maxLength={4000} className={inputClass} />
        </label>
      )}

      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="consentData" required className="mt-1 h-4 w-4 accent-brand-500" />
        <span className="text-muted">
          {t.consentData}.{' '}
          <Link href={consentHref} className="text-brand-600 underline" target="_blank">
            {t.consentDataLink}
          </Link>
        </span>
      </label>

      {showSubscribe && (
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consentMarketing" className="mt-1 h-4 w-4 accent-brand-500" />
          <span className="text-muted">{t.consentMarketing}</span>
        </label>
      )}

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full sm:w-auto">
        {status === 'sending' ? t.sending : kind === 'CONTACT' ? t.submitContact : t.submit}
      </button>
    </form>
  );
}
