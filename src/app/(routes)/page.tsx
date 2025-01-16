'use client';

import React, { useEffect, useState } from 'react';
import MarketplaceHeader from '../../components/marketplace/MarketplaceHeader';
import SearchSection from '../../components/common/searchSection/searchSection';
import PhotoCardListItem from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem';
import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';
import { axiosFilteredCards } from '@/src/lib/axios/types/api/marketplaceMain/MainpageCards';
import { useRerenderStore } from '@/src/store/rerenderStore';

// 등급 변환 함수
const convertGradeToLowerCase = (
  grade: string,
): 'common' | 'rare' | 'superRare' | 'legendary' => {
  switch (
    grade.toLowerCase() // 소문자로 변환
  ) {
    case 'common':
      return 'common';
    case 'rare':
      return 'rare';
    case 'superrare':
    case 'super_rare':
    case 'SUPER_RARE':
      return 'superRare';
    case 'legendary':
      return 'legendary';
    default:
      throw new Error(`Invalid grade value: ${grade}`);
  }
};

// 장르 변환 함수
const convertGenreToLowerCase = (
  genre: string,
): 'travel' | 'landscape' | 'portrait' | 'object' => {
  switch (genre.toUpperCase()) {
    case 'TRAVEL':
      return 'travel';
    case 'LANDSCAPE':
      return 'landscape';
    case 'PORTRAIT':
      return 'portrait';
    case 'OBJECT':
      return 'object';
    default:
      throw new Error(`Invalid genre value: ${genre}`);
  }
};

export default function Home() {
  const [photoCards, setPhotoCards] = useState<AmountListItem[]>([]);

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);
  const [isProductVisible, setProductVisible] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const { renderKey } = useRerenderStore();

  const [filters, setFilters] = useState({
    grade: '',
    genre: '',
    status: '',
    priceOrder: '',
  });

  const [query, setQuery] = useState('');

  const fetchFilteredCards = async (
    filters: {
      grade: string;
      genre: string;
      status: string;
      priceOrder: string;
    },
    query: string,
  ) => {
    try {
      const transformedFilters = {
        ...filters,
        grade: filters.grade ? convertGradeToLowerCase(filters.grade) : '',
        genre: filters.genre ? convertGenreToLowerCase(filters.genre) : '',
      };
      const combinedFilters = { ...transformedFilters, query };
      console.log('Transformed Filters:', combinedFilters);
      const cards = await axiosFilteredCards(combinedFilters);
      setPhotoCards(cards);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const handleModalClose = () => {
    setTriggerRefresh(!triggerRefresh);
    setFilters({
      grade: '',
      genre: '',
      status: '',
      priceOrder: '',
    });
    setQuery('');
  };

  const handleFilterChange = (filterQuery: string) => {
    const params = new URLSearchParams(filterQuery);

    const newFilters = {
      grade: params.get('grade') || '',
      genre: params.get('genre') || '',
      status: params.get('status') || '',
      priceOrder: params.get('priceOrder') || '',
    };
    const newQuery = params.get('keyword') || '';
    setFilters(newFilters);
    setQuery(newQuery);
  };

  useEffect(() => {
    fetchFilteredCards(filters, query);
  }, [filters, query, triggerRefresh]);

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
          onModalClose={handleModalClose}
        />
        <div className='border-b border-white w-[1480px] mx-auto mt-[20px]'></div>
        <div className='w-[1480px] h-[50px] flex justify-between items-center mx-auto mt-[50px]'>
          <SearchSection
            key={renderKey}
            variant='marketplace'
            onSubmitFilter={handleFilterChange}
          />
        </div>
      </div>

      <div className='flex gap-[80px] flex-wrap w-[1480px] mx-auto pt-[60px] mb-[100px]'>
        {photoCards.length > 0 ? (
          photoCards.map((card) => (
            <PhotoCardListItem
              key={card.cardId}
              {...card}
            />
          ))
        ) : (
          <div>포토카드가 없습니다.</div>
        )}
      </div>
    </>
  );
}
