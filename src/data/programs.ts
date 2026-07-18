export type ProgramStatus = 'active' | 'planned' | 'archived';
export type BranchId = 'branch-1' | 'branch-2';
export type ProgramAudience = 'children' | 'adults';
export type ProgramFormat = 'group' | 'individual' | 'express' | 'regular';

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
  schedule: string | null;
  price: string | null;
  trialLesson: boolean | null;
  results: string[];
  status: ProgramStatus;
  formats: ProgramFormat[];
  audience: ProgramAudience;
  launchNote?: string;
  longDescription?: string;
  descriptionNote?: string;
  activities?: string[];
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
  schedule: null,
  price: null,
  trialLesson: null,
  results: [],
  status: 'active' as const,
  formats: [],
  audience: 'children' as const,
};

export const branches: Record<BranchId, Branch> = {
  'branch-1': { id: 'branch-1', shortName: 'Молодогвардейцев', city: 'Челябинск', address: 'ул. Молодогвардейцев, 39В' },
  'branch-2': { id: 'branch-2', shortName: 'Университетская Набережная', city: 'Челябинск', address: 'ул. Университетская Набережная, 48' },
};

const fromAge = (minAge: number): AgeGroup[] => [{ minAge, maxAge: null }];

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
    slug: 'razvitie-detey',
    title: 'Развитие детей',
    shortDescription: 'Развиваем познавательные навыки и поддерживаем интерес к обучению.',
    shortDescriptionStatus: 'draft',
    category: 'Развитие и учёба',
    ageGroups: fromAge(3),
    branches: ['branch-1', 'branch-2'],
    accent: 'red',
  },
  {
    ...emptyDetails,
    slug: 'podgotovka-k-shkole',
    title: 'Подготовка к школе',
    shortDescription: 'Занятия для уверенного старта и знакомства с учебными задачами.',
    shortDescriptionStatus: 'draft',
    category: 'Развитие и учёба',
    ageGroups: fromAge(3),
    branches: ['branch-1', 'branch-2'],
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
    accent: 'orange',
    featured: true,
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
    accent: 'red',
    featured: true,
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
    accent: 'red',
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
    status: 'planned',
    launchNote: 'С сентября',
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
    accent: 'gold',
  },
];
