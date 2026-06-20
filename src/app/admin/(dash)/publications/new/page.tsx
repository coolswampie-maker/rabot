import Link from 'next/link';
import PublicationEditor from '@/components/admin/PublicationEditor';

export const dynamic = 'force-dynamic';

export default function NewPublication() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/publications" className="text-sm text-muted hover:text-brand-600">← Назад</Link>
        <h1 className="mt-1 text-2xl font-semibold text-navy-700">Новая публикация</h1>
      </div>
      <PublicationEditor />
    </div>
  );
}
