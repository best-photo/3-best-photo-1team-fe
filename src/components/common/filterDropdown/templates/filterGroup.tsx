import { useEffect } from 'react';
import Dropdown from '../organisms/DropDown';
import { useFilterStore } from '@/src/store/useFilterStore';

export default function FilterGroup() {
  const {
    options,
    categories,
    selectedCategory,
    selectedOption,
    setSelectedOption,
    setSelectedCategory,
  } = useFilterStore();

  return (
    <div className='gap-[25px] md:gap-[25px] lg:gap-[45px] hidden md:flex lg:flex'>
      {categories.map((category) => (
        <Dropdown
          key={category.value}
          options={options[category.value]}
          placeholder={category.value}
          selectedValue={
            selectedCategory.value === category.value
              ? selectedOption.value
              : category.value
          }
          onValueChange={setSelectedOption}
          onClick={() =>
            selectedCategory.value !== category.value &&
            setSelectedCategory(category)
          }
        />
      ))}
    </div>
  );
}
