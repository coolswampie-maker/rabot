import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getFaculty, getPosts, getPartners, pick } from '@/lib/queries';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import { SectionHeading } from '@/components/Section';
import FacultyCard from '@/components/cards/FacultyCard';
import NewsCard from '@/components/cards/NewsCard';
import PartnerLogoGrid from '@/components/PartnerLogoGrid';
import FormWithConsent from '@/components/FormWithConsent';
import {
  acceleratorMeta,
  acceleratorIntro,
  acceleratorAudience,
  acceleratorBlocks,
  acceleratorOutcomes,
} from '@/content/accelerator';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: 'Master of Business Acceleration',
    description: acceleratorIntro[params.locale].slice(0, 160),
    locale: params.locale,
    path: '/accelerator',
  });
}

export default async function AcceleratorPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);

  const [faculty, posts, partners] = await Promise.all([
    getFaculty('ACCELERATOR', 4),
    getPosts({ locale, brand: 'ACCELERATOR', take: 3 }),
    getPartners(),
  ]);

  return (
    <>
      <Breadcrumbs locale={locale} homeLabel={dict.common.home} items={[{ label: dict.nav.accelerator }]} />

      <Hero
        kicker={dict.nav.accelerator}
        title="Master of Business Acceleration"
        subtitle={acceleratorIntro[locale]}
        image="/images/rudn/student-space.webp"
        primaryCta={{ label: dict.nav.apply, href: '#apply' }}
      />

      {/* Key facts strip */}
      <section className="border-b border-line bg-paper">
        <div className="container grid grid-cols-2 gap-y-8 py-10 text-center md:grid-cols-4">
          {[
            { value: acceleratorMeta.duration[locale], label: dict.common.duration },
            { value: '4', label: locale === 'ru' ? 'акселерационных блока' : 'acceleration blocks' },
            { value: acceleratorMeta.startDate[locale], label: locale === 'ru' ? 'старт потока' : 'cohort start' },
            { value: acceleratorMeta.language[locale], label: dict.common.language },
          ].map((f) => (
            <div key={f.label}>
              <div className="font-serif text-2xl text-navy-700 sm:text-3xl">{f.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={dict.common.audience} title={locale === 'ru' ? 'Для кого программа' : 'Who it is for'} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {acceleratorAudience.map((a, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
                <span className="mt-0.5 text-brand-500">✓</span>
                <span className="text-sm text-navy-700">{a[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Structure: 4 blocks */}
      <section className="section bg-paper">
        <div className="container">
          <SectionHeading
            eyebrow={locale === 'ru' ? 'Структура' : 'Structure'}
            title={locale === 'ru' ? 'Четыре акселерационных блока' : 'Four acceleration blocks'}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {acceleratorBlocks.map((b, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 font-serif font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">{b.period[locale]}</span>
                </div>
                <h3 className="mt-4 text-xl">{b.title[locale]}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {b.modules.map((m, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-brand-300">—</span>
                      {m[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={locale === 'ru' ? 'Результаты' : 'Outcomes'} title={locale === 'ru' ? 'С чем вы выйдете' : 'What you leave with'} />
          <div className="grid gap-5 md:grid-cols-4">
            {acceleratorOutcomes.map((o, i) => (
              <div key={i} className="rounded-2xl bg-brand-500 p-6 text-white">
                <p className="text-sm leading-relaxed text-white/90">{o[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experts */}
      {faculty.length > 0 && (
        <section className="section bg-paper">
          <div className="container">
            <SectionHeading eyebrow={dict.nav.faculty} title={locale === 'ru' ? 'Эксперты и трекеры' : 'Experts & trackers'} link={{ label: dict.common.learnMore, href: lp('/faculty') }} />
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
              {faculty.map((f) => (
                <FacultyCard
                  key={f.id}
                  person={{ slug: f.slug, name: pick(f, 'name', locale), title: pick(f, 'title', locale), bio: pick(f, 'bio', locale), field: f.field, photo: f.photo }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News */}
      {posts.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow={dict.nav.news} title={locale === 'ru' ? 'Новости акселератора' : 'Accelerator news'} link={{ label: dict.common.allNews, href: lp('/news') }} />
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <NewsCard
                  key={p.id}
                  locale={locale}
                  href={lp(`/news/${p.slug}`)}
                  item={{ slug: p.slug, title: p.title, excerpt: p.excerpt, coverImage: p.coverImage, categoryName: p.category ? pick(p.category, 'name', locale) : null, publishedAt: p.publishedAt }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      {partners.length > 0 && (
        <section className="section bg-paper">
          <div className="container">
            <SectionHeading eyebrow={dict.nav.partners} title={dict.home.partnersTitle} align="center" />
            <PartnerLogoGrid partners={partners} />
          </div>
        </section>
      )}

      {/* Apply */}
      <section id="apply" className="section bg-paper">
        <div className="container grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-2">{dict.nav.accelerator}</p>
            <h2 className="text-3xl sm:text-4xl">{dict.nav.apply}</h2>
            <p className="mt-4 max-w-md text-lg text-muted">
              {locale === 'ru'
                ? 'Оставьте заявку — расскажем о потоке, форматах и условиях участия, ответим на вопросы.'
                : 'Leave a request — we will tell you about the cohort, formats and terms, and answer your questions.'}
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted">Email</dt>
                <dd className="mt-1"><a href="mailto:oganesyan-aa@rudn.ru" className="text-brand-600 hover:text-brand-700">oganesyan-aa@rudn.ru</a></dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted">{dict.form.phone}</dt>
                <dd className="mt-1"><a href="tel:+74957873803" className="text-brand-600 hover:text-brand-700">+7 (495) 787-38-03</a></dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted">Telegram</dt>
                <dd className="mt-1"><a href="https://t.me/MBAaccelerator" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700">@MBAaccelerator</a></dd>
              </div>
            </dl>
          </div>
          <div className="card p-7">
            <FormWithConsent
              locale={locale}
              dict={dict}
              kind="ACCELERATOR_APPLICATION"
              consentHref={lp('/legal/consent')}
              presetInterest="Master of Business Acceleration"
            />
          </div>
        </div>
      </section>
    </>
  );
}
