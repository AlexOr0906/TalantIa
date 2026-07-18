export type ProgramStatus = 'active' | 'planned' | 'archived';

export interface AgeGroup {
  label: string;
  minAge?: number;
  maxAge?: number;
}

export interface Program {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  ageGroups: AgeGroup[];
  branches: string[];
  duration: string | null;
  groupSize: string | null;
  schedule: string | null;
  price: string | null;
  trialLesson: boolean | null;
  teacher: string | null;
  results: string[];
  status: ProgramStatus;
  accent: 'red' | 'orange' | 'gold' | 'coral';
}

export const programs: Program[] = [
  {
    slug: 'podgotovka-k-shkole',
    title: 'Подготовка к школе',
    shortDescription: 'Занятия для уверенного старта: внимание, мышление, речь и базовые учебные навыки.',
    category: 'Развитие и учёба',
    ageGroups: [{ label: '5–6 лет', minAge: 5, maxAge: 6 }],
    branches: [], duration: null, groupSize: null, schedule: null, price: null,
    trialLesson: null, teacher: null, results: [], status: 'active', accent: 'red',
  },
  {
    slug: 'angliyskiy-yazyk',
    title: 'Английский язык',
    shortDescription: 'Игровые и учебные форматы для разных возрастов — от первых слов до разговорной практики.',
    category: 'Языки',
    ageGroups: [
      { label: 'с 4 лет', minAge: 4 },
      { label: '5–6 лет', minAge: 5, maxAge: 6 },
      { label: '12–17 лет', minAge: 12, maxAge: 17 },
    ],
    branches: [], duration: null, groupSize: null, schedule: null, price: null,
    trialLesson: true, teacher: null, results: [], status: 'active', accent: 'orange',
  },
  {
    slug: 'shahmaty',
    title: 'Шахматы',
    shortDescription: 'Развиваем логику, внимание и умение принимать решения через игру.',
    category: 'Логика',
    ageGroups: [{ label: 'с 4 лет', minAge: 4 }],
    branches: [], duration: null, groupSize: null, schedule: null, price: null,
    trialLesson: true, teacher: null, results: [], status: 'active', accent: 'gold',
  },
  {
    slug: 'tvorchestvo',
    title: 'Творчество',
    shortDescription: 'Рисуем, мастерим и пробуем разные материалы в спокойной творческой среде.',
    category: 'Творчество',
    ageGroups: [{ label: '4–6 лет', minAge: 4, maxAge: 6 }],
    branches: [], duration: null, groupSize: null, schedule: null, price: null,
    trialLesson: null, teacher: null, results: [], status: 'active', accent: 'coral',
  },
  {
    slug: 'neyrochtenie',
    title: 'Нейрочтение',
    shortDescription: 'Упражнения на чтение, внимание, память и работу с текстом.',
    category: 'Развитие и учёба',
    ageGroups: [], branches: [], duration: null, groupSize: null, schedule: null, price: null,
    trialLesson: null, teacher: null, results: [], status: 'active', accent: 'orange',
  },
  {
    slug: 'nauchnaya-laboratoriya',
    title: 'Научная лаборатория',
    shortDescription: 'Наблюдаем, задаём вопросы и проводим безопасные опыты вместе с наставником.',
    category: 'Наука',
    ageGroups: [{ label: 'с 5 лет', minAge: 5 }],
    branches: [], duration: null, groupSize: null, schedule: null, price: null,
    trialLesson: true, teacher: null, results: [], status: 'active', accent: 'red',
  },
  {
    slug: 'bloging',
    title: 'Блогинг',
    shortDescription: 'Учимся придумывать идеи, работать в кадре и создавать собственные медиапроекты.',
    category: 'Медиа',
    ageGroups: [], branches: [], duration: null, groupSize: null, schedule: null, price: null,
    trialLesson: null, teacher: null, results: [], status: 'active', accent: 'coral',
  },
  {
    slug: 'biseropletenie',
    title: 'Бисероплетение',
    shortDescription: 'Создаём аккуратные работы своими руками и развиваем терпение и чувство цвета.',
    category: 'Творчество',
    ageGroups: [], branches: [], duration: null, groupSize: null, schedule: null, price: null,
    trialLesson: null, teacher: null, results: [], status: 'active', accent: 'gold',
  },
];
