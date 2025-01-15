'use client';

import FilterSection from '../organisms/filterSection';
import { useFilterStore } from '@/src/store/useFilterStore';
import FilterActions from '../molecules/filterActions/filterActions';
import FilterModalHeader from '../molecules/filterModalHeader/filterModalHeader';
import { createPortal } from 'react-dom';

export default function FilterModal() {
  const modalOpen = useFilterStore((state) => state.modalOpen);

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
