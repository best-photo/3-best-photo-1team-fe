import { CARD_GRADES } from '@/src/constants/photoCardInformation';
import cn from '@/src/utils/cn';
import Grade from '../../../photoCard/atoms/grade/grade';
import { FilterOptionProps } from './filterOption.types';

export default function FilterOption({
  selectedOption,
  setSelectedOptions,
  option,
  optionCount,
  className,
}: FilterOptionProps) {
  const isCardGrade = (option: string): option is keyof typeof CARD_GRADES => {
    return Object.keys(CARD_GRADES).includes(option);
  };

  return (
    <div
      onClick={() => setSelectedOptions(option)}
      className={cn(
        'flex justify-between items-center px-[32px] py-[16px] cursor-pointer',
        selectedOption.value === option.value
          ? 'bg-gray-500 text-white'
          : 'text-gray-300',
        className,
      )}
    >
      {isCardGrade(option.value) ? (
        <Grade grade={option.value} />
      ) : (
        <span>{option.value}</span>
      )}
      <span>{optionCount}개</span>
    </div>
  );
}
