import FilterSection from '../organisms/filterSection';
import { useFilterStore } from '@/src/store/useFilterStore';
import { useEffect } from 'react';
import FilterActions from '../molecules/filterActions/filterActions';
import FilterModalHeader from '../molecules/filterModalHeader/filterModalHeader';
import {
  FILTER_CATEGORIES,
  GENRES_OPTION,
  GRADES_OPTION,
  SALES_METHODS_OPTION,
  STOCK_STATE_OPTION,
} from '@/src/constants/filterOptions';
import { createPortal } from 'react-dom';

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

export default function FilterModal({
  variant,
}: {
  variant: 'marketplace' | 'mySale' | 'myGallery';
}) {
  const setOptions = useFilterStore((state) => state.setOptions);
  const setCategories = useFilterStore((state) => state.setCategories);
  const modalOpen = useFilterStore((state) => state.modalOpen);

  useEffect(() => {
    setOptions(OPTIONS[variant]);
    setCategories(CATEGORIES[variant]);

    return () => {
      setOptions({});
      setCategories([]);
    };
  }, [variant, setOptions, setCategories]);

  if (modalOpen)
    return createPortal(
      <>
        <div className='absolute w-full h-full bg-black-50 block md:hidden z-30' />
        <div className='w-full rounded-t-[16px] bg-[#1b1b1b] block md:block absolute bottom-0 z-40'>
          <FilterModalHeader />
          <FilterSection />
          <FilterActions />
        </div>
      </>,
      document.body,
    );
}
