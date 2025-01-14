import { FilterCategory } from '@/src/store/useFilterStore';

export interface FilterCategoryProps {
  category: FilterCategory;
  selectedCategory: FilterCategory;
  setSelectedCategory: (category: FilterCategory) => void;
}
