import type { Metadata } from 'next';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getPartners, pick } from '@/lib/queries';
import Breadcrumbs from '@/components/Breadcrumbs';
import PartnerLogoGrid from '@/components/PartnerLogoGrid';
import CTASection from '@/components/CTASection';

type Bi = Record<Locale, string>;
const letters: { image: string; href: string; from: Bi; about: Bi }[] = [
  {
    image: '/images/letters/tatneft.jpg',
    href: '/images/letters/tatneft.jpg',
    from: { ru: 'ПАО «Татнефть» им. В.Д. Шашина', en: 'Tatneft (V.D. Shashin)' },
    about: {
      ru: 'Благодарность за экспертный семинар по анализу рынков Ближнего Востока и рекомендации по развитию бизнеса в регионе (2025).',
      en: 'Appreciation for an expert seminar on Middle East market analysis and recommendations for business development in the region (2025).',
    },
  },
  {
    image: '/images/letters/kazanforum-1.jpg',
    href: '/images/letters/kazanforum-1.jpg',
    from: { ru: 'Оргкомитет KazanForum · Правительство Республики Татарстан', en: 'KazanForum Organising Committee · Government of Tatarstan' },
    about: {
      ru: 'Благодарность ректору РУДН и команде за участие в XVII Международном экономическом форуме «Россия — Исламский мир: KazanForum» (2026).',
      en: 'Appreciation to the RUDN Rector and team for taking part in the XVII International Economic Forum “Russia — Islamic World: KazanForum” (2026).',
    },
  },
];

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

      {/* Letters of appreciation */}
      <section className="section bg-paper">
        <div className="container">
          <header className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">{locale === 'ru' ? 'Нам доверяют' : 'Trusted by'}</p>
            <h2 className="text-3xl sm:text-4xl">{locale === 'ru' ? 'Благодарственные письма' : 'Letters of appreciation'}</h2>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {letters.map((l) => (
              <div key={l.image} className="card flex flex-col p-5">
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-xl border border-line bg-white">
                  <Image
                    src={l.image}
                    alt={l.from[locale]}
                    width={1000}
                    height={1414}
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="h-auto w-full object-contain transition group-hover:opacity-90"
                  />
                </a>
                <h3 className="mt-4 text-base font-semibold text-navy-700">{l.from[locale]}</h3>
                <p className="mt-1.5 text-sm text-muted">{l.about[locale]}</p>
              </div>
            ))}
          </div>
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
