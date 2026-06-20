import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { getLegalPage, pick } from '@/lib/queries';
import Breadcrumbs from '@/components/Breadcrumbs';
import Prose from '@/components/Prose';

const KNOWN = ['privacy', 'consent', 'cookie', 'terms'];

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const page = await getLegalPage(params.slug);
  const title = page ? pick(page, 'title', params.locale) : 'Legal';
  return buildMetadata({
    title,
    description: title,
    locale: params.locale,
    path: `/legal/${params.slug}`,
    noindex: true, // legal templates should not compete in search
  });
}

export default async function LegalPageView({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const locale = params.locale;
  if (!KNOWN.includes(params.slug)) notFound();
  const page = await getLegalPage(params.slug);
  const dict = await getDictionary(locale);

  const title = page ? pick(page, 'title', locale) : params.slug;
  const body = page ? pick(page, 'body', locale) : '';

  return (
    <>
      <Breadcrumbs locale={locale} homeLabel={dict.common.home} items={[{ label: dict.footer.legal, href: undefined }, { label: title }]} />
      <article className="container max-w-3xl py-12">
        <h1 className="text-3xl sm:text-4xl">{title}</h1>
        {page ? (
          <div className="mt-6">
            <Prose markdown={body} />
            <p className="mt-10 text-xs text-muted">
              {locale === 'ru'
                ? 'Обновлено: ' + new Date(page.updatedAt).toLocaleDateString('ru-RU')
                : 'Updated: ' + new Date(page.updatedAt).toLocaleDateString('en-US')}
            </p>
          </div>
        ) : (
          <p className="mt-6 text-muted">
            {locale === 'ru'
              ? 'Текст этого документа ещё не заполнен. Добавьте его в админ-панели.'
              : 'This document has not been filled in yet. Add it in the admin panel.'}
          </p>
        )}
      </article>
    </>
  );
}
