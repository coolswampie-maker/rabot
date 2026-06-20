import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getPublication } from '@/lib/queries';
import { pubLabel } from '@/lib/labels';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const pub = await getPublication(params.slug);
  if (!pub) return buildMetadata({ title: 'Not found', description: '', locale: params.locale, path: `/publications/${params.slug}`, noindex: true });
  return buildMetadata({
    title: pub.seoTitle || pub.title,
    description: pub.seoDescription || pub.abstract.slice(0, 160),
    locale: params.locale,
    path: `/publications/${pub.slug}`,
    type: 'article',
  });
}

export default async function PublicationDetail({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const locale = params.locale;
  const pub = await getPublication(params.slug);
  if (!pub) notFound();
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);

  const scholarly = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    abstract: pub.abstract,
    author: pub.authorsText.split(',').map((a) => ({ '@type': 'Person', name: a.trim() })),
    datePublished: String(pub.year),
    ...(pub.doi ? { identifier: pub.doi } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarly) }} />
      <Breadcrumbs
        locale={locale}
        homeLabel={dict.common.home}
        items={[{ label: dict.nav.publications, href: lp('/publications') }, { label: pub.title }]}
      />

      <article className="container max-w-3xl py-12">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="chip">{pubLabel(pub.type, locale)}</span>
          <span className="font-medium text-muted">{pub.year}</span>
          {pub.field && <span className="chip">{pub.field}</span>}
        </div>
        <h1 className="text-3xl leading-tight sm:text-4xl">{pub.title}</h1>
        <p className="mt-4 text-lg text-navy-700">{pub.authorsText}</p>
        {pub.venue && <p className="mt-1 italic text-muted">{pub.venue}</p>}

        <div className="mt-8 rounded-2xl border border-line bg-paper p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Abstract</h2>
          <p className="mt-3 leading-relaxed text-ink">{pub.abstract}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {pub.fileUrl && (
            <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {dict.common.downloadPdf}
            </a>
          )}
          {pub.externalUrl && (
            <a href={pub.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              {dict.common.openSource}
            </a>
          )}
          {pub.doi && (
            <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              DOI: {pub.doi}
            </a>
          )}
        </div>

        <div className="mt-10">
          <Link href={lp('/publications')} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            ← {dict.common.backToList}
          </Link>
        </div>
      </article>
    </>
  );
}
