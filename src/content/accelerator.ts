// Accelerator landing content (bilingual). Source: the official
// "MBA Acceleration" / "Master of Business Acceleration" programme deck,
// rewritten in natural language.
import type { Locale } from '@/i18n/config';

type Bi = Record<Locale, string>;

export const acceleratorMeta = {
  startDate: { ru: 'Декабрь 2026', en: 'December 2026' } as Bi,
  duration: { ru: '18 месяцев', en: '18 months' } as Bi,
  format: { ru: '3 дня в месяц очно + онлайн-трекинг между блоками', en: '3 days a month on campus + online tracking between blocks' } as Bi,
  language: { ru: 'Русский', en: 'Russian' } as Bi,
  price: { ru: '1 500 000 ₽', en: '₽1,500,000' } as Bi,
  priceNote: { ru: 'Оплатить можно сразу или частями', en: 'Pay in full or in instalments' } as Bi,
};

export const acceleratorIntro: Bi = {
  ru: 'Master of Business Acceleration — первая программа MBA для ускорения роста бизнеса для предпринимателей, масштабирующих свой бизнес в России и за рубежом. Вместо разбора чужих кейсов вы систематизируете собственный опыт и внедряете изменения в свой бизнес прямо во время обучения, опираясь на личного трекера и экспертов программы.',
  en: 'Master of Business Acceleration is the first MBA built to accelerate business growth for entrepreneurs scaling their business in Russia and abroad. Instead of studying someone else’s cases, you systematize your own experience and implement changes in your business during the program, supported by a personal tracker and the program’s experts.',
};

// Two participant profiles from the deck (entrepreneur / C-level).
export const acceleratorProfiles: { title: Bi; points: Bi[]; goal: Bi }[] = [
  {
    title: { ru: 'Предпринимателю', en: 'For the entrepreneur' },
    points: [
      { ru: 'Сам построил бизнес и наладил продажи на локальном рынке', en: 'Built the business and set up sales in the local market' },
      { ru: 'Испытывает трудности с наймом, делегированием и организацией бизнес-процессов', en: 'Struggles with hiring, delegation and organising business processes' },
      { ru: 'Планирует выходить на международный рынок или уже сделал первые шаги', en: 'Plans to enter international markets or has already taken the first steps' },
    ],
    goal: { ru: 'Цель: последовательная экспансия на новые территории', en: 'Goal: a step-by-step expansion into new territories' },
  },
  {
    title: { ru: 'C-Level', en: 'For C-level executives' },
    points: [
      { ru: 'Управляет бизнесом, который растёт быстро, но хаотично — процессы не оцифрованы', en: 'Runs a business that grows fast but chaotically — processes are not digitised' },
      { ru: 'Ищет внешнюю экспертизу, чтобы сделать управление и рост прозрачными', en: 'Looks for outside expertise to make management and growth transparent' },
      { ru: 'Испытывает давление собственников и акционеров', en: 'Is under pressure from owners and shareholders' },
    ],
    goal: { ru: 'Цель: вывести успешный локальный продукт на новые рынки', en: 'Goal: take a successful local product into new markets' },
  },
];

export const acceleratorAudience: Bi[] = [
  { ru: 'Развить стратегическое мышление и лидерские качества', en: 'Develop strategic thinking and leadership' },
  { ru: 'Решать конкретные управленческие задачи', en: 'Solve concrete management problems' },
  { ru: 'Найти новые точки роста для бизнеса', en: 'Find new levers for growth' },
  { ru: 'Систематизировать накопленный опыт', en: 'Systematize accumulated experience' },
  { ru: 'Масштабировать бизнес на новые рынки и страны', en: 'Scale into new markets and countries' },
  { ru: 'Собрать стратегию и реализовать дорожную карту', en: 'Assemble a strategy and deliver a roadmap' },
];

// "Наши рабочие инструменты"
export const acceleratorTools: Bi[] = [
  { ru: 'Образовательные интенсивы', en: 'Educational intensives' },
  { ru: 'Трекинг бизнеса', en: 'Business tracking' },
  { ru: 'Разбор кейсов вашей компании', en: 'Working through your company’s cases' },
  { ru: 'Релевантная экспертиза', en: 'Relevant expertise' },
  { ru: 'Ресурсы для предпринимателей', en: 'Resources for entrepreneurs' },
  { ru: 'Глобальное сообщество предпринимателей', en: 'A global community of entrepreneurs' },
  { ru: 'Международные партнёры', en: 'International partners' },
];

// "Как выстроена программа в модуле"
export const acceleratorModuleFormat: { title: Bi; desc: Bi }[] = [
  {
    title: { ru: 'Глубокая диагностика и дорожная карта', en: 'Deep diagnostics and roadmap' },
    desc: { ru: 'Диагностика текущего состояния бизнеса, целеполагание и разработка дорожной карты развития и карты навыков.', en: 'Diagnose the current state of the business, set goals and build a development roadmap and a skills map.' },
  },
  {
    title: { ru: 'Учебный модуль', en: 'Learning module' },
    desc: { ru: 'Трёхдневный групповой очный интенсив раз в месяц в Москве: теория, обзор инструментов, разбор кейсов и мастермайнд.', en: 'A three-day on-campus group intensive once a month in Moscow: theory, tools, case studies and a mastermind.' },
  },
  {
    title: { ru: 'Трекинг-встреча', en: 'Tracking session' },
    desc: { ru: 'Индивидуальная онлайн-встреча с трекером раз в 2 недели: синхронизация с целями, выявление ограничения и гипотезы по его преодолению.', en: 'A one-on-one online meeting with a tracker every two weeks: align with goals, find the constraint and form hypotheses to overcome it.' },
  },
  {
    title: { ru: 'Борд-митинг', en: 'Board meeting' },
    desc: { ru: 'Очный групповой разбор прогресса по итогам блоков: презентация результатов, ответы приглашённых экспертов, подтверждение или корректировка дорожной карты.', en: 'An on-campus group review of progress after each block: present results, get answers from invited experts, confirm or adjust the roadmap.' },
  },
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
    title: { ru: 'Системный бизнес — управляемый рост', en: 'Systematic business — managed growth' },
    modules: [
      { ru: 'Стратегический и финансовый менеджмент', en: 'Strategic and financial management' },
      { ru: 'Организация бизнес-процессов', en: 'Designing business processes' },
      { ru: 'Анализ рынков и конкурентов', en: 'Market and competitor analysis' },
      { ru: 'Антикризисное управление', en: 'Crisis management' },
    ],
  },
  {
    period: { ru: 'Январь — июнь 2028', en: 'January — June 2028' },
    title: { ru: 'Устойчивый рост — масштабирование', en: 'Sustainable growth — scaling up' },
    modules: [
      { ru: 'Операционный менеджмент', en: 'Operations management' },
      { ru: 'Решения на основе данных и ИИ в бизнесе', en: 'Data-driven thinking and AI in business' },
      { ru: 'Стратегический маркетинг', en: 'Strategic marketing' },
      { ru: 'Управление затратами и логистикой', en: 'Cost and logistics management' },
    ],
  },
  {
    period: { ru: 'Сентябрь — декабрь 2028', en: 'September — December 2028' },
    title: { ru: 'Выход и развитие на новых рынках', en: 'Entering and growing in new markets' },
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

// "Сопровождение после программы"
export const acceleratorSupport: Bi[] = [
  { ru: 'Инструменты для роста', en: 'Tools for growth' },
  { ru: 'Доступ в сообщество', en: 'Access to the community' },
  { ru: 'Мастер-классы', en: 'Masterclasses' },
  { ru: 'Выездные программы', en: 'On-site programmes abroad' },
];

// "Как поступить" — отбор в ТОП-25 участников
export const acceleratorSteps: Bi[] = [
  { ru: 'Заполнить заявку', en: 'Fill in the application' },
  { ru: 'Пройти диагностику', en: 'Complete the diagnostics' },
  { ru: 'Получить индивидуальную дорожную карту развития бизнеса', en: 'Get a personal business-development roadmap' },
  { ru: 'Попасть в ТОП-25 первых участников', en: 'Join the TOP-25 founding participants' },
];

// "Преимущества РУДН"
export const acceleratorAdvantages: Bi[] = [
  { ru: 'Международная сеть выпускников РУДН', en: 'RUDN’s international alumni network' },
  { ru: 'Менторская и экспертная поддержка от профессионалов', en: 'Mentoring and expert support from professionals' },
  { ru: 'Диплом о профессиональной переподготовке', en: 'A professional retraining diploma' },
  { ru: 'Деловые связи на высоком уровне', en: 'High-level business connections' },
  { ru: 'Компетенции и навыки для международного развития, гибкая программа обучения', en: 'Competencies for international development and a flexible curriculum' },
];

// Partners specific to the accelerator (from the deck).
export const acceleratorPartners: { name: string; logo: string; role: Bi }[] = [
  { name: 'Hop.Agency', logo: '/images/partners/hop-agency.png', role: { ru: 'Партнёр по отбору и трекерскому сопровождению', en: 'Partner for selection and tracker support' } },
  { name: 'Sber Unity', logo: '/images/partners/sber-unity.png', role: { ru: 'Корпоративный партнёр', en: 'Corporate partner' } },
  { name: 'Cyberstage', logo: '/images/partners/cyberstage.png', role: { ru: 'Корпоративный партнёр', en: 'Corporate partner' } },
];
