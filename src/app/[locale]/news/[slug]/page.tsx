import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata, articleJsonLd, siteUrl } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getPost, getPosts, pick } from '@/lib/queries';
import { toPlainText } from '@/lib/markdown';
import Breadcrumbs from '@/components/Breadcrumbs';
import Prose from '@/components/Prose';
import NewsCard from '@/components/cards/NewsCard';
import JsonLd from '@/components/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return buildMetadata({ title: 'Not found', description: '', locale: params.locale, path: `/news/${params.slug}`, noindex: true });
  }
  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || toPlainText(post.content),
    locale: params.locale,
    path: `/news/${post.slug}`,
    image: post.ogImage || post.coverImage || undefined,
    type: 'article',
  });
}

function fmtDate(d: Date | null, locale: Locale) {
  if (!d) return '';
  return new Date(d).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function PostDetail({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const locale = params.locale;
  const post = await getPost(params.slug);
  if (!post) notFound();
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);

  const related = (await getPosts({ locale, take: 4 })).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: post.title,
          description: post.excerpt,
          url: `${siteUrl()}${lp(`/news/${post.slug}`)}`,
          image: post.coverImage || undefined,
          datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
          dateModified: new Date(post.updatedAt).toISOString(),
          author: post.authorName || post.author?.name,
          isNews: post.type === 'NEWS',
        })}
      />
      <Breadcrumbs
        locale={locale}
        homeLabel={dict.common.home}
        items={[{ label: dict.nav.news, href: lp('/news') }, { label: post.title }]}
      />

      <article className="container max-w-3xl py-12">
        <header>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-muted">
            {post.category && <span className="chip">{pick(post.category, 'name', locale)}</span>}
            <time>{fmtDate(post.publishedAt, locale)}</time>
            {(post.authorName || post.author?.name) && (
              <span>· {post.authorName || post.author?.name}</span>
            )}
          </div>
          <h1 className="text-4xl leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
        </header>

        {post.coverImage && (
          <div className="relative my-8 aspect-[16/9] overflow-hidden rounded-2xl bg-brand-50">
            <Image src={post.coverImage} alt="" fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" />
          </div>
        )}

        <div className="mt-8">
          <Prose markdown={post.content} />
        </div>

        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
            {post.tags.map((t) => (
              <span key={t.id} className="chip">#{pick(t, 'name', locale)}</span>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link href={lp('/news')} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            ← {dict.common.backToList}
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section bg-paper">
          <div className="container">
            <h2 className="mb-8 text-2xl">{dict.home.newsTitle}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
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
    </>
  );
}
