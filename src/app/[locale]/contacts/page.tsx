import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { localePath } from '@/lib/routing';
import Breadcrumbs from '@/components/Breadcrumbs';
import FormWithConsent from '@/components/FormWithConsent';

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  return buildMetadata({
    title: dict.nav.contacts,
    description: dict.home.ctaText,
    locale: params.locale,
    path: '/contacts',
  });
}

export default async function ContactsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = await getDictionary(locale);
  const lp = (p: string) => localePath(locale, p);
  const ru = locale === 'ru';

  // Programme leadership (from the official RUDN program decks).
  const team: { name: string; role: string; email: string; extra?: string }[] = [
    {
      name: ru ? 'Андронова Инна Витальевна' : 'Inna Andronova',
      role: ru
        ? 'д.э.н., профессор, декан Экономического факультета РУДН, заведующая кафедрой международных экономических отношений'
        : 'Doctor of Economics, Professor, Dean of the Faculty of Economics at RUDN University, Head of the Department of International Economic Relations',
      email: 'andronova-iv@rudn.ru',
    },
    {
      name: ru ? 'Пинчук Виктор Николаевич' : 'Viktor Pinchuk',
      role: ru
        ? 'д.э.н., директор Института мировой экономики и бизнеса (ИМЭБ), заместитель генерального директора Mediascope'
        : 'Doctor of Economics, Director of the Institute of World Economy and Business (IMEB) at RUDN University, Deputy CEO of Mediascope',
      email: 'pinchuk-vn@rudn.ru',
    },
    {
      name: ru ? 'Оганесян Ани Ашотовна' : 'Ani Oganesyan',
      role: ru
        ? 'к.э.н., Ph.D., доцент, руководитель программ MBA'
        : 'Ph.D., Associate Professor, Head of MBA Programs at RUDN University',
      email: 'oganesyan-aa@rudn.ru',
      extra: '+7 (925) 881-25-94 · Telegram @anihov',
    },
  ];

  return (
    <>
      <Breadcrumbs locale={locale} homeLabel={dict.common.home} items={[{ label: dict.nav.contacts }]} />
      <section className="section">
        <div className="container">
          <header className="mb-8 max-w-2xl">
            <p className="eyebrow mb-2">{dict.brandShort}</p>
            <h1 className="text-4xl sm:text-5xl">{dict.nav.contacts}</h1>
            <p className="mt-3 text-lg text-muted">
              {locale === 'ru'
                ? 'Расскажем о программах, форматах и поступлении. Ответим на письмо или перезвоним.'
                : 'We will tell you about programs, formats and admission. We reply by email or call you back.'}
            </p>
          </header>

          <div className="grid items-start gap-10 lg:grid-cols-2">
            {/* Application form */}
            <div id="apply" className="card p-7">
              <h2 className="text-2xl">{dict.nav.apply}</h2>
              <p className="mb-6 mt-1 text-sm text-muted">{dict.home.ctaText}</p>
              <FormWithConsent locale={locale} dict={dict} kind="CONTACT" consentHref={lp('/legal/consent')} />
            </div>

            {/* Contact details + map */}
            <div>
              <dl className="grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{dict.footer.address}</dt>
                  <dd className="mt-1 text-navy-700">{locale === 'ru' ? 'Москва, ул. Миклухо-Маклая, 6, каб. 11' : 'Moscow, Miklukho-Maklaya St. 6, room 11'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Email</dt>
                  <dd className="mt-1">
                    <a href="mailto:iweb.mba@pfur.ru" className="text-brand-600 hover:text-brand-700">iweb.mba@pfur.ru</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{dict.form.phone}</dt>
                  <dd className="mt-1">
                    <a href="tel:+74957873803" className="text-brand-600 hover:text-brand-700">+7 (495) 787-38-03</a>
                    <span className="text-muted"> · доб. 2466</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Telegram</dt>
                  <dd className="mt-1">
                    <a href="https://t.me/MBAaccelerator" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700">@MBAaccelerator</a>
                  </dd>
                </div>
              </dl>

              <div className="mt-8 overflow-hidden rounded-2xl border border-line">
                <iframe
                  title="RUDN map"
                  src="https://yandex.ru/map-widget/v1/?ll=37.504%2C55.652&z=15&pt=37.504,55.652"
                  className="h-[420px] w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Programme leadership */}
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-navy-700">{ru ? 'Руководство программ' : 'Programme leadership'}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {team.map((m) => (
                <div key={m.email} className="card p-6">
                  <h3 className="text-base leading-tight text-navy-700">{m.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{m.role}</p>
                  <p className="mt-3 text-sm">
                    <a href={`mailto:${m.email}`} className="text-brand-600 hover:text-brand-700">{m.email}</a>
                  </p>
                  {m.extra && <p className="mt-1 text-sm text-muted">{m.extra}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
