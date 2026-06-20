import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/ru';
import { faq } from '@/content/faq';
import { localePath } from '@/lib/routing';
import JsonLd from './JsonLd';

// FAQ as native <details> — works without JS, accessible, answers in the DOM
// for SEO. Emits FAQPage structured data for rich results.
export default function FAQ({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ru = locale === 'ru';
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q[locale],
      acceptedAnswer: { '@type': 'Answer', text: item.a[locale] },
    })),
  };

  return (
    <section className="section">
      <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Sticky heading + contact prompt */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-3 flex items-center gap-2.5">
            <span className="h-px w-6 bg-brand-300" />
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem]">{dict.home.faqTitle}</h2>
          <p className="mt-5 max-w-sm text-muted">
            {ru
              ? 'Не нашли ответ? Напишите или позвоните — расскажем всё о программах и поступлении.'
              : 'Didn’t find your answer? Write or call us — we’ll explain everything about programs and admission.'}
          </p>
          <Link href={localePath(locale, '/contacts#apply')} className="btn-secondary mt-6">
            {ru ? 'Задать вопрос' : 'Ask a question'}
          </Link>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faq.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-line bg-white px-6 shadow-card transition open:border-brand-200 open:shadow-card-hover"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-[1.05rem] font-semibold text-navy-700 transition group-hover:text-brand-600">
                {item.q[locale]}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg leading-none text-brand-600 transition duration-300 group-open:rotate-45 group-open:bg-brand-500 group-open:text-white">
                  +
                </span>
              </summary>
              <p className="-mt-1 pb-6 leading-relaxed text-muted">{item.a[locale]}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqLd} />
    </section>
  );
}
