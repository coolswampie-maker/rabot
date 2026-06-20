import Link from 'next/link';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getPublications, getPosts, getFaculty, pick } from '@/lib/queries';
import { pubLabel } from '@/lib/labels';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import { SectionHeading } from '@/components/Section';
import PublicationCard from '@/components/cards/PublicationCard';
import NewsCard from '@/components/cards/NewsCard';
import FacultyCard from '@/components/cards/FacultyCard';
import CTASection from '@/components/CTASection';
import {
  researchName,
  researchIntro,
  researchDirections,
  researchSeries,
  workingPapers,
  activitiesUrl,
} from '@/content/research';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return buildMetadata({
    title: 'ICEMR — ' + (params.locale === 'ru' ? 'Научный центр' : 'Research Center'),
    description: researchIntro[params.locale].slice(0, 160),
    locale: params.locale,
    path: '/research',
    image: '/images/rudn/campus-sign.jpg',
  });
}

export default async function ResearchPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);
  const ru = locale === 'ru';

  const [publications, posts, people] = await Promise.all([
    getPublications({ take: 4 }),
    getPosts({ locale, brand: 'ICEMR', take: 3 }),
    getFaculty(undefined, 4),
  ]);

  return (
    <>
      <Breadcrumbs locale={locale} homeLabel={dict.common.home} items={[{ label: dict.nav.research }]} />

      <Hero
        kicker="ICEMR"
        title={researchName[locale]}
        subtitle={researchIntro[locale]}
        image="/images/rudn/campus-sign.jpg"
        primaryCta={{ label: dict.nav.publications, href: lp('/publications') }}
        secondaryCta={{ label: ru ? 'Activities (Harvard)' : 'Activities (Harvard)', href: activitiesUrl }}
      />

      {/* Research directions — compact, each links to its own page */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={dict.common.field} title={ru ? 'Направления исследований' : 'Research directions'} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {researchDirections.map((d, i) => (
              <Link
                key={d.slug}
                href={lp(`/research/${d.slug}`)}
                className="group flex items-start gap-4 rounded-xl border border-line bg-white p-5 transition hover:border-brand-300 hover:shadow-card"
              >
                <span className="mt-0.5 text-sm font-bold text-brand-500">0{i + 1}</span>
                <span className="flex-1">
                  <span className="block font-semibold text-navy-700 group-hover:text-brand-600">{d.title[locale]}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{d.text[locale]}</span>
                </span>
                <span className="mt-0.5 text-brand-400 transition group-hover:translate-x-0.5">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Journals & series */}
      <section className="section-tight bg-paper">
        <div className="container">
          <SectionHeading eyebrow="ICEMR" title={ru ? 'Журналы и серии' : 'Journals & series'} />
          <ul className="grid gap-4 md:grid-cols-3">
            {researchSeries.map((s) => (
              <li key={s.title} className="card flex flex-col p-6">
                <h3 className="font-serif text-base leading-snug text-navy-700">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.note[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Working papers + publications */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[300px_1fr]">
          <div>
            <h2 className="text-2xl">{ru ? 'Working Papers' : 'Working Papers'}</h2>
            <ul className="mt-5 space-y-3">
              {workingPapers.map((w) => (
                <li key={w.code} className="rounded-xl border border-line bg-white px-4 py-3">
                  <span className="font-medium text-navy-700">{w.title[locale]}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              {ru
                ? 'Рабочие материалы готовятся к публикации. Полный каталог — в разделе «Публикации».'
                : 'Working papers are being prepared for release. See the full catalogue under Publications.'}
            </p>
          </div>

          <div>
            <SectionHeading
              eyebrow={dict.nav.publications}
              title={ru ? 'Избранные публикации' : 'Selected publications'}
              link={{ label: dict.common.allPublications, href: lp('/publications') }}
            />
            {publications.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {publications.map((pub) => (
                  <PublicationCard
                    key={pub.id}
                    href={lp(`/publications/${pub.slug}`)}
                    item={{ slug: pub.slug, title: pub.title, authorsText: pub.authorsText, year: pub.year, venue: pub.venue, typeLabel: pubLabel(pub.type, locale) }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted">{dict.common.nothingFound}</p>
            )}
          </div>
        </div>
      </section>

      {/* Activities (external Harvard page) */}
      <section className="section-tight bg-paper">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-white p-7 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl">Activities</h2>
              <p className="mt-1 text-sm text-muted">
                {ru
                  ? 'Программа мероприятий центра размещена на партнёрской площадке Гарвардского университета.'
                  : 'The center’s activities programme is hosted on a partner page at Harvard University.'}
              </p>
            </div>
            <a href={activitiesUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary shrink-0">
              {ru ? 'Открыть на Harvard ↗' : 'Open on Harvard ↗'}
            </a>
          </div>
        </div>
      </section>

      {/* People */}
      {people.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow={dict.nav.faculty} title={ru ? 'Исследователи' : 'Researchers'} link={{ label: dict.common.learnMore, href: lp('/faculty') }} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {people.map((f) => (
                <FacultyCard key={f.id} person={{ slug: f.slug, name: pick(f, 'name', locale), title: pick(f, 'title', locale), bio: pick(f, 'bio', locale), field: f.field, photo: f.photo }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events / news */}
      {posts.length > 0 && (
        <section className="section bg-paper">
          <div className="container">
            <SectionHeading eyebrow={dict.nav.news} title={ru ? 'События и новости' : 'Events & news'} link={{ label: dict.common.allNews, href: lp('/news') }} />
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <NewsCard key={p.id} locale={locale} href={lp(`/news/${p.slug}`)} item={{ slug: p.slug, title: p.title, excerpt: p.excerpt, coverImage: p.coverImage, categoryName: p.category ? pick(p.category, 'name', locale) : null, publishedAt: p.publishedAt }} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={ru ? 'Сотрудничество с центром' : 'Work with the center'}
        text={ru ? 'Совместные исследования, данные и экспертиза для бизнеса и партнёров.' : 'Joint research, data and expertise for business and partners.'}
        cta={{ label: dict.nav.contacts, href: lp('/contacts') }}
        image="/images/rudn/rudn-facade.png"
      />
    </>
  );
}
