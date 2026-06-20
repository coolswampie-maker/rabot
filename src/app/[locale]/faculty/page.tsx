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

  // Role groups are derived from the `order` ranges set in the seed:
  // 1–99 lecturers, 100–199 trackers, 200+ international experts.
  const groups: { title: string; people: typeof people }[] = [
    { title: dict.faculty.lecturers, people: people.filter((p) => p.order < 100) },
    { title: dict.faculty.trackers, people: people.filter((p) => p.order >= 100 && p.order < 200) },
    { title: dict.faculty.experts, people: people.filter((p) => p.order >= 200) },
  ].filter((g) => g.people.length > 0);

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
            <div className="space-y-12">
              {groups.map((g) => (
                <div key={g.title}>
                  <h2 className="mb-5 text-2xl font-bold text-navy-700">{g.title}</h2>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {g.people.map((f) => (
                      <FacultyCard
                        key={f.id}
                        person={{ slug: f.slug, name: pick(f, 'name', locale), title: pick(f, 'title', locale), bio: pick(f, 'bio', locale), field: f.field, photo: f.photo }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <QuestionsBlock locale={locale} dict={dict} />
    </>
  );
}
