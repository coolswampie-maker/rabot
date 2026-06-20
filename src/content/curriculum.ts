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
      title: { ru: 'Новый продукт на новом рынке', en: 'New product in a new market' },
      desc: { ru: 'Корпоративный трекинг: собрать стратегию нового продукта.', en: 'Corporate tracking: build the new-product strategy.' },
      items: [
        { ru: 'Анализ рынка и конкурентный анализ', en: 'Market and competitive analysis' },
        { ru: 'Ценностное предложение', en: 'Value proposition' },
        { ru: 'Соответствие продукта рынку', en: 'Product-market fit' },
        { ru: 'Юнит-экономика и ценовая стратегия', en: 'Unit economics and pricing strategy' },
      ],
    },
    {
      title: { ru: 'Бизнес как масштабируемая система', en: 'Business as a scalable system' },
      desc: { ru: 'Корпоративный трекинг: комплексная стратегия бизнеса.', en: 'Corporate tracking: a comprehensive business strategy.' },
      items: [
        { ru: 'Стратегический менеджмент', en: 'Strategic management' },
        { ru: 'Стратегический маркетинг', en: 'Strategic marketing' },
        { ru: 'Data-management', en: 'Data management' },
        { ru: 'Управление изменениями', en: 'Change management' },
      ],
    },
    {
      title: { ru: 'Управление международным развитием', en: 'Managing international development' },
      desc: { ru: 'Выездной модуль: модель выхода на новый рынок.', en: 'On-site module: the market-entry model.' },
      items: [
        { ru: 'Модели выхода на новые рынки', en: 'Market-entry models' },
        { ru: 'Управление ВЭД', en: 'Foreign-trade management' },
        { ru: 'Международные продажи', en: 'International sales' },
        { ru: 'Международные партнёрства', en: 'International partnerships' },
      ],
    },
    {
      title: { ru: 'Финансы и цепочки поставок международной компании', en: 'Finance and supply chains of an international company' },
      desc: { ru: 'Выездной модуль: упаковать продукт и подтвердить рынок.', en: 'On-site module: package the product and validate the market.' },
      items: [
        { ru: 'Международный финансовый менеджмент', en: 'International financial management' },
        { ru: 'Международная логистика и управление цепями поставок', en: 'International logistics and supply-chain management' },
        { ru: 'Оценка бизнеса и управление его стоимостью', en: 'Business valuation and value management' },
      ],
    },
  ],
  'mba-global-expansion': [
    {
      title: { ru: 'Стратегия и менеджмент', en: 'Strategy & management' },
      desc: { ru: 'Стратегическое управление в условиях глобализации.', en: 'Strategic management under globalisation.' },
      items: [
        { ru: 'Основы стратегического менеджмента', en: 'Foundations of strategic management' },
        { ru: 'Разработка стратегии выхода на международные рынки', en: 'Designing the market-entry strategy' },
        { ru: 'Управление в условиях глобализации', en: 'Management under globalisation' },
        { ru: 'Управление изменениями', en: 'Change management' },
      ],
    },
    {
      title: { ru: 'Рынки, продажи и маркетинг', en: 'Markets, sales & marketing' },
      desc: { ru: 'Исследовать рынки и строить продажи в разных странах.', en: 'Research markets and build sales across countries.' },
      items: [
        { ru: 'Исследование международных рынков', en: 'International market research' },
        { ru: 'Управление продажами в разных странах', en: 'Managing sales across countries' },
        { ru: 'Современный маркетинг', en: 'Modern marketing' },
        { ru: 'Маркетинг и деловая коммуникация', en: 'Marketing and business communication' },
      ],
    },
    {
      title: { ru: 'Финансы и инвестиции', en: 'Finance & investment' },
      desc: { ru: 'Управлять деньгами и рисками международного бизнеса.', en: 'Manage money and risk in international business.' },
      items: [
        { ru: 'Финансовое планирование для международного бизнеса', en: 'Financial planning for international business' },
        { ru: 'Оценка инвестиционных проектов', en: 'Investment project appraisal' },
        { ru: 'Управление валютными рисками', en: 'Currency risk management' },
      ],
    },
    {
      title: { ru: 'Лидерство и инновации', en: 'Leadership & innovation' },
      desc: { ru: 'Вести команды и масштабироваться через инновации.', en: 'Lead teams and scale through innovation.' },
      items: [
        { ru: 'Лидерство в условиях культурного разнообразия', en: 'Leadership in a culturally diverse environment' },
        { ru: 'Эффективная коммуникация в глобальной среде', en: 'Effective communication in a global environment' },
        { ru: 'Внедрение инноваций для масштабирования', en: 'Adopting innovation for scaling' },
      ],
    },
    {
      title: { ru: 'Право, ВЭД и логистика', en: 'Law, foreign trade & logistics' },
      desc: { ru: 'Экспорт по правилам: право, налоги, таможня, поставки.', en: 'Exporting by the rules: law, tax, customs, supply.' },
      items: [
        { ru: 'Международное торговое право', en: 'International trade law' },
        { ru: 'Основы регулирования экспортной деятельности в РФ', en: 'Fundamentals of export regulation in Russia' },
        { ru: 'Налоговое законодательство и бухучёт в сфере экспорта', en: 'Tax law and accounting in export' },
        { ru: 'Таможенное регулирование экспортных операций', en: 'Customs regulation of export operations' },
        { ru: 'Оптимизация цепочек поставок', en: 'Supply-chain optimisation' },
      ],
    },
    {
      title: { ru: 'Практика и итоговый проект', en: 'Practice & capstone project' },
      desc: { ru: 'Применить всё на дорожной карте своей компании.', en: 'Apply it all to your company roadmap.' },
      items: [
        { ru: 'Мастер-классы', en: 'Masterclasses' },
        { ru: 'Мастермайнд для предпринимателей «Управление компанией»', en: 'Entrepreneurs’ mastermind “Running the company”' },
        { ru: 'Подготовка и защита итогового проекта (дорожная карта развития компании)', en: 'Preparation and defence of the capstone project (company development roadmap)' },
      ],
    },
  ],
};

export function getCurriculum(slug: string): CurriculumModule[] {
  return curriculum[slug] || [];
}
