import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getPublications } from '@/lib/queries';
import { pubLabel, publicationTypeLabel } from '@/lib/labels';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuestionsBlock from '@/components/QuestionsBlock';
import PublicationCard from '@/components/cards/PublicationCard';
import CategoryFilter from '@/components/CategoryFilter';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.nav.publications,
    description: params.locale === 'ru' ? 'Каталог публикаций и working papers научного центра ICEMR.' : 'Catalogue of ICEMR publications and working papers.',
    locale: params.locale,
    path: '/publications',
  });
}

export default async function PublicationsPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { type?: string; year?: string };
}) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);

  const activeType = searchParams.type;
  const activeYear = searchParams.year ? Number(searchParams.year) : undefined;

  // Fetch all for building filter facets, then the filtered set.
  const [all, filtered] = await Promise.all([
    getPublications({}),
    getPublications({ type: activeType, year: activeYear }),
  ]);

  const years = Array.from(new Set(all.map((p) => p.year))).sort((a, b) => b - a);
  const types = Array.from(new Set(all.map((p) => p.type)));
  const base = lp('/publications');

  const buildHref = (next: { type?: string; year?: number }) => {
    const sp = new URLSearchParams();
    if (next.type) sp.set('type', next.type);
    if (next.year) sp.set('year', String(next.year));
    const s = sp.toString();
    return s ? `${base}?${s}` : base;
  };

  const typeOptions = [
    { label: dict.common.all, href: buildHref({ year: activeYear }), active: !activeType },
    ...types.map((t) => ({
      label: publicationTypeLabel[t]?.[locale] ?? t,
      href: buildHref({ type: t, year: activeYear }),
      active: activeType === t,
    })),
  ];

  const yearOptions = [
    { label: dict.common.all, href: buildHref({ type: activeType }), active: !activeYear },
    ...years.map((y) => ({
      label: String(y),
      href: buildHref({ type: activeType, year: y }),
      active: activeYear === y,
    })),
  ];

  return (
    <>
      <Breadcrumbs locale={locale} homeLabel={dict.common.home} items={[{ label: dict.nav.publications }]} />
      <section className="border-b border-line bg-paper">
        <div className="container py-16">
          <p className="eyebrow mb-2">ICEMR</p>
          <h1 className="font-serif text-4xl sm:text-5xl">{dict.nav.publications}</h1>
          <p className="lead mt-4 max-w-2xl">
            {locale === 'ru'
              ? 'Журналы, книжные серии, working papers и статьи научного центра по развивающимся рынкам.'
              : 'Journals, book series, working papers and articles from the emerging markets research center.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="mb-8 space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{dict.common.type}</p>
              <CategoryFilter options={typeOptions} />
            </div>
            {years.length > 1 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{dict.common.year}</p>
                <CategoryFilter options={yearOptions} />
              </div>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className="py-12 text-center text-muted">{dict.common.nothingFound}</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((pub) => (
                <PublicationCard
                  key={pub.id}
                  href={lp(`/publications/${pub.slug}`)}
                  item={{ slug: pub.slug, title: pub.title, authorsText: pub.authorsText, year: pub.year, venue: pub.venue, typeLabel: pubLabel(pub.type, locale) }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <QuestionsBlock locale={locale} dict={dict} />
    </>
  );
}
