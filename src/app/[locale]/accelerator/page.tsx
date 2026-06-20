import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getFaculty, getPosts, pick } from '@/lib/queries';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import { SectionHeading } from '@/components/Section';
import FacultyCard from '@/components/cards/FacultyCard';
import NewsCard from '@/components/cards/NewsCard';
import FormWithConsent from '@/components/FormWithConsent';
import {
  acceleratorMeta,
  acceleratorIntro,
  acceleratorProfiles,
  acceleratorAudience,
  acceleratorTools,
  acceleratorModuleFormat,
  acceleratorBlocks,
  acceleratorOutcomes,
  acceleratorSupport,
  acceleratorSteps,
  acceleratorAdvantages,
  acceleratorPartners,
} from '@/content/accelerator';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
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
  const ru = locale === 'ru';

  const [faculty, posts] = await Promise.all([
    getFaculty('ACCELERATOR', 4),
    getPosts({ locale, brand: 'ACCELERATOR', take: 3 }),
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
            { value: '4', label: ru ? 'акселерационных блока' : 'acceleration blocks' },
            { value: acceleratorMeta.startDate[locale], label: ru ? 'старт потока' : 'cohort start' },
            { value: acceleratorMeta.price[locale], label: ru ? 'стоимость программы' : 'programme price' },
          ].map((f) => (
            <div key={f.label}>
              <div className="font-serif text-2xl text-navy-700 sm:text-3xl">{f.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Participant profiles */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={dict.common.audience} title={ru ? 'Кому подходит программа' : 'Who the programme is for'} />
          <div className="grid gap-6 md:grid-cols-2">
            {acceleratorProfiles.map((p, i) => (
              <div key={i} className="card p-6">
                <h3 className="text-xl">{p.title[locale]}</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-navy-700">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex gap-2.5">
                      <span className="mt-0.5 text-brand-500">—</span>
                      {pt[locale]}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700">{p.goal[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you achieve */}
      <section className="section bg-paper">
        <div className="container">
          <SectionHeading eyebrow={ru ? 'Зачем' : 'Why'} title={ru ? 'Что вы сделаете на программе' : 'What you will do on the programme'} />
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

      {/* Working tools */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={ru ? 'Инструменты' : 'Tools'} title={ru ? 'Наши рабочие инструменты' : 'Our working tools'} />
          <div className="flex flex-wrap gap-3">
            {acceleratorTools.map((t, i) => (
              <span key={i} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy-700">
                {t[locale]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Structure: 4 blocks */}
      <section className="section bg-paper">
        <div className="container">
          <SectionHeading
            eyebrow={ru ? 'Структура' : 'Structure'}
            title={ru ? 'Четыре акселерационных блока' : 'Four acceleration blocks'}
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

      {/* How a module is built */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={ru ? 'Формат' : 'Format'}
            title={ru ? 'Как выстроена программа в модуле' : 'How a module is built'}
            subtitle={ru
              ? 'Для каждого слушателя — групповые форматы и индивидуальная дорожная карта развития бизнеса.'
              : 'Each participant gets group formats and a personal business-development roadmap.'}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {acceleratorModuleFormat.map((s, i) => (
              <div key={i} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">{i + 1}</div>
                <h3 className="mt-4 text-base font-bold text-navy-700">{s.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section bg-paper">
        <div className="container">
          <SectionHeading eyebrow={ru ? 'Результаты' : 'Outcomes'} title={ru ? 'С чем вы выйдете' : 'What you leave with'} />
          <div className="grid gap-5 md:grid-cols-4">
            {acceleratorOutcomes.map((o, i) => (
              <div key={i} className="rounded-2xl bg-brand-500 p-6 text-white">
                <p className="text-sm leading-relaxed text-white/90">{o[locale]}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {acceleratorSupport.map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-line bg-white p-4 text-sm font-medium text-navy-700">
                <span className="text-brand-500">→</span>
                {s[locale]}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs uppercase tracking-wide text-muted">{ru ? 'Сопровождение после программы' : 'Support after the programme'}</p>
        </div>
      </section>

      {/* RUDN advantages */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={dict.brandShort} title={ru ? 'Преимущества РУДН' : 'Why RUDN'} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {acceleratorAdvantages.map((a, i) => (
              <div key={i} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <p className="text-sm leading-relaxed text-navy-700">{a[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply — selection into the TOP-25 */}
      <section className="section bg-paper">
        <div className="container">
          <SectionHeading
            eyebrow={ru ? 'Отбор' : 'Selection'}
            title={ru ? 'Как поступить' : 'How to apply'}
            subtitle={ru ? 'Пройдите отбор, чтобы попасть в ТОП-25 участников программы.' : 'Pass the selection to join the TOP-25 participants of the programme.'}
          />
          <ol className="grid gap-4 md:grid-cols-4">
            {acceleratorSteps.map((s, i) => (
              <li key={i} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <div className="font-serif text-2xl text-brand-500">{i + 1}</div>
                <p className="mt-2 text-sm leading-relaxed text-navy-700">{s[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Experts & trackers */}
      {faculty.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow={dict.nav.faculty} title={ru ? 'Эксперты и трекеры' : 'Experts & trackers'} link={{ label: dict.common.learnMore, href: lp('/faculty') }} />
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
        <section className="section bg-paper">
          <div className="container">
            <SectionHeading eyebrow={dict.nav.news} title={ru ? 'Новости акселератора' : 'Accelerator news'} link={{ label: dict.common.allNews, href: lp('/news') }} />
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

      {/* Accelerator partners */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={dict.nav.partners} title={dict.home.partnersTitle} align="center" />
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
            {acceleratorPartners.map((p) => (
              <div key={p.name} className="flex flex-col items-center rounded-2xl border border-line bg-white p-6 text-center shadow-card">
                <div className="flex h-14 items-center justify-center">
                  <Image src={p.logo} alt={p.name} width={180} height={48} className="h-auto max-h-12 w-auto object-contain" />
                </div>
                <div className="mt-3 text-sm leading-snug text-muted">{p.role[locale]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidy banner */}
      <section className="section-tight">
        <div className="container">
          <Link href={lp('/subsidy')} className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-navy-700 p-7 text-white sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{ru ? 'Финансирование' : 'Financing'}</p>
              <p className="mt-1 text-lg font-semibold">
                {ru ? 'До 95% стоимости обучения — субсидия для московских работодателей' : 'Up to 95% of tuition — a subsidy for Moscow employers'}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-700">{dict.common.learnMore} →</span>
          </Link>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="section bg-paper">
        <div className="container grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-2">{dict.nav.accelerator}</p>
            <h2 className="text-3xl sm:text-4xl">{dict.nav.apply}</h2>
            <p className="mt-4 max-w-md text-lg text-muted">
              {ru
                ? 'Оставьте заявку — расскажем о потоке, форматах и условиях участия, ответим на вопросы.'
                : 'Leave a request — we will tell you about the cohort, formats and terms, and answer your questions.'}
            </p>
            <p className="mt-3 max-w-md text-sm text-muted">{acceleratorMeta.priceNote[locale]} · {acceleratorMeta.price[locale]}</p>
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
