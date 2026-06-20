import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getPartners, pick } from '@/lib/queries';
import Breadcrumbs from '@/components/Breadcrumbs';
import PartnerLogoGrid from '@/components/PartnerLogoGrid';
import CTASection from '@/components/CTASection';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.nav.partners,
    description: params.locale === 'ru' ? 'Компании и организации, с которыми сотрудничает школа бизнеса РУДН.' : 'Companies and organizations RUDN Business School works with.',
    locale: params.locale,
    path: '/partners',
  });
}

export default async function PartnersPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);
  const partners = await getPartners();
  const described = partners.filter((p) => pick(p, 'desc', locale));

  return (
    <>
      <Breadcrumbs locale={locale} homeLabel={dict.common.home} items={[{ label: dict.nav.partners }]} />
      <section className="section">
        <div className="container">
          <header className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">{dict.brandShort}</p>
            <h1 className="text-4xl sm:text-5xl">{dict.home.partnersTitle}</h1>
            <p className="mt-4 text-lg text-muted">
              {locale === 'ru'
                ? 'Программы школы строятся вместе с компаниями, которые берут выпускников на работу, дают кейсы и приходят менторами.'
                : 'Our programs are built together with companies that hire our graduates, share cases and join as mentors.'}
            </p>
          </header>

          {partners.length === 0 ? (
            <p className="text-muted">{dict.common.nothingFound}</p>
          ) : (
            <PartnerLogoGrid partners={partners} />
          )}

          {described.length > 0 && (
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {described.map((p) => (
                <div key={p.id} className="card p-6">
                  <h2 className="text-lg text-navy-700">{p.name}</h2>
                  <p className="mt-2 text-sm text-muted">{pick(p, 'desc', locale)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title={locale === 'ru' ? 'Станьте партнёром' : 'Become a partner'}
        text={locale === 'ru' ? 'Совместные программы, стажировки и исследовательские проекты.' : 'Joint programs, internships and research projects.'}
        cta={{ label: dict.nav.contacts, href: lp('/contacts') }}
      />
    </>
  );
}
