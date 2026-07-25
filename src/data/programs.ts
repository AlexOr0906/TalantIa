export type ProgramStatus = 'active' | 'planned' | 'archived';
export type BranchId = 'branch-1' | 'branch-2';
export type ProgramAudience = 'children' | 'adults';
export type ProgramFormat = 'group' | 'individual' | 'express' | 'regular';
export type ContentSource =
  | 'owner-confirmed'
  | 'current-vk-card'
  | 'current-vk-description'
  | 'previously-confirmed'
  | 'conflict'
  | 'unknown';
export type ContentStatus = 'confirmed' | 'conflicting' | 'draft';

export type ProgramCategory =
  | 'Развитие и учёба'
  | 'Языки'
  | 'Логика и наука'
  | 'Творчество'
  | 'Движение'
  | 'Индивидуальные занятия'
  | 'Для взрослых';

export interface AgeGroup {
  minAge: number;
  maxAge: number | null;
  source?: ContentSource;
}

export interface AgeVariant {
  title: string;
  ageLabel: string;
  description?: string;
  source: ContentSource;
}

export interface ProgramPrice {
  label: string;
  amount?: number;
  currency?: 'RUB';
  unit: 'lesson' | 'hour' | 'course' | 'month' | 'unknown';
  source: ContentSource;
  /** Only unambiguous prices are rendered publicly. */
  isPublic?: boolean;
}

export interface ProgramSchedule {
  frequency?: string;
  durationMinutes?: number;
  note?: string;
  source: ContentSource;
  /** A schedule is rendered only when its current validity is sufficiently clear. */
  isPublic?: boolean;
}

export interface Branch {
  id: BranchId;
  shortName: string;
  city: string;
  address: string;
}

export interface ProgramImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Program {
  slug: string;
  title: string;
  shortDescription?: string;
  /** Draft copy must be confirmed by the owner before publication. */
  shortDescriptionStatus?: 'draft' | 'confirmed';
  category: ProgramCategory;
  ageGroups: AgeGroup[];
  branches: BranchId[];
  primaryBranch?: BranchId;
  duration: string | null;
  groupSize: string | null;
  schedule?: ProgramSchedule;
  price?: ProgramPrice | ProgramPrice[];
  trialLesson: boolean | null;
  trialLessonNote?: string;
  trialLessonSource?: ContentSource;
  results: string[];
  status: ProgramStatus;
  statusSource?: ContentSource;
  formats: ProgramFormat[];
  audience: ProgramAudience;
  launchNote?: string;
  longDescription?: string;
  descriptionNote?: string;
  activities?: string[];
  ageVariants?: AgeVariant[];
  contentStatus?: ContentStatus;
  gallery?: ProgramImage[];
  heroImage?: ProgramImage;
  locationNote?: string;
  seoTitle?: string;
  seoDescription?: string;
  accent: 'red' | 'orange' | 'gold' | 'coral';
  featured?: boolean;
}

const emptyDetails = {
  ageGroups: [],
  branches: [],
  duration: null,
  groupSize: null,
  trialLesson: null,
  results: [],
  status: 'active' as const,
  statusSource: 'owner-confirmed' as const,
  formats: [],
  audience: 'children' as const,
};

export const branches: Record<BranchId, Branch> = {
  'branch-1': { id: 'branch-1', shortName: 'Молодогвардейцев', city: 'Челябинск', address: 'ул. Молодогвардейцев, 39В' },
  'branch-2': { id: 'branch-2', shortName: 'Университетская Набережная', city: 'Челябинск', address: 'ул. Университетская Набережная, 48' },
};

const fromAge = (minAge: number): AgeGroup[] => [{ minAge, maxAge: null }];

export const getProgramAgeLabel = (program: Program, capitalize = false): string | null => {
  if (program.audience === 'adults') return 'Для взрослых';
  const age = program.ageGroups[0];
  if (!age) return null;
  const prefix = capitalize ? 'С' : 'с';
  return age.maxAge === null ? `${prefix} ${age.minAge} лет` : `${age.minAge}–${age.maxAge} лет`;
};

export const programCategories: ProgramCategory[] = [
  'Развитие и учёба',
  'Языки',
  'Логика и наука',
  'Творчество',
  'Движение',
  'Индивидуальные занятия',
  'Для взрослых',
];

export const programs: Program[] = [
  {
    ...emptyDetails,
    slug: 'razvivayka-i-akvarelka',
    title: 'Развивайка & Акварелька',
    shortDescription: 'Комплексная программа, которая объединяет развивающие и творческие занятия.',
    shortDescriptionStatus: 'confirmed',
    category: 'Развитие и учёба',
    ageGroups: [{ minAge: 3, maxAge: 7, source: 'current-vk-card' }],
    ageVariants: [
      {
        title: 'Почемучки',
        ageLabel: 'С 3 лет',
        description: 'Первые развивающие занятия для знакомства с новым.',
        source: 'current-vk-description',
      },
      {
        title: 'Знайки',
        ageLabel: '4–5 лет',
        description: 'Занятия для развития речи, логики, математических представлений и творчества.',
        source: 'current-vk-description',
      },
      {
        title: 'Умники',
        ageLabel: '5–6 лет',
        description: 'Развивающие и творческие задания для детей старшего дошкольного возраста.',
        source: 'current-vk-description',
      },
      {
        title: 'Фантазёры',
        ageLabel: 'С 6 лет',
        description: 'Подготовка к учебным задачам перед поступлением в первый класс.',
        source: 'current-vk-description',
      },
    ],
    branches: ['branch-1', 'branch-2'],
    longDescription: 'Программа объединяет «Развивайку» — чтение, развитие речи, логику, математику и знакомство с окружающим миром — и «Акварельку» с творческими занятиями.',
    activities: ['Чтение и развитие речи', 'Логика и математика', 'Знакомство с окружающим миром', 'Творческие занятия'],
    schedule: {
      frequency: '2 раза в неделю',
      note: 'Два занятия по 45 минут; 16 или 18 занятий в месяц',
      source: 'current-vk-description',
      isPublic: true,
    },
    price: { label: '406 ₽', amount: 406, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'confirmed',
    accent: 'red',
  },
  {
    ...emptyDetails,
    slug: 'podgotovka-k-shkole',
    title: 'Подготовка к школе',
    shortDescription: 'Занятия для уверенного старта и знакомства с учебными задачами.',
    shortDescriptionStatus: 'draft',
    category: 'Развитие и учёба',
    ageGroups: fromAge(6),
    branches: ['branch-1', 'branch-2'],
    price: { label: '406 ₽', amount: 406, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'conflicting',
    accent: 'red',
    featured: true,
  },
  {
    ...emptyDetails,
    slug: 'angliyskiy-yazyk',
    title: 'Английский язык',
    shortDescription: 'Знакомимся с языком через учебные и игровые форматы.',
    shortDescriptionStatus: 'draft',
    category: 'Языки',
    ageGroups: fromAge(6),
    branches: ['branch-1', 'branch-2'],
    longDescription: 'На занятиях дети знакомятся с английской речью через игры и практические задания, а школьники работают с лексикой, грамматикой, чтением и общением.',
    activities: ['Игровые задания на английском', 'Работа с лексикой и грамматикой', 'Чтение и разговорная практика'],
    schedule: { frequency: '2 раза в неделю', durationMinutes: 45, source: 'current-vk-description', isPublic: true },
    price: { label: '500 ₽', amount: 500, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'conflicting',
    accent: 'orange',
    featured: true,
  },
  {
    ...emptyDetails,
    slug: 'uchus-chitat',
    title: 'Учусь читать',
    shortDescription: 'Знакомимся с буквами, учимся складывать слоги и готовимся к первым самостоятельным текстам.',
    shortDescriptionStatus: 'confirmed',
    category: 'Развитие и учёба',
    ageGroups: [{ minAge: 5, maxAge: 7, source: 'current-vk-card' }],
    ageVariants: [
      {
        title: 'Первые шаги',
        ageLabel: '5–7 лет',
        description: 'Для детей, которые ещё не знают букв: знакомство со звуками, слогами и первым чтением.',
        source: 'current-vk-description',
      },
      {
        title: 'Скоро в школу',
        ageLabel: '5–7 лет',
        description: 'Чтение, письмо, логические задания и знакомство с окружающим миром.',
        source: 'current-vk-description',
      },
    ],
    branches: ['branch-1', 'branch-2'],
    formats: ['group'],
    groupSize: '4–6 человек',
    trialLesson: true,
    trialLessonNote: 'Бесплатное пробное занятие перед формированием групп',
    trialLessonSource: 'current-vk-description',
    longDescription: 'Программа помогает познакомиться с буквами и чтением, а также подготовиться к учебным задачам и работе в небольшой группе.',
    activities: ['Буквы и звуки', 'Слоги и первые тексты', 'Задания на письмо и логику'],
    price: { label: '700 ₽/час', amount: 700, currency: 'RUB', unit: 'hour', source: 'current-vk-card', isPublic: true },
    contentStatus: 'confirmed',
    accent: 'orange',
  },
  {
    ...emptyDetails,
    slug: 'tancevalnaya-gimnastika',
    title: 'Танцевальная гимнастика',
    shortDescription: 'Работаем с движением, координацией и чувством ритма.',
    shortDescriptionStatus: 'draft',
    category: 'Движение',
    ageGroups: fromAge(3),
    branches: ['branch-1', 'branch-2'],
    longDescription: 'Занятия объединяют основы хореографии, гимнастики и общей физической подготовки. Дети осваивают движения и танцевальные связки, работают с координацией, ритмом и пластикой.',
    activities: ['Основы хореографии', 'Гимнастические упражнения', 'Танцевальные связки и работа с ритмом'],
    price: { label: '350 ₽', amount: 350, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'confirmed',
    accent: 'coral',
  },
  {
    ...emptyDetails,
    slug: 'shahmaty',
    title: 'Шахматы',
    shortDescription: 'Знакомимся с игрой и учимся обдумывать свои решения.',
    shortDescriptionStatus: 'draft',
    category: 'Логика и наука',
    ageGroups: fromAge(5),
    branches: ['branch-1', 'branch-2'],
    longDescription: 'Дети знакомятся с правилами игры, шахматными фигурами и основными комбинациями, учатся анализировать позицию и продумывать свои действия.',
    activities: ['Правила и шахматные фигуры', 'Основные комбинации', 'Анализ позиции и выбор хода'],
    groupSize: 'До 8 человек',
    schedule: { frequency: '2 раза в неделю', durationMinutes: 45, source: 'current-vk-description', isPublic: true },
    price: { label: '450 ₽', amount: 450, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'conflicting',
    accent: 'gold',
    featured: true,
  },
  {
    ...emptyDetails,
    slug: 'nauchnaya-laboratoriya',
    title: 'Научная лаборатория',
    shortDescription: 'Наблюдаем, задаём вопросы и знакомимся с исследовательским подходом.',
    shortDescriptionStatus: 'draft',
    category: 'Логика и наука',
    ageGroups: fromAge(6),
    branches: ['branch-1'],
    longDescription: 'На занятиях дети знакомятся с естественными науками, проводят опыты, наблюдают явления, задают вопросы и учатся анализировать результаты.',
    activities: ['Опыты и наблюдения', 'Знакомство с физикой, химией и биологией', 'Исследовательские задачи'],
    groupSize: 'До 8 человек',
    schedule: { frequency: '1 раз в неделю', note: 'Есть утренние и вечерние группы', source: 'current-vk-description', isPublic: true },
    price: { label: '600 ₽', amount: 600, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'conflicting',
    accent: 'red',
    featured: true,
  },
  {
    ...emptyDetails,
    slug: 'robototehnika',
    title: 'Робототехника',
    shortDescription: 'Собираем модели и знакомимся с основами программирования на базе LEGO Education WeDo 2.0.',
    shortDescriptionStatus: 'confirmed',
    category: 'Логика и наука',
    ageGroups: [{ minAge: 4, maxAge: 12, source: 'current-vk-card' }],
    branches: ['branch-1', 'branch-2'],
    longDescription: 'На занятиях дети знакомятся с механикой и робототехникой, собирают модели по схемам и создают для них простые программы.',
    activities: ['Сборка моделей по схемам', 'Основы механики', 'Программирование собранных моделей'],
    schedule: { frequency: '4 раза в месяц', note: 'По субботам', source: 'current-vk-description', isPublic: true },
    price: { label: '600 ₽', amount: 600, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'confirmed',
    accent: 'gold',
  },
  {
    ...emptyDetails,
    slug: 'kalligrafiya-i-pocherk',
    title: 'Каллиграфия и коррекция почерка',
    shortDescription: 'Работаем над аккуратным письмом, постановкой руки и почерком.',
    shortDescriptionStatus: 'draft',
    category: 'Развитие и учёба',
    ageGroups: fromAge(6),
    branches: ['branch-1', 'branch-2'],
    formats: ['group', 'individual'],
    longDescription: 'Занятия посвящены постановке руки, технике письма и последовательной работе над формой букв. Курс помогает ребёнку внимательнее контролировать процесс письма.',
    activities: ['Постановка руки', 'Техника письма', 'Отработка букв и соединений'],
    duration: '10–12 занятий',
    price: { label: 'По договорённости', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'confirmed',
    accent: 'orange',
  },
  {
    ...emptyDetails,
    slug: 'bloging',
    title: 'Блогинг',
    shortDescription: 'Пробуем придумывать идеи, работать в кадре и создавать медиаматериалы.',
    shortDescriptionStatus: 'draft',
    category: 'Творчество',
    ageGroups: fromAge(6),
    branches: ['branch-1'],
    longDescription: 'На занятиях ребята придумывают сценарии, снимают и монтируют видеоролики, знакомятся с фото- и видеотехникой и программами для создания контента.',
    activities: ['Сценарии и идеи', 'Съёмка видео', 'Монтаж роликов'],
    schedule: { frequency: '1 раз в неделю', durationMinutes: 60, source: 'current-vk-description', isPublic: true },
    price: { label: '600 ₽', amount: 600, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'conflicting',
    accent: 'coral',
    featured: true,
  },
  {
    ...emptyDetails,
    slug: 'neyrochtenie',
    title: 'Нейрочтение',
    shortDescription: 'Выполняем упражнения на чтение, внимание, память и работу с текстом.',
    shortDescriptionStatus: 'draft',
    category: 'Развитие и учёба',
    ageGroups: fromAge(5),
    branches: ['branch-1', 'branch-2'],
    longDescription: 'Занятия объединяют упражнения на чтение, речь, внимание, память, мышление и понимание прочитанного.',
    activities: ['Работа с буквами, слогами и словами', 'Упражнения на внимание и память', 'Понимание текста'],
    schedule: { frequency: '2 раза в неделю', durationMinutes: 45, note: 'В документе указаны вторник и четверг, 17:30; актуальность времени требует подтверждения', source: 'conflict' },
    price: { label: 'От 800 ₽', amount: 800, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'conflicting',
    accent: 'orange',
    featured: true,
  },
  {
    ...emptyDetails,
    slug: 'biseropletenie',
    title: 'Бисероплетение',
    shortDescription: 'Знакомимся с техниками плетения и создаём работы своими руками.',
    shortDescriptionStatus: 'draft',
    category: 'Творчество',
    ageGroups: fromAge(6),
    branches: ['branch-1', 'branch-2'],
    longDescription: 'Дети создают украшения и фигурки из бисера, знакомятся с базовыми и более сложными техниками плетения.',
    activities: ['Плоские фигурки и украшения', 'Плетение крестиком', 'Кирпичное плетение и объёмные фигурки'],
    price: { label: '500 ₽', amount: 500, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'conflicting',
    accent: 'gold',
    featured: true,
  },
  {
    ...emptyDetails,
    slug: 'art-studiya',
    title: 'Арт-студия',
    shortDescription: 'Регулярные занятия рисованием и знакомство с разными художественными техниками',
    shortDescriptionStatus: 'confirmed',
    category: 'Творчество',
    ageGroups: fromAge(6),
    branches: ['branch-1', 'branch-2'],
    primaryBranch: 'branch-2',
    formats: ['regular'],
    longDescription: 'На регулярных занятиях дети рисуют, знакомятся с искусством и пробуют разные художественные техники.',
    activities: ['Работа с цветом', 'Создание собственных сюжетов', 'Знакомство с художественными материалами и техниками'],
    schedule: { frequency: '1 раз в неделю', source: 'current-vk-description', isPublic: true },
    price: { label: '800 ₽', amount: 800, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'conflicting',
    descriptionNote: 'Арт-студия — самостоятельное регулярное направление и отличается от творческой мастерской.',
    heroImage: {
      src: '/images/catalog-art-studio.webp',
      alt: 'Дети показывают рисунки, созданные на занятии арт-студии',
      width: 720,
      height: 960,
    },
    locationNote: 'Основные занятия проходят на Университетской Набережной.',
    seoTitle: 'Арт-студия для детей с 6 лет — ТАЛАНТиЯ, Челябинск',
    seoDescription: 'Регулярные занятия рисованием для детей с 6 лет в двух филиалах центра «ТАЛАНТиЯ» в Челябинске.',
    accent: 'coral',
    featured: true,
  },
  {
    ...emptyDetails,
    slug: 'risovanie-peskom',
    title: 'Рисование песком',
    shortDescription: 'Осваиваем рисование песком и создаём визуальные истории.',
    shortDescriptionStatus: 'draft',
    category: 'Творчество',
    ageGroups: fromAge(6),
    branches: ['branch-1'],
    longDescription: 'На занятиях участники создают изображения песком на световом столе и знакомятся с выразительными возможностями песочной анимации.',
    activities: ['Работа с песком на световом столе', 'Создание отдельных образов и композиций'],
    price: [
      { label: 'Групповое занятие — 800 ₽', amount: 800, currency: 'RUB', unit: 'lesson', source: 'current-vk-description', isPublic: true },
      { label: 'Индивидуальное занятие — 1000 ₽', amount: 1000, currency: 'RUB', unit: 'lesson', source: 'current-vk-description', isPublic: true },
    ],
    heroImage: {
      src: '/images/vk/photos/sand-animation-photo.webp',
      alt: 'Создание рисунка песком на световом столе',
      width: 540,
      height: 805,
    },
    gallery: [{
      src: '/images/vk/photos/sand-art-child-photo.webp',
      alt: 'Ребёнок рядом с рисунком морского конька на световом столе',
      width: 640,
      height: 577,
    }],
    contentStatus: 'conflicting',
    accent: 'red',
  },
  {
    ...emptyDetails,
    slug: 'detskaya-hudozhestvennaya-galereya',
    title: 'Детская художественная галерея',
    shortDescription: 'Знакомимся с художниками и создаём собственную работу на каждой встрече.',
    shortDescriptionStatus: 'confirmed',
    category: 'Творчество',
    ageGroups: [{ minAge: 6, maxAge: 14, source: 'current-vk-card' }],
    branches: ['branch-1', 'branch-2'],
    duration: '5 встреч по 90 минут',
    longDescription: 'На каждой встрече дети знакомятся с одним художником, его произведениями и особенностями стиля, а затем создают собственную работу по мотивам увиденного.',
    activities: ['Знакомство с художником и его работами', 'Обсуждение художественного стиля', 'Создание собственной картины'],
    price: { label: '900 ₽', amount: 900, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'confirmed',
    accent: 'coral',
  },
  {
    ...emptyDetails,
    slug: 'tvorcheskaya-masterskaya',
    title: 'Творческая мастерская',
    shortDescription: 'Творческие занятия и мастер-классы с разными материалами и техниками',
    shortDescriptionStatus: 'confirmed',
    category: 'Творчество',
    ageGroups: fromAge(6),
    branches: ['branch-1', 'branch-2'],
    accent: 'gold',
  },
  {
    ...emptyDetails,
    slug: 'proektnaya-deyatelnost',
    title: 'Проектная деятельность',
    shortDescription: 'Индивидуальная работа над учебными и исследовательскими проектами: от идеи до представления результата',
    shortDescriptionStatus: 'confirmed',
    category: 'Индивидуальные занятия',
    ageGroups: fromAge(7),
    branches: ['branch-1'],
    formats: ['individual'],
    longDescription: 'Ребёнок выбирает тему и последовательно проходит путь от идеи до готового проекта: формулирует цель, ищет информацию, проводит исследование и готовится представить результат.',
    activities: ['Выбор темы и постановка цели', 'Исследование или эксперимент', 'Оформление и представление результата'],
    price: { label: 'По договорённости', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'conflicting',
    accent: 'red',
  },
  {
    ...emptyDetails,
    slug: 'fitnes-dlya-mam',
    title: 'Фитнес для мам',
    shortDescription: 'Занятия движением и физической активностью для взрослых.',
    shortDescriptionStatus: 'draft',
    category: 'Для взрослых',
    branches: ['branch-1'],
    audience: 'adults',
    accent: 'coral',
    status: 'active',
    longDescription: 'Занятия физической активностью для мам с разным уровнем подготовки включают упражнения на укрепление мышц, гибкость и выносливость.',
    price: { label: 'От 450 ₽', amount: 450, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'conflicting',
  },
  {
    ...emptyDetails,
    slug: 'gimnastika-dlya-uma',
    title: 'Гимнастика для ума — экспресс-курс',
    shortDescription: 'Экспресс-курс с упражнениями на внимание, память и мышление.',
    shortDescriptionStatus: 'draft',
    category: 'Развитие и учёба',
    ageGroups: fromAge(6),
    branches: ['branch-1'],
    formats: ['express'],
    accent: 'orange',
  },
  {
    ...emptyDetails,
    slug: 'logoped',
    title: 'Логопед',
    shortDescription: 'Индивидуальная работа со специалистом по развитию речи.',
    shortDescriptionStatus: 'draft',
    category: 'Индивидуальные занятия',
    ageGroups: fromAge(5),
    branches: ['branch-1', 'branch-2'],
    longDescription: 'На консультации оценивают особенности речи ребёнка и определяют подходящий план дальнейших занятий.',
    activities: ['Оценка особенностей речи', 'Рекомендации по дальнейшим занятиям'],
    price: { label: '800 ₽', amount: 800, currency: 'RUB', unit: 'unknown', source: 'current-vk-card' },
    contentStatus: 'confirmed',
    accent: 'gold',
  },
];
