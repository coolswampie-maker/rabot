// Accelerator landing content (bilingual). Source: mba-accelerator.rudn.ru,
// rewritten in natural language.
import type { Locale } from '@/i18n/config';

type Bi = Record<Locale, string>;

export const acceleratorMeta = {
  startDate: { ru: 'Декабрь 2026', en: 'December 2026' } as Bi,
  duration: { ru: '18 месяцев', en: '18 months' } as Bi,
  format: { ru: '3 дня в месяц очно + онлайн-трекинг между блоками', en: '3 days a month on campus + online tracking between blocks' } as Bi,
  language: { ru: 'Русский', en: 'Russian' } as Bi,
};

export const acceleratorIntro: Bi = {
  ru: 'Master of Business Acceleration — это практический MBA с усиленной акселерационной частью. Вместо разбора чужих кейсов вы систематизируете собственный опыт и внедряете изменения в свой бизнес прямо во время обучения, опираясь на личного трекера и экспертов программы.',
  en: 'Master of Business Acceleration is a hands-on MBA with a strong acceleration component. Instead of studying someone else’s cases, you systematize your own experience and implement changes in your business during the program, supported by a personal tracker and the program’s experts.',
};

export const acceleratorAudience: Bi[] = [
  { ru: 'Развить стратегическое мышление и лидерские качества', en: 'Develop strategic thinking and leadership' },
  { ru: 'Решать конкретные управленческие задачи', en: 'Solve concrete management problems' },
  { ru: 'Найти новые точки роста для бизнеса', en: 'Find new levers for growth' },
  { ru: 'Систематизировать накопленный опыт', en: 'Systematize accumulated experience' },
  { ru: 'Масштабировать бизнес на новые рынки и страны', en: 'Scale into new markets and countries' },
  { ru: 'Собрать стратегию и реализовать дорожную карту', en: 'Assemble a strategy and deliver a roadmap' },
];

export const acceleratorBlocks: {
  period: Bi;
  title: Bi;
  modules: Bi[];
}[] = [
  {
    period: { ru: 'Декабрь 2026 — май 2027', en: 'December 2026 — May 2027' },
    title: { ru: 'Лидерство и управление изменениями', en: 'Leadership and change management' },
    modules: [
      { ru: 'Ключевые инструменты CEO', en: 'Core CEO tools' },
      { ru: 'Развитие управленческих компетенций', en: 'Building management competencies' },
      { ru: 'Лидерство и работа с сопротивлением', en: 'Leadership and handling resistance' },
      { ru: 'Эффективные управленческие решения', en: 'Effective management decisions' },
    ],
  },
  {
    period: { ru: 'Сентябрь — декабрь 2027', en: 'September — December 2027' },
    title: { ru: 'Масштабирование', en: 'Scaling up' },
    modules: [
      { ru: 'Стратегический и финансовый менеджмент', en: 'Strategic and financial management' },
      { ru: 'Организация бизнес-процессов', en: 'Designing business processes' },
      { ru: 'Анализ рынков и конкурентов', en: 'Market and competitor analysis' },
      { ru: 'Антикризисное управление', en: 'Crisis management' },
    ],
  },
  {
    period: { ru: 'Январь — июнь 2028', en: 'January — June 2028' },
    title: { ru: 'Устойчивый рост', en: 'Sustainable growth' },
    modules: [
      { ru: 'Операционный менеджмент', en: 'Operations management' },
      { ru: 'Решения на основе данных и ИИ в бизнесе', en: 'Data-driven thinking and AI in business' },
      { ru: 'Стратегический маркетинг', en: 'Strategic marketing' },
      { ru: 'Управление затратами и логистикой', en: 'Cost and logistics management' },
    ],
  },
  {
    period: { ru: 'Сентябрь — декабрь 2028', en: 'September — December 2028' },
    title: { ru: 'Выход на новые рынки', en: 'Entering new markets' },
    modules: [
      { ru: 'Управление международным бизнесом', en: 'International business management' },
      { ru: 'Кросс-культурный менеджмент', en: 'Cross-cultural management' },
      { ru: 'Внешнеэкономическая деятельность', en: 'Foreign trade operations' },
      { ru: 'Управление рисками на новых рынках', en: 'Risk management in new markets' },
    ],
  },
];

export const acceleratorOutcomes: Bi[] = [
  { ru: 'Собранная и внедрённая стратегия развития бизнеса', en: 'A strategy you have built and put into action' },
  { ru: 'Дорожная карта масштабирования и операционные улучшения', en: 'A scaling roadmap and operational improvements' },
  { ru: 'Сеть партнёров и клиентов на международных рынках', en: 'A network of partners and clients in international markets' },
  { ru: 'Статус Alumni и пожизненный доступ к базе знаний', en: 'Alumni status and lifelong access to the knowledge base' },
];
