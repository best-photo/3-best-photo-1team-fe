'use client';

import React, { useEffect, useState } from 'react';
import MarketplaceHeader from '../../components/marketplace/MarketplaceHeader';
import MarketplaceSearchBox from '../../components/marketplace/MarketplaceSearchBox';
import PhotoCardListItem from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem';
import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';
import { axiosFilteredCards } from '@/src/lib/axios/types/api/marketplaceMain/MainpageCards';

export default function Home() {
  const [photoCards, setPhotoCards] = useState<AmountListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);
  const [isProductVisible, setProductVisible] = useState(false);

  const userId: string | null = '1';

  const [filters, setFilters] = useState({
    grade: '',
    genre: '',
    status: '',
    priceOrder: '',
  });

  const [inputQuery, setInputQuery] = useState('');
  const [query, setQuery] = useState('');

  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const handleSearchClick = () => {
    setQuery(inputQuery);
  };

  const handleModalClose = () => {
    setTriggerRefresh((prev) => !prev);
    setFilters({
      grade: '',
      genre: '',
      status: '',
      priceOrder: '',
    });
    setInputQuery('');
    setQuery('');
  };

  useEffect(() => {
    console.log('Filters:', filters);
    console.log('Query:', query);
    console.log('triggerRefresh effect triggered');

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const combinedFilters = { ...filters, query };
        const cards = await axiosFilteredCards(combinedFilters);
        console.log(cards);
        console.log(combinedFilters);
        setPhotoCards(cards);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    console.log('triggerRefresh : ' + triggerRefresh);
    fetchData();
  }, [filters, query, triggerRefresh]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>데이터를 가져오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <div className='pt-[60px]'>
        <MarketplaceHeader
          isAlertVisible={isAlertVisible}
          setAlertVisible={setAlertVisible}
          isLoginAlertVisible={isLoginAlertVisible}
          setIsLoginAlertVisible={setIsLoginAlertVisible}
          isProductVisible={isProductVisible}
          setProductVisible={setProductVisible}
          userId={userId}
          onModalClose={handleModalClose}
        />
        <div className='border-b border-white w-[1480px] mx-auto mt-[20px]'></div>
        <MarketplaceSearchBox
          filters={filters}
          setFilters={setFilters}
          query={inputQuery}
          setQuery={setInputQuery}
          onSearchClick={handleSearchClick}
        />
      </div>

      <div className='flex gap-[80px] flex-wrap w-[1480px] mx-auto pt-[60px] mb-[100px]'>
        {photoCards.map((card) => (
          <PhotoCardListItem
            key={card.cardName}
            {...card}
          />
        ))}
      </div>
    </>
  );
}
