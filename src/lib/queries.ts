import 'server-only';
import { prisma } from './prisma';
import { toDbLocale, type Locale } from '@/i18n/config';

// Centralised, locale-aware read queries used by public pages.
// All wrapped so a missing/empty database degrades gracefully (returns []).

async function safe<T>(p: Promise<T>, fallback: T): Promise<T> {
  try {
    return await p;
  } catch (e) {
    console.error('[queries] db error:', (e as Error).message);
    return fallback;
  }
}

export function getPrograms(brand?: 'MBA' | 'ACCELERATOR' | 'ICEMR') {
  return safe(
    prisma.program.findMany({
      where: { published: true, ...(brand ? { brand } : {}) },
      orderBy: { order: 'asc' },
    }),
    [],
  );
}

export function getProgram(slug: string) {
  return safe(prisma.program.findFirst({ where: { slug, published: true } }), null);
}

export function getFaculty(brand?: 'MBA' | 'ACCELERATOR' | 'ICEMR', take?: number) {
  return safe(
    prisma.faculty.findMany({
      where: { published: true, ...(brand ? { brand } : {}) },
      orderBy: { order: 'asc' },
      take,
    }),
    [],
  );
}

export function getPartners() {
  return safe(
    prisma.partner.findMany({ where: { published: true }, orderBy: { order: 'asc' } }),
    [],
  );
}

export function getPosts(opts: {
  locale: Locale;
  take?: number;
  brand?: 'MBA' | 'ACCELERATOR' | 'ICEMR';
  categorySlug?: string;
  featured?: boolean;
  search?: string;
}) {
  const { locale, take, brand, categorySlug, featured, search } = opts;
  return safe(
    prisma.post.findMany({
      where: {
        status: 'PUBLISHED',
        locale: toDbLocale(locale),
        ...(brand ? { brand } : {}),
        ...(featured ? { featured: true } : {}),
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { excerpt: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: { category: true },
      orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
      take,
    }),
    [],
  );
}

export function getPost(slug: string) {
  return safe(
    prisma.post.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: { category: true, tags: true, author: true },
    }),
    null,
  );
}

export function getCategories() {
  return safe(prisma.category.findMany({ orderBy: { nameRu: 'asc' } }), []);
}

export function getPublications(opts?: {
  take?: number;
  year?: number;
  type?: string;
  field?: string;
}) {
  return safe(
    prisma.publication.findMany({
      where: {
        status: 'PUBLISHED',
        ...(opts?.year ? { year: opts.year } : {}),
        ...(opts?.type ? { type: opts.type as never } : {}),
        ...(opts?.field ? { field: opts.field } : {}),
      },
      orderBy: [{ featured: 'desc' }, { year: 'desc' }],
      take: opts?.take,
    }),
    [],
  );
}

export function getPublication(slug: string) {
  return safe(prisma.publication.findFirst({ where: { slug } }), null);
}

export function getLegalPage(slug: string) {
  return safe(prisma.legalPage.findUnique({ where: { slug } }), null);
}

// Localised field pickers for bilingual entity rows.
export function pick<T extends Record<string, unknown>>(
  row: T,
  base: string,
  locale: Locale,
): string {
  const key = `${base}${locale === 'ru' ? 'Ru' : 'En'}`;
  return (row[key] as string) ?? (row[`${base}Ru`] as string) ?? '';
}
