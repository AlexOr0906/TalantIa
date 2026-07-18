import type { BranchId } from './programs';

/** Структура для будущих подтверждённых групп. Пустые записи не выводятся. */
export interface ProgramGroup {
  programSlug: string;
  branch: BranchId;
  ageLabel?: string;
  days?: string[];
  time?: string;
  price?: string;
  duration?: string;
  note?: string;
}

export const programGroups: ProgramGroup[] = [];
