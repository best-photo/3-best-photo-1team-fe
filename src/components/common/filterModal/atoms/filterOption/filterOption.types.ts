import { FilterOption } from '@/src/store/useFilterStore';

export interface FilterOptionProps {
  selectedOption: FilterOption;
  setSelectedOptions: (option: FilterOption) => void;
  option: FilterOption;
  optionCount: number;
  className?: string;
}
