import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function counts() {
  try {
    const [posts, published, publications, submissions, newSubs] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: 'PUBLISHED' } }),
      prisma.publication.count(),
      prisma.submission.count(),
      prisma.submission.count({ where: { status: 'NEW' } }),
    ]);
    return { posts, published, publications, submissions, newSubs };
  } catch {
    return { posts: 0, published: 0, publications: 0, submissions: 0, newSubs: 0 };
  }
}

export default async function Dashboard() {
  const c = await counts();
  const cards = [
    { label: 'Материалы', value: c.posts, sub: `${c.published} опубликовано`, href: '/admin/posts' },
    { label: 'Публикации', value: c.publications, sub: 'в каталоге', href: '/admin/publications' },
    { label: 'Заявки', value: c.submissions, sub: `${c.newSubs} новых`, href: '/admin/submissions' },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy-700">Дашборд</h1>
        <Link href="/admin/posts/new" className="btn-primary text-xs">+ Новый материал</Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="card-hover p-6">
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-navy-700">{card.value}</p>
            <p className="mt-1 text-xs text-muted">{card.sub}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
