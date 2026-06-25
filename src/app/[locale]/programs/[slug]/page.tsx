import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata, courseJsonLd, siteUrl } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import { getProgram, getFaculty, pick } from '@/lib/queries';
import Breadcrumbs from '@/components/Breadcrumbs';
import Prose from '@/components/Prose';
import Curriculum from '@/components/Curriculum';
import FacultyCard from '@/components/cards/FacultyCard';
import FormWithConsent from '@/components/FormWithConsent';
import JsonLd from '@/components/JsonLd';
import { getCurriculum } from '@/content/curriculum';
import { prisma } from '@/lib/prisma';

export async function generateStaticParams() {
  try {
    const programs = await prisma.program.findMany({ where: { published: true }, select: { slug: true } });
    return programs.flatMap((p) => [
      { locale: 'ru', slug: p.slug },
      { locale: 'en', slug: p.slug },
    ]);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const program = await getProgram(params.slug);
  const dict = await getDictionary(params.locale);
  if (!program) return buildMetadata({ title: dict.common.nothingFound, description: '', locale: params.locale, path: `/programs/${params.slug}`, noindex: true });
  return buildMetadata({
    title: program.seoTitle || pick(program, 'title', params.locale),
    description: program.seoDescription || pick(program, 'summary', params.locale),
    locale: params.locale,
    path: `/programs/${program.slug}`,
    type: 'article',
  });
}

export default async function ProgramDetail({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const locale = params.locale;
  const program = await getProgram(params.slug);
  if (!program) notFound();
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);
  const faculty = await getFaculty(program.brand, 4);

  const title = pick(program, 'title', locale);
  const headerImage =
    program.coverImage ||
    ({
      'mba-classic': '/images/lecture.jpg',
      'master-of-business-acceleration': '/images/team.jpg',
      'global-expansion': '/images/campus.jpg',
      'mba-global-expansion': '/images/library.jpg',
      'doing-business-in-russia': '/images/campus2.jpg',
      'mba-finance-director': '/images/h-glass.jpg',
    } as Record<string, string>)[program.slug] ||
    '/images/library.jpg';
  const meta = [
    { label: dict.common.duration, value: pick(program, 'duration', locale) },
    { label: dict.common.format, value: program.format },
    { label: dict.common.audience, value: pick(program, 'audience', locale) },
  ].filter((m) => m.value);
  const modules = getCurriculum(program.slug);

  return (
    <>
      <JsonLd
        data={courseJsonLd({
          name: title,
          description: pick(program, 'summary', locale),
          url: `${siteUrl()}${lp(`/programs/${program.slug}`)}`,
        })}
      />
      <Breadcrumbs
        locale={locale}
        homeLabel={dict.common.home}
        items={[{ label: dict.nav.programs, href: lp('/programs') }, { label: title }]}
      />

      <section className="bg-white">
        <div className="container grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
          <div>
            <p className="eyebrow mb-3">{dict.nav.programs}</p>
            <h1 className="text-4xl font-semibold leading-tight text-navy-700 sm:text-5xl">{title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{pick(program, 'summary', locale)}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 ring-line">
            <Image src={headerImage} alt="" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <Curriculum locale={locale} modules={modules} />

      <div className="container grid gap-12 py-16 lg:grid-cols-[1fr_360px]">
        <article>
          <Prose markdown={pick(program, 'body', locale)} />

          {faculty.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl">{dict.home.facultyTitle}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {faculty.map((f) => (
                  <FacultyCard
                    key={f.id}
                    person={{
                      slug: f.slug,
                      name: pick(f, 'name', locale),
                      title: pick(f, 'title', locale),
                      bio: pick(f, 'bio', locale),
                      field: f.field,
                      photo: f.photo,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {meta.length > 0 && (
            <div className="card mb-6 p-6">
              <dl className="space-y-4">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{m.label}</dt>
                    <dd className="mt-1 font-medium text-navy-700">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div id="apply" className="card p-6">
            <h2 className="text-lg">{dict.nav.apply}</h2>
            <p className="mb-4 mt-1 text-sm text-muted">{dict.home.ctaText}</p>
            <FormWithConsent
              locale={locale}
              dict={dict}
              kind={program.brand === 'ACCELERATOR' ? 'ACCELERATOR_APPLICATION' : 'PROGRAM_APPLICATION'}
              consentHref={lp('/legal/consent')}
              presetInterest={title}
              showMessage={false}
            />
          </div>
        </aside>
      </div>
    </>
  );
}
