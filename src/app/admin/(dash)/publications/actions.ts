'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth';
import { slugify } from '@/lib/slug';

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = base || 'publication';
  let i = 1;
  while (true) {
    const existing = await prisma.publication.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    i += 1;
    slug = `${base}-${i}`;
  }
}

export async function savePublication(formData: FormData) {
  const session = await requireSession();
  const get = (k: string) => (formData.get(k) ? String(formData.get(k)).trim() : '');
  const id = get('id') || undefined;
  const title = get('title');
  if (!title) throw new Error('Title required');

  const yearNum = parseInt(get('year'), 10);
  const data = {
    title,
    slug: await uniqueSlug(slugify(get('slug') || title), id),
    locale: (get('locale') || 'EN') as 'RU' | 'EN',
    type: (get('type') || 'JOURNAL_ARTICLE') as
      | 'WORKING_PAPER' | 'JOURNAL_ARTICLE' | 'BOOK' | 'REPORT' | 'CONFERENCE_PAPER',
    status: (get('status') || 'PUBLISHED') as 'DRAFT' | 'PUBLISHED',
    featured: formData.get('featured') === 'on',
    abstract: get('abstract'),
    authorsText: get('authorsText'),
    year: Number.isFinite(yearNum) ? yearNum : 2025,
    venue: get('venue') || null,
    field: get('field') || null,
    doi: get('doi') || null,
    fileUrl: get('fileUrl') || null,
    externalUrl: get('externalUrl') || null,
    seoTitle: get('seoTitle') || null,
    seoDescription: get('seoDescription') || null,
  };

  if (id) {
    await prisma.publication.update({ where: { id }, data });
  } else {
    await prisma.publication.create({ data: { ...data, addedById: session.id } });
  }

  await prisma.activityLog.create({
    data: {
      userId: session.id,
      action: id ? 'publication.updated' : 'publication.created',
      entity: 'Publication',
      entityId: id,
      meta: data.slug,
    },
  });

  revalidatePath('/admin/publications');
  revalidatePath('/[locale]/publications', 'page');
  redirect('/admin/publications');
}

export async function deletePublication(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get('id'));
  await prisma.publication.delete({ where: { id } });
  await prisma.activityLog.create({
    data: { userId: session.id, action: 'publication.deleted', entity: 'Publication', entityId: id },
  });
  revalidatePath('/admin/publications');
}
