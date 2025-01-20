'use client';

import React, { useEffect, useState } from 'react';
import MarketplaceHeader from '../../components/marketplace/MarketplaceHeader';
import SearchSection from '../../components/common/searchSection/searchSection';
import PhotoCardListItem from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem';
import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';
import Dropdown from '@/src/components/common/CommonDropDown/DropDown';
import { useRerenderStore } from '@/src/store/rerenderStore';
import {
  axiosFilteredCards,
  axiosGetFilterCountsByCategory,
} from '@/src/services/marketPlaceService';
import { useFilterStore } from '@/src/store/useFilterStore';

const convertGradeToLowerCase = (
  grade: string,
): 'common' | 'rare' | 'superRare' | 'legendary' => {
  switch (grade.toLowerCase()) {
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
  const [optionCounts, setOptionCounts] = useState<number[]>([]);
  const { selectedCategory } = useFilterStore();
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);
  const [isProductVisible, setProductVisible] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const { renderKey } = useRerenderStore();

  const [filters, setFilters] = useState({
    grade: '',
    genre: '',
    status: '',
  });

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!selectedCategory || !selectedCategory.value) return;

      try {
        const categoryMap: Record<string, 'grades' | 'genres' | 'stockState'> =
          {
            등급: 'grades',
            장르: 'genres',
            '매진 여부': 'stockState',
          };

        const category = categoryMap[selectedCategory.value];

        if (!category) {
          throw new Error(`Unsupported category: ${selectedCategory.value}`);
        }

        const data = await axiosGetFilterCountsByCategory(category);

        // let sortedData = data;
        // if (category === 'grades') {
        //   const gradeOrder = [0, 2, 3, 1];
        //   sortedData = gradeOrder.map((index) => data[index]);
        // } else if (category === 'genres') {
        //   const genreOrder = [3, 1, 2, 0];
        //   sortedData = genreOrder.map((index) => data[index]);
        // }

        setOptionCounts(data);

        console.log(`Updated counts for ${category}:`, data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [selectedCategory]);

  const [query, setQuery] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<string>('');

  const fetchFilteredCards = async (
    filters: {
      grade: string;
      genre: string;
      status: string;
    },
    query: string,
    selectedPrice: string,
  ) => {
    try {
      const transformedFilters = {
        ...filters,
        grade: filters.grade ? convertGradeToLowerCase(filters.grade) : '',
        genre: filters.genre ? convertGenreToLowerCase(filters.genre) : '',
        status: filters.status,
      };
      const combinedFilters = {
        ...transformedFilters,
        query,
        placeOrder: selectedPrice,
      };
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
    });
    setSelectedPrice('');
    setQuery('');
  };

  const handleFilterChange = (filterQuery: string) => {
    const params = new URLSearchParams(filterQuery);

    const newFilters = {
      grade: params.get('grade') || '',
      genre: params.get('genre') || '',
      status: params.get('stockState') || '',
    };
    const newQuery = params.get('keyword') || '';
    setFilters(newFilters);
    setQuery(newQuery);
  };

  useEffect(() => {
    fetchFilteredCards(filters, query, selectedPrice);
  }, [filters, query, selectedPrice, triggerRefresh]);

  return (
    <>
      <div className='pt-[65px] w-full md:pt-[40px] lg:pt-[60px] max-w-[1480px] px-5 mx-auto'>
        <MarketplaceHeader
          isAlertVisible={isAlertVisible}
          setAlertVisible={setAlertVisible}
          isLoginAlertVisible={isLoginAlertVisible}
          setIsLoginAlertVisible={setIsLoginAlertVisible}
          isProductVisible={isProductVisible}
          setProductVisible={setProductVisible}
          onModalClose={handleModalClose}
        />
        <div className='border-b border-white w-full mx-auto mt-[20px]'></div>
        <div className='h-[50px] w-full flex justify-between mx-auto mt-[20px] relative'>
          <SearchSection
            key={renderKey}
            variant='marketplace'
            optionCounts={optionCounts}
            onSubmitFilter={handleFilterChange}
            mainPageInputclassName='max-md:absolute max-md:top-[-90px] w-[calc(100vw_-_40px)]'
          />
          <Dropdown
            options={['최신순', '오래된 순', '높은 가격순', '낮은 가격순']}
            selectedValue={selectedPrice}
            placeholder='낮은 가격순'
            onValueChange={setSelectedPrice}
            className='border border-[#dddddd] w-[180px] max-md:absolute max-md:right-0'
          />
        </div>
      </div>

      <div className='w-full grid grid-cols-2 max-w-[1480px] px-5 lg:px-10  mx-auto mt-[20px] md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[5px] md:gap-5 lg:gap-20 pb-[140px]'>
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
