import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SectionHeading } from '@/components/Section';
import CTASection from '@/components/CTASection';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.nav.admission,
    description:
      params.locale === 'ru'
        ? 'Как поступить на программы MBA РУДН: документы, вступительные эссе и бланки для скачивания.'
        : 'How to apply to RUDN MBA programs: documents, entrance essays and downloadable forms.',
    locale: params.locale,
    path: '/admission',
  });
}

type Bi = { ru: string; en: string };

// Steps of the admission process.
const steps: { title: Bi; text: Bi }[] = [
  {
    title: { ru: 'Оставьте заявку', en: 'Submit an enquiry' },
    text: {
      ru: 'Свяжитесь с приёмной комиссией — мы расскажем о программах и формате и поможем с поступлением.',
      en: 'Contact the admissions team — we will tell you about the programs and format and guide you through admission.',
    },
  },
  {
    title: { ru: 'Подготовьте документы', en: 'Prepare your documents' },
    text: {
      ru: 'Соберите пакет документов (список ниже) и заполните заявление и согласие на обработку данных.',
      en: 'Gather the document package (see the list below) and fill in the application and the data-processing consent.',
    },
  },
  {
    title: { ru: 'Напишите эссе', en: 'Write the essay' },
    text: {
      ru: 'Подготовьте мотивационное эссе в составе пакета документов.',
      en: 'Prepare the motivation essay as part of your document package.',
    },
  },
  {
    title: { ru: 'Собеседование и зачисление', en: 'Interview and enrolment' },
    text: {
      ru: 'Пройдите собеседование с приёмной комиссией и заключите договор на обучение.',
      en: 'Have an interview with the admissions committee and sign the study agreement.',
    },
  },
];

// Documents required for admission (from the official RUDN checklist).
const docsRu: { ru: string[]; en: string[] } = {
  ru: [
    'Заявление абитуриента',
    'Диплом о высшем образовании с приложением',
    'Копия трудовой книжки / справка с места работы, подтверждающая стаж не менее 2 лет, заверенная отделом кадров',
    '2 фотографии 3×4 см (для электронной подачи — в электронном виде)',
    'Копия страниц паспорта (ФИО, номер паспорта и регистрация)',
    'Копия СНИЛС',
    'Мотивационное эссе',
    'Согласие на обработку персональных данных',
  ],
  en: [
    'Applicant’s application form',
    'Higher-education diploma with its supplement',
    'Copy of the work record book / certificate from the employer confirming at least 2 years of experience, certified by HR',
    '2 photographs 3×4 cm (electronic format for online submission)',
    'Copy of the passport pages (full name, passport number and registration)',
    'Copy of SNILS',
    'Motivation essay',
    'Consent to the processing of personal data',
  ],
};

const docsForeign: { ru: string[]; en: string[] } = {
  ru: [
    'Заявление абитуриента',
    'Диплом о высшем образовании с приложением',
    'Нотариально заверенные копии диплома и приложения на русском/английском языке',
    'Апостиль',
    'Копия трудовой книжки / справка с места работы, подтверждающая стаж не менее 2 лет, заверенная отделом кадров',
    '2 фотографии 3×4 см (для электронной подачи — в электронном виде)',
    'Копия страниц паспорта (ФИО, номер паспорта и регистрация)',
    'Виза',
    'Мотивационное эссе',
    'Заполненное согласие на обработку паспортных данных',
  ],
  en: [
    'Applicant’s application form',
    'Higher-education diploma with its supplement',
    'Notarised copies of the diploma and its supplement in Russian/English',
    'Apostille',
    'Copy of the work record book / certificate from the employer confirming at least 2 years of experience, certified by HR',
    '2 photographs 3×4 cm (electronic format for online submission)',
    'Copy of the passport pages (full name, passport number and registration)',
    'Visa',
    'Motivation essay',
    'Completed consent to the processing of passport data',
  ],
};

// Downloadable forms (files live in /public/docs).
const files: { href: string; name: Bi }[] = [
  { href: '/docs/mba-admission-documents.docx', name: { ru: 'Список документов для поступления', en: 'List of documents for admission' } },
  { href: '/docs/mba-application-form.docx', name: { ru: 'Заявление о поступлении (бланк)', en: 'Application form' } },
  { href: '/docs/mba-consent-personal-data.docx', name: { ru: 'Согласие на обработку персональных данных', en: 'Consent to personal-data processing' } },
];

export default async function AdmissionPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);
  const ru = locale === 'ru';

  return (
    <>
      <Breadcrumbs locale={locale} homeLabel={dict.common.home} items={[{ label: dict.nav.admission }]} />

      <section className="bg-white">
        <div className="container py-12 lg:py-16">
          <p className="eyebrow mb-3">{ru ? 'Абитуриентам' : 'For applicants'}</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-navy-700 sm:text-5xl">{dict.nav.admission}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {ru
              ? 'Всё, что нужно для поступления на программы MBA РУДН: порядок поступления, перечень документов, темы вступительных эссе и бланки для скачивания.'
              : 'Everything you need to apply to RUDN MBA programs: the admission steps, the document checklist, the entrance essay topics and downloadable forms.'}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="border-y border-line bg-paper">
        <div className="container py-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={i} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">{i + 1}</div>
                <h3 className="mt-4 font-semibold text-navy-700">{s.title[locale]}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={ru ? 'Что подготовить' : 'What to prepare'} title={ru ? 'Документы для поступления' : 'Documents for admission'} />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-bold text-navy-700">{ru ? 'Граждане РФ' : 'Russian citizens'}</h3>
              <ol className="space-y-3">
                {docsRu[locale].map((d, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-navy-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">{i + 1}</span>
                    {d}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-navy-700">{ru ? 'Иностранные граждане' : 'Foreign citizens'}</h3>
              <ol className="space-y-3">
                {docsForeign[locale].map((d, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-navy-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">{i + 1}</span>
                    {d}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable forms */}
      <section className="section bg-paper">
        <div className="container">
          <SectionHeading eyebrow={ru ? 'Скачать' : 'Download'} title={ru ? 'Бланки и документы' : 'Forms and documents'} />
          <div className="grid gap-4 sm:grid-cols-2">
            {files.map((f) => (
              <a
                key={f.href}
                href={f.href}
                download
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block font-medium text-navy-700 group-hover:text-brand-600">{f.name[locale]}</span>
                  <span className="mt-0.5 block text-xs uppercase tracking-wide text-muted">DOCX</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={ru ? 'Готовы поступать?' : 'Ready to apply?'}
        text={ru ? 'Оставьте заявку — приёмная комиссия свяжется с вами и поможет с поступлением.' : 'Leave a request — the admissions team will contact you and help you apply.'}
        cta={{ label: dict.nav.apply, href: lp('/contacts#apply') }}
      />
    </>
  );
}
