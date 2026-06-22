// Structural marketing content for the home page (bilingual).
// Entity content (programs, faculty, news…) lives in the database; this is the
// page narrative. Texts are human-written, not machine-translated.
import type { Locale } from '@/i18n/config';

type Bi = Record<Locale, string>;

export const heroStats: { value: string; label: Bi }[] = [
  { value: '160+', label: { ru: 'стран в сообществе РУДН', en: 'countries in the RUDN community' } },
  { value: '85k+', label: { ru: 'выпускников по всему миру', en: 'alumni worldwide' } },
  { value: '18', label: { ru: 'месяцев в программе акселерации', en: 'months in the acceleration track' } },
  { value: '3', label: { ru: 'направления в одной экосистеме', en: 'tracks in one ecosystem' } },
];

export const advantages: { title: Bi; text: Bi }[] = [
  {
    title: { ru: 'Практика, а не теория', en: 'Practice over theory' },
    text: {
      ru: 'Вы работаете над задачами собственного бизнеса прямо во время обучения — с трекерами и экспертами, которые сами прошли этот путь.',
      en: 'You work on your own business throughout the program — with trackers and experts who have done it themselves.',
    },
  },
  {
    title: { ru: 'Международный контекст', en: 'An international context' },
    text: {
      ru: 'РУДН объединяет студентов и преподавателей из 160+ стран. Международные выездные модули помогают выйти на рынки Азии, Ближнего Востока, Латинской Америки и Африки.',
      en: 'RUDN brings together students and faculty from 160+ countries. International modules help you enter markets in Asia, the Middle East, Latin America and Africa.',
    },
  },
  {
    title: { ru: 'Сильное сообщество', en: 'A strong community' },
    text: {
      ru: 'Доступ к базе знаний, клубу выпускников, мастер-классам и деловым знакомствам остаётся с вами после выпуска.',
      en: 'Access to the knowledge base, alumni club, masterclasses and networking stays with you after graduation.',
    },
  },
  {
    title: { ru: 'Наука рядом с бизнесом', en: 'Research next to business' },
    text: {
      ru: 'Центр ICEMR изучает развивающиеся рынки, и его исследования напрямую питают программы и кейсы школы.',
      en: 'The ICEMR center studies emerging markets, and its research feeds directly into the school’s programs and cases.',
    },
  },
];

export const forWhom: { title: Bi; text: Bi }[] = [
  {
    title: { ru: 'Предприниматели', en: 'Entrepreneurs' },
    text: {
      ru: 'Хотят систематизировать опыт, собрать стратегию и масштабировать бизнес на новые территории.',
      en: 'Who want to systematize their experience, build a strategy and scale into new markets.',
    },
  },
  {
    title: { ru: 'Руководители и менеджеры', en: 'Executives and managers' },
    text: {
      ru: 'Готовятся к более высокой роли и хотят уверенно принимать решения в условиях неопределённости.',
      en: 'Preparing for a bigger role and looking to make confident decisions under uncertainty.',
    },
  },
  {
    title: { ru: 'Консультанты и эксперты', en: 'Consultants and experts' },
    text: {
      ru: 'Расширяют инструментарий и выстраивают сеть контактов в международной бизнес-среде.',
      en: 'Broadening their toolkit and building a network across an international business community.',
    },
  },
];

export const quickNav: { title: Bi; text: Bi; href: string }[] = [
  {
    title: { ru: 'MBA-программы', en: 'MBA programs' },
    text: { ru: 'Классический MBA, акселерация и выход на рынки', en: 'Classic MBA, acceleration and market entry' },
    href: '/programs',
  },
  {
    title: { ru: 'Акселератор', en: 'Accelerator' },
    text: { ru: 'Master of Business Acceleration', en: 'Master of Business Acceleration' },
    href: '/accelerator',
  },
  {
    title: { ru: 'Научный центр ICEMR', en: 'ICEMR research center' },
    text: { ru: 'Исследования развивающихся рынков', en: 'Emerging markets research' },
    href: '/research',
  },
  {
    title: { ru: 'Новости и публикации', en: 'News & publications' },
    text: { ru: 'Аналитика, события и working papers', en: 'Insights, events and working papers' },
    href: '/news',
  },
];
