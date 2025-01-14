import FilterCategory from '../../atoms/filterCategory/filterCategory';
import { useFilterStore } from '@/src/store/useFilterStore';

export default function CategoryGroup() {
  const { categories, selectedCategory, setSelectedCategory } =
    useFilterStore();

  if (!categories.length) {
    return null;
  }

  return (
    <div className='flex gap-6 border-b-gray-500 border-b text-[14px]'>
      {categories.map((category) => (
        <FilterCategory
          key={category.queryString}
          selectedCategory={selectedCategory}
          category={category}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
}
