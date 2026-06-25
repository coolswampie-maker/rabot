import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // ---------------------------------------------------------------------------
  // Admin user
  // ---------------------------------------------------------------------------
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@rudn-business.example'
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme12345'
  const adminName = process.env.ADMIN_NAME || 'Administrator'
  const passwordHash = await bcrypt.hash(adminPassword, 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: adminName, passwordHash, role: 'ADMIN' },
    create: { email: adminEmail, name: adminName, passwordHash, role: 'ADMIN' },
  })

  // ---------------------------------------------------------------------------
  // Categories
  // ---------------------------------------------------------------------------
  const categoryData = [
    { slug: 'mba-education', nameRu: 'MBA-образование', nameEn: 'MBA education' },
    { slug: 'business-education', nameRu: 'Бизнес-образование', nameEn: 'Business education' },
    { slug: 'emerging-markets', nameRu: 'Развивающиеся рынки', nameEn: 'Emerging markets' },
    { slug: 'entrepreneurship', nameRu: 'Предпринимательство', nameEn: 'Entrepreneurship' },
    { slug: 'acceleration', nameRu: 'Акселерация', nameEn: 'Acceleration' },
    { slug: 'research', nameRu: 'Исследования', nameEn: 'Research' },
    { slug: 'university-news', nameRu: 'Новости университета', nameEn: 'University news' },
    { slug: 'events', nameRu: 'События', nameEn: 'Events' },
    { slug: 'media', nameRu: 'СМИ о нас', nameEn: 'In the media' },
  ]

  const categories: Record<string, { id: string }> = {}
  for (const c of categoryData) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { nameRu: c.nameRu, nameEn: c.nameEn },
      create: c,
    })
    categories[c.slug] = cat
  }

  // ---------------------------------------------------------------------------
  // Tags
  // ---------------------------------------------------------------------------
  const tagData = [
    { slug: 'strategy', nameRu: 'Стратегия', nameEn: 'Strategy' },
    { slug: 'finance', nameRu: 'Финансы', nameEn: 'Finance' },
    { slug: 'leadership', nameRu: 'Лидерство', nameEn: 'Leadership' },
    { slug: 'scaling', nameRu: 'Масштабирование', nameEn: 'Scaling' },
    { slug: 'international', nameRu: 'Международный бизнес', nameEn: 'International business' },
    { slug: 'ai', nameRu: 'Искусственный интеллект', nameEn: 'Artificial intelligence' },
    { slug: 'marketing', nameRu: 'Маркетинг', nameEn: 'Marketing' },
  ]

  const tags: Record<string, { id: string }> = {}
  for (const t of tagData) {
    const tag = await prisma.tag.upsert({
      where: { slug: t.slug },
      update: { nameRu: t.nameRu, nameEn: t.nameEn },
      create: t,
    })
    tags[t.slug] = tag
  }

  // ---------------------------------------------------------------------------
  // Programs
  // ---------------------------------------------------------------------------
  const programData = [
    {
      slug: 'mba-classic',
      brand: 'MBA',
      order: 1,
      published: true,
      titleRu: 'Классическая программа MBA',
      titleEn: 'Classic MBA',
      summaryRu:
        'Модульная программа для руководителей и собственников, которые хотят систематизировать управленческий опыт и принимать решения опираясь на цифры, а не на интуицию. Учиться можно очно в Москве или полностью онлайн.',
      summaryEn:
        'A modular program for executives and owners who want to put their management experience into a system and base decisions on numbers rather than gut feeling. You can study on campus in Moscow or fully online.',
      bodyRu: `## О программе

Классический MBA РУДН — это системное управленческое образование для тех, кто уже руководит, но хочет видеть бизнес целиком: от стратегии до денежного потока. Программа построена вокруг практики — каждый блок вы сразу примеряете к своей компании, а преподают действующие руководители, консультанты и предприниматели.

## История программы

Программа MBA в ИМЭБ РУДН разработана в 1991–1992 годах в рамках российско-американского «Проекта MBA» — в соответствии с соглашением о международном сотрудничестве между Министерством науки, высшей школы и технической политики РФ и Ассоциацией христианских университетов и колледжей США. Наиболее тесные связи изначально существовали с School of Business of Northern Kentucky University (США), Calvin College (США), Eastern College (США), Luton University (Великобритания) и Oxford Brookes University (Великобритания). В 1999 году приказом Министра образования РФ РУДН был включён в число вузов — участников эксперимента по реализации программы MBA.

Сегодня программу ведут профессионалы-практики и преподаватели с международным опытом преподавания, имеющие авторские методики и научные публикации в наукометрических базах Web of Science и Scopus. Важная часть учебного процесса — мастер-классы и открытые лекции приглашённых спикеров-практиков. Занятия проходят в модульном формате по пятницам, субботам и воскресеньям один раз в месяц в Главном корпусе РУДН.

## Чему вы научитесь

- Видеть компанию как систему и принимать решения на основе цифр, а не интуиции
- Строить и защищать стратегию, считать юнит-экономику и финансовую модель
- Управлять командами, изменениями и собственной эффективностью
- Выстраивать маркетинг, продажи и операционные процессы под цели бизнеса

## Как проходит обучение

Занятия идут модулями — несколько насыщенных дней раз в месяц, очно в кампусе РУДН или онлайн (материалы и записи доступны в любом случае). В основе — практические методы: разбор реальных кейсов (case-study), деловые игры, работа в малых группах и action-learning. Между модулями вы ведёте собственный проект под руководством преподавателя.

## Поступление

Для поступления нужны мотивационное письмо и собеседование с приёмной комиссией — так мы убеждаемся, что программа подходит под вашу задачу, а группа собирается из опытных управленцев.

## Документ

По окончании вы получаете диплом о профессиональной переподготовке РУДН с присвоением квалификации MBA.`,
      bodyEn: `## About the program

The RUDN Classic MBA is a systematic management education for people who already lead but want to see the business as a whole — from strategy to cash flow. It is built around practice: you apply every block to your own company, and it is taught by working executives, consultants and entrepreneurs.

## Programme history

The MBA program at the RUDN Institute of World Economy and Business was developed in 1991–1992 as part of the Russian-American "MBA Project", under an international cooperation agreement between Russia's Ministry of Science, Higher School and Technical Policy and the association of Christian universities and colleges of the USA. Its closest early ties were with the School of Business of Northern Kentucky University (USA), Calvin College (USA), Eastern College (USA), Luton University (UK) and Oxford Brookes University (UK). In 1999, by order of the Russian Minister of Education, RUDN joined the universities taking part in the experiment to deliver the MBA program.

Today the program is taught by practitioners and lecturers with international teaching experience, their own methods and research published in the Web of Science and Scopus databases. Masterclasses and open lectures by invited practitioner-speakers are an important part of the studies. Classes run in a modular format on Fridays, Saturdays and Sundays once a month in the RUDN Main Building.

## What you will learn

- See the company as a system and decide based on numbers, not intuition
- Build and defend a strategy, model unit economics and finances
- Lead teams, change and your own effectiveness
- Align marketing, sales and operations with business goals

## How the training works

Classes run in modules — a few intensive days once a month, on campus in Moscow or online (materials and recordings are available either way). The methods are hands-on: real case studies, business simulations, small-group work and action learning. Between modules you run your own project with a tutor.

## Admission

Admission requires a motivation letter and an interview with the admissions committee, so the program fits your goal and the group is made up of experienced managers.

## Qualification

On completion you receive a RUDN professional retraining diploma awarding the MBA qualification.`,
      format: 'Очно / онлайн',
      durationRu: 'От 18 месяцев',
      durationEn: 'From 18 months',
      audienceRu: 'Руководители, менеджеры, предприниматели и бизнес-консультанты',
      audienceEn: 'Executives, managers, entrepreneurs and business consultants',
    },
    {
      slug: 'master-of-business-acceleration',
      brand: 'ACCELERATOR',
      order: 2,
      published: true,
      titleRu: 'Master of Business Acceleration',
      titleEn: 'Master of Business Acceleration',
      summaryRu:
        'Практический MBA, встроенный в акселератор: вы не просто учитесь, а под руководством трекеров растите конкретные показатели своего бизнеса. Программа идёт 18 месяцев, три дня в месяц в кампусе плюс онлайн-трекинг между сессиями.',
      summaryEn:
        'A practical MBA built into an accelerator: you do not just study, you grow concrete metrics of your business under the guidance of trackers. The program runs for 18 months, three days a month on campus plus online tracking between sessions.',
      bodyRu: `## О программе

Master of Business Acceleration — для предпринимателей, которые уже прошли стадию выживания и хотят масштабироваться осознанно. Теория здесь не самоцель: каждый модуль вы заканчиваете с конкретной гипотезой и планом её проверки, а трекер помогает довести её до результата.

## Формат

Три дня в месяц очно в кампусе РУДН, между сессиями — онлайн-трекинг и работа над собственными целями. Вы движетесь не по абстрактной программе, а по дорожной карте своего бизнеса.`,
      bodyEn: `## About the program

Master of Business Acceleration is for entrepreneurs who have already passed the survival stage and want to scale deliberately. Theory is not an end in itself here: you finish each module with a concrete hypothesis and a plan to test it, and a tracker helps you carry it through to a result.

## Format

Three days a month on the RUDN campus, with online tracking and work on your own goals between sessions. You move along the roadmap of your business, not along an abstract syllabus.`,
      format: 'Очно + онлайн-трекинг',
      durationRu: '18 месяцев',
      durationEn: '18 months',
      audienceRu: 'Предприниматели, которые масштабируют действующий бизнес',
      audienceEn: 'Entrepreneurs scaling an existing business',
    },
    {
      slug: 'global-expansion',
      brand: 'MBA',
      order: 3,
      published: true,
      titleRu: 'RUDN Global Expansion',
      titleEn: 'RUDN Global Expansion',
      summaryRu:
        'Корпоративная программа бизнес-образования для команд компаний, которые выводят продукт и бизнес на международные рынки. Содержание собирается под запрос заказчика, программа длится от 6 месяцев и сочетает корпоративный трекинг команды с выездными модулями в фокусные страны.',
      summaryEn:
        'A corporate business-education program for company teams taking their product and business into international markets. The content is assembled around the client\'s request, the program runs from 6 months and combines corporate team tracking with on-site modules in focus countries.',
      bodyRu: `## О программе

RUDN Global Expansion — это корпоративная программа для компаний, которые выходят на международные рынки и хотят сделать это с работающей стратегией, а не на оптимизме. Программа состоит из четырёх образовательно-практических блоков, корпоративного трекинга команды для выстраивания управляемого роста и выездного модуля в фокусную страну. Формат и расписание адаптируются под цели и запрос компании и состав участников.

## Для кого

- Руководители, нацеленные на вывод компании на международные рынки
- Руководители направлений развития и создания новых продуктов в корпорациях
- Менеджеры, отвечающие за развитие бизнеса

## Цели программы

- Получить системные знания для международного развития компании и выхода на новые рынки
- Создать и внедрить работающую стратегию международного развития
- Освоить лучшие практики ведения внешнеэкономической деятельности
- Развить сеть B2B- и B2G-контактов в фокусных странах

## Преимущества

- Преподаватели-практики международного уровня и современные практические инструменты
- Менторская и экспертная поддержка от практиков-профессионалов
- Выездные модули в странах Азии, Ближнего Востока, Латинской Америки и Африки
- Доступ к бизнес-сообществам и лицам, принимающим решения, в фокусных странах

## Как мы разрабатываем и ведём программу

1. Встреча с компанией для выявления запроса и определения состава участников
2. Подготовка и утверждение программы, её ключевых блоков, формата и сроков
3. Стратегическая сессия с ключевыми участниками: цели, задачи, сроки и зоны ответственности по выводу продукта на рынок
4. Подбор и согласование экспертов, бизнес-трекера и практиков
5. Реализация модулей в соответствии с утверждённой программой
6. Стратегическая сессия для защиты проектов и определения следующих шагов

## Что получают выпускники

Инструменты для выполнения функций директора зарубежного филиала или сети, директора по международному развитию, директора по маркетингу и директора по развитию продуктов.

## Формат и документ

Продолжительность — от 6 месяцев. Очно, онлайн и выездные модули, график подстраивается под команду. По итогам обучения выдаётся диплом РУДН о профессиональной переподготовке.`,
      bodyEn: `## About the program

RUDN Global Expansion is a corporate program for companies entering international markets that want to do it with a working strategy rather than on optimism. It consists of four educational-and-practical blocks, corporate tracking of the team to build managed growth, and an on-site module in a focus country. The format and schedule are adapted to the company's goals, request and participants.

## Who it is for

- Executives focused on taking the company into international markets
- Heads of development and new-product directions in corporations
- Managers responsible for business development

## Programme goals

- Gain systematic knowledge for the company's international development and market entry
- Create and implement a working international-development strategy
- Master best practices in foreign trade
- Build a network of B2B and B2G contacts in focus countries

## Advantages

- International level of professors and business practitioners, with modern hands-on tools
- Mentoring and expert support from professional practitioners
- International modules in Asia, the Middle East, Latin America and Africa
- Access to the global network of RUDN alumni from 160 countries, business communities and decision-makers in focus countries

## How we design and run the program

1. A meeting with the company to clarify the request and define the participants
2. Preparation and approval of the program, its key blocks, format and timeline
3. A strategy session with key participants: goals, tasks, timelines and areas of responsibility for market entry
4. Selecting and agreeing experts, a business tracker and practitioners
5. Delivering the modules according to the approved program
6. A strategy session to defend the projects and define the next steps

## Graduates may hold positions as

- General Director
- Director of a foreign branch/network
- Director of International Development
- Marketing Director
- Product Development Director

## Format and qualification

Duration is from 6 months. On campus, online and international (field) modules, with a schedule that fits the team. On completion you receive a RUDN professional retraining diploma.`,
      format: 'Очно / онлайн / выездные модули',
      durationRu: 'От 6 месяцев',
      durationEn: 'From 6 months',
      audienceRu: 'Команды компаний, выходящих на международные рынки',
      audienceEn: 'Teams of companies entering international markets',
    },
    {
      slug: 'mba-global-expansion',
      brand: 'MBA',
      order: 4,
      published: true,
      titleRu: 'MBA «Global Expansion. Выход на новые рынки»',
      titleEn: 'MBA “Global Expansion. Entering new markets”',
      summaryRu:
        'Классическая модульная MBA-специализация по международному развитию бизнеса: 22 модуля и 1800 академических часов (680 аудиторных). Программа завершается защитой итогового проекта — дорожной карты развития компании.',
      summaryEn:
        'A classic modular MBA specialisation in international business development: 22 modules and 1,800 academic hours (680 in class). The program concludes with the defence of a capstone project — a company development roadmap.',
      bodyRu: `## О программе

MBA «Global Expansion. Выход на новые рынки» — классическая программа модульного типа для руководителей и предпринимателей, которые системно готовят компанию к международному развитию. Программа охватывает 22 модуля и 1800 академических часов, из них 680 аудиторных, и сочетает фундаментальную управленческую подготовку с прикладными модулями по выходу на зарубежные рынки.

## Чему вы научитесь

- Строить стратегию выхода на международные рынки и управлять в условиях глобализации
- Исследовать зарубежные рынки, выстраивать продажи и маркетинг в разных странах
- Управлять финансами, валютными рисками и инвестиционными проектами международного бизнеса
- Разбираться в международном торговом праве, экспортном, налоговом и таможенном регулировании
- Оптимизировать цепочки поставок и внедрять инновации для масштабирования

## Структура программы

Программа состоит из 22 модулей, объединённых в тематические блоки — от стратегического менеджмента и исследования рынков до права, ВЭД и логистики. Завершается обучение мастер-классами, мастермайндом для предпринимателей и подготовкой и защитой итогового проекта — дорожной карты развития компании.

## Формат и документ

Очно или онлайн, модульный график. По итогам обучения выдаётся диплом РУДН о профессиональной переподготовке с присвоением квалификации MBA.`,
      bodyEn: `## About the program

MBA “Global Expansion. Entering new markets” is a classic modular program for executives and entrepreneurs who prepare their company for international development systematically. It covers 22 modules and 1,800 academic hours, 680 of them in class, combining a solid management foundation with applied modules on entering foreign markets.

## What you will learn

- Build a market-entry strategy and manage under globalisation
- Research foreign markets and build sales and marketing across countries
- Manage finance, currency risk and investment projects in international business
- Navigate international trade law and export, tax and customs regulation
- Optimise supply chains and adopt innovation for scaling

## Programme structure

The program consists of 22 modules grouped into thematic blocks — from strategic management and market research to law, foreign trade and logistics. It concludes with masterclasses, an entrepreneurs' mastermind and the preparation and defence of a capstone project — a company development roadmap.

## Format and qualification

On campus or online, on a modular schedule. On completion you receive a RUDN professional retraining diploma awarding the MBA qualification.`,
      format: 'Очно / онлайн',
      durationRu: '1800 ак. часов',
      durationEn: '1,800 academic hours',
      audienceRu: 'Руководители и предприниматели, развивающие международное направление',
      audienceEn: 'Executives and entrepreneurs developing an international track',
    },
    {
      slug: 'doing-business-in-russia',
      brand: 'MBA',
      order: 5,
      published: true,
      titleRu: 'Doing Business in Russia — ведение бизнеса в России',
      titleEn: 'Doing Business in Russia',
      summaryRu:
        'Англоязычная гибридная программа для иностранных предпринимателей и менеджеров, которые выходят на российский рынок и работают с партнёрами и клиентами в России. Онлайн-обучение и практические выездные модули в кампусе РУДН в Москве.',
      summaryEn:
        'A hybrid, English-taught program for international students who work with partners and clients in the Russian market. It combines remote learning with practical field modules in Russia.',
      bodyRu: `## О программе

Doing Business in Russia — гибридная программа для иностранных слушателей, которые работают с партнёрами и клиентами на российском рынке. Она сочетает онлайн-обучение и практическую часть с выездными модулями в России.

Общий объём — 1800 часов, включая 660 часов аудиторных занятий (онлайн), срок обучения 12–24 месяца. Предусмотрено 4 выездных модуля в кампусе РУДН в Москве. Занятия проходят онлайн на английском языке или на родном языке участников (для групп от 10 человек).

## Для кого

- Предприниматели и собственники бизнеса, выходящие на российский рынок и работающие с партнёрами и клиентами в России
- Менеджеры по развитию бизнеса

## Цели

- Получить системное понимание того, как масштабировать бизнес в России
- Освоить юридические, финансовые, налоговые и таможенные аспекты, а также правила и нормы ведения бизнеса в России
- Построить сеть B2B- и B2G-контактов в России

## Преимущества

- Обучение на английском языке (или на родном языке для групп от 10 человек)
- Менторская и экспертная поддержка от практиков-профессионалов
- Доступ к сети выпускников РУДН из 160 стран, включая бизнес-сообщества и лидеров в России
- Четыре модуля в кампусе РУДН в Москве

## Кем смогут работать выпускники

- Генеральный директор
- Директор зарубежного филиала/сети в России
- Директор по международному развитию
- Директор по маркетингу
- Директор по развитию продуктов

## Формат и документ

Онлайн, на английском или родном языке участников, 12–24 месяца, с четырьмя выездными модулями в России, включая два практических модуля по 14 дней. По итогам выдаётся диплом РУДН о профессиональной переподготовке.`,
      bodyEn: `## About the program

Doing Business in Russia is a hybrid program for international students to work with partners and clients in the Russian market. It combines a remote education and practical component with field modules in Russia.

The total number of hours is 1,800, comprising 660 hours of classroom instruction (online), over a period of 12–24 months. There are four visiting modules at the RUDN University campus in Moscow. Modules are delivered online, either in English or in the native language of the participants (for groups of 10 or more).

## Who it is for

- Entrepreneurs and business owners seeking to enter the Russian market and work with partners and customers in Russia
- Business development managers

## Goals

- To gain a comprehensive understanding of the system for scaling a business in Russia
- To acquire knowledge of the legal, financial, tax and customs aspects, as well as the rules and regulations governing business operations in Russia
- To establish a network of business-to-business (B2B) and business-to-government (B2G) contacts in Russia

## Advantages

- Education in English (or the native language for groups of 10 or more)
- Mentorship and expert guidance from professional practitioners
- Access to a network of RUDN alumni from 160 countries, including business communities and leaders in Russia
- Four modules at the RUDN University campus in Moscow

## Graduates may hold positions as

- The General Director
- Directors of the foreign branch/networks in Russia
- Director of International Development
- Marketing Director
- Product Development Directors, etc.

## Format and qualification

Online, in English or the participants' native language, over 12–24 months, with four field modules in Russia, including two practical modules of 14 days each. On completion you receive a RUDN professional retraining diploma.`,
      format: 'Онлайн + выездные модули в России',
      durationRu: '12–24 месяца',
      durationEn: '12–24 months',
      audienceRu: 'Иностранные предприниматели, собственники и менеджеры по развитию бизнеса, выходящие на рынок России',
      audienceEn: 'International entrepreneurs, business owners and development managers entering the Russian market',
    },
    {
      slug: 'mba-finance-director',
      brand: 'MBA',
      order: 6,
      published: true,
      titleRu: 'MBA «Управление финансами. Finance-Director»',
      titleEn: 'MBA “Financial Management. Finance Director”',
      summaryRu:
        'Модульная MBA-программа для финансовых руководителей: 50 зачётных единиц и 1800 академических часов, 18 модулей в шести блоках — от лидерства и современного менеджмента до управления финансами компании. Завершается деловой игрой «Управление компанией» и защитой итоговой аттестационной работы.',
      summaryEn:
        'A modular MBA program for finance leaders: 50 credits and 1,800 academic hours across 18 modules in six blocks — from leadership and modern management to corporate financial management. It concludes with the “Running the Company” business game and the defence of a capstone project.',
      bodyRu: `## О программе

MBA «Управление финансами. Finance-Director» — классическая программа модульного типа для финансовых директоров, руководителей финансовых служб и собственников, которые хотят управлять компанией через цифры и стоимость. Программа охватывает 50 зачётных единиц и 1800 академических часов и сочетает фундаментальную управленческую подготовку с углублённым блоком по управлению финансами.

## Чему вы научитесь

- Выстраивать финансовую стратегию компании и управлять её стоимостью
- Управлять активами и пассивами, ликвидностью и финансовыми рисками
- Работать с инвестиционным анализом и проектным финансированием
- Вести деятельность компании на финансовых рынках и в международном контуре
- Развивать управленческие и лидерские компетенции финансового руководителя

## Структура программы

Программа состоит из 18 модулей, объединённых в шесть блоков: «Лидерство в бизнесе», «Современный менеджмент», «Развитие бизнеса», «Аспекты ESG», «Экономика и финансы» и «Управление финансами». Обучение дополняют мастер-классы и деловая игра «Управление компанией», а завершается подготовкой и защитой итоговой аттестационной работы (проекта).

## Формат и документ

Очно или онлайн, модульный график. По итогам обучения выдаётся диплом РУДН о профессиональной переподготовке с присвоением квалификации MBA.`,
      bodyEn: `## About the program

MBA “Financial Management. Finance Director” is a classic modular program for CFOs, heads of finance functions and owners who want to run the company through numbers and value. It covers 50 credits and 1,800 academic hours, combining a solid management foundation with an in-depth block on corporate financial management.

## What you will learn

- Build the company's financial strategy and manage its value
- Manage assets and liabilities, liquidity and financial risk
- Work with investment analysis and project finance
- Operate the company on financial markets and in an international setting
- Develop the management and leadership competencies of a finance leader

## Programme structure

The program consists of 18 modules grouped into six blocks: “Leadership in business”, “Modern management”, “Business development”, “ESG aspects”, “Economics and finance” and “Financial management”. The studies are complemented by masterclasses and the “Running the Company” business game, and conclude with the preparation and defence of a capstone project.

## Format and qualification

On campus or online, on a modular schedule. On completion you receive a RUDN professional retraining diploma awarding the MBA qualification.`,
      format: 'Очно / онлайн',
      durationRu: '1800 ак. часов',
      durationEn: '1,800 academic hours',
      audienceRu: 'Финансовые директора, руководители финансовых служб, собственники и предприниматели',
      audienceEn: 'CFOs, heads of finance functions, owners and entrepreneurs',
    },
  ]

  for (const p of programData) {
    await prisma.program.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    })
  }

  // ---------------------------------------------------------------------------
  // Faculty
  // ---------------------------------------------------------------------------
  // Faculty roster mirrors the official program decks. Roles are grouped by
  // `order` ranges so the Faculty page can render headed sections without a
  // schema change: 1–99 lecturers, 100–199 trackers, 200–299 international experts.
  const facultyData = [
    // ----- Преподаватели программы (lecturers) — order 1–99 -----
    {
      slug: 'irina-gerasimenko',
      brand: 'MBA',
      order: 1,
      published: true,
      nameRu: 'Ирина Герасименко',
      nameEn: 'Irina Gerasimenko',
      titleRu: 'Эксперт по стратегической трансформации и управлению изменениями',
      titleEn: 'Expert in strategic transformation and change management',
      bioRu:
        'Более 16 лет в стратегической трансформации компаний с оборотами до 20 млрд ₽ в год. Ведёт блок лидерства и управления изменениями.',
      bioEn:
        'More than 16 years in the strategic transformation of companies with annual turnover of up to 20 billion roubles. She leads the leadership and change-management block.',
      field: 'Стратегия',
    },
    {
      slug: 'olga-vasilieva',
      brand: 'MBA',
      order: 2,
      published: true,
      nameRu: 'Ольга Васильева',
      nameEn: 'Olga Vasilieva',
      titleRu: 'Старший преподаватель',
      titleEn: 'Senior lecturer',
      bioRu:
        'Автор и ведущий цикла тренингов по развитию интеллектуального потенциала и личной эффективности.',
      bioEn:
        'Author and host of a series of trainings on developing intellectual potential and personal effectiveness.',
      field: 'Личная эффективность',
    },
    {
      slug: 'anna-pak',
      brand: 'MBA',
      order: 3,
      published: true,
      nameRu: 'Анна Пак',
      nameEn: 'Anna Pak',
      titleRu: 'Эксперт по таможенно-тарифному регулированию',
      titleEn: 'Expert in customs and tariff regulation',
      bioRu:
        'Евразийская экономическая комиссия, Департамент промышленной политики.',
      bioEn:
        'Eurasian Economic Commission, Department of Industrial Policy.',
      field: 'ВЭД',
    },
    {
      slug: 'nikolay-shilkin',
      brand: 'MBA',
      order: 4,
      published: true,
      nameRu: 'Николай Шилкин',
      nameEn: 'Nikolay Shilkin',
      titleRu: 'Консультант по выходу на глобальные рынки',
      titleEn: 'Consultant on entering global markets',
      bioRu:
        'Консультирует работающие в России транснациональные корпорации и российские компании, выходящие на глобальный рынок.',
      bioEn:
        'Advises transnational corporations operating in Russia and Russian companies expanding into global markets.',
      field: 'Международный бизнес',
    },
    {
      slug: 'igor-korneev',
      brand: 'MBA',
      order: 5,
      published: true,
      nameRu: 'Игорь Корнеев',
      nameEn: 'Igor Korneev',
      titleRu: 'Кандидат военных наук, доцент',
      titleEn: 'PhD, associate professor',
      bioRu:
        'Опыт реализации консалтинговых проектов в сфере продаж и логистического сервиса.',
      bioEn:
        'Experience delivering consulting projects in sales and logistics services.',
      field: 'Продажи и логистика',
    },
    {
      slug: 'denis-channov',
      brand: 'MBA',
      order: 6,
      published: true,
      nameRu: 'Денис Чаннов',
      nameEn: 'Denis Channov',
      titleRu: 'Серийный предприниматель, эксперт по международному экспорту',
      titleEn: 'Serial entrepreneur, international export expert',
      bioRu:
        'Эксперт-практик по международному экспорту в акселераторах МИК, МЭЦ, Уралсиб, ТМК и др.',
      bioEn:
        'A hands-on international-export expert in the MIK, MEC, Uralsib and TMK accelerators and others.',
      field: 'Международный экспорт',
    },

    // ----- Трекеры программы (trackers) — order 100–199 -----
    {
      slug: 'natalia-starostina',
      brand: 'ACCELERATOR',
      order: 101,
      published: true,
      nameRu: 'Наталья Старостина',
      nameEn: 'Natalia Starostina',
      titleRu: 'Ведущий трекер программы',
      titleEn: 'Lead program tracker',
      bioRu:
        'Сооснователь Hop.Agency, управляющий партнёр программ скаутинга, акселерации и вывода на международный рынок венчурного билдера UDT/X, совладелец клуба венчурных инвесторов Venture Games.',
      bioEn:
        'Co-founder of Hop.Agency, managing partner of scouting, acceleration and international market-entry programs at the UDT/X venture builder, and co-owner of the Venture Games investor club.',
      field: 'Трекинг',
    },
    {
      slug: 'leonid-larshin',
      brand: 'ACCELERATOR',
      order: 102,
      published: true,
      nameRu: 'Леонид Ларшин',
      nameEn: 'Leonid Larshin',
      titleRu: 'Executive-трекер',
      titleEn: 'Executive tracker',
      bioRu:
        'Трекер года 2020 в номинации «Трекинговые инструменты в управлении».',
      bioEn:
        'Tracker of the Year 2020 in the “Tracking tools in management” category.',
      field: 'Трекинг',
    },
    {
      slug: 'oleg-akulov',
      brand: 'ACCELERATOR',
      order: 103,
      published: true,
      nameRu: 'Олег Акулов',
      nameEn: 'Oleg Akulov',
      titleRu: 'Ведущий трекер и эксперт',
      titleEn: 'Lead tracker and expert',
      bioRu:
        'Эксперт акселераторов ФРИИ, ФинтехЛаб, Start Hub, ФПСП. 10 лет в e-commerce.',
      bioEn:
        'An expert in the IIDF, FintechLab, Start Hub and FPSP accelerators. 10 years in e-commerce.',
      field: 'Акселерация · e-commerce',
    },
    {
      slug: 'sergey-vasiliev',
      brand: 'ACCELERATOR',
      order: 104,
      published: true,
      nameRu: 'Сергей Васильев',
      nameEn: 'Sergey Vasiliev',
      titleRu: 'Венчурный партнёр',
      titleEn: 'Venture partner',
      bioRu:
        'Венчурный партнёр фондов Yellow Rockets и Friendly VC, ассоциированный партнёр O2Консалтинг по венчурным инвестициям и корпоративным инновациям.',
      bioEn:
        'Venture partner at the Yellow Rockets and Friendly VC funds and an associate partner at O2Consulting for venture investment and corporate innovation.',
      field: 'Венчурные инвестиции',
    },
    {
      slug: 'gadzhimurad-aliev',
      brand: 'ACCELERATOR',
      order: 105,
      published: true,
      nameRu: 'Гаджимурад Алиев',
      nameEn: 'Gadzhimurad Aliev',
      titleRu: 'Предприниматель, инноватор',
      titleEn: 'Entrepreneur, innovator',
      bioRu:
        'Более 10 лет в венчурной индустрии. Сооснователь комьюнити предпринимателей и инвесторов GoAsia.club.',
      bioEn:
        'More than 10 years in the venture industry. Co-founder of the GoAsia.club community of entrepreneurs and investors.',
      field: 'Венчур',
    },
    {
      slug: 'lyudmila-bulavkina',
      brand: 'ACCELERATOR',
      order: 106,
      published: true,
      nameRu: 'Людмила Булавкина',
      nameEn: 'Lyudmila Bulavkina',
      titleRu: 'Стратегический консультант',
      titleEn: 'Strategic consultant',
      bioRu:
        'Серийный предприниматель, бизнес-ангел.',
      bioEn:
        'Serial entrepreneur and business angel.',
      field: 'Акселерация',
    },
    {
      slug: 'dmitry-korobtsev',
      brand: 'ACCELERATOR',
      order: 107,
      published: true,
      nameRu: 'Дмитрий Коробцев',
      nameEn: 'Dmitry Korobtsev',
      titleRu: 'Эксперт по продажам',
      titleEn: 'Sales expert',
      bioRu:
        'Управлял командами продаж в Google, Cisco, Microsoft, Canon, HP, Avaya, Adobe, Citrix в РФ, СНГ и Европе. 5+ лет работает с edtech-, fintech-, e-commerce-, retail- и foodtech-стартапами в Индии, Европе, США и Латинской Америке.',
      bioEn:
        'Led sales teams at Google, Cisco, Microsoft, Canon, HP, Avaya, Adobe and Citrix across Russia, the CIS and Europe. For 5+ years he has worked with edtech, fintech, e-commerce, retail and foodtech startups in India, Europe, the US and Latin America.',
      field: 'Продажи',
    },
    {
      slug: 'inna-nosivskaya',
      brand: 'ACCELERATOR',
      order: 108,
      published: true,
      nameRu: 'Инна Носивская',
      nameEn: 'Inna Nosivskaya',
      titleRu: 'Наставник продуктовых команд',
      titleEn: 'Product team mentor',
      bioRu:
        'Трекер в федеральных проектах национальной программы «Цифровая экономика Российской Федерации».',
      bioEn:
        'A tracker in federal projects of the national program “Digital Economy of the Russian Federation”.',
      field: 'Продукт',
    },
    {
      slug: 'dmitry-morozov',
      brand: 'ACCELERATOR',
      order: 109,
      published: true,
      nameRu: 'Дмитрий Морозов',
      nameEn: 'Dmitry Morozov',
      titleRu: 'Ведущий трекер ФРИИ',
      titleEn: 'Lead IIDF tracker',
      bioRu:
        'Корпоративный трекер «Северстали», коуч PCC ICF.',
      bioEn:
        'Corporate tracker at Severstal and a PCC ICF coach.',
      field: 'Трекинг',
    },
    {
      slug: 'alexander-pustovit',
      brand: 'ACCELERATOR',
      order: 110,
      published: true,
      nameRu: 'Александр Пустовит',
      nameEn: 'Alexander Pustovit',
      titleRu: 'Управляющий партнёр Product.Vision',
      titleEn: 'Managing partner at Product.Vision',
      bioRu:
        'Ex-PwC, Deutsche Bank, ведущий трекер ФРИИ. Главный методолог корпоративных программ в Stanford Online.',
      bioEn:
        'Ex-PwC and Deutsche Bank, a lead IIDF tracker and chief methodologist of corporate programs at Stanford Online.',
      field: 'Методология',
    },
    {
      slug: 'olga-elina',
      brand: 'ACCELERATOR',
      order: 111,
      published: true,
      nameRu: 'Ольга Елина',
      nameEn: 'Olga Elina',
      titleRu: 'Ведущий трекер и эксперт',
      titleEn: 'Lead tracker and expert',
      bioRu:
        'Эксперт акселераторов ФРИИ, ФинтехЛаб, Start Hub, ФПСП. 10 лет в e-commerce.',
      bioEn:
        'An expert in the IIDF, FintechLab, Start Hub and FPSP accelerators. 10 years in e-commerce.',
      field: 'Акселерация · e-commerce',
    },

    // ----- Международные эксперты (international experts) — order 200–299 -----
    {
      slug: 'joaquin-costa',
      brand: 'ACCELERATOR',
      order: 201,
      published: true,
      nameRu: 'Хоакин Коста',
      nameEn: 'Joaquin Costa',
      titleRu: 'Управляющий партнёр ROSVC',
      titleEn: 'Managing partner at ROSVC',
      bioRu:
        'Более 13 лет в международном развитии стартапов, в частности в регионе Латинской Америки.',
      bioEn:
        'More than 13 years in the international development of startups, particularly in the LATAM region.',
      field: 'Международное развитие · LATAM',
    },
    {
      slug: 'vandana-mathur-dol',
      brand: 'ACCELERATOR',
      order: 202,
      published: true,
      nameRu: 'Вандана Матур-Дол',
      nameEn: 'Vandana Mathur-Dol',
      titleRu: 'Операционный директор ID Capital',
      titleEn: 'COO at ID Capital',
      bioRu:
        'Эксперт в фуд- и агротехнологиях, SmartCity и промышленных технологиях. Руководитель GROW Impact (Юго-Восточная Азия).',
      bioEn:
        'An expert in food and agritech, SmartCity and industrial technologies. Head of GROW Impact (South-East Asia).',
      field: 'AgriTech · Юго-Восточная Азия',
    },
    {
      slug: 'walter-heredia',
      brand: 'ACCELERATOR',
      order: 203,
      published: true,
      nameRu: 'Вальтер Хередиа',
      nameEn: 'Walter Heredia',
      titleRu: 'Тренер по предпринимательству',
      titleEn: 'Entrepreneurship coach',
      bioRu:
        'Тренер Национального института предпринимательства Мексики, экс-коммерческий директор PwC Мексика. Большой опыт работы со стартапами, МСП и ТНК.',
      bioEn:
        'A coach at Mexico’s National Institute of Entrepreneurship and former commercial director of PwC Mexico, with extensive experience working with startups, SMEs and multinationals.',
      field: 'Стартапы · Мексика',
    },
    {
      slug: 'sanjar-taromi',
      brand: 'ACCELERATOR',
      order: 204,
      published: true,
      nameRu: 'Санжар Тароми',
      nameEn: 'Sanjar Taromi',
      titleRu: 'Серийный предприниматель, ex-PnP',
      titleEn: 'Serial entrepreneur, ex-PnP',
      bioRu:
        'Развивал партнёрства по всему миру с ключевыми игроками в области фудтеха.',
      bioEn:
        'Built partnerships worldwide with key players in the foodtech space.',
      field: 'FoodTech · Иран',
    },
    {
      slug: 'mohammed-fahmy',
      brand: 'ACCELERATOR',
      order: 205,
      published: true,
      nameRu: 'Мохаммед Фами',
      nameEn: 'Mohammed Fahmy',
      titleRu: 'Венчурный инвестор, партнёр Sequence VC',
      titleEn: 'Venture investor, partner at Sequence VC',
      bioRu:
        'Опыт слияний и поглощений, управления жизненным циклом продуктов, операциями, производством и продажами.',
      bioEn:
        'Experience in M&A, product lifecycle management, operations, manufacturing and sales.',
      field: 'M&A · Египет',
    },
    {
      slug: 'jack-veledian',
      brand: 'ACCELERATOR',
      order: 206,
      published: true,
      nameRu: 'Джек Веледиан',
      nameEn: 'Jack Veledian',
      titleRu: 'Серийный предприниматель, ex-PnP ADGM',
      titleEn: 'Serial entrepreneur, ex-PnP ADGM',
      bioRu:
        'Экс-руководитель программ Plug and Play ADGM, опытный генеральный директор с экспертизой в ИТ, услугах и продажах.',
      bioEn:
        'Former head of Plug and Play ADGM programs and an experienced CEO with expertise in IT, services and sales.',
      field: 'IT и продажи · ОАЭ',
    },
  ]

  for (const f of facultyData) {
    // Lecturers and trackers (order < 200) have portrait photos extracted from
    // the program deck; international experts (order >= 200) do not.
    const withPhoto = { ...f, photo: f.order < 200 ? `/images/faculty/${f.slug}.png` : null }
    await prisma.faculty.upsert({
      where: { slug: f.slug },
      update: withPhoto,
      create: withPhoto,
    })
  }

  // ---------------------------------------------------------------------------
  // Partners
  // ---------------------------------------------------------------------------
  const partnerData = [
    {
      slug: 'russian-railways',
      order: 1,
      published: true,
      name: 'РЖД',
      descRu: 'Крупнейший работодатель страны и партнёр по корпоративным образовательным программам.',
      descEn: 'One of the country\'s largest employers and a partner in corporate education programs.',
    },
    {
      slug: 'sber',
      order: 2,
      published: true,
      name: 'Сбербанк',
      descRu: 'Технологический и финансовый партнёр, поставщик практических кейсов для слушателей.',
      descEn: 'A technology and financial partner that supplies real cases for students.',
    },
    {
      slug: 'rostelecom',
      order: 3,
      published: true,
      name: 'Ростелеком',
      logo: '/images/partners/rostelecom.png',
      descRu: 'Партнёр по проектам в области цифровизации и телекоммуникаций.',
      descEn: 'A partner on projects in digitalisation and telecommunications.',
    },
    {
      slug: 'gazprom',
      order: 4,
      published: true,
      name: 'Газпром',
      logo: '/images/partners/gazprom.png',
      descRu: 'Партнёр по подготовке управленческих кадров для отрасли.',
      descEn: 'A partner in training management talent for the industry.',
    },
    {
      slug: 'yandex',
      order: 5,
      published: true,
      name: 'Яндекс',
      descRu: 'Технологический партнёр по проектам в области данных и цифровых сервисов.',
      descEn: 'A technology partner on data and digital-services projects.',
    },
    {
      slug: 'vtb',
      order: 6,
      published: true,
      name: 'ВТБ',
      descRu: 'Финансовый партнёр программ и поставщик практических кейсов.',
      descEn: 'A financial partner of the programs and a source of practical cases.',
    },
    {
      slug: 'rosseti',
      order: 7,
      published: true,
      name: 'Россети',
      descRu: 'Индустриальный партнёр по подготовке управленческих кадров.',
      descEn: 'An industrial partner in training management talent.',
    },
  ]

  for (const p of partnerData) {
    await prisma.partner.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    })
  }

  // ---------------------------------------------------------------------------
  // Posts
  // ---------------------------------------------------------------------------
  const postData = [
    // ----- СМИ о нас / In the media -----
    {
      slug: 'berezin-m24-povyshenie-kvalifikacii',
      coverImage: '/images/lecture.jpg',
      locale: 'RU',
      type: 'EXPERT_COMMENT',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: true,
      title: 'Москва 24: как часто нужно повышать квалификацию — мнение директора программ MBA РУДН',
      excerpt:
        'Директор программ MBA Института мировой экономики и бизнеса РУДН Андрей Березин рассказал телеканалу «Москва 24», почему специалистам важно проходить переквалификацию не реже одного раза в три года.',
      content: `Директор программ MBA Института мировой экономики и бизнеса РУДН **Андрей Березин** в эфире телеканала «Москва 24» рассказал, как часто специалистам стоит обновлять знания.

По мнению эксперта, проходить переквалификацию стоит **не реже одного раза в три года** — особенно в динамичных отраслях: ИТ, образовании, науке и финансовом секторе. При этом систематически повышают квалификацию лишь 11–13% занятых, отметил Андрей Березин.

[Смотреть материал на «Москва 24» →](https://www.m24.ru/videos/25122025/859205)`,
      categoryId: categories['media'].id,
      authorName: 'РУДН в СМИ',
      tagSlugs: ['leadership', 'strategy'],
      publishedAt: new Date('2025-12-25T09:00:00.000Z'),
    },
    {
      slug: 'rbc-berezin-rynok-stroymaterialov',
      coverImage: '/images/h-build.jpg',
      locale: 'RU',
      type: 'EXPERT_COMMENT',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: false,
      title: 'РБК: руководитель программ MBA РУДН Андрей Березин — о рынке стройматериалов',
      excerpt:
        'Руководитель программ MBA РУДН Андрей Березин выступил экспертом РБК в материале о росте цен на строительные материалы.',
      content: `Руководитель программ MBA РУДН **Андрей Березин** прокомментировал РБК ситуацию на рынке строительных материалов: издание разбирало причины заметного роста цен на керамоблоки и другие материалы в регионах.

Экспертные комментарии преподавателей и руководителей программ — часть повседневной работы школы: наши спикеры регулярно выступают в деловых СМИ.

[Читать материал на РБК →](https://t.rbc.ru/tyumen/04/05/2025/6808b7c59a7947acfdfb9327)`,
      categoryId: categories['media'].id,
      authorName: 'РУДН в СМИ',
      tagSlugs: ['strategy'],
      publishedAt: new Date('2025-05-04T09:00:00.000Z'),
    },
    {
      slug: 'forbes-biznes-i-uchenye',
      coverImage: '/images/h-libdark.jpg',
      locale: 'RU',
      type: 'ARTICLE',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: false,
      title: 'Forbes: почему бизнес и учёные не находят общего языка',
      excerpt:
        'Материал Forbes о разрыве между академической средой и бизнесом — тема, на которую напрямую отвечает практико-ориентированный подход бизнес-школы РУДН.',
      content: `Forbes в статье «Университет монстров: почему бизнес и учёные не находят общего языка» (автор Павел Кошкин) разбирает давнюю проблему: университеты часто готовят теоретиков, а бизнесу нужны быстрые прикладные результаты — и стороны говорят на разных языках.

Именно этот разрыв бизнес-школа РУДН старается закрывать на практике: программы ведут действующие руководители и эксперты, а слушатели работают над задачами собственных компаний, а не над абстрактными кейсами. Исследования центра ICEMR при этом напрямую питают учебные программы.

[Читать статью на Forbes →](https://www.forbes.ru/kompanii/342707-universitet-monstrov-pochemu-biznes-i-uchenye-ne-nahodyat-obshchego-yazyka)`,
      categoryId: categories['media'].id,
      authorName: 'Бизнес-школа РУДН',
      tagSlugs: ['strategy', 'leadership'],
      publishedAt: new Date('2017-04-17T09:00:00.000Z'),
    },
    {
      slug: 'berezin-moskva24-continuing-education',
      coverImage: '/images/lecture.jpg',
      locale: 'EN',
      type: 'EXPERT_COMMENT',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: true,
      title: 'Moskva 24: how often should you upskill — the view of RUDN’s MBA program director',
      excerpt:
        'Andrey Berezin, director of MBA programs at the RUDN Institute of World Economy and Business, told the Moskva 24 channel why professionals should requalify at least once every three years.',
      content: `**Andrey Berezin**, director of MBA programs at the RUDN Institute of World Economy and Business (IMEB), spoke on the Moskva 24 channel about how often specialists should refresh their knowledge.

In his view, professionals should requalify **at least once every three years** — especially in fast-moving fields such as IT, education, science and finance. Yet only 11–13% of the workforce upskill systematically, he noted.

[Watch on Moskva 24 →](https://www.m24.ru/videos/25122025/859205)`,
      categoryId: categories['media'].id,
      authorName: 'RUDN in the media',
      tagSlugs: ['leadership', 'strategy'],
      publishedAt: new Date('2025-12-25T09:00:00.000Z'),
    },
    {
      slug: 'rbc-berezin-construction-materials',
      coverImage: '/images/h-build.jpg',
      locale: 'EN',
      type: 'EXPERT_COMMENT',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: false,
      title: 'RBC: head of RUDN MBA programs Andrey Berezin on the construction-materials market',
      excerpt:
        'Andrey Berezin, head of MBA programs at RUDN, commented for RBC on rising prices in the construction-materials market.',
      content: `Andrey Berezin, head of MBA programs at RUDN, commented for RBC on the construction-materials market as the outlet examined the sharp rise in prices for ceramic blocks and other materials across the regions.

Expert commentary from the school’s lecturers and program leads is part of everyday work: our speakers appear regularly in business media.

[Read on RBC →](https://t.rbc.ru/tyumen/04/05/2025/6808b7c59a7947acfdfb9327)`,
      categoryId: categories['media'].id,
      authorName: 'RUDN in the media',
      tagSlugs: ['strategy'],
      publishedAt: new Date('2025-05-04T09:00:00.000Z'),
    },
    {
      slug: 'forbes-business-and-academia',
      coverImage: '/images/h-libdark.jpg',
      locale: 'EN',
      type: 'ARTICLE',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: false,
      title: 'Forbes: why business and academia don’t speak the same language',
      excerpt:
        'A Forbes piece on the gap between academia and business — exactly the gap RUDN Business School’s practice-first approach is built to close.',
      content: `In the article “University of monsters: why business and scientists don’t find common ground” (by Pavel Koshkin), Forbes examines a long-standing problem: universities often train theorists, while business needs fast, applied results — and the two sides speak different languages.

RUDN Business School works to close exactly this gap in practice: programs are taught by working executives and experts, and students work on their own companies’ challenges rather than abstract cases. Research from the ICEMR centre feeds directly into the curriculum.

[Read on Forbes →](https://www.forbes.ru/kompanii/342707-universitet-monstrov-pochemu-biznes-i-uchenye-ne-nahodyat-obshchego-yazyka)`,
      categoryId: categories['media'].id,
      authorName: 'RUDN Business School',
      tagSlugs: ['strategy', 'leadership'],
      publishedAt: new Date('2017-04-17T09:00:00.000Z'),
    },
    {
      slug: 'nabor-na-programmy-mba-rudn-2025',
      coverImage: '/images/campus2.jpg',
      locale: 'RU',
      type: 'NEWS',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: true,
      title: 'Открыт набор на программы MBA РУДН',
      excerpt:
        'Бизнес-школа РУДН запускает новый поток программ MBA. Занятия стартуют осенью, заявки принимаются уже сейчас.',
      content: `Бизнес-школа РУДН объявляет о старте нового потока программ MBA. Учиться можно очно в московском кампусе или полностью онлайн — выбор остаётся за слушателем.

## Кого мы ждём

В этом потоке мы по-прежнему делаем ставку на практику. Программа подойдёт тем, кто уже управляет людьми и бюджетами:

- руководителям, которым нужен системный взгляд на бизнес;
- предпринимателям, переходящим от ручного управления к процессам;
- консультантам, которые хотят усилить экспертизу.

## Что нового

Мы обновили блоки по финансам и работе с международными рынками — с учётом того, как изменилась повестка за последний год. Преподают действующие управленцы и эксперты, поэтому кейсы берутся из реальной практики, а не из учебников.

## Как поступить

Оставьте заявку на сайте, и приёмная комиссия свяжется с вами, чтобы обсудить вашу задачу и подобрать формат. Количество мест в потоке ограничено.`,
      categoryId: categories['university-news'].id,
      authorName: 'Приёмная комиссия',
      tagSlugs: ['strategy', 'leadership'],
      publishedAt: new Date('2026-05-20T09:00:00.000Z'),
    },
    {
      slug: 'kak-akselerator-pomogaet-masshtabirovatsya',
      coverImage: '/images/h-audi.jpg',
      locale: 'RU',
      type: 'ARTICLE',
      brand: 'ACCELERATOR',
      status: 'PUBLISHED',
      featured: true,
      title: 'Как акселератор помогает предпринимателям масштабироваться',
      excerpt:
        'Разбираем, что такое трекинг и почему работа с трекером часто даёт больше, чем месяцы самостоятельных экспериментов.',
      content: `Многие предприниматели застревают не потому, что им не хватает знаний, а потому, что не видят, какое действие сейчас важнее остальных. Именно здесь помогает акселератор и метод трекинга.

## Что такое трекинг

Трекер — это не консультант, который раздаёт готовые ответы. Его задача — помочь основателю самому увидеть узкое место и сфокусироваться на нём. Работа строится короткими циклами:

- формулируем гипотезу роста;
- определяем, как её быстро и дёшево проверить;
- смотрим на результат и решаем, что делать дальше.

## Почему это работает

Главный эффект — фокус. Вместо десяти параллельных дел команда выбирает одно, от которого реально зависит выручка, и доводит его до результата. Регулярные встречи с трекером не дают расфокусироваться и откладывать неудобные решения.

## Чем это отличается от обычной учёбы

На программе Master of Business Acceleration теория сразу проверяется на вашем бизнесе. Вы уходите не с конспектом, а с проверенными гипотезами и понятным следующим шагом.`,
      categoryId: categories['acceleration'].id,
      authorName: 'Команда акселератора',
      tagSlugs: ['scaling', 'leadership'],
      publishedAt: new Date('2026-03-12T10:00:00.000Z'),
    },
    {
      slug: 'what-makes-emerging-markets-different-for-scaling',
      coverImage: '/images/h-glass.jpg',
      locale: 'EN',
      type: 'ARTICLE',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: false,
      title: 'What makes emerging markets different for scaling companies',
      excerpt:
        'Playbooks written for mature markets often break in emerging economies. Here is what changes and why it matters for growth.',
      content: `Companies that scaled smoothly at home are often surprised by how differently emerging markets behave. The product may be the same, but the conditions around it are not.

## The rules of the game shift

In many emerging markets, formal institutions are still maturing, so trust, relationships and local partnerships carry more weight than a polished contract. Distribution can be fragmented, payment habits differ, and regulation may change faster than a quarterly plan assumes.

## Where growth assumptions break

- Unit economics that work in one country rarely transfer unchanged.
- Customer acquisition channels that are saturated elsewhere can still be cheap and effective.
- Talent and infrastructure constraints shape how fast you can actually grow.

## What this means in practice

Successful expansion is less about copying a global playbook and more about learning the local logic quickly. Teams that treat each market as its own problem — testing pricing, channels and partnerships locally — tend to avoid the expensive mistakes that come from assuming the world is uniform.

This is the kind of question we study at ICEMR and bring back into the classroom.`,
      categoryId: categories['emerging-markets'].id,
      authorName: 'ICEMR Research Team',
      tagSlugs: ['scaling', 'international'],
      publishedAt: new Date('2026-02-05T09:00:00.000Z'),
    },
    {
      slug: 'rudn-global-expansion-vyhod-na-mezhdunarodnye-rynki',
      coverImage: '/images/h-build.jpg',
      locale: 'RU',
      type: 'ARTICLE',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: false,
      title: 'RUDN Global Expansion: как вывести компанию на международные рынки',
      excerpt:
        'Программа под запрос для команд, которые планируют экспансию. Рассказываем, из чего складывается дорожная карта выхода на новый рынок.',
      content: `Выход на международный рынок редко срывается из-за плохого продукта. Чаще мешает то, что компания приходит без понимания местной логики — регуляторики, каналов, привычек клиента. Программа RUDN Global Expansion помогает собрать этот контекст заранее.

## Как устроена программа

RUDN Global Expansion разрабатывается под конкретную компанию: мы отталкиваемся от вашей отрасли, географии и стадии. Занятия проходят очно и онлайн, в удобном для команды графике.

## Что входит в работу

- анализ целевых рынков и приоритизация;
- юридические и налоговые аспекты выхода;
- локализация продукта и маркетинга;
- поиск партнёров и выстраивание каналов.

К работе подключаются преподаватели и эксперты с реальным опытом сделок в СНГ, Европе, на Ближнем Востоке и в Латинской Америке. На выходе у команды — проработанный план выхода на рынок с оценкой рисков и бюджета.`,
      categoryId: categories['emerging-markets'].id,
      authorName: 'Бизнес-школа РУДН',
      tagSlugs: ['international', 'strategy'],
      publishedAt: new Date('2026-03-02T09:00:00.000Z'),
    },
    {
      slug: 'chetyre-bloka-programmy-akseleratsii',
      coverImage: '/images/accelerator.jpg',
      locale: 'RU',
      type: 'ARTICLE',
      brand: 'ACCELERATOR',
      status: 'PUBLISHED',
      featured: false,
      title: 'Четыре блока за 18 месяцев: как устроена программа акселерации',
      excerpt:
        'Master of Business Acceleration — это не лекции, а последовательная перестройка бизнеса по четырём блокам. Разбираем логику программы.',
      content: `Программа Master of Business Acceleration длится 18 месяцев и собрана из четырёх акселерационных блоков. Каждый блок — это не просто тема, а этап, на котором вы меняете что-то конкретное в своём бизнесе.

## Логика программы

- **Лидерство и управление изменениями.** Учимся управлять компанией и людьми в условиях неопределённости.
- **Масштабирование.** Стратегия, финансы, процессы, антикризисное управление.
- **Устойчивый рост.** Операционка, data-driven решения, искусственный интеллект, маркетинг.
- **Выход на новые рынки.** Международный бизнес, кросс-культурный менеджмент, выездные модули.

## Что вы делаете между блоками

Между очными сессиями вы работаете с личным трекером, проверяете гипотезы и внедряете изменения. Поэтому к концу программы у вас не конспект, а собранная и уже частично реализованная стратегия роста.`,
      categoryId: categories['acceleration'].id,
      authorName: 'Команда акселератора',
      tagSlugs: ['scaling', 'strategy'],
      publishedAt: new Date('2026-01-15T09:00:00.000Z'),
    },
    {
      slug: 'data-driven-i-ii-v-upravlenii',
      coverImage: '/images/h-libdark.jpg',
      locale: 'RU',
      type: 'ARTICLE',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: false,
      title: 'Data-driven мышление и искусственный интеллект в управлении',
      excerpt:
        'Данные и ИИ перестали быть темой только для технологических компаний. Рассказываем, как это меняет работу руководителя.',
      content: `Решения «на ощущениях» обходятся всё дороже. Руководителю сегодня важно не уметь программировать, а понимать, какие вопросы задавать данным и где искусственный интеллект реально экономит время.

## Что значит data-driven подход

Это привычка опираться на цифры там, где раньше полагались на интуицию: проверять гипотезы, считать юнит-экономику, смотреть на поведение клиентов, а не на собственные предположения о нём.

## Где помогает ИИ

- ускоряет рутинную аналитику и подготовку отчётов;
- помогает находить закономерности в больших объёмах данных;
- поддерживает решения в маркетинге, логистике и работе с клиентами.

На программах бизнес-школы РУДН эти инструменты разбираются на уровне управленческих решений — без лишней технической глубины, но с понятной отдачей для бизнеса.`,
      categoryId: categories['business-education'].id,
      authorName: 'Бизнес-школа РУДН',
      tagSlugs: ['ai', 'strategy'],
      publishedAt: new Date('2026-04-08T09:00:00.000Z'),
    },
    {
      slug: 'soobshchestvo-i-status-vypusknika',
      coverImage: '/images/hero.jpg',
      locale: 'RU',
      type: 'ARTICLE',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: false,
      title: 'Что остаётся после программы: сообщество и статус выпускника',
      excerpt:
        'Обучение заканчивается, а доступ к среде — нет. Рассказываем, что получает выпускник бизнес-школы РУДН после программы.',
      content: `Часто самое ценное в бизнес-образовании начинается после выпуска — это люди и среда, которые остаются с вами надолго.

## Что получает выпускник

- статус Alumni и доступ к сообществу программы;
- пожизненный доступ к онлайн-базе знаний: презентации, фреймворки, шаблоны, кейсы;
- приглашения на летние и зимние бизнес-школы;
- приглашения на мастер-классы преподавателей и экспертов школы.

## Почему это важно

Бизнес-задачи не заканчиваются вместе с программой. Сообщество выпускников — это партнёры, клиенты, советчики и просто люди, которые проходили через похожие решения. Доступ к ним нередко окупает обучение быстрее, чем сами знания.`,
      categoryId: categories['mba-education'].id,
      authorName: 'Бизнес-школа РУДН',
      tagSlugs: ['leadership', 'strategy'],
      publishedAt: new Date('2026-04-22T09:00:00.000Z'),
    },
    {
      slug: 'cross-cultural-management-core-skill',
      coverImage: '/images/h-grad.jpg',
      locale: 'EN',
      type: 'ARTICLE',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: false,
      title: 'Cross-cultural management: a core skill for international business',
      excerpt:
        'As companies expand across borders, the hardest problems are rarely technical. They are about people who work by different rules.',
      content: `When a company enters a new market, the product is usually the easy part. The harder work is managing people and partners who grew up with different assumptions about hierarchy, feedback and time.

## Why culture shows up in business results

- Negotiations stall when each side reads silence and directness differently.
- Teams underperform when feedback norms clash.
- Partnerships break down over expectations that were never spoken aloud.

## What good managers do differently

They stop treating their own way of working as the default. They learn the local logic, adapt how they communicate, and build trust before pushing for outcomes. These skills are practised directly in RUDN's international modules and studied at the ICEMR research center.`,
      categoryId: categories['business-education'].id,
      authorName: 'ICEMR Research Team',
      tagSlugs: ['international', 'leadership'],
      publishedAt: new Date('2026-06-05T09:00:00.000Z'),
    },
  ]

  for (const p of postData) {
    const { tagSlugs, categoryId, ...rest } = p
    const connectTags = tagSlugs.map((s) => ({ id: tags[s].id }))
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {
        ...rest,
        authorId: admin.id,
        categoryId,
        tags: { set: connectTags },
      },
      create: {
        ...rest,
        authorId: admin.id,
        categoryId,
        tags: { connect: connectTags },
      },
    })
  }

  // ---------------------------------------------------------------------------
  // Publications
  // NOTE: these are illustrative sample records for demo/seed purposes only;
  // they are not real published papers and should be replaced with actual data.
  // ---------------------------------------------------------------------------
  const publicationData = [
    // Real journals / book series associated with ICEMR (from icemr.ru/publications).
    {
      slug: 'ijepee-journal',
      locale: 'EN',
      type: 'JOURNAL_ARTICLE',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: true,
      title: 'International Journal of Economic Policy in Emerging Economies',
      abstract:
        'A peer-reviewed international journal covering economic policy in emerging and developing economies. ICEMR researchers contribute articles and special issues. See the publisher for the full archive.',
      authorsText: 'Editorial board',
      year: 2022,
      venue: 'International Journal of Economic Policy in Emerging Economies',
      field: 'Emerging markets',
    },
    {
      slug: 'ijtgm-journal',
      locale: 'EN',
      type: 'JOURNAL_ARTICLE',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: true,
      title: 'International Journal of Trade and Global Markets',
      abstract:
        'A peer-reviewed international journal on international trade, global markets and their effects on emerging economies. ICEMR contributes research and editorial work.',
      authorsText: 'Editorial board',
      year: 2022,
      venue: 'International Journal of Trade and Global Markets',
      field: 'Trade & global markets',
    },
    {
      slug: 'isete-symposia-series',
      locale: 'EN',
      type: 'BOOK',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: true,
      title: 'International Symposia in Economic Theory and Econometrics',
      abstract:
        'An Emerald book series in economic theory and econometrics. Volumes collect research on emerging markets, finance and policy. Authors associated with the series include W. A. Barnett and B. S. Sergi.',
      authorsText: 'Barnett W. A. (ed.)',
      year: 2021,
      venue: 'Emerald Publishing',
      field: 'Economic theory & econometrics',
    },
    // Selected publications listed on icemr.ru/publications.
    {
      slug: 'barnett-chen-bifurcation-2015',
      locale: 'EN',
      type: 'JOURNAL_ARTICLE',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: false,
      title: 'Bifurcation of Macroeconometric Models and Robustness of Dynamical Inferences',
      abstract:
        'Foundations and Trends in Econometrics, Vol. 8, No. 1–2, pp. 1–144 (2015). DOI: 10.1561/0800000026.',
      authorsText: 'Barnett W. A., Chen G.',
      year: 2015,
      venue: 'Foundations and Trends in Econometrics',
      field: 'Economic theory & econometrics',
      doi: '10.1561/0800000026',
      externalUrl: 'http://dx.doi.org/10.1561/0800000026',
    },
    {
      slug: 'barnett-shilnikov-chaos-2022',
      locale: 'EN',
      type: 'JOURNAL_ARTICLE',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: false,
      title: 'Shilnikov Chaos, Low Interest Rates, and New Keynesian Macroeconomics',
      abstract:
        'Journal of Economic Dynamics and Control, Vol. 134, January 2022, pp. 1–17.',
      authorsText: 'Barnett W. A., Bella G., Ghosh T., Mattana P., Venturi B.',
      year: 2022,
      venue: 'Journal of Economic Dynamics and Control',
      field: 'Economic theory & econometrics',
    },
    {
      slug: 'sergi-future-russia-economy-2018',
      locale: 'EN',
      type: 'BOOK',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: false,
      title: "Exploring the Future of Russia's Economy and Markets: Towards Sustainable Economic Development",
      abstract: 'Edited volume published by Emerald Publishing Limited (2018).',
      authorsText: 'Sergi B. S. (ed.)',
      year: 2018,
      venue: 'Emerald Publishing Limited',
      field: 'Emerging markets',
    },
    {
      slug: 'sergi-modeling-economic-growth-2019',
      locale: 'EN',
      type: 'BOOK',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: false,
      title: 'Modeling Economic Growth in Contemporary Russia',
      abstract: 'Edited volume published by Emerald Publishing Limited (2019).',
      authorsText: 'Sergi B. S. (ed.)',
      year: 2019,
      venue: 'Emerald Publishing Limited',
      field: 'Emerging markets',
    },
    {
      slug: 'sergi-tech-smart-cities-2019',
      locale: 'EN',
      type: 'BOOK',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: false,
      title: 'Tech, Smart Cities, and Regional Development in Contemporary Russia',
      abstract: 'Edited volume published by Emerald Publishing Limited (2019).',
      authorsText: 'Sergi B. S. (ed.)',
      year: 2019,
      venue: 'Emerald Publishing Limited',
      field: 'Digital economy',
    },
    {
      slug: 'sergi-scanlon-entrepreneurship-development-2019',
      locale: 'EN',
      type: 'BOOK',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: false,
      title: 'Entrepreneurship and Development in the 21st Century',
      abstract: 'Edited volume published by Emerald Publishing Limited (2019).',
      authorsText: 'Sergi B. S., Scanlon C. C. (eds.)',
      year: 2019,
      venue: 'Emerald Publishing Limited',
      field: 'Emerging markets',
    },
    {
      slug: 'barnett-sergi-asia-pacific-finance-2019',
      locale: 'EN',
      type: 'BOOK',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: false,
      title: 'Asia-Pacific Contemporary Finance and Development',
      abstract: 'Edited volume published by Emerald Publishing Limited (2019).',
      authorsText: 'Barnett W. A., Sergi B. S. (eds.)',
      year: 2019,
      venue: 'Emerald Publishing Limited',
      field: 'Trade & global markets',
    },
    {
      slug: 'barnett-sergi-banking-finance-emerging-2018',
      locale: 'EN',
      type: 'BOOK',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: false,
      title: 'Banking and Finance Issues in Emerging Markets',
      abstract: 'Edited volume published by Emerald Publishing Limited (2018).',
      authorsText: 'Barnett W. A., Sergi B. S. (eds.)',
      year: 2018,
      venue: 'Emerald Publishing Limited',
      field: 'Emerging markets',
    },
  ]

  for (const pub of publicationData) {
    await prisma.publication.upsert({
      where: { slug: pub.slug },
      update: { ...pub, addedById: admin.id },
      create: { ...pub, addedById: admin.id },
    })
  }

  // ---------------------------------------------------------------------------
  // Legal pages
  // Bodies are TEMPLATE drafts and must be reviewed by the university's legal team.
  // ---------------------------------------------------------------------------
  const legalData = [
    {
      slug: 'privacy',
      titleRu: 'Политика конфиденциальности',
      titleEn: 'Privacy Policy',
      bodyRu: `> Оператор персональных данных — федеральное государственное автономное образовательное учреждение высшего образования «Российский университет дружбы народов имени Патриса Лумумбы» (РУДН). Полный официальный текст опубликован на сайте РУДН: [Политика в отношении обработки и защиты персональных данных](https://www.rudn.ru/personal-data-processing-and-protection-policy).

## Общие положения

Политика разработана в целях реализации требований законодательства Российской Федерации в области персональных данных и направлена на обеспечение защиты прав и свобод человека и гражданина при обработке его персональных данных. Обработка осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и иными нормативными правовыми актами, в том числе Федеральным законом от 29.12.2012 № 273-ФЗ «Об образовании в Российской Федерации».

## Цели и основания обработки

Персональные данные обрабатываются для выполнения возложенных на РУДН функций, полномочий и обязанностей, а также для связи по заявкам, поступающим через формы сайта, и информирования о программах. Конкретные цели обработки, категории субъектов и сроки хранения определяются локальными нормативными актами РУДН.

## Какие данные обрабатываются

Имя, контактный телефон, адрес электронной почты и иные данные, которые вы указываете в формах на сайте.

## Хранение и защита

Применяются организационные и технические меры защиты данных от несанкционированного доступа. Персональные данные хранятся на территории Российской Федерации; срок хранения определяется целями обработки, сроком действия правоотношений и требованиями законодательства. По достижении целей обработки данные уничтожаются.

## Права субъекта персональных данных

Вы вправе получать сведения об обработке своих данных, требовать их уточнения, блокирования или удаления, отозвать согласие на обработку, а также обжаловать действия оператора в Роскомнадзор или в суд. Запросы рассматриваются в установленные законом сроки.

## Официальный документ

Полный текст Политики РУДН публикуется в свободном доступе в разделе [«Сведения об образовательной организации»](https://www.rudn.ru/sveden/document). По вопросам обработки персональных данных можно обратиться по контактам, указанным в разделе «Контакты».`,
      bodyEn: `> The personal data operator is the Federal State Autonomous Educational Institution of Higher Education "Peoples' Friendship University of Russia named after Patrice Lumumba" (RUDN). The full official text is published on the RUDN website: [Personal Data Processing and Protection Policy](https://www.rudn.ru/personal-data-processing-and-protection-policy).

## General provisions

The Policy implements the requirements of Russian Federation law on personal data and is aimed at protecting the rights and freedoms of individuals when their personal data is processed. Processing is carried out in accordance with Federal Law No. 152-FZ of 27 July 2006 "On Personal Data" and other regulations, including Federal Law No. 273-FZ of 29 December 2012 "On Education in the Russian Federation".

## Purposes and legal basis

Personal data is processed to perform the functions, powers and duties of RUDN, as well as to respond to enquiries submitted through the website's forms and to provide information about programs. Specific purposes, categories of data subjects and retention periods are defined by RUDN's internal regulations.

## What data is processed

Your name, contact phone number, email address and other data you provide in the website's forms.

## Storage and protection

Organisational and technical measures are applied to protect data against unauthorised access. Personal data is stored within the Russian Federation; the retention period is determined by the purposes of processing, the duration of the relationship and legal requirements. Data is destroyed once the purposes of processing are met.

## Rights of the data subject

You have the right to obtain information about the processing of your data, to request its clarification, blocking or deletion, to withdraw your consent, and to appeal the operator's actions to Roskomnadzor or in court. Requests are handled within the time limits set by law.

## Official document

The full text of the RUDN Policy is publicly available in the [official information section](https://www.rudn.ru/sveden/document). For questions about personal data processing, please use the details in the Contacts section.`,
    },
    {
      slug: 'consent',
      titleRu: 'Согласие на обработку персональных данных',
      titleEn: 'Personal Data Processing Consent',
      bodyRu: `> Оператор — РУДН (Российский университет дружбы народов имени Патриса Лумумбы). Согласие даётся в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных». См. [Политику РУДН в отношении обработки персональных данных](https://www.rudn.ru/personal-data-processing-and-protection-policy).

## Предмет согласия

Отправляя форму на сайте, вы даёте оператору (РУДН) согласие на обработку указанных вами персональных данных.

## Перечень данных

Имя, номер телефона, адрес электронной почты и иные данные, переданные через формы сайта.

## Действия с данными и цели

Согласие распространяется на сбор, запись, систематизацию, хранение, использование, передачу уполномоченным лицам и удаление данных в целях обработки ваших обращений и заявок, а также информирования о программах. Обработка ведётся на территории Российской Федерации.

## Срок действия и отзыв

Согласие действует до достижения целей обработки или до момента его отзыва. Отозвать согласие можно, направив обращение по контактам, указанным на сайте.`,
      bodyEn: `> The operator is RUDN (Peoples' Friendship University of Russia named after Patrice Lumumba). Consent is given in accordance with Federal Law No. 152-FZ of 27 July 2006 "On Personal Data". See the [RUDN Personal Data Policy](https://www.rudn.ru/personal-data-processing-and-protection-policy).

## Subject of consent

By submitting a form on the website, you give the operator (RUDN) your consent to process the personal data you provide.

## Scope of data

Your name, phone number, email address and other data submitted through the website's forms.

## Actions with data and purposes

The consent covers the collection, recording, organisation, storage, use, transfer to authorised persons and deletion of data for the purpose of handling your enquiries and applications and informing you about programs. Processing takes place within the Russian Federation.

## Validity and withdrawal

The consent remains valid until the purposes of processing are met or until it is withdrawn. You may withdraw consent by sending a request to the contacts listed on the website.`,
    },
    {
      slug: 'cookie',
      titleRu: 'Политика использования cookie',
      titleEn: 'Cookie Policy',
      bodyRu: `> Сайт принадлежит РУДН. Обработка данных, собираемых с помощью cookie, ведётся в соответствии с [Политикой РУДН в отношении обработки персональных данных](https://www.rudn.ru/personal-data-processing-and-protection-policy).

## Что такое cookie

Cookie — это небольшие файлы, которые сохраняются в вашем браузере при посещении сайта и помогают ему работать корректно.

## Как мы используем cookie

Cookie применяются, чтобы запоминать ваши настройки, анализировать посещаемость и улучшать работу сайта.

## Аналитика

Сайт может использовать сервисы веб-аналитики, которые собирают обезличенную статистику о посещениях.

## Управление cookie

Вы можете отключить или удалить cookie в настройках браузера. При этом часть функций сайта может работать некорректно.`,
      bodyEn: `> The website belongs to RUDN. Data collected via cookies is processed in accordance with the [RUDN Personal Data Policy](https://www.rudn.ru/personal-data-processing-and-protection-policy).

## What cookies are

Cookies are small files stored in your browser when you visit the website that help it work correctly.

## How we use cookies

Cookies are used to remember your settings, analyse traffic and improve how the website works.

## Analytics

The website may use web analytics services that collect anonymised statistics about visits.

## Managing cookies

You can disable or delete cookies in your browser settings. Some website features may then not work correctly.`,
    },
    {
      slug: 'terms',
      titleRu: 'Пользовательское соглашение',
      titleEn: 'Terms of Use',
      bodyRu: `> Сайт принадлежит РУДН (Российский университет дружбы народов имени Патриса Лумумбы).

## Общие условия

Используя сайт, вы соглашаетесь с настоящими условиями. Если вы не согласны с ними, пожалуйста, не используйте сайт.

## Использование материалов

Материалы сайта предназначены для информационных целей. Копирование и распространение возможны только со ссылкой на источник.

## Ограничение ответственности

Мы стремимся поддерживать актуальность информации, но не гарантируем отсутствие ошибок и неточностей. Сведения о программах носят информационный характер и не являются публичной офертой.

## Персональные данные

Обработка персональных данных, передаваемых через сайт, осуществляется в соответствии с [Политикой РУДН в отношении обработки персональных данных](https://www.rudn.ru/personal-data-processing-and-protection-policy).

## Изменения

Мы вправе обновлять условия и содержание сайта без предварительного уведомления.`,
      bodyEn: `> The website belongs to RUDN (Peoples' Friendship University of Russia named after Patrice Lumumba).

## General terms

By using the website, you agree to these terms. If you do not agree with them, please do not use the website.

## Use of materials

The website's materials are provided for informational purposes. Copying and distribution are permitted only with a reference to the source.

## Limitation of liability

We aim to keep information up to date but do not guarantee the absence of errors. Information about programs is for reference only and does not constitute a public offer.

## Personal data

Personal data submitted through the website is processed in accordance with the [RUDN Personal Data Policy](https://www.rudn.ru/personal-data-processing-and-protection-policy).

## Changes

We may update the terms and the content of the website without prior notice.`,
    },
  ]

  for (const lp of legalData) {
    await prisma.legalPage.upsert({
      where: { slug: lp.slug },
      update: lp,
      create: lp,
    })
  }

  // ---------------------------------------------------------------------------
  // Cleanup: make the seed authoritative — remove rows no longer in the data
  // arrays (otherwise upsert-only seeding leaves stale/renamed records behind,
  // e.g. old faculty or partners that were replaced).
  // ---------------------------------------------------------------------------
  await prisma.program.deleteMany({ where: { slug: { notIn: programData.map((p) => p.slug) } } })
  await prisma.faculty.deleteMany({ where: { slug: { notIn: facultyData.map((f) => f.slug) } } })
  await prisma.partner.deleteMany({ where: { slug: { notIn: partnerData.map((p) => p.slug) } } })
  await prisma.post.deleteMany({ where: { slug: { notIn: postData.map((p) => p.slug) } } })
  await prisma.publication.deleteMany({ where: { slug: { notIn: publicationData.map((p) => p.slug) } } })

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  console.log(
    `Seed complete: 1 admin, ${categoryData.length} categories, ${tagData.length} tags, ` +
      `${programData.length} programs, ${facultyData.length} faculty, ${partnerData.length} partners, ` +
      `${postData.length} posts, ${publicationData.length} publications, ${legalData.length} legal pages.`
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
