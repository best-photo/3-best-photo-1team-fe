import cn from '@/src/utils/cn';
import { FilterCategoryProps } from './filterCategory.types';

export default function FilterCategory({
  category,
  selectedCategory,
  setSelectedCategory,
}: FilterCategoryProps) {
  return (
    <button
      onClick={() => setSelectedCategory(category)}
      className={cn(
        'p-3',
        category === selectedCategory
          ? 'border-b-2 border-white text-white'
          : 'text-gray-400',
      )}
    >
      {category.value}
    </button>
  );
}
