import type { ProgramCategory } from './programs';

export const programCategoryTone: Record<ProgramCategory, { surface: string; label: string }> = {
  'Развитие и учёба': { surface: 'bg-[#f6d4c8]', label: 'bg-[#f6d4c8] text-[#7d332d]' },
  'Логика и проекты': { surface: 'bg-[#d9e7f2]', label: 'bg-[#d9e7f2] text-[#31566c]' },
  'Творчество': { surface: 'bg-[#d8ead8]', label: 'bg-[#d8ead8] text-[#3f652d]' },
  'Танцы и фитнес': { surface: 'bg-[#f3d5dc]', label: 'bg-[#f3d5dc] text-[#7d3348]' },
  'Индивидуальные занятия': { surface: 'bg-[#f9dec1]', label: 'bg-[#f9dec1] text-[#80501f]' },
  'Для взрослых': { surface: 'bg-[#e5dcef]', label: 'bg-[#e5dcef] text-[#5d4573]' },
  'Каникулы и мастер-классы': { surface: 'bg-[#ffe6b6]', label: 'bg-[#ffe6b6] text-[#7a4a14]' },
};
