import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { getFaculty, pick } from '@/lib/queries';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuestionsBlock from '@/components/QuestionsBlock';
import FacultyCard from '@/components/cards/FacultyCard';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.nav.faculty,
    description: dict.home.facultySubtitle,
    locale: params.locale,
    path: '/faculty',
  });
}

export default async function FacultyPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const people = await getFaculty();

  return (
    <>
      <Breadcrumbs locale={locale} homeLabel={dict.common.home} items={[{ label: dict.nav.faculty }]} />
      <section className="section">
        <div className="container">
          <header className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">{dict.brandShort}</p>
            <h1 className="text-4xl sm:text-5xl">{dict.home.facultyTitle}</h1>
            <p className="mt-4 text-lg text-muted">{dict.home.facultySubtitle}</p>
          </header>

          {people.length === 0 ? (
            <p className="text-muted">{dict.common.nothingFound}</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {people.map((f) => (
                <FacultyCard
                  key={f.id}
                  person={{ slug: f.slug, name: pick(f, 'name', locale), title: pick(f, 'title', locale), bio: pick(f, 'bio', locale), field: f.field, photo: f.photo }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <QuestionsBlock locale={locale} dict={dict} />
    </>
  );
}
