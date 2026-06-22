// ICEMR research center content (bilingual).
// Structure and items mirror the live icemr.ru (International Center for
// Emerging Markets Research at RUDN), reviewed June 2026:
//   About us · Activities · Publications · Working Papers · Working Groups.
import type { Locale } from '@/i18n/config';

type Bi = Record<Locale, string>;

export const researchName: Bi = {
  ru: 'ICEMR — Международный центр исследований развивающихся рынков',
  en: 'ICEMR — International Center for Emerging Markets Research',
};

// Mission — two short paragraphs, as on the About us page.
export const researchIntro: Bi = {
  ru: 'Международный центр исследований развивающихся рынков (ICEMR) проводит политический и технический анализ, связанный с развивающимися рынками и их потребностью поддерживать быстрый рост, внедрять инновации и повышать конкурентоспособность. Центр стремится дать исследователям, стейкхолдерам и лицам, принимающим решения, рабочие подходы и ценные исследования, чтобы лучше понимать роль их решений в развитии развивающихся экономик.',
  en: 'The International Center for Emerging Markets Research (ICEMR) conducts policy and technical analysis that arises from emerging markets and their continuous need to support and foster rapid growth, implement constant innovation, and spur competitiveness. We aim to equip researchers, stakeholders and decision-makers with effective frameworks and valuable research to better understand the impact and role of their decisions in fostering growth in emerging markets.',
};

// Six research directions, as listed on the site. Each has its own subpage
// (/research/<slug>) with an expanded description + related publications — this
// adds indexable, topic-focused pages for SEO. `fields` maps to publication
// field values so each page can surface relevant work.
export type ResearchDirection = {
  slug: string;
  title: Bi;
  text: Bi;
  body: Bi;
  fields: string[];
};

export const researchDirections: ResearchDirection[] = [
  {
    slug: 'business-innovation',
    title: { ru: 'Бизнес-инновации', en: 'Business innovation' },
    text: {
      ru: 'Новые бизнес-модели и источники роста компаний на развивающихся рынках.',
      en: 'New business models and sources of company growth in emerging markets.',
    },
    body: {
      ru: 'Центр изучает, как компании на развивающихся рынках находят новые источники роста: меняют бизнес-модели, выводят продукты, перестраивают процессы под цифровую экономику. Мы смотрим, какие инновации действительно дают результат, а какие остаются на уровне презентаций, и переносим эти выводы в программы школы.',
      en: 'We study how companies in emerging markets find new sources of growth — changing business models, launching products and rebuilding processes for the digital economy. The findings feed directly into the school’s programs.',
    },
    fields: ['Digital economy', 'Venture capital'],
  },
  {
    slug: 'human-capital',
    title: { ru: 'Человеческий капитал', en: 'Human capital' },
    text: {
      ru: 'Образование, навыки и производительность как факторы развития экономик.',
      en: 'Education, skills and productivity as drivers of economic development.',
    },
    body: {
      ru: 'Человеческий капитал — один из ключевых факторов, объясняющих, почему одни экономики растут быстрее других. Мы исследуем, как образование, навыки и управленческие практики влияют на производительность компаний и стран и что с этим может сделать бизнес.',
      en: 'Human capital is one of the key factors explaining why some economies grow faster than others. We study how education, skills and management practices shape the productivity of firms and countries.',
    },
    fields: [],
  },
  {
    slug: 'entrepreneurship',
    title: { ru: 'Предпринимательство', en: 'Entrepreneurship' },
    text: {
      ru: 'Условия для запуска и масштабирования бизнеса в развивающихся странах.',
      en: 'Conditions for launching and scaling business in developing economies.',
    },
    body: {
      ru: 'Мы изучаем, что помогает и что мешает предпринимателям запускать и масштабировать бизнес в развивающихся странах: доступ к финансированию, институты, венчурный рынок и роль государства. Эти исследования напрямую связаны с программой акселерации школы.',
      en: 'We study what helps and what holds back entrepreneurs launching and scaling businesses in developing economies: access to finance, institutions, the venture market and the role of the state.',
    },
    fields: ['Venture capital', 'Emerging markets'],
  },
  {
    slug: 'energy',
    title: { ru: 'Энергетика', en: 'Energy' },
    text: {
      ru: 'Энергетические рынки, переход и их влияние на экономический рост.',
      en: 'Energy markets, the energy transition and their effect on growth.',
    },
    body: {
      ru: 'Энергетика остаётся одним из главных факторов экономики развивающихся стран. Мы исследуем, как устроены энергетические рынки, как идёт энергетический переход и как всё это сказывается на росте и на стратегиях компаний.',
      en: 'Energy remains one of the main factors in emerging economies. We study how energy markets work, how the energy transition unfolds and how it affects growth and company strategy.',
    },
    fields: [],
  },
  {
    slug: 'green-growth',
    title: { ru: '«Зелёный» рост и технологии', en: 'Green growth & technology' },
    text: {
      ru: 'Устойчивое развитие и роль технологий в экономике развивающихся рынков.',
      en: 'Sustainable development and the role of technology in emerging economies.',
    },
    body: {
      ru: 'Устойчивое развитие перестало быть темой «для отчётности» и стало фактором конкурентоспособности. Мы изучаем, как технологии и «зелёные» практики меняют экономику развивающихся рынков и какие возможности это открывает для бизнеса.',
      en: 'Sustainable development has moved from a reporting exercise to a factor of competitiveness. We study how technology and green practices reshape emerging economies and the opportunities this opens for business.',
    },
    fields: ['Digital economy'],
  },
  {
    slug: 'research-development',
    title: { ru: 'Исследования и разработки (R&D)', en: 'Research & development (R&D)' },
    text: {
      ru: 'Создание знаний, трансфер технологий и инновационная политика.',
      en: 'Knowledge creation, technology transfer and innovation policy.',
    },
    body: {
      ru: 'Мы исследуем, как создаются и передаются знания: как работает трансфер технологий, как устроена инновационная политика и что отличает компании, которые умеют превращать исследования в продукты и выручку.',
      en: 'We study how knowledge is created and transferred: how technology transfer works, how innovation policy is built and what distinguishes companies that turn research into products and revenue.',
    },
    fields: ['Economic theory & econometrics'],
  },
];

// Journals and book series the center publishes in / curates.
export const researchSeries: { title: string; note: Bi }[] = [
  {
    title: 'International Journal of Economic Policy in Emerging Economies',
    note: { ru: 'Рецензируемый международный журнал', en: 'Peer-reviewed international journal' },
  },
  {
    title: 'International Journal of Trade and Global Markets',
    note: { ru: 'Рецензируемый международный журнал', en: 'Peer-reviewed international journal' },
  },
  {
    title: 'International Symposia in Economic Theory and Econometrics',
    note: { ru: 'Книжная серия (Emerald)', en: 'Book series (Emerald)' },
  },
];

// Working Papers sections — currently two headings on the live site.
export const workingPapers: { code: string; title: Bi }[] = [
  { code: 'INDI', title: { ru: 'Working Papers INDI', en: 'Working Papers INDI' } },
  { code: 'EI', title: { ru: 'Working Papers EI', en: 'Working Papers EI' } },
];

// Link out to the ICEMR center site rather than mirroring its activities here.
export const activitiesUrl = 'https://icemr.ru/';

// Working groups as listed on icemr.ru (with their leads where named).
export const researchGroups: { name: Bi; lead?: string }[] = [
  { name: { ru: 'Банковское дело и финансы', en: 'Banking and Finance' }, lead: 'Carlo Bellavite Pellegrini' },
  { name: { ru: 'Экономическая политика, регулирование и рост', en: 'Economic policy, regulation and growth' }, lead: 'Michael K Fung' },
  { name: { ru: 'Энергетическая отрасль', en: 'Energy Industry' }, lead: 'Apostolos Serletis' },
  { name: { ru: 'Финансовое развитие и финансовая стабильность', en: 'Financial Development and Financial Stability' }, lead: 'Irwan Trinugroho' },
  { name: { ru: 'Социальная ответственность', en: 'Social Responsibility' } },
  { name: { ru: 'Концепция эндогенного экономического роста России', en: 'Concept of Russia’s endogenous economic growth' } },
  { name: { ru: 'Устойчивый рост и предпринимательство', en: 'Sustainable Growth and Entrepreneurship' } },
  { name: { ru: 'Здоровье и благополучие', en: 'Health and wellbeing' } },
];
