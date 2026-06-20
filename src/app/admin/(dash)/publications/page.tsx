import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deletePublication } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminPublications() {
  const items = await prisma.publication.findMany({ orderBy: { year: 'desc' } }).catch(() => []);
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy-700">Публикации</h1>
        <Link href="/admin/publications/new" className="btn-primary text-xs">+ Новая публикация</Link>
      </div>
      {items.length === 0 ? (
        <p className="text-muted">Пока нет публикаций.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-line bg-paper text-left text-xs uppercase text-muted">
              <tr>
                <th className="p-3">Название</th>
                <th className="p-3">Год</th>
                <th className="p-3">Тип</th>
                <th className="p-3 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-line/60">
                  <td className="p-3">
                    <Link href={`/admin/publications/${p.id}`} className="font-medium text-navy-700 hover:text-brand-600">
                      {p.title}
                    </Link>
                  </td>
                  <td className="p-3 text-muted">{p.year}</td>
                  <td className="p-3 text-muted">{p.type}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/publications/${p.id}`} className="text-xs text-muted hover:text-brand-600">Изменить</Link>
                      <form action={deletePublication}>
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
