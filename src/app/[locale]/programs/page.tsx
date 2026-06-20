import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getPrograms, pick } from '@/lib/queries';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProgramCard from '@/components/cards/ProgramCard';
import CTASection from '@/components/CTASection';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.nav.programs,
    description: dict.home.programsSubtitle,
    locale: params.locale,
    path: '/programs',
  });
}

export default async function ProgramsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);
  const programs = await getPrograms();

  return (
    <>
      <Breadcrumbs locale={locale} homeLabel={dict.common.home} items={[{ label: dict.nav.programs }]} />
      <section className="section">
        <div className="container">
          <header className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">{dict.brandShort}</p>
            <h1 className="text-4xl sm:text-5xl">{dict.nav.programs}</h1>
            <p className="mt-3 text-lg text-muted">{dict.home.programsSubtitle}</p>
          </header>

          {programs.length === 0 ? (
            <p className="text-muted">{dict.common.nothingFound}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((p) => (
                <ProgramCard
                  key={p.id}
                  href={lp(`/programs/${p.slug}`)}
                  program={{
                    slug: p.slug,
                    title: pick(p, 'title', locale),
                    summary: pick(p, 'summary', locale),
                    duration: pick(p, 'duration', locale),
                    format: p.format,
                  }}
                  labels={{ duration: dict.common.duration, format: dict.common.format, more: dict.common.readMore }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title={dict.home.ctaTitle}
        text={dict.home.ctaText}
        cta={{ label: dict.nav.apply, href: lp('/contacts#apply') }}
      />
    </>
  );
}
