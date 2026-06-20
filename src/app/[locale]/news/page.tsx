import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getPosts, getCategories, pick } from '@/lib/queries';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuestionsBlock from '@/components/QuestionsBlock';
import NewsCard from '@/components/cards/NewsCard';
import CategoryFilter from '@/components/CategoryFilter';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.nav.news,
    description: dict.home.newsTitle,
    locale: params.locale,
    path: '/news',
  });
}

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { category?: string; q?: string };
}) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);
  const activeCat = searchParams.category;
  const q = searchParams.q?.trim() || undefined;

  const [posts, categories] = await Promise.all([
    getPosts({ locale, categorySlug: activeCat, search: q }),
    getCategories(),
  ]);

  const base = lp('/news');
  const withQ = (params: Record<string, string | undefined>) => {
    const sp = new URLSearchParams();
    if (params.category) sp.set('category', params.category);
    if (q) sp.set('q', q);
    const s = sp.toString();
    return s ? `${base}?${s}` : base;
  };

  const options = [
    { label: dict.common.all, href: withQ({}), active: !activeCat },
    ...categories.map((c) => ({
      label: pick(c, 'name', locale),
      href: withQ({ category: c.slug }),
      active: activeCat === c.slug,
    })),
  ];

  return (
    <>
      <Breadcrumbs locale={locale} homeLabel={dict.common.home} items={[{ label: dict.nav.news }]} />
      <section className="section">
        <div className="container">
          <header className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">{dict.brandShort}</p>
            <h1 className="text-4xl sm:text-5xl">{dict.nav.news}</h1>
          </header>

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <CategoryFilter options={options} />
            <form action={base} method="get" className="flex w-full max-w-xs gap-2">
              {activeCat && <input type="hidden" name="category" value={activeCat} />}
              <input
                type="search"
                name="q"
                defaultValue={q ?? ''}
                placeholder={dict.common.searchPlaceholder}
                className="w-full rounded-full border border-line px-4 py-2 text-sm outline-none focus:border-brand-400"
              />
              <button type="submit" className="btn-secondary px-4 py-2 text-xs">
                {dict.common.search}
              </button>
            </form>
          </div>

          {posts.length === 0 ? (
            <p className="py-12 text-center text-muted">{dict.common.nothingFound}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <NewsCard
                  key={p.id}
                  locale={locale}
                  href={lp(`/news/${p.slug}`)}
                  item={{
                    slug: p.slug,
                    title: p.title,
                    excerpt: p.excerpt,
                    coverImage: p.coverImage,
                    categoryName: p.category ? pick(p.category, 'name', locale) : null,
                    publishedAt: p.publishedAt,
                  }}
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
