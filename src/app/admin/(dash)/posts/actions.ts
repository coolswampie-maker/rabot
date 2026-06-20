'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth';
import { slugify } from '@/lib/slug';

type PostForm = {
  id?: string;
  title: string;
  slug?: string;
  locale: 'RU' | 'EN';
  type: 'NEWS' | 'ARTICLE' | 'EVENT' | 'EXPERT_COMMENT';
  brand: 'MBA' | 'ACCELERATOR' | 'ICEMR';
  status: 'DRAFT' | 'PUBLISHED';
  featured: boolean;
  excerpt: string;
  content: string;
  coverImage?: string;
  categoryId?: string;
  authorName?: string;
  seoTitle?: string;
  seoDescription?: string;
};

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = base || 'post';
  let i = 1;
  // Avoid Math.random — deterministic suffixes.
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    i += 1;
    slug = `${base}-${i}`;
  }
}

function parse(formData: FormData): PostForm {
  const get = (k: string) => (formData.get(k) ? String(formData.get(k)) : '');
  return {
    id: get('id') || undefined,
    title: get('title').trim(),
    slug: get('slug').trim() || undefined,
    locale: (get('locale') || 'RU') as PostForm['locale'],
    type: (get('type') || 'NEWS') as PostForm['type'],
    brand: (get('brand') || 'MBA') as PostForm['brand'],
    status: (get('status') || 'DRAFT') as PostForm['status'],
    featured: formData.get('featured') === 'on',
    excerpt: get('excerpt').trim(),
    content: get('content'),
    coverImage: get('coverImage') || undefined,
    categoryId: get('categoryId') || undefined,
    authorName: get('authorName') || undefined,
    seoTitle: get('seoTitle') || undefined,
    seoDescription: get('seoDescription') || undefined,
  };
}

export async function savePost(formData: FormData) {
  const session = await requireSession();
  const f = parse(formData);
  if (!f.title) throw new Error('Title is required');

  const baseSlug = slugify(f.slug || f.title);
  const slug = await uniqueSlug(baseSlug, f.id);

  const data = {
    title: f.title,
    slug,
    locale: f.locale,
    type: f.type,
    brand: f.brand,
    status: f.status,
    featured: f.featured,
    excerpt: f.excerpt,
    content: f.content,
    coverImage: f.coverImage || null,
    categoryId: f.categoryId || null,
    authorName: f.authorName || null,
    seoTitle: f.seoTitle || null,
    seoDescription: f.seoDescription || null,
    publishedAt:
      f.status === 'PUBLISHED' ? undefined : null, // set below for new publishes
  };

  let postId = f.id;
  if (f.id) {
    const before = await prisma.post.findUnique({ where: { id: f.id } });
    await prisma.post.update({
      where: { id: f.id },
      data: {
        ...data,
        // Stamp publishedAt the first time it becomes published.
        publishedAt:
          f.status === 'PUBLISHED'
            ? before?.publishedAt ?? new Date()
            : null,
      },
    });
  } else {
    const created = await prisma.post.create({
      data: {
        ...data,
        authorId: session.id,
        publishedAt: f.status === 'PUBLISHED' ? new Date() : null,
      },
    });
    postId = created.id;
  }

  await prisma.activityLog.create({
    data: {
      userId: session.id,
      action: f.id ? 'post.updated' : 'post.created',
      entity: 'Post',
      entityId: postId,
      meta: `${f.status} · ${slug}`,
    },
  });

  revalidatePath('/admin/posts');
  revalidatePath('/[locale]/news', 'page');
  redirect('/admin/posts');
}

export async function deletePost(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get('id'));
  await prisma.post.delete({ where: { id } });
  await prisma.activityLog.create({
    data: { userId: session.id, action: 'post.deleted', entity: 'Post', entityId: id },
  });
  revalidatePath('/admin/posts');
}

export async function togglePublish(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get('id'));
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return;
  const next = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
  await prisma.post.update({
    where: { id },
    data: {
      status: next,
      publishedAt: next === 'PUBLISHED' ? post.publishedAt ?? new Date() : post.publishedAt,
    },
  });
  await prisma.activityLog.create({
    data: { userId: session.id, action: `post.${next.toLowerCase()}`, entity: 'Post', entityId: id },
  });
  revalidatePath('/admin/posts');
}
