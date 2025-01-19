'use client';

import exchangeIcon from '@/public/icons/exchange.svg';
import { CommonBtn } from '../../../CommonBtn/CommonBtn';
import Image from 'next/image';
import { useFilterStore } from '@/src/store/useFilterStore';

export default function FilterActions() {
  const reset = useFilterStore((state) => state.reset);
  const setModalOpen = useFilterStore((state) => state.setModalOpen);
  const onSubmitFilter = useFilterStore((state) => state.onSubmitFilter);
  const selectedOption = useFilterStore((state) => state.selectedOption);
  const options = useFilterStore((state) => state.options);
  const optionCounts = useFilterStore((state) => state.optionCounts);
  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const index =
    selectedCategory?.value && options[selectedCategory.value]
      ? options[selectedCategory.value].indexOf(selectedOption)
      : -1;
  const handleSubmit = () => {
    onSubmitFilter();
    setModalOpen(false);
  };

  return (
    <div className='flex items-center px-[15px] pb-10 justify-between'>
      <button
        onClick={reset}
        className='flex-shrink-0 w-[54px]'
      >
        <Image
          src={exchangeIcon}
          alt='새로고침 버튼'
          width={30}
          height={30}
          sizes='fill'
          className='brightness-[40%] m-[16.45px]'
        />
      </button>
      <CommonBtn
        onClick={() => handleSubmit()}
        variant='primary'
        width='custom'
        heightPreset={3}
        className='min-w-[272px] max-w-[500px]'
      >
        {optionCounts[index]?.toLocaleString() || 0}개 포토보기
      </CommonBtn>
    </div>
  );
}
