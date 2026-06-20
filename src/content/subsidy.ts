// "Субсидия на обучение сотрудников" — content sourced ONLY from the official
// Moscow Department of Entrepreneurship deck (delo.mos.ru, 618-ПП). Bilingual.
import type { Locale } from '@/i18n/config';

type Bi = Record<Locale, string>;

export const subsidyIntro: Bi = {
  ru: 'Московские работодатели могут вернуть значительную часть затрат на обучение сотрудников — в том числе на программы MBA — за счёт субсидии из бюджета города Москвы. Ниже — условия по данным Департамента предпринимательства и инновационного развития города Москвы (delo.mos.ru).',
  en: 'Moscow employers can recover a substantial part of their employee-training costs — including MBA programmes — through a subsidy from the Moscow city budget. Below are the terms as published by the Moscow Department of Entrepreneurship and Innovative Development (delo.mos.ru).',
};

export const subsidyHighlights: { value: string; label: Bi }[] = [
  { value: '95%', label: { ru: 'до 95% фактически понесённых затрат', en: 'up to 95% of actual costs incurred' } },
  { value: '10 млн ₽', label: { ru: 'общий лимит на 1 компанию по 1 заявке', en: 'overall limit per company per application' } },
  { value: '120 тыс. ₽', label: { ru: 'не более — за 1 человека за 1 календарный год', en: 'maximum per person per calendar year' } },
];

export const subsidyRecipients: Bi[] = [
  { ru: 'Юридические лица (за исключением государственных и муниципальных учреждений; фонды и АНО, созданные ОИВ, могут быть получателями)', en: 'Legal entities (except state and municipal institutions; foundations and ANOs created by executive authorities are eligible)' },
  { ru: 'Индивидуальные предприниматели', en: 'Individual entrepreneurs' },
];

export const subsidyCovers: Bi[] = [
  { ru: 'Дополнительное профессиональное образование, в том числе программы MBA', en: 'Additional professional education, including MBA programmes' },
  { ru: 'Среднее профессиональное образование', en: 'Secondary vocational education' },
];

// Приоритетные виды экономической деятельности (ОКВЭД).
export const subsidyPriorityActivities: { name: Bi; code: string }[] = [
  { name: { ru: 'Производство', en: 'Manufacturing' }, code: 'ОКВЭД 10–33' },
  { name: { ru: 'Туризм', en: 'Tourism' }, code: 'ОКВЭД 55, 79' },
  { name: { ru: 'IT и высокотехнологичный сектор', en: 'IT and high-tech sector' }, code: 'ОКВЭД 62, 63, 71, 72, 74, 95' },
  { name: { ru: 'Образование', en: 'Education' }, code: 'ОКВЭД 85' },
  { name: { ru: 'Спорт, отдых и развлечения', en: 'Sport, recreation and entertainment' }, code: 'ОКВЭД 93' },
  { name: { ru: 'Здравоохранение и ветеринария', en: 'Healthcare and veterinary' }, code: 'ОКВЭД 75, 86' },
  { name: { ru: 'Креативные индустрии', en: 'Creative industries' }, code: 'ОКВЭД (перечень)' },
  { name: { ru: 'Экспортная деятельность (при наличии экспортного контракта)', en: 'Export activity (with an export contract)' }, code: '' },
  { name: { ru: 'Социальные предприятия (при наличии статуса)', en: 'Social enterprises (with the relevant status)' }, code: '' },
];

export const subsidyRequirements: Bi[] = [
  { ru: 'Постановка на учёт как налогоплательщик и осуществление деятельности в Москве', en: 'Registered as a taxpayer and operating in Moscow' },
  { ru: 'Основной вид деятельности — в одном из приоритетных направлений', en: 'The main activity is in one of the priority areas' },
  { ru: 'Договоры об образовании с окончанием обучения с 1 января 2024 года или действующие', en: 'Education contracts ending on or after 1 January 2024, or current ones' },
  { ru: 'Средняя зарплата сотрудников не ниже среднемесячной по Москве (для субсидии на обучение допускается отклонение на 15%)', en: 'Average salary not below the Moscow average (a 15% deviation is allowed for the training subsidy)' },
  { ru: 'Обучающийся (гражданин РФ) обязан отработать не менее 1 года после окончания обучения', en: 'The trainee (a Russian citizen) must stay employed for at least 1 year after completing the training' },
  { ru: 'Отсутствие задолженности по налогам, сборам и страховым взносам (не превышающей 30 тыс. ₽)', en: 'No tax, levy or insurance debt (not exceeding ₽30,000)' },
  { ru: 'Отсутствие статуса реорганизации, ликвидации, банкротства; деятельность не приостановлена', en: 'No reorganisation, liquidation or bankruptcy status; activity not suspended' },
  { ru: 'Отсутствие статусов иностранного юридического лица и иностранного агента; доля офшорных организаций в уставном капитале ≤ 25%', en: 'No foreign-entity or foreign-agent status; offshore organisations’ share in charter capital ≤ 25%' },
  { ru: 'Не получает средства из бюджета Москвы на те же цели; отсутствие в реестрах недобросовестных и дисквалифицированных лиц', en: 'Does not receive Moscow budget funds for the same purpose; not on registers of unreliable or disqualified parties' },
];

export const subsidyDocuments: Bi[] = [
  { ru: 'Интерактивная форма заявки на delo.mos.ru', en: 'Interactive application form on delo.mos.ru' },
  { ru: 'Копии договоров об образовании', en: 'Copies of the education contracts' },
  { ru: 'Копии платёжных поручений', en: 'Copies of payment orders' },
  { ru: 'Копии образовательных программ', en: 'Copies of the educational programmes' },
  { ru: 'Копия лицензии образовательной организации', en: 'A copy of the educational institution’s licence' },
  { ru: 'Согласие на обработку персональных данных обучающегося', en: 'Consent to processing the trainee’s personal data' },
  { ru: 'Форма финансового отчёта о фактически понесённых затратах', en: 'A financial report form on the actual costs incurred' },
  { ru: 'Форма ЕФС-1 за 2024 год с отметкой СФР РФ', en: 'The EFS-1 form for 2024 stamped by the Social Fund of Russia' },
  { ru: 'Копии учредительных документов или свидетельства о регистрации ИП', en: 'Copies of founding documents or the sole-trader registration certificate' },
  { ru: 'Справка-подтверждение ОКВЭД с отметкой СФР РФ', en: 'An OKVED confirmation certificate stamped by the Social Fund of Russia' },
  { ru: 'Копии документов о назначении руководителя и главного бухгалтера', en: 'Copies of documents appointing the director and chief accountant' },
  { ru: 'Справка о задолженности по уплате налогов, сборов и страховых взносов', en: 'A certificate on tax, levy and insurance debt' },
  { ru: 'Документ, подтверждающий право действовать от имени заявителя (при подаче уполномоченным лицом)', en: 'A document confirming the right to act on the applicant’s behalf (if filed by an authorised person)' },
];

export const subsidyResults: { value: string; label: Bi }[] = [
  { value: '1100+', label: { ru: 'компаний получили субсидию', en: 'companies received the subsidy' } },
  { value: '436+ млн ₽', label: { ru: 'выплачено по заявкам', en: 'paid out on applications' } },
  { value: '8500+', label: { ru: 'сотрудников обучились', en: 'employees trained' } },
];

export const subsidyContacts = {
  note: {
    ru: 'Показатели и условия приведены по данным отбора 2025 года (приём заявок был открыт до 30.05.2025). Актуальные сроки и требования уточняйте на delo.mos.ru.',
    en: 'Figures and terms reflect the 2025 selection (applications were accepted until 30 May 2025). Check delo.mos.ru for current dates and requirements.',
  } as Bi,
  phone: '+7 (499) 444-16-15',
  email: '618-PP@mos.ru',
  url: 'https://delo.mos.ru/education_grant',
  urlLabel: 'delo.mos.ru/education_grant',
  legal: {
    ru: 'Постановление Правительства Москвы от 17.09.2013 № 618-ПП (в ред. от 25.03.2025 № 625-ПП)',
    en: 'Moscow Government Decree No. 618-PP of 17.09.2013 (as amended by No. 625-PP of 25.03.2025)',
  } as Bi,
};
