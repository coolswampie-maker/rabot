import Link from 'next/link';
import Image from 'next/image';

export type NewsCardData = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  categoryName?: string | null;
  publishedAt?: Date | string | null;
};

function formatDate(d: Date | string | null | undefined, locale: string): string {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Deterministic photo fallback when a post has no cover image.
// A set kept DISJOINT from the program-card photos and the real-RUDN
// hero/pillar photos, so no two tiles on a page ever show the same image.
const FALLBACKS = [
  '/images/speaker.jpg',
  '/images/accelerator.jpg',
  '/images/campus2.jpg',
  '/images/students.jpg',
  '/images/hero.jpg',
  '/images/h-libdark.jpg',
];
function fallbackFor(slug: string): string {
  let n = 0;
  for (const c of slug) n = (n + c.charCodeAt(0)) % FALLBACKS.length;
  return FALLBACKS[n];
}

export default function NewsCard({
  item,
  href,
  locale,
}: {
  item: NewsCardData;
  href: string;
  locale: string;
}) {
  return (
    <article className="card-hover group relative flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-50">
        <Image
          src={item.coverImage || fallbackFor(item.slug)}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-muted">
          {item.categoryName && <span className="chip">{item.categoryName}</span>}
          <time>{formatDate(item.publishedAt, locale)}</time>
        </div>
        <h3 className="text-lg leading-snug">
          <Link href={href} className="after:absolute after:inset-0 hover:text-brand-700">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{item.excerpt}</p>
      </div>
    </article>
  );
}
