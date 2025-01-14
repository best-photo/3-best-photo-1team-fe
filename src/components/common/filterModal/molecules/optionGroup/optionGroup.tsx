import FilterOption from '../../atoms/filterOption/filterOption';
import { useFilterStore } from '@/src/store/useFilterStore';

export default function OptionGroup() {
  const {
    options,
    selectedCategory,
    selectedOption: selectedOptions,
    setSelectedOption: setSelectedOptions,
  } = useFilterStore();

  const optionOfCategory = options[selectedCategory?.value];

  return (
    <>
      {optionOfCategory?.map((option) => {
        return (
          <FilterOption
            key={option.query}
            option={option}
            setSelectedOptions={setSelectedOptions}
            selectedOption={selectedOptions}
            optionCount={10}
          />
        );
      })}
    </>
  );
}
