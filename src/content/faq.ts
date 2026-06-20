// Keyword-rich FAQ — answers buyer objections (conversion) and feeds FAQPage
// structured data (SEO rich results). Written in natural language.
import type { Locale } from '@/i18n/config';

type Bi = Record<Locale, string>;

export const faq: { q: Bi; a: Bi }[] = [
  {
    q: {
      ru: 'Сколько длится программа MBA в РУДН?',
      en: 'How long is the MBA program at RUDN?',
    },
    a: {
      ru: 'Классическая программа MBA рассчитана на 18 месяцев и более — занятия идут модулями. Акселерационная программа Master of Business Acceleration длится 18 месяцев: три дня в месяц очно и онлайн-трекинг между сессиями.',
      en: 'The Classic MBA runs from 18 months in a modular format. The Master of Business Acceleration program lasts 18 months: three days a month on campus plus online tracking between sessions.',
    },
  },
  {
    q: {
      ru: 'Можно ли учиться на MBA онлайн или дистанционно?',
      en: 'Can I study the MBA online or remotely?',
    },
    a: {
      ru: 'Да. Классический MBA можно проходить очно в московском кампусе РУДН или полностью онлайн — материалы и записи занятий доступны в любом формате.',
      en: 'Yes. The Classic MBA can be taken on campus in Moscow or fully online — materials and recordings are available either way.',
    },
  },
  {
    q: {
      ru: 'Чем MBA отличается от акселератора?',
      en: 'How is the MBA different from the accelerator?',
    },
    a: {
      ru: 'Классический MBA даёт системное управленческое образование. Master of Business Acceleration — это практическая программа для предпринимателей: вы работаете над ростом собственного бизнеса с личным трекером прямо во время обучения.',
      en: 'The Classic MBA gives a systematic management education. The Master of Business Acceleration is a hands-on program for entrepreneurs: you work on growing your own business with a personal tracker during the program.',
    },
  },
  {
    q: {
      ru: 'Кому подходит MBA РУДН?',
      en: 'Who is the RUDN MBA for?',
    },
    a: {
      ru: 'Руководителям и менеджерам, которым нужен системный взгляд на бизнес, предпринимателям, переходящим от ручного управления к процессам, и консультантам, которые хотят усилить экспертизу.',
      en: 'Executives and managers who want a systematic view of business, entrepreneurs moving from hands-on control to processes, and consultants who want to deepen their expertise.',
    },
  },
  {
    q: {
      ru: 'Какой документ выдают после окончания?',
      en: 'What qualification do I receive?',
    },
    a: {
      ru: 'По итогам обучения вы получаете диплом о профессиональной переподготовке с присвоением квалификации MBA от Российского университета дружбы народов.',
      en: 'On completion you receive a professional retraining diploma awarding the MBA qualification from RUDN University.',
    },
  },
  {
    q: {
      ru: 'Как поступить и узнать стоимость?',
      en: 'How do I apply and find out the cost?',
    },
    a: {
      ru: 'Оставьте заявку на сайте или позвоните в приёмную комиссию — мы расскажем об условиях, актуальной стоимости и подберём формат под вашу задачу. Количество мест в потоке ограничено.',
      en: 'Leave a request on the site or call the admissions office — we will explain the terms, the current cost and help choose the right format. Places in each cohort are limited.',
    },
  },
];
