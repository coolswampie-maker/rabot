// Structured curriculum per program — rendered as a visual module grid on the
// program page (instead of a plain markdown list). Bilingual.
import type { Locale } from '@/i18n/config';

type Bi = Record<Locale, string>;
export type CurriculumModule = { title: Bi; desc: Bi; period?: Bi; items: Bi[] };

const curriculum: Record<string, CurriculumModule[]> = {
  'mba-classic': [
    {
      title: { ru: 'Стратегия и общий менеджмент', en: 'Strategy & general management' },
      desc: { ru: 'Видеть бизнес целиком и принимать стратегические решения.', en: 'See the whole business and make strategic decisions.' },
      items: [
        { ru: 'Стратегический менеджмент и конкурентный анализ', en: 'Strategic management and competitive analysis' },
        { ru: 'Бизнес-модели и принятие управленческих решений', en: 'Business models and managerial decisions' },
        { ru: 'Корпоративное управление', en: 'Corporate governance' },
      ],
    },
    {
      title: { ru: 'Финансы', en: 'Finance' },
      desc: { ru: 'Управлять деньгами, стоимостью компании и рисками.', en: 'Manage money, company value and risk.' },
      items: [
        { ru: 'Финансовый менеджмент и управленческий учёт', en: 'Financial management and accounting' },
        { ru: 'Оценка и управление стоимостью компании', en: 'Company valuation and value management' },
        { ru: 'Инвестиции и управление рисками', en: 'Investment and risk management' },
      ],
    },
    {
      title: { ru: 'Маркетинг и продажи', en: 'Marketing & sales' },
      desc: { ru: 'Находить клиентов и строить системные продажи.', en: 'Find customers and build systematic sales.' },
      items: [
        { ru: 'Стратегический и цифровой маркетинг', en: 'Strategic and digital marketing' },
        { ru: 'Управление продуктом и клиентским опытом', en: 'Product and customer-experience management' },
        { ru: 'Построение системных продаж', en: 'Building systematic sales' },
      ],
    },
    {
      title: { ru: 'Люди и лидерство', en: 'People & leadership' },
      desc: { ru: 'Вести за собой команды и развивать людей.', en: 'Lead teams and develop people.' },
      items: [
        { ru: 'Лидерство и личная эффективность', en: 'Leadership and personal effectiveness' },
        { ru: 'Управление командами и оргповедение', en: 'Team management and organisational behaviour' },
        { ru: 'Управление человеческими ресурсами', en: 'Human resource management' },
      ],
    },
    {
      title: { ru: 'Операции и развитие', en: 'Operations & development' },
      desc: { ru: 'Налаживать процессы и внедрять цифру и данные.', en: 'Streamline processes and bring in data and digital.' },
      items: [
        { ru: 'Операционный менеджмент и бизнес-процессы', en: 'Operations management and processes' },
        { ru: 'Управление проектами', en: 'Project management' },
        { ru: 'Цифровая трансформация и данные', en: 'Digital transformation and data' },
        { ru: 'Правовые аспекты бизнеса', en: 'Legal aspects of business' },
      ],
    },
  ],
  'master-of-business-acceleration': [
    {
      title: { ru: 'Лидерство и управление изменениями', en: 'Leadership and change management' },
      desc: { ru: 'Перестроить себя как руководителя растущей компании.', en: 'Reshape yourself as the leader of a growing company.' },
      period: { ru: 'Декабрь 2026 — май 2027', en: 'December 2026 — May 2027' },
      items: [
        { ru: 'Ключевые инструменты CEO', en: 'Core CEO tools' },
        { ru: 'Развитие управленческих компетенций', en: 'Building management competencies' },
        { ru: 'Лидерство и работа с сопротивлением', en: 'Leadership and handling resistance' },
        { ru: 'Эффективные управленческие решения', en: 'Effective management decisions' },
      ],
    },
    {
      title: { ru: 'Масштабирование', en: 'Scaling up' },
      desc: { ru: 'Собрать стратегию роста и системные процессы.', en: 'Assemble a growth strategy and systematic processes.' },
      period: { ru: 'Сентябрь — декабрь 2027', en: 'September — December 2027' },
      items: [
        { ru: 'Стратегический и финансовый менеджмент', en: 'Strategic and financial management' },
        { ru: 'Организация бизнес-процессов', en: 'Designing business processes' },
        { ru: 'Анализ рынков и конкурентов', en: 'Market and competitor analysis' },
        { ru: 'Антикризисное управление', en: 'Crisis management' },
      ],
    },
    {
      title: { ru: 'Устойчивый рост', en: 'Sustainable growth' },
      desc: { ru: 'Закрепить рост на данных, ИИ и эффективности.', en: 'Lock in growth with data, AI and efficiency.' },
      period: { ru: 'Январь — июнь 2028', en: 'January — June 2028' },
      items: [
        { ru: 'Операционный менеджмент', en: 'Operations management' },
        { ru: 'Решения на основе данных и ИИ', en: 'Data-driven thinking and AI' },
        { ru: 'Стратегический маркетинг', en: 'Strategic marketing' },
        { ru: 'Управление затратами и логистикой', en: 'Cost and logistics management' },
      ],
    },
    {
      title: { ru: 'Выход на новые рынки', en: 'Entering new markets' },
      desc: { ru: 'Подготовить и реализовать выход компании за рубеж.', en: 'Prepare and deliver your company’s move abroad.' },
      period: { ru: 'Сентябрь — декабрь 2028', en: 'September — December 2028' },
      items: [
        { ru: 'Управление международным бизнесом', en: 'International business management' },
        { ru: 'Кросс-культурный менеджмент', en: 'Cross-cultural management' },
        { ru: 'Внешнеэкономическая деятельность', en: 'Foreign trade operations' },
        { ru: 'Управление рисками на новых рынках', en: 'Risk management in new markets' },
      ],
    },
  ],
  'global-expansion': [
    {
      title: { ru: 'Подготовка к выходу', en: 'Preparing for entry' },
      desc: { ru: 'Понять, какие рынки подходят и с чего начинать.', en: 'Work out which markets fit and where to start.' },
      items: [
        { ru: 'Анализ целевых рынков и приоритизация', en: 'Target market analysis and prioritisation' },
        { ru: 'Юридические и налоговые аспекты выхода', en: 'Legal and tax aspects of entry' },
      ],
    },
    {
      title: { ru: 'Локализация и каналы', en: 'Localisation & channels' },
      desc: { ru: 'Адаптировать продукт и найти партнёров на рынке.', en: 'Adapt the product and find partners in the market.' },
      items: [
        { ru: 'Локализация продукта и маркетинга', en: 'Product and marketing localisation' },
        { ru: 'Поиск партнёров и построение каналов', en: 'Finding partners and building channels' },
      ],
    },
  ],
};

export function getCurriculum(slug: string): CurriculumModule[] {
  return curriculum[slug] || [];
}
