import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { siteUrl } from '@/lib/seo';
import { prisma } from '@/lib/prisma';

const STATIC_PATHS = [
  '',
  '/programs',
  '/accelerator',
  '/research',
  '/news',
  '/publications',
  '/faculty',
  '/partners',
  '/contacts',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const entries: MetadataRoute.Sitemap = [];

  const addForAllLocales = (path: string, lastModified?: Date) => {
    for (const locale of locales) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: lastModified ?? new Date('2026-01-01'),
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
        },
      });
    }
  };

  STATIC_PATHS.forEach((p) => addForAllLocales(p));

  try {
    const [programs, posts, publications] = await Promise.all([
      prisma.program.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.post.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true, locale: true } }),
      prisma.publication.findMany({ where: { status: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }),
    ]);

    programs.forEach((p) => addForAllLocales(`/programs/${p.slug}`, p.updatedAt));
    publications.forEach((p) => addForAllLocales(`/publications/${p.slug}`, p.updatedAt));
    // Posts are locale-specific — only emit the matching locale URL.
    posts.forEach((p) => {
      const locale = p.locale === 'EN' ? 'en' : 'ru';
      entries.push({ url: `${base}/${locale}/news/${p.slug}`, lastModified: p.updatedAt });
    });
  } catch (e) {
    console.error('[sitemap] db error:', (e as Error).message);
  }

  return entries;
}
