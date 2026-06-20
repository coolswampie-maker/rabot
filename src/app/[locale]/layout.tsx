import { notFound } from 'next/navigation';
import { isLocale, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import JsonLd from '@/components/JsonLd';
import { organizationJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <JsonLd data={organizationJsonLd(locale)} />
      <Header locale={locale} dict={dict} />
      {/* extra bottom padding on mobile so the sticky action bar never covers content */}
      <main id="content" className="pb-20 md:pb-0">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
      <FloatingActions locale={locale} dict={dict} />
    </>
  );
}
