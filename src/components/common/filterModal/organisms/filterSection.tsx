import CategoryGroup from '../molecules/categoryGroup/categoryGroup';
import OptionGroup from '../molecules/optionGroup/optionGroup';

export default function FilterSection() {
  return (
    <>
      <div className='flex gap-6 border-b-gray-500 border-b text-[14px] pl-6'>
        <CategoryGroup />
      </div>
      <div className='h-[280px]'>
        <OptionGroup />
      </div>
    </>
  );
}
