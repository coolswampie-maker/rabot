// Real alumni testimonials from mba.rudn.ru (graduate reviews published by the
// school). Used for social proof on the home page + Review structured data.
import type { Locale } from '@/i18n/config';

type Bi = Record<Locale, string>;

export type Testimonial = {
  name: Bi;
  role: Bi;
  year: number;
  quote: Bi;
};

export const testimonials: Testimonial[] = [
  {
    name: { ru: 'Антон Баланов', en: 'Anton Balanov' },
    role: {
      ru: 'Руководитель продукта «Госуслуги», Минцифры России',
      en: 'Product lead, Gosuslugi, Ministry of Digital Development of Russia',
    },
    year: 2022,
    quote: {
      ru: 'MBA — это трамплин, который позволил мне начать восхождение по карьерной лестнице.',
      en: 'The MBA was a springboard that launched my climb up the career ladder.',
    },
  },
  {
    name: { ru: 'Екатерина Малышева', en: 'Ekaterina Malysheva' },
    role: { ru: 'Руководитель направления, «РТ-Консалтинг»', en: 'Practice lead, RT-Consulting' },
    year: 2021,
    quote: {
      ru: 'После обучения кажется, что повышение — это лишь приятный бонус к полученным знаниям.',
      en: 'After the program, a promotion feels like just a pleasant bonus on top of the knowledge you gain.',
    },
  },
  {
    name: { ru: 'Дмитрий Рубанов', en: 'Dmitry Rubanov' },
    role: {
      ru: 'Директор департамента управления проектами, «РОТЕК Диджитал Солюшнс»',
      en: 'Director of project management, ROTEC Digital Solutions',
    },
    year: 2017,
    quote: {
      ru: 'MBA дал мне внутреннюю уверенность и умение отстаивать собственную точку зрения.',
      en: 'The MBA gave me inner confidence and the ability to stand my ground.',
    },
  },
  {
    name: { ru: 'Елена Авилова', en: 'Elena Avilova' },
    role: {
      ru: 'Заместитель директора департамента кадровой политики, РТРС',
      en: 'Deputy HR policy director, RTRS',
    },
    year: 2019,
    quote: {
      ru: 'Программа позволяет переосмыслить опыт и подталкивает к дальнейшему самостоятельному развитию.',
      en: 'The program makes you rethink your experience and pushes you toward continued self-development.',
    },
  },
  {
    name: { ru: 'Виталий Проничев', en: 'Vitaly Pronichev' },
    role: { ru: 'Руководитель региональных продаж, «КВС РУС»', en: 'Regional sales lead, KWS RUS' },
    year: 2022,
    quote: {
      ru: 'Благодаря программе я получил степень MBA в одном из престижнейших вузов страны.',
      en: 'Thanks to the program I earned an MBA from one of the country’s most prestigious universities.',
    },
  },
  {
    name: { ru: 'Виктор Пинчук', en: 'Viktor Pinchuk' },
    role: { ru: 'Первый заместитель генерального директора, «Mediascope»', en: 'First deputy CEO, Mediascope' },
    year: 1994,
    quote: {
      ru: 'Подготовка менеджмента по системе MBA дала мне все инструменты для решения управленческих задач.',
      en: 'MBA-style management training gave me all the tools I needed to solve management problems.',
    },
  },
];
