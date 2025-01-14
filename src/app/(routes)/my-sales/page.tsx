'use client';

import Header from '@/src/components/mySales/header/header';
import SearchSection from '@/src/components/mySales/searchSection/searchSection';
import defaultImage from '@/public/images/sample-image-1.webp';
import CardContainer, {
  Card,
} from '@/src/components/mySales/cardContainer/cardContainer';
import FilterModal from '@/src/components/common/filterModal/templates/filterModal';
import { usePathname, useRouter } from 'next/navigation';

export default function Page() {
  const nickname = '유디'; // 이후 교체 예정
  const cardsCount = {
    common: 10,
    rare: 10,
    superRare: 10,
    legendary: 10,
  };
  const router = useRouter();
  const pathname = usePathname();

  const cards: Card[] = [
    {
      cardId: 1,
      nickname: nickname,
      price: 5,
      image: defaultImage,
      cardName: '마당 사진',
      state: 'trading',
      grade: 'legendary',
      genre: 'landscape',
      totalAmount: 5,
    },
    {
      cardId: 2,
      nickname: nickname,
      price: 5,
      image: defaultImage,
      cardName: '마당 사진',
      state: 'selling',
      grade: 'legendary',
      genre: 'landscape',
      totalAmount: 5,
    },
    {
      cardId: 3,
      nickname: nickname,
      price: 5,
      image: defaultImage,
      cardName: '마당 사진',
      state: 'selling',
      grade: 'legendary',
      genre: 'landscape',
      totalAmount: 5,
    },
    {
      cardId: 4,
      nickname: nickname,
      price: 5,
      image: defaultImage,
      cardName: '마당 사진',
      state: 'selling',
      grade: 'legendary',
      genre: 'landscape',
      totalAmount: 5,
    },
    {
      cardId: 5,
      nickname: nickname,
      price: 5,
      image: defaultImage,
      cardName: '마당 사진',
      state: 'selling',
      grade: 'legendary',
      genre: 'landscape',
      totalAmount: 5,
    },
    {
      cardId: 6,
      nickname: nickname,
      price: 5,
      image: defaultImage,
      cardName: '마당 사진',
      state: 'selling',
      grade: 'legendary',
      genre: 'landscape',
      totalAmount: 5,
    },
    {
      cardId: 7,
      nickname: nickname,
      price: 5,
      image: defaultImage,
      cardName: '마당 사진',
      state: 'selling',
      grade: 'legendary',
      genre: 'landscape',
      totalAmount: 5,
    },
    {
      cardId: 8,
      nickname: nickname,
      price: 5,
      image: defaultImage,
      cardName: '마당 사진',
      state: 'selling',
      grade: 'legendary',
      genre: 'landscape',
      totalAmount: 5,
    },
    {
      cardId: 9,
      nickname: nickname,
      price: 5,
      image: defaultImage,
      cardName: '마당 사진',
      state: 'selling',
      grade: 'legendary',
      genre: 'landscape',
      totalAmount: 5,
    },
  ];

  return (
    <div className='flex flex-col max-w-[744px] md:max-w-[1480px] mx-auto p-[15px] md:p-5 h-[1500px]'>
      <Header
        nickname={nickname}
        cards={cardsCount}
      />
      <SearchSection
        onSubmitFilter={(query) => router.push(`${pathname}?${query}`)}
      />
      <CardContainer
        cards={cards}
        onClick={(id: number) => alert(id)}
      />
      <FilterModal variant='mySale' />
    </div>
  );
}
