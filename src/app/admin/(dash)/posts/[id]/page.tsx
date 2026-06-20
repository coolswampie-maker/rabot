import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PostEditor from '@/components/admin/PostEditor';

export const dynamic = 'force-dynamic';

export default async function EditPost({ params }: { params: { id: string } }) {
  const [post, categories] = await Promise.all([
    prisma.post.findUnique({ where: { id: params.id } }).catch(() => null),
    prisma.category.findMany({ orderBy: { nameRu: 'asc' } }).catch(() => []),
  ]);
  if (!post) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/posts" className="text-sm text-muted hover:text-brand-600">← Назад</Link>
        <h1 className="mt-1 text-2xl font-semibold text-navy-700">Редактирование</h1>
      </div>
      <PostEditor
        categories={categories}
        data={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          locale: post.locale,
          type: post.type,
          brand: post.brand,
          status: post.status,
          featured: post.featured,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage || undefined,
          categoryId: post.categoryId || undefined,
          authorName: post.authorName || undefined,
          seoTitle: post.seoTitle || undefined,
          seoDescription: post.seoDescription || undefined,
        }}
      />
    </div>
  );
}
