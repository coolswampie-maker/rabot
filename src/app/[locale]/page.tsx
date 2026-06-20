import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import Hero from '@/components/Hero';
import { SectionHeading } from '@/components/Section';
import CTASection from '@/components/CTASection';
import FAQ from '@/components/FAQ';
import { advantages } from '@/content/home';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.home.heroTitle,
    description: dict.home.heroSubtitle,
    locale: params.locale,
    path: '/',
  });
}

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);
  const ru = locale === 'ru';

  // Real RUDN credibility numbers (trust strip — like Skolkovo/HBS).
  const stats: { value: string; label: string }[] = [
    { value: '162', label: ru ? 'страны в сообществе РУДН' : 'countries in the RUDN community' },
    { value: '85 000+', label: ru ? 'выпускников по всему миру' : 'alumni worldwide' },
    { value: ru ? '60+ лет' : '60+ years', label: ru ? 'университету РУДН' : 'of RUDN University' },
    { value: '170+', label: ru ? 'стран, где работают выпускники' : 'countries where alumni work' },
  ];

  // RUDN University recognitions (per the RUDN Global Expansion deck).
  const recognition: { title: string; note: string }[] = [
    { title: 'QS Stars', note: ru ? '«5 звёзд» — наивысшая оценка международного рейтинга' : '“5 stars” — the top rating in the international ranking' },
    { title: 'QS World University Rankings', note: ru ? '342 место в мировом рейтинге лучших университетов' : 'Ranked 342nd among the world’s best universities' },
    { title: 'UI GreenMetric', note: ru ? 'Самый «зелёный» университет России, 26 место в мире' : 'The “greenest” university in Russia, 26th worldwide' },
  ];

  // ИМЭБ / RUDN in numbers (per the RUDN Global Expansion deck).
  const imebNumbers: { value: string; label: string }[] = [
    { value: '15', label: ru ? 'программ высшего образования' : 'higher-education programmes' },
    { value: '7', label: ru ? 'программ бизнес-образования' : 'business-education programmes' },
    { value: '6', label: ru ? 'программ двойного диплома' : 'double-degree programmes' },
    { value: '1500', label: ru ? 'студентов ИМЭБ' : 'students at IWEB' },
    { value: '8', label: ru ? 'баз зарубежных стажировок' : 'foreign internship bases' },
    { value: '160+', label: ru ? 'стран, откуда выпускники РУДН' : 'countries RUDN alumni come from' },
  ];

  const pillars = [
    {
      title: dict.nav.programs,
      text: ru ? 'Классический MBA, акселерация и выход на новые рынки.' : 'Classic MBA, acceleration and entering new markets.',
      href: lp('/programs'),
      image: '/images/rudn/rudn-facade.png',
    },
    {
      title: dict.nav.accelerator,
      text: ru ? 'Master of Business Acceleration — рост и масштабирование.' : 'Master of Business Acceleration — grow and scale.',
      href: lp('/accelerator'),
      image: '/images/rudn/student-space.webp',
    },
    {
      title: dict.nav.research,
      text: ru ? 'ICEMR — исследования развивающихся рынков.' : 'ICEMR — emerging markets research.',
      href: lp('/research'),
      image: '/images/rudn/campus-sign.jpg',
    },
  ];

  return (
    <>
      <Hero
        kicker={dict.home.heroKicker}
        title={dict.home.heroTitle}
        subtitle={dict.home.heroSubtitle}
        primaryCta={{ label: dict.home.heroCtaPrimary, href: lp('/programs') }}
        secondaryCta={{ label: dict.home.heroCtaSecondary, href: lp('/contacts#apply') }}
        image="/images/rudn/hero-interior.jpg"
      />

      {/* Trust numbers */}
      <section className="border-b border-line bg-paper">
        <div className="container grid grid-cols-2 gap-y-6 py-7 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-extrabold text-brand-600 sm:text-[1.7rem]">{s.value}</div>
              <div className="mx-auto mt-1 max-w-[12rem] text-xs leading-snug text-muted sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recognition (real university rankings) */}
      <section className="section-tight">
        <div className="container">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {ru ? 'Признание' : 'Recognition'}
          </p>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {recognition.map((r) => (
              <div key={r.title} className="rounded-xl border border-line bg-white p-5 text-center shadow-card">
                <div className="font-bold text-navy-700">{r.title}</div>
                <div className="mt-1.5 text-sm leading-snug text-muted">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IWEB / RUDN in numbers */}
      <section className="section-tight bg-paper">
        <div className="container">
          <SectionHeading
            eyebrow={dict.brandShort}
            title={ru ? 'РУДН и ИМЭБ в цифрах' : 'RUDN and IWEB in numbers'}
            subtitle={ru ? 'Институт мировой экономики и бизнеса (ИМЭБ) Экономического факультета РУДН.' : 'The Institute of World Economy and Business (IWEB), Faculty of Economics, RUDN.'}
            align="center"
          />
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-y-8 text-center sm:grid-cols-3">
            {imebNumbers.map((n) => (
              <div key={n.label}>
                <div className="font-serif text-3xl text-brand-600 sm:text-4xl">{n.value}</div>
                <div className="mx-auto mt-1.5 max-w-[12rem] text-sm leading-snug text-muted">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gateway: three directions */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={dict.brandShort}
            title={ru ? 'С чего начать' : 'Where to start'}
            subtitle={ru ? 'Три направления школы бизнеса РУДН — выберите своё.' : 'Three directions of RUDN Business School — choose yours.'}
            align="center"
          />
          <div className="grid gap-7 md:grid-cols-3">
            {pillars.map((p) => (
              <Link key={p.href} href={p.href} className="card-media group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={p.image} alt="" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl font-bold text-navy-700 group-hover:text-brand-600">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.text}</p>
                  <span className="mt-4 text-sm font-semibold text-brand-600">{dict.common.learnMore} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Short value strip */}
      <section className="section-tight bg-paper">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-x-10 gap-y-10 sm:grid-cols-3">
            {advantages.slice(0, 3).map((a, i) => (
              <div key={i}>
                <div className="mb-3 text-2xl font-bold text-brand-500">0{i + 1}</div>
                <h3 className="text-lg font-bold text-navy-700">{a.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.text[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidy banner */}
      <section className="section-tight">
        <div className="container">
          <Link
            href={lp('/subsidy')}
            className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-navy-700 p-8 text-white sm:flex-row sm:items-center"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{ru ? 'Финансирование обучения' : 'Financing your studies'}</p>
              <p className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">
                {ru
                  ? 'Московские работодатели могут вернуть до 95% стоимости обучения сотрудников — включая программы MBA'
                  : 'Moscow employers can recover up to 95% of employee tuition — including MBA programmes'}
              </p>
              <p className="mt-2 text-sm text-white/75">
                {ru ? 'Субсидия из бюджета города Москвы — до 10 млн ₽ на компанию.' : 'A subsidy from the Moscow city budget — up to ₽10M per company.'}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-700">{dict.nav.subsidy} →</span>
          </Link>
        </div>
      </section>

      <FAQ locale={locale} dict={dict} />

      <CTASection
        title={dict.home.ctaTitle}
        text={dict.home.ctaText}
        cta={{ label: dict.nav.apply, href: lp('/contacts#apply') }}
      />
    </>
  );
}
