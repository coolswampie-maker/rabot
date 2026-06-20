import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}

type BuildMetaArgs = {
  title: string;
  description: string;
  locale: Locale;
  path: string; // path WITHOUT locale prefix, e.g. "/programs"
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
};

const SITE_NAME = 'RUDN Business School';

// Central metadata builder — gives every page unique title/description,
// canonical URL, hreflang alternates, Open Graph and Twitter cards.
export function buildMetadata({
  title,
  description,
  locale,
  path,
  image,
  type = 'website',
  noindex,
}: BuildMetaArgs): Metadata {
  const base = siteUrl();
  const cleanPath = path === '/' ? '' : path;
  const canonical = `${base}/${locale}${cleanPath}`;
  // When no explicit image is given, the file-convention opengraph-image route
  // (src/app/[locale]/opengraph-image.tsx) supplies a generated default.
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;

  return {
    title,
    description,
    metadataBase: new URL(base),
    alternates: {
      canonical,
      languages: {
        ru: `${base}/ru${cleanPath}`,
        en: `${base}/en${cleanPath}`,
        'x-default': `${base}/ru${cleanPath}`,
      },
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

// ---- JSON-LD helpers ------------------------------------------------------

export function organizationJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    alternateName: locale === 'ru' ? 'Школа бизнеса РУДН' : 'RUDN Business School',
    url: siteUrl(),
    logo: `${siteUrl()}/logo.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Miklukho-Maklaya St. 6',
      addressLocality: 'Moscow',
      addressCountry: 'RU',
    },
    sameAs: [] as string[],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function courseJsonLd(args: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: args.name,
    description: args.description,
    url: args.url,
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: siteUrl(),
    },
  };
}

export function articleJsonLd(args: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  isNews?: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': args.isNews ? 'NewsArticle' : 'Article',
    headline: args.headline,
    description: args.description,
    url: args.url,
    image: args.image ? [args.image] : undefined,
    datePublished: args.datePublished,
    dateModified: args.dateModified || args.datePublished,
    author: args.author ? { '@type': 'Person', name: args.author } : undefined,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${siteUrl()}/logo.svg` },
    },
  };
}

export function personJsonLd(args: { name: string; jobTitle: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: args.name,
    jobTitle: args.jobTitle,
    url: args.url,
    worksFor: { '@type': 'Organization', name: SITE_NAME },
  };
}
