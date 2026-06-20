import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/ru';
import { localePath } from '@/lib/routing';

// "Остались вопросы?" — a soft contact prompt with phone + apply.
export default function QuestionsBlock({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="section-tight">
      <div className="container">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-line bg-paper p-8 text-center sm:flex-row sm:justify-between sm:text-left lg:p-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-navy-700 sm:text-3xl">{dict.questions.title}</h2>
            <p className="mt-2 text-muted">{dict.questions.text}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
            <a href="tel:+74957873803" className="btn-secondary">
              +7 (495) 787-38-03
            </a>
            <Link href={localePath(locale, '/contacts#apply')} className="btn-primary">
              {dict.nav.apply}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
