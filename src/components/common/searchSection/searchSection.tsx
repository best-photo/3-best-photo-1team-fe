'use client';

import { useEffect, useState } from 'react';
import SearchInput from '../CommonSearchBox/SearchInput';
import Image from 'next/image';
import filterIcon from '@/public/icons/filter.svg';
import { useFilterStore } from '@/src/store/useFilterStore';
import FilterGroup from '../filterGroup/templates/filterGroup';
import FilterModal from '../filterModal/templates/filterModal';
import {
  FILTER_CATEGORIES,
  GENRES_OPTION,
  GRADES_OPTION,
  SALES_METHODS_OPTION,
  STOCK_STATE_OPTION,
} from '@/src/constants/filterOptions';
import { SearchSectionProps } from './searchSection.types';

const CATEGORIES = {
  marketplace: FILTER_CATEGORIES.filter(
    (category) => category.value !== '판매 방법',
  ),
  myGallery: FILTER_CATEGORIES.filter(
    (category) => category.value === '등급' || category.value === '장르',
  ),
  mySale: FILTER_CATEGORIES,
};

const OPTIONS = {
  marketplace: {
    ...GRADES_OPTION,
    ...GENRES_OPTION,
    ...STOCK_STATE_OPTION,
  },
  myGallery: {
    ...GRADES_OPTION,
    ...GENRES_OPTION,
  },
  mySale: {
    ...GRADES_OPTION,
    ...GENRES_OPTION,
    ...SALES_METHODS_OPTION,
    ...STOCK_STATE_OPTION,
  },
};

export default function SearchSection({
  onSubmitFilter,
  variant,
}: SearchSectionProps) {
  const [keyword, setKeyword] = useState('');
  const modalOpen = useFilterStore((state) => state.modalOpen);
  const setModalOpen = useFilterStore((state) => state.setModalOpen);
  const setOptions = useFilterStore((state) => state.setOptions);
  const setCategories = useFilterStore((state) => state.setCategories);
  const setSelectedOption = useFilterStore((state) => state.setSelectedOption);

  useEffect(() => {
    setOptions(OPTIONS[variant]);
    setCategories(CATEGORIES[variant]);
    setOnSubmitCallback(onSubmitFilter);

    return () => {
      setOptions({});
      setCategories([]);
      setOnSubmitCallback(() => {});
    };
  }, [variant, setOptions, setCategories]);

  const setOnSubmitCallback = useFilterStore(
    (state) => state.setOnSubmitCallback,
  );

  const handleInput = () => {
    onSubmitFilter(`keyword=${keyword}`);
    setSelectedOption({ value: '', query: '' });
  };

  return (
    <>
      <div className='flex gap-[10px] md:gap-[30px] lg:gap-[60px] mb-5 md:mb-10 lg:mb-[60px] justify-between md:justify-start relative'>
        <button
          className='p-[12.5px] h-[50px] border border-white block md:hidden lg:hidden'
          onClick={() => setModalOpen(!modalOpen)}
        >
          <Image
            src={filterIcon}
            alt='필터 버튼'
            width={30}
            height={30}
            sizes='fill'
          />
        </button>
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='검색'
          className='w-full md:w-[200px] lg:w-[320px]'
          onSearchClick={handleInput}
        />

        <div className='gap-[25px] md:gap-[25px] lg:gap-[45px] hidden md:flex lg:flex'>
          <FilterGroup />
        </div>
      </div>
      <FilterModal />
    </>
  );
}
