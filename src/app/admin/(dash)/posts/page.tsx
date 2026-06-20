import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deletePost, togglePublish } from './actions';

export const dynamic = 'force-dynamic';

async function getPosts() {
  try {
    return await prisma.post.findMany({
      include: { category: true },
      orderBy: { updatedAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export default async function AdminPosts() {
  const posts = await getPosts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy-700">Новости и статьи</h1>
        <Link href="/admin/posts/new" className="btn-primary text-xs">+ Новый материал</Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted">Пока нет материалов. Создайте первый.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-paper text-left text-xs uppercase text-muted">
              <tr>
                <th className="p-3">Заголовок</th>
                <th className="p-3">Тип</th>
                <th className="p-3">Язык</th>
                <th className="p-3">Статус</th>
                <th className="p-3 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-line/60">
                  <td className="p-3">
                    <Link href={`/admin/posts/${p.id}`} className="font-medium text-navy-700 hover:text-brand-600">
                      {p.title}
                    </Link>
                    {p.featured && <span className="ml-2 text-xs text-accent-600">★</span>}
                  </td>
                  <td className="p-3 text-muted">{p.type}</td>
                  <td className="p-3 text-muted">{p.locale}</td>
                  <td className="p-3">
                    <span className={p.status === 'PUBLISHED' ? 'text-green-700' : 'text-muted'}>
                      {p.status === 'PUBLISHED' ? 'Опубликовано' : 'Черновик'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-2">
                      <form action={togglePublish}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="text-xs font-medium text-brand-600 hover:underline">
                          {p.status === 'PUBLISHED' ? 'Снять' : 'Опубликовать'}
                        </button>
                      </form>
                      <Link href={`/admin/posts/${p.id}`} className="text-xs text-muted hover:text-brand-600">
                        Изменить
                      </Link>
                      <form action={deletePost}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="text-xs text-muted hover:text-red-600">Удалить</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
