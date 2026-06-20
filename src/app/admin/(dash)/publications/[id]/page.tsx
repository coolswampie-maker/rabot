import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import PublicationEditor from '@/components/admin/PublicationEditor';

export const dynamic = 'force-dynamic';

export default async function EditPublication({ params }: { params: { id: string } }) {
  const pub = await prisma.publication.findUnique({ where: { id: params.id } }).catch(() => null);
  if (!pub) notFound();
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/publications" className="text-sm text-muted hover:text-brand-600">← Назад</Link>
        <h1 className="mt-1 text-2xl font-semibold text-navy-700">Редактирование</h1>
      </div>
      <PublicationEditor
        data={{
          id: pub.id,
          title: pub.title,
          slug: pub.slug,
          locale: pub.locale,
          type: pub.type,
          status: pub.status,
          featured: pub.featured,
          abstract: pub.abstract,
          authorsText: pub.authorsText,
          year: pub.year,
          venue: pub.venue || undefined,
          field: pub.field || undefined,
          doi: pub.doi || undefined,
          fileUrl: pub.fileUrl || undefined,
          externalUrl: pub.externalUrl || undefined,
        }}
      />
    </div>
  );
}
