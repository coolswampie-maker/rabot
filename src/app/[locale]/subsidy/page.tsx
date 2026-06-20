import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SectionHeading } from '@/components/Section';
import CTASection from '@/components/CTASection';
import {
  subsidyIntro,
  subsidyHighlights,
  subsidyRecipients,
  subsidyCovers,
  subsidyPriorityActivities,
  subsidyRequirements,
  subsidyDocuments,
  subsidyResults,
  subsidyContacts,
} from '@/content/subsidy';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.nav.subsidy,
    description: subsidyIntro[params.locale].slice(0, 160),
    locale: params.locale,
    path: '/subsidy',
  });
}

export default async function SubsidyPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);
  const ru = locale === 'ru';

  return (
    <>
      <Breadcrumbs locale={locale} homeLabel={dict.common.home} items={[{ label: dict.nav.subsidy }]} />

      <section className="bg-white">
        <div className="container py-12 lg:py-16">
          <p className="eyebrow mb-3">{ru ? 'Финансирование обучения' : 'Financing your studies'}</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-navy-700 sm:text-5xl">{dict.nav.subsidy}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{subsidyIntro[locale]}</p>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-line bg-paper">
        <div className="container grid gap-y-8 py-10 text-center sm:grid-cols-3">
          {subsidyHighlights.map((h) => (
            <div key={h.value}>
              <div className="font-serif text-3xl text-brand-600 sm:text-4xl">{h.value}</div>
              <div className="mx-auto mt-2 max-w-[16rem] text-sm leading-snug text-muted">{h.label[locale]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recipients & what is covered */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-navy-700">{ru ? 'Кто может получить' : 'Who is eligible'}</h2>
            <ul className="mt-5 space-y-3">
              {subsidyRecipients.map((r, i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-sm text-navy-700">
                  <span className="mt-0.5 text-brand-500">✓</span>
                  {r[locale]}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-700">{ru ? 'Что субсидируется' : 'What is covered'}</h2>
            <ul className="mt-5 space-y-3">
              {subsidyCovers.map((c, i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-sm text-navy-700">
                  <span className="mt-0.5 text-brand-500">✓</span>
                  {c[locale]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Priority activities */}
      <section className="section bg-paper">
        <div className="container">
          <SectionHeading eyebrow={ru ? 'Кому доступно' : 'Priority areas'} title={ru ? 'Приоритетные виды деятельности' : 'Priority economic activities'} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subsidyPriorityActivities.map((a) => (
              <div key={a.name.ru} className="rounded-2xl border border-line bg-white p-5 shadow-card">
                <div className="font-semibold text-navy-700">{a.name[locale]}</div>
                {a.code && <div className="mt-1 text-xs uppercase tracking-wide text-muted">{a.code}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={ru ? 'Условия' : 'Conditions'} title={ru ? 'Требования к получателям' : 'Requirements for recipients'} />
          <ul className="grid gap-3 md:grid-cols-2">
            {subsidyRequirements.map((r, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-navy-700">
                <span className="mt-0.5 shrink-0 text-brand-500">{i + 1}.</span>
                {r[locale]}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Documents */}
      <section className="section bg-paper">
        <div className="container">
          <SectionHeading eyebrow={ru ? 'Подача' : 'Application' } title={ru ? 'Документы для подачи заявки' : 'Documents required to apply'} />
          <ol className="grid gap-3 md:grid-cols-2">
            {subsidyDocuments.map((d, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-navy-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">{i + 1}</span>
                {d[locale]}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Results */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={ru ? 'Результаты' : 'Results'} title={ru ? 'Мера поддержки в цифрах' : 'The support measure in numbers'} align="center" />
          <div className="grid gap-5 sm:grid-cols-3">
            {subsidyResults.map((r) => (
              <div key={r.value} className="rounded-2xl bg-navy-700 p-7 text-center text-white">
                <div className="font-serif text-3xl sm:text-4xl">{r.value}</div>
                <div className="mt-2 text-sm text-white/85">{r.label[locale]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts / source */}
      <section className="section-tight bg-paper">
        <div className="container">
          <div className="rounded-2xl border border-line bg-white p-7">
            <p className="text-sm leading-relaxed text-muted">{subsidyContacts.note[locale]}</p>
            <dl className="mt-6 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{ru ? 'Сайт' : 'Website'}</dt>
                <dd className="mt-1"><a href={subsidyContacts.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700">{subsidyContacts.urlLabel}</a></dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{dict.form.phone}</dt>
                <dd className="mt-1"><a href={`tel:${subsidyContacts.phone.replace(/[^+\d]/g, '')}`} className="text-brand-600 hover:text-brand-700">{subsidyContacts.phone}</a></dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Email</dt>
                <dd className="mt-1"><a href={`mailto:${subsidyContacts.email}`} className="text-brand-600 hover:text-brand-700">{subsidyContacts.email}</a></dd>
              </div>
            </dl>
            <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-muted">{subsidyContacts.legal[locale]}</p>
          </div>
        </div>
      </section>

      <CTASection
        title={ru ? 'Хотите учиться по программе РУДН?' : 'Want to study at RUDN?'}
        text={ru ? 'Расскажем о программах и поможем разобраться с оформлением субсидии.' : 'We will tell you about the programmes and help you navigate the subsidy.'}
        cta={{ label: dict.nav.apply, href: lp('/contacts#apply') }}
      />
    </>
  );
}
