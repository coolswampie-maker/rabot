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
        'A modular programme for executives and owners who want to put their management experience into a system and base decisions on numbers rather than gut feeling. You can study on campus in Moscow or fully online.',
      bodyRu: `## О программе

Классический MBA РУДН — это системное управленческое образование для тех, кто уже руководит, но хочет видеть бизнес целиком: от стратегии до денежного потока. Программа построена вокруг практики — каждый блок вы сразу примеряете к своей компании, а преподают действующие руководители, консультанты и предприниматели.

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
      bodyEn: `## About the programme

The RUDN Classic MBA is a systematic management education for people who already lead but want to see the business as a whole — from strategy to cash flow. It is built around practice: you apply every block to your own company, and it is taught by working executives, consultants and entrepreneurs.

## What you will learn

- See the company as a system and decide based on numbers, not intuition
- Build and defend a strategy, model unit economics and finances
- Lead teams, change and your own effectiveness
- Align marketing, sales and operations with business goals

## How the training works

Classes run in modules — a few intensive days once a month, on campus in Moscow or online (materials and recordings are available either way). The methods are hands-on: real case studies, business simulations, small-group work and action learning. Between modules you run your own project with a tutor.

## Admission

Admission requires a motivation letter and an interview with the admissions committee, so the programme fits your goal and the group is made up of experienced managers.

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
        'A practical MBA built into an accelerator: you do not just study, you grow concrete metrics of your business under the guidance of trackers. The programme runs for 18 months, three days a month on campus plus online tracking between sessions.',
      bodyRu: `## О программе

Master of Business Acceleration — для предпринимателей, которые уже прошли стадию выживания и хотят масштабироваться осознанно. Теория здесь не самоцель: каждый модуль вы заканчиваете с конкретной гипотезой и планом её проверки, а трекер помогает довести её до результата.

## Формат

Три дня в месяц очно в кампусе РУДН, между сессиями — онлайн-трекинг и работа над собственными целями. Вы движетесь не по абстрактной программе, а по дорожной карте своего бизнеса.`,
      bodyEn: `## About the programme

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
        'A corporate business-education programme for company teams taking their product and business into international markets. The content is assembled around the client\'s request, the programme runs from 6 months and combines corporate team tracking with on-site modules in focus countries.',
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
      bodyEn: `## About the programme

RUDN Global Expansion is a corporate programme for companies entering international markets that want to do it with a working strategy rather than on optimism. It consists of four educational-and-practical blocks, corporate tracking of the team to build managed growth, and an on-site module in a focus country. The format and schedule are adapted to the company's goals, request and participants.

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

- International-level practitioner lecturers and modern, hands-on tools
- Mentoring and expert support from professional practitioners
- On-site modules in Asia, the Middle East, Latin America and Africa
- Access to business communities and decision-makers in focus countries

## How we design and run the programme

1. A meeting with the company to clarify the request and define the participants
2. Preparation and approval of the programme, its key blocks, format and timeline
3. A strategy session with key participants: goals, tasks, timelines and areas of responsibility for market entry
4. Selecting and agreeing experts, a business tracker and practitioners
5. Delivering the modules according to the approved programme
6. A strategy session to defend the projects and define the next steps

## What graduates gain

The tools to perform the roles of director of a foreign branch or network, international-development director, marketing director and product-development director.

## Format and qualification

Duration is from 6 months. On campus, online and on-site modules, with a schedule that fits the team. On completion you receive a RUDN professional retraining diploma.`,
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
        'A classic modular MBA specialisation in international business development: 22 modules and 1,800 academic hours (680 in class). The programme concludes with the defence of a capstone project — a company development roadmap.',
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
      bodyEn: `## About the programme

MBA “Global Expansion. Entering new markets” is a classic modular programme for executives and entrepreneurs who prepare their company for international development systematically. It covers 22 modules and 1,800 academic hours, 680 of them in class, combining a solid management foundation with applied modules on entering foreign markets.

## What you will learn

- Build a market-entry strategy and manage under globalisation
- Research foreign markets and build sales and marketing across countries
- Manage finance, currency risk and investment projects in international business
- Navigate international trade law and export, tax and customs regulation
- Optimise supply chains and adopt innovation for scaling

## Programme structure

The programme consists of 22 modules grouped into thematic blocks — from strategic management and market research to law, foreign trade and logistics. It concludes with masterclasses, an entrepreneurs' mastermind and the preparation and defence of a capstone project — a company development roadmap.

## Format and qualification

On campus or online, on a modular schedule. On completion you receive a RUDN professional retraining diploma awarding the MBA qualification.`,
      format: 'Очно / онлайн',
      durationRu: '1800 ак. часов',
      durationEn: '1,800 academic hours',
      audienceRu: 'Руководители и предприниматели, развивающие международное направление',
      audienceEn: 'Executives and entrepreneurs developing an international track',
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
  // Faculty roster mirrors the official programme decks. Roles are grouped by
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
      titleEn: 'Lead programme tracker',
      bioRu:
        'Сооснователь Hop.Agency, управляющий партнёр программ скаутинга, акселерации и вывода на международный рынок венчурного билдера UDT/X, совладелец клуба венчурных инвесторов Venture Games.',
      bioEn:
        'Co-founder of Hop.Agency, managing partner of scouting, acceleration and international market-entry programmes at the UDT/X venture builder, and co-owner of the Venture Games investor club.',
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
        'A tracker in federal projects of the national programme “Digital Economy of the Russian Federation”.',
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
        'Ex-PwC and Deutsche Bank, a lead IIDF tracker and chief methodologist of corporate programmes at Stanford Online.',
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
        'Former head of Plug and Play ADGM programmes and an experienced CEO with expertise in IT, services and sales.',
      field: 'IT и продажи · ОАЭ',
    },
  ]

  for (const f of facultyData) {
    await prisma.faculty.upsert({
      where: { slug: f.slug },
      update: f,
      create: f,
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
      descEn: 'One of the country\'s largest employers and a partner in corporate education programmes.',
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
      slug: 'iidf',
      order: 5,
      published: true,
      name: 'ФРИИ',
      logo: '/images/partners/iidf.png',
      descRu: 'Фонд развития интернет-инициатив, партнёр по акселерации и работе со стартапами.',
      descEn: 'The Internet Initiatives Development Fund, a partner in acceleration and startup work.',
    },
    {
      slug: 'severstal',
      order: 6,
      published: true,
      name: 'Северсталь',
      logo: '/images/partners/severstal.png',
      descRu: 'Индустриальный партнёр, источник практических задач по операционной эффективности.',
      descEn: 'An industrial partner and a source of practical challenges in operational efficiency.',
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
      authorName: 'Наталья Старостина',
      tagSlugs: ['scaling', 'leadership'],
      publishedAt: new Date('2026-03-12T10:00:00.000Z'),
    },
    {
      slug: 'vyezdnoy-modul-blizhniy-vostok',
      coverImage: '/images/h-city.jpg',
      locale: 'RU',
      type: 'NEWS',
      brand: 'ACCELERATOR',
      status: 'PUBLISHED',
      featured: false,
      title: 'Выездной международный модуль: Ближний Восток',
      excerpt:
        'Слушатели акселератора провели неделю в ОАЭ, чтобы вживую разобраться, как устроен выход на рынки Ближнего Востока.',
      content: `Группа Master of Business Acceleration провела выездной модуль в Объединённых Арабских Эмиратах. Формат выездов мы используем, чтобы рынок переставал быть абстракцией из презентаций и становился понятным изнутри.

## Что было в программе

- встречи с местными предпринимателями и фондами;
- разбор юридических и налоговых нюансов открытия бизнеса в регионе;
- визиты в технологические хабы и коворкинги;
- практические сессии по адаптации продукта под местного клиента.

## Зачем это нужно

Ближний Восток — один из самых быстрорастущих рынков для российских компаний, но и один из самых непонятных на расстоянии. Несколько дней на месте дают больше, чем месяцы кабинетного анализа: становится видно, как принимаются решения, как строятся партнёрства и где обычно спотыкаются новички.

Участники вернулись с конкретными контактами и пересобранными планами выхода на регион.`,
      categoryId: categories['events'].id,
      authorName: 'Команда акселератора',
      tagSlugs: ['international', 'scaling'],
      publishedAt: new Date('2026-02-20T08:00:00.000Z'),
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
      slug: 'ekspertnyy-kommentariy-zachem-rukovoditelyu-mba',
      coverImage: '/images/speaker.jpg',
      locale: 'RU',
      type: 'EXPERT_COMMENT',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: false,
      title: 'Экспертный комментарий: зачем руководителю MBA сегодня',
      excerpt:
        'Ирина Герасименко рассказывает, что на самом деле даёт MBA опытному управленцу и в каких случаях идти учиться не стоит.',
      content: `Вопрос «нужен ли мне MBA» звучит всё чаще. Отвечает Ирина Герасименко, эксперт по стратегической трансформации.

## Что меняется после MBA

«Главная ценность не в наборе знаний — их сегодня можно собрать и самостоятельно. Ценность в том, что вы перестаёте принимать решения по наитию и начинаете видеть бизнес как систему: где деньги, где риск, где рычаг для роста».

## Кому это действительно полезно

- руководителям, которые выросли из эксперта и впервые отвечают за всю картину;
- собственникам, которым стало тесно в режиме ручного управления;
- тем, кто готовит компанию к следующему этапу — масштабированию или выходу на новые рынки.

## А кому не стоит

«Если вы ждёте готовых ответов и волшебной таблетки — будет разочарование. MBA работает только тогда, когда вы приносите реальные задачи и готовы менять свои привычки в управлении».

Хорошая программа, по словам эксперта, не столько учит, сколько перестраивает способ думать о бизнесе.`,
      categoryId: categories['business-education'].id,
      authorName: 'Ирина Герасименко',
      tagSlugs: ['strategy', 'leadership'],
      publishedAt: new Date('2026-01-22T09:00:00.000Z'),
    },
    {
      slug: 'open-day-at-rudn-business-school',
      coverImage: '/images/students.jpg',
      locale: 'EN',
      type: 'EVENT',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: false,
      title: 'Open day at RUDN Business School',
      excerpt:
        'Come to campus, meet the faculty, sit in on a sample class and ask everything you ever wanted to know about our MBA programmes.',
      content: `We are hosting an open day at RUDN Business School and you are invited. It is the easiest way to understand whether our programmes fit you — without committing to anything.

## What to expect

- A sample class taught by one of our practising lecturers
- An honest Q&A about formats, workload and admissions
- A walk around the campus
- A chance to talk with current students and alumni

## Who should come

The day is for executives, owners and managers who are weighing up an MBA and want to feel the atmosphere before deciding. Bring your questions — including the awkward ones about time, money and what you will actually get.

## How to join

Entry is free, but please register in advance so we can prepare a seat for you. We look forward to meeting you on campus.`,
      categoryId: categories['events'].id,
      authorName: 'RUDN Business School',
      tagSlugs: ['leadership'],
      publishedAt: new Date('2026-06-02T09:00:00.000Z'),
      eventStart: new Date('2026-09-24T11:00:00.000Z'),
      eventEnd: new Date('2026-09-24T15:00:00.000Z'),
      eventLocation: 'Moscow, Miklukho-Maklaya St. 6',
    },
    {
      slug: 'intensiv-kross-kulturnyy-menedzhment-2025',
      coverImage: '/images/h-arch.jpg',
      locale: 'RU',
      type: 'EVENT',
      brand: 'MBA',
      status: 'PUBLISHED',
      featured: true,
      title: 'Очный интенсив «Кросс-культурный менеджмент»',
      excerpt:
        'Три дня практики в кампусе РУДН: как договариваться, управлять и строить партнёрства в разных культурных контекстах.',
      content: `Бизнес-школа РУДН проводит очный интенсив по кросс-культурному менеджменту. За три дня разбираем, что мешает командам и партнёрствам, когда люди выросли в разных деловых традициях, и как с этим работать.

## Что будет на интенсиве

- как культура влияет на переговоры, обратную связь и принятие решений;
- типичные ошибки при выходе на рынки Ближнего Востока, Азии и Латинской Америки;
- инструменты, которые помогают управлять международной командой;
- разбор реальных кейсов участников.

## Для кого

Для руководителей и предпринимателей, которые работают с зарубежными партнёрами, нанимают людей в других странах или готовят выход компании на новый рынок.

Занятия проходят в главном корпусе РУДН на ул. Миклухо-Маклая, 6. Количество мест ограничено — записывайтесь заранее.`,
      categoryId: categories['events'].id,
      authorName: 'Бизнес-школа РУДН',
      tagSlugs: ['international', 'leadership'],
      publishedAt: new Date('2026-05-28T09:00:00.000Z'),
      eventStart: new Date('2026-10-14T10:00:00.000Z'),
      eventEnd: new Date('2026-10-16T17:00:00.000Z'),
      eventLocation: 'Москва, ул. Миклухо-Маклая, 6',
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
    {
      slug: 'scaling-strategies-emerging-markets-2024',
      locale: 'EN',
      type: 'WORKING_PAPER',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: true,
      title: 'Scaling Strategies of Technology Firms in Emerging Markets',
      abstract:
        'This working paper examines how technology firms adapt their growth playbooks when entering emerging economies. Drawing on a sample of fast-growing companies across the CIS and the Middle East, we identify recurring patterns in channel selection and partnership formation. The findings suggest that local institutional context, more than firm size, predicts which scaling strategies succeed.',
      authorsText: 'Gerasimenko I., Korneev I.',
      year: 2024,
      venue: 'ICEMR Working Paper Series',
      field: 'Emerging markets',
    },
    {
      slug: 'venture-finance-early-stage-cis-2023',
      locale: 'EN',
      type: 'JOURNAL_ARTICLE',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: true,
      title: 'Venture Finance and Early-Stage Funding Gaps in the CIS Region',
      abstract:
        'We analyse the structure of early-stage venture funding in the CIS and document a persistent gap between seed and growth rounds. Using a combination of deal-level data and founder interviews, we show how syndication mitigates risk for investors while constraining the pace of company growth. The article discusses policy and market mechanisms that could narrow the gap.',
      authorsText: 'George R., Grigoriev V.',
      year: 2023,
      venue: 'Journal of Emerging Market Finance',
      field: 'Venture capital',
    },
    {
      slug: 'digital-economy-transformation-report-2025',
      locale: 'EN',
      type: 'REPORT',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: true,
      title: 'Digital Economy Transformation: A Cross-Country Report',
      abstract:
        'This report synthesises evidence on how digital transformation reshapes competitive dynamics in mid-sized emerging economies. It combines macro indicators with company case studies to map where digital adoption translates into measurable productivity gains. Special attention is given to the role of artificial intelligence in operational decision-making.',
      authorsText: 'Karmina N., Chumikov A.',
      year: 2025,
      venue: 'ICEMR Annual Report',
      field: 'Digital economy',
    },
    {
      slug: 'cross-cultural-management-distributed-teams-2024',
      locale: 'EN',
      type: 'JOURNAL_ARTICLE',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: true,
      title: 'Cross-Cultural Management in Distributed Teams Across Emerging Markets',
      abstract:
        'As companies operate across borders, distributed teams increasingly span very different cultural contexts. This article studies how managers reconcile divergent norms around hierarchy, feedback and decision-making. We propose a practical framework for leaders building teams that stretch across the CIS, Europe and the Middle East.',
      authorsText: 'Chumikov A., Gerasimenko I.',
      year: 2024,
      venue: 'International Journal of Cross-Cultural Management',
      field: 'Cross-cultural management',
    },
    {
      slug: 'masshtabirovanie-biznesa-razvivayushchiesya-rynki-2023',
      locale: 'RU',
      type: 'WORKING_PAPER',
      brand: 'ICEMR',
      status: 'PUBLISHED',
      featured: true,
      title: 'Масштабирование бизнеса на развивающихся рынках: барьеры и драйверы',
      abstract:
        'В работе систематизируются факторы, которые ускоряют или тормозят масштабирование компаний на развивающихся рынках. На основе анализа кейсов российских и зарубежных компаний выделены типичные ошибки при выходе в новые регионы. Предложена практическая рамка оценки готовности компании к экспансии.',
      authorsText: 'Корнеев И., Кармина Н.',
      year: 2023,
      venue: 'Серия рабочих докладов ICEMR',
      field: 'Развивающиеся рынки',
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
      bodyRu: `> **Внимание:** это шаблонный текст. Он подготовлен как черновик и подлежит проверке и утверждению юридической службой университета. В текущем виде документ не является юридически обязывающим.

## Общие положения

Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем персональные данные посетителей сайта. Обработка данных осуществляется в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».

## Какие данные мы собираем

Мы можем обрабатывать имя, контактный телефон, адрес электронной почты и иную информацию, которую вы указываете в формах на сайте.

## Цели обработки

Данные используются для связи с вами по вашим заявкам, информирования о программах и улучшения работы сайта.

## Хранение и защита

Мы принимаем организационные и технические меры для защиты данных от несанкционированного доступа. Срок хранения определяется целями обработки и требованиями законодательства.

## Ваши права

Вы вправе запросить уточнение, блокирование или удаление своих персональных данных, а также отозвать согласие на их обработку.

*Финальную редакцию необходимо согласовать с юридической службой.*`,
      bodyEn: `> **Notice:** this is template text. It is a draft to be reviewed and approved by the university's legal team, and it is not legally binding in its current form.

## General provisions

This Privacy Policy describes how we collect, use and protect the personal data of website visitors.

## What data we collect

We may process your name, contact phone number, email address and other information you provide in forms on the website.

## Purposes of processing

The data is used to contact you regarding your enquiries, to inform you about programmes and to improve the website.

## Storage and protection

We apply organisational and technical measures to protect data against unauthorised access. The retention period is determined by the purposes of processing and by applicable law.

## Your rights

You have the right to request clarification, blocking or deletion of your personal data, and to withdraw your consent to its processing.

*The final wording must be approved by the legal team.*`,
    },
    {
      slug: 'consent',
      titleRu: 'Согласие на обработку персональных данных',
      titleEn: 'Personal Data Processing Consent',
      bodyRu: `> **Внимание:** это шаблонный текст. Он подготовлен как черновик и подлежит проверке и утверждению юридической службой университета. В текущем виде документ не является юридически обязывающим.

## Предмет согласия

Отправляя форму на сайте, вы даёте согласие на обработку указанных вами персональных данных в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».

## Перечень данных

Согласие распространяется на имя, номер телефона, адрес электронной почты и иные данные, переданные через формы сайта.

## Действия с данными

Вы соглашаетесь на сбор, запись, хранение, использование и удаление данных в целях обработки ваших обращений и заявок.

## Срок действия и отзыв

Согласие действует до достижения целей обработки или до момента его отзыва. Отозвать согласие можно, направив соответствующее обращение по контактам, указанным на сайте.

*Текст требует проверки юридической службой перед публикацией.*`,
      bodyEn: `> **Notice:** this is template text. It is a draft to be reviewed and approved by the university's legal team, and it is not legally binding in its current form.

## Subject of consent

By submitting a form on the website, you consent to the processing of the personal data you provide.

## Scope of data

The consent covers your name, phone number, email address and other data submitted through the website's forms.

## Actions with data

You consent to the collection, recording, storage, use and deletion of data for the purpose of handling your enquiries and applications.

## Validity and withdrawal

The consent remains valid until the purposes of processing are met or until it is withdrawn. You may withdraw consent by sending a request to the contacts listed on the website.

*This text must be reviewed by the legal team before publication.*`,
    },
    {
      slug: 'cookie',
      titleRu: 'Политика использования cookie',
      titleEn: 'Cookie Policy',
      bodyRu: `> **Внимание:** это шаблонный текст. Он подготовлен как черновик и подлежит проверке и утверждению юридической службой университета. В текущем виде документ не является юридически обязывающим.

## Что такое cookie

Cookie — это небольшие файлы, которые сохраняются в вашем браузере при посещении сайта и помогают ему работать корректно.

## Как мы используем cookie

Мы используем cookie, чтобы запоминать ваши настройки, анализировать посещаемость и улучшать работу сайта.

## Аналитика

Сайт может использовать сервисы веб-аналитики, которые собирают обезличенную статистику о посещениях.

## Управление cookie

Вы можете отключить или удалить cookie в настройках браузера. При этом часть функций сайта может работать некорректно.

*Окончательную редакцию следует согласовать с юридической службой.*`,
      bodyEn: `> **Notice:** this is template text. It is a draft to be reviewed and approved by the university's legal team, and it is not legally binding in its current form.

## What cookies are

Cookies are small files stored in your browser when you visit the website that help it work correctly.

## How we use cookies

We use cookies to remember your settings, analyse traffic and improve how the website works.

## Analytics

The website may use web analytics services that collect anonymised statistics about visits.

## Managing cookies

You can disable or delete cookies in your browser settings. Some website features may then not work correctly.

*The final wording should be approved by the legal team.*`,
    },
    {
      slug: 'terms',
      titleRu: 'Пользовательское соглашение',
      titleEn: 'Terms of Use',
      bodyRu: `> **Внимание:** это шаблонный текст. Он подготовлен как черновик и подлежит проверке и утверждению юридической службой университета. В текущем виде документ не является юридически обязывающим.

## Общие условия

Используя сайт, вы соглашаетесь с настоящими условиями. Если вы не согласны с ними, пожалуйста, не используйте сайт.

## Использование материалов

Материалы сайта предназначены для информационных целей. Копирование и распространение возможны только со ссылкой на источник.

## Ограничение ответственности

Мы стремимся поддерживать актуальность информации, но не гарантируем отсутствие ошибок и неточностей. Сведения о программах не являются публичной офертой.

## Изменения

Мы вправе обновлять условия и содержание сайта без предварительного уведомления.

*Документ подлежит финальной проверке юридической службой.*`,
      bodyEn: `> **Notice:** this is template text. It is a draft to be reviewed and approved by the university's legal team, and it is not legally binding in its current form.

## General terms

By using the website, you agree to these terms. If you do not agree with them, please do not use the website.

## Use of materials

The website's materials are provided for informational purposes. Copying and distribution are permitted only with a reference to the source.

## Limitation of liability

We aim to keep information up to date but do not guarantee the absence of errors. Information about programmes does not constitute a public offer.

## Changes

We may update the terms and the content of the website without prior notice.

*This document is subject to final review by the legal team.*`,
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
