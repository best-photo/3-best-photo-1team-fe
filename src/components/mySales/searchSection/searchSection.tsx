'use client';

import { useEffect, useState } from 'react';
import SearchInput from '../../common/CommonSearchBox/SearchInput';
import Image from 'next/image';
import filterIcon from '@/public/icons/filter.svg';
import { useFilterStore } from '@/src/store/useFilterStore';
import FilterGroup from '../../common/filterDropdown/templates/filterGroup';

export default function SearchSection({
  onSubmitFilter,
}: {
  onSubmitFilter: (query: string) => void;
}) {
  const [keyword, setKeyword] = useState('');
  const modalOpen = useFilterStore((state) => state.modalOpen);
  const setModalOpen = useFilterStore((state) => state.setModalOpen);

  const setOnSubmitCallback = useFilterStore(
    (state) => state.setOnSubmitCallback,
  );

  useEffect(() => {
    setOnSubmitCallback(onSubmitFilter);

    return () => {
      setOnSubmitCallback(() => {});
    };
  }, []);

  return (
    <div className='flex gap-[10px] md:gap-[30px] lg:gap-[60px] mb-5 md:mb-10 lg:mb-[60px] justify-between md:justify-start'>
      <button
        className='p-[12.5px] border border-white block md:hidden lg:hidden'
        onClick={() => setModalOpen(!modalOpen)}
      >
        <Image
          src={filterIcon}
          alt='필터 버튼'
          width={50}
          height={50}
          sizes='fill'
        />
      </button>
      <SearchInput
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='검색'
        className='w-[290px] md:w-[200px] lg:w-[320px]'
      />

      <div className='gap-[25px] md:gap-[25px] lg:gap-[45px] hidden md:flex lg:flex'>
        <FilterGroup />
      </div>
    </div>
  );
}
