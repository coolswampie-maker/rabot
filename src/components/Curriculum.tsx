import type { Locale } from '@/i18n/config';
import type { CurriculumModule } from '@/content/curriculum';

// Visual curriculum: numbered module cards with a large watermark number,
// optional period chip and discipline list. Replaces a plain markdown list.
export default function Curriculum({
  locale,
  modules,
}: {
  locale: Locale;
  modules: CurriculumModule[];
}) {
  const ru = locale === 'ru';
  if (!modules.length) return null;

  const n = modules.length;
  const m10 = n % 10;
  const m100 = n % 100;
  const word = m10 === 1 && m100 !== 11 ? 'модуль' : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? 'модуля' : 'модулей';

  return (
    <section className="section bg-paper">
      <div className="container">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="eyebrow mb-3 flex items-center gap-2.5">
            <span className="h-px w-6 bg-brand-300" />
            {ru ? 'Учебный план' : 'Curriculum'}
            <span className="h-px w-6 bg-brand-300" />
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">{ru ? 'Программа обучения' : 'What you will study'}</h2>
          <p className="mt-3 max-w-xl text-muted">
            {ru
              ? `${n} ${word} — от стратегии и финансов до людей, операций и роста.`
              : `${n} modules — from strategy and finance to people, operations and growth.`}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {modules.map((m, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
            >
              {/* watermark number */}
              <span className="pointer-events-none absolute -right-3 -top-5 select-none text-[5.5rem] font-extrabold leading-none text-brand-50 transition group-hover:text-brand-100">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  {m.period && (
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
                      {m.period[locale]}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-bold text-navy-700">{m.title[locale]}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{m.desc[locale]}</p>
                <div className="my-4 h-px bg-line" />
                <ul className="space-y-2.5">
                  {m.items.map((it, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <svg width="16" height="16" viewBox="0 0 20 20" className="mt-0.5 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 10.5l3.5 3.5L15 6.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {it[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
