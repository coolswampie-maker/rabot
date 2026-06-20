import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/ru';
import { testimonials } from '@/content/testimonials';
import { SectionHeading } from './Section';
import JsonLd from './JsonLd';

// Real alumni testimonials (social proof). Also emits Review structured data
// for the school — supports rich results and reinforces trust for SEO.
export default function Testimonials({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const reviewsLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'RUDN Business School',
    review: testimonials.map((t) => ({
      '@type': 'Review',
      reviewBody: t.quote[locale],
      author: { '@type': 'Person', name: t.name[locale] },
      datePublished: String(t.year),
    })),
  };

  return (
    <section className="section bg-paper">
      <div className="container">
        <SectionHeading
          eyebrow={dict.brandShort}
          title={dict.home.testimonialsTitle}
          subtitle={dict.home.testimonialsSubtitle}
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card">
              <span aria-hidden className="font-serif text-4xl leading-none text-brand-300">“</span>
              <blockquote className="mt-2 flex-1 text-[0.975rem] leading-relaxed text-navy-700">
                {t.quote[locale]}
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4">
                <div className="font-semibold text-navy-700">{t.name[locale]}</div>
                <div className="mt-0.5 text-sm text-muted">
                  {t.role[locale]} · {t.year}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <JsonLd data={reviewsLd} />
    </section>
  );
}
