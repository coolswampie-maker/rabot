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
      period: { ru: 'Декабрь 2024 — май 2025', en: 'December 2024 — May 2025' },
      items: [
        { ru: 'Ключевые инструменты CEO', en: 'Core CEO tools' },
        { ru: 'Развитие управленческих компетенций', en: 'Building management competencies' },
        { ru: 'Лидерство и работа с сопротивлением', en: 'Leadership and handling resistance' },
        { ru: 'Эффективные управленческие решения', en: 'Effective management decisions' },
      ],
    },
    {
      title: { ru: 'Системный бизнес — управляемый рост', en: 'Systematic business — managed growth' },
      desc: { ru: 'Собрать стратегию роста и системные процессы.', en: 'Assemble a growth strategy and systematic processes.' },
      period: { ru: 'Сентябрь — декабрь 2025', en: 'September — December 2025' },
      items: [
        { ru: 'Стратегический и финансовый менеджмент', en: 'Strategic and financial management' },
        { ru: 'Организация бизнес-процессов', en: 'Designing business processes' },
        { ru: 'Анализ рынков и конкурентов', en: 'Market and competitor analysis' },
        { ru: 'Антикризисное управление', en: 'Crisis management' },
      ],
    },
    {
      title: { ru: 'Устойчивый рост — масштабирование', en: 'Sustainable growth — scaling up' },
      desc: { ru: 'Закрепить рост на данных, ИИ и эффективности.', en: 'Lock in growth with data, AI and efficiency.' },
      period: { ru: 'Январь — июнь 2026', en: 'January — June 2026' },
      items: [
        { ru: 'Операционный менеджмент', en: 'Operations management' },
        { ru: 'Решения на основе данных и ИИ', en: 'Data-driven thinking and AI' },
        { ru: 'Стратегический маркетинг', en: 'Strategic marketing' },
        { ru: 'Управление затратами и логистикой', en: 'Cost and logistics management' },
      ],
    },
    {
      title: { ru: 'Выход и развитие на новых рынках', en: 'Entering and growing in new markets' },
      desc: { ru: 'Подготовить и реализовать выход компании за рубеж.', en: 'Prepare and deliver your company’s move abroad.' },
      period: { ru: 'Сентябрь — декабрь 2026', en: 'September — December 2026' },
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
  'doing-business-in-russia': [
    {
      title: { ru: 'Особенности ведения бизнеса в России', en: 'Features of conducting business in Russia' },
      desc: { ru: 'Понять рынок, среду и деловую культуру России.', en: 'Understand the Russian market, environment and business culture.' },
      items: [
        { ru: 'Введение в российский рынок: особенности, вызовы и возможности', en: 'Introduction to the Russian market: features, challenges and opportunities' },
        { ru: 'Влияние политической и экономической системы на бизнес', en: 'Impact of the political and economic system on business' },
        { ru: 'Нормы и ценности культурных аспектов и деловая этика', en: 'Norms and values of cultural aspects and business ethics' },
      ],
    },
    {
      title: { ru: 'Право и регулирование бизнеса в России', en: 'Legal sphere and business regulation in Russia' },
      desc: { ru: 'Работать по правилам: регистрация, учёт, споры, таможня.', en: 'Operate by the rules: registration, accounting, disputes, customs.' },
      items: [
        { ru: 'Правовые и регуляторные рамки ведения бизнеса в России', en: 'The main legal and regulatory frameworks governing business activities in Russia' },
        { ru: 'Регистрация бизнеса, бухгалтерский учёт и аудит', en: 'Business registration, accounting and auditing services' },
        { ru: 'Правовая защита и разрешение споров', en: 'Legal protection and dispute resolution' },
        { ru: 'Таможенное регулирование', en: 'Customs regulations' },
      ],
    },
    {
      title: { ru: 'Go-to-market стратегия и управление брендом в России', en: 'Go-to-market strategy and brand management in Russia' },
      desc: { ru: 'Выйти на рынок и закрепить бренд в России.', en: 'Enter the market and establish your brand in Russia.' },
      items: [
        { ru: 'Анализ рынка и конкурентов', en: 'Market and competitive analysis' },
        { ru: 'Маркетинговые стратегии и инструменты привлечения и удержания клиентов на российском рынке', en: 'Marketing strategies and tools for attracting and retaining customers in the Russian market' },
        { ru: 'Управление брендом в России', en: 'Brand management in Russia' },
        { ru: 'Индивидуальная работа с ментором из фокусной страны', en: 'One-on-one work with a mentor from the focus country' },
      ],
    },
    {
      title: { ru: 'Инвестиции и финансовый менеджмент', en: 'Investments and financial management' },
      desc: { ru: 'Управлять финансами и инвестициями на рынке России.', en: 'Manage finance and investment in the Russian market.' },
      items: [
        { ru: 'Финансовое планирование и управление денежным потоком', en: 'Financial planning and cash-flow management' },
        { ru: 'Переговоры и финансовые операции в России', en: 'Negotiations and financial transactions in Russia' },
        { ru: 'Оценка рисков и выбор оптимальных инвестиционных возможностей в России', en: 'Risk assessment and selection of optimal investment opportunities in Russia' },
        { ru: 'Индивидуальная работа с международным экспертом для реализации стратегии', en: 'One-on-one work with an international expert to implement strategies' },
      ],
    },
  ],
  'mba-finance-director': [
    {
      title: { ru: 'Лидерство в бизнесе', en: 'Leadership in business' },
      desc: { ru: 'Развить управленческие и лидерские компетенции руководителя.', en: 'Develop the management and leadership competencies of a leader.' },
      items: [
        { ru: 'Развитие управленческих компетенций', en: 'Developing management competencies' },
        { ru: 'Управление человеческими ресурсами и их развитием в современной организации (HRM & HRD)', en: 'Human resource management and development in the modern organisation (HRM & HRD)' },
        { ru: 'Эффективные управленческие решения', en: 'Effective management decisions' },
      ],
    },
    {
      title: { ru: 'Современный менеджмент', en: 'Modern management' },
      desc: { ru: 'Управлять стратегией, коммуникациями и в кросс-культурной среде.', en: 'Manage strategy, communications and in a cross-cultural environment.' },
      items: [
        { ru: 'Стратегический менеджмент', en: 'Strategic management' },
        { ru: 'Коммуникационный менеджмент', en: 'Communications management' },
        { ru: 'Кросс-культурный менеджмент', en: 'Cross-cultural management' },
      ],
    },
    {
      title: { ru: 'Развитие бизнеса', en: 'Business development' },
      desc: { ru: 'Растить бизнес через маркетинг, репутацию и международную экспансию.', en: 'Grow the business through marketing, reputation and international expansion.' },
      items: [
        { ru: 'Стратегический маркетинг', en: 'Strategic marketing' },
        { ru: 'Репутационный менеджмент и медиа-коммуникации', en: 'Reputation management and media communications' },
        { ru: 'Управление международным бизнесом. Стратегии интернационализации компании', en: 'International business management. Company internationalisation strategies' },
      ],
    },
    {
      title: { ru: 'Аспекты ESG', en: 'ESG aspects' },
      desc: { ru: 'Встроить устойчивость, ответственность и этику в бизнес.', en: 'Embed sustainability, responsibility and ethics into the business.' },
      items: [
        { ru: 'Корпоративная социальная ответственность. Социальные инновации бизнеса', en: 'Corporate social responsibility. Social innovation in business' },
        { ru: 'Этика бизнеса', en: 'Business ethics' },
      ],
    },
    {
      title: { ru: 'Экономика и финансы', en: 'Economics and finance' },
      desc: { ru: 'Освоить экономику предприятия и финансовый менеджмент.', en: 'Master enterprise economics and financial management.' },
      items: [
        { ru: 'Экономика современного предприятия', en: 'Economics of the modern enterprise' },
        { ru: 'Финансовый менеджмент', en: 'Financial management' },
      ],
    },
    {
      title: { ru: 'Управление финансами', en: 'Financial management' },
      desc: { ru: 'Управлять стоимостью, активами, инвестициями и финансовыми рынками.', en: 'Manage value, assets, investment and financial markets.' },
      items: [
        { ru: 'Оценка бизнеса и управление его стоимостью', en: 'Business valuation and value management' },
        { ru: 'Управление активами и пассивами компании', en: 'Management of the company’s assets and liabilities' },
        { ru: 'Активность организации на финансовых рынках', en: 'The organisation’s activity on financial markets' },
        { ru: 'Инвестиционный анализ и проектное финансирование', en: 'Investment analysis and project finance' },
        { ru: 'Международный финансовый менеджмент', en: 'International financial management' },
      ],
    },
    {
      title: { ru: 'Практика и итоговый проект', en: 'Practice and capstone project' },
      desc: { ru: 'Закрепить знания на практике и защитить итоговую работу.', en: 'Consolidate knowledge in practice and defend the capstone project.' },
      items: [
        { ru: 'Мастер-классы', en: 'Masterclasses' },
        { ru: 'Деловая игра «Управление компанией»', en: 'The “Running the Company” business game' },
        { ru: 'Подготовка и защита итоговой аттестационной работы (проекта)', en: 'Preparation and defence of the capstone project' },
      ],
    },
  ],
};

export function getCurriculum(slug: string): CurriculumModule[] {
  return curriculum[slug] || [];
}
