import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PostEditor from '@/components/admin/PostEditor';

export const dynamic = 'force-dynamic';

export default async function NewPost() {
  const categories = await prisma.category.findMany({ orderBy: { nameRu: 'asc' } }).catch(() => []);
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/posts" className="text-sm text-muted hover:text-brand-600">← Назад</Link>
        <h1 className="mt-1 text-2xl font-semibold text-navy-700">Новый материал</h1>
      </div>
      <PostEditor categories={categories} />
    </div>
  );
}
