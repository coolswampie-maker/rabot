import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getPublications } from '@/lib/queries';
import { pubLabel } from '@/lib/labels';
import { researchDirections } from '@/content/research';
import Breadcrumbs from '@/components/Breadcrumbs';
import PublicationCard from '@/components/cards/PublicationCard';
import QuestionsBlock from '@/components/QuestionsBlock';

export function generateStaticParams() {
  // For each locale, all direction slugs.
  return researchDirections.flatMap((d) => [
    { locale: 'ru', slug: d.slug },
    { locale: 'en', slug: d.slug },
  ]);
}

function findDirection(slug: string) {
  return researchDirections.find((d) => d.slug === slug) || null;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const d = findDirection(params.slug);
  if (!d) return buildMetadata({ title: 'Not found', description: '', locale: params.locale, path: `/research/${params.slug}`, noindex: true });
  return buildMetadata({
    title: `${d.title[params.locale]} — ICEMR`,
    description: d.text[params.locale],
    locale: params.locale,
    path: `/research/${d.slug}`,
  });
}

export default async function ResearchDirectionPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const locale = params.locale;
  const d = findDirection(params.slug);
  if (!d) notFound();
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);
  const ru = locale === 'ru';

  const all = await getPublications({});
  const related = d.fields.length ? all.filter((p) => p.field && d.fields.includes(p.field)) : [];
  const otherDirections = researchDirections.filter((x) => x.slug !== d.slug);

  return (
    <>
      <Breadcrumbs
        locale={locale}
        homeLabel={dict.common.home}
        items={[{ label: dict.nav.research, href: lp('/research') }, { label: d.title[locale] }]}
      />

      <section className="section">
        <div className="container max-w-3xl">
          <p className="eyebrow mb-2">ICEMR · {ru ? 'Направление' : 'Direction'}</p>
          <h1 className="text-4xl font-extrabold text-navy-700 sm:text-5xl">{d.title[locale]}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{d.body[locale]}</p>
        </div>
      </section>

      {/* Related publications */}
      <section className="section-tight bg-paper">
        <div className="container">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-navy-700">{ru ? 'Публикации по направлению' : 'Publications in this area'}</h2>
            <Link href={lp('/publications')} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              {dict.common.allPublications} →
            </Link>
          </div>
          {related.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((pub) => (
                <PublicationCard
                  key={pub.id}
                  href={lp(`/publications/${pub.slug}`)}
                  item={{ slug: pub.slug, title: pub.title, authorsText: pub.authorsText, year: pub.year, venue: pub.venue, typeLabel: pubLabel(pub.type, locale) }}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted">
              {ru
                ? 'Публикации по этому направлению готовятся. Смотрите полный каталог центра.'
                : 'Publications in this area are in preparation. See the center’s full catalogue.'}
            </p>
          )}
        </div>
      </section>

      {/* Other directions — internal linking for SEO */}
      <section className="section-tight">
        <div className="container">
          <h2 className="mb-5 text-xl font-bold text-navy-700">{ru ? 'Другие направления' : 'Other directions'}</h2>
          <div className="flex flex-wrap gap-2.5">
            {otherDirections.map((x) => (
              <Link
                key={x.slug}
                href={lp(`/research/${x.slug}`)}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy-700 transition hover:border-brand-300 hover:text-brand-600"
              >
                {x.title[locale]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuestionsBlock locale={locale} dict={dict} />
    </>
  );
}
