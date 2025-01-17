'use client';

import React, { useEffect, useState } from 'react';
import MarketplaceHeader from '../../components/marketplace/MarketplaceHeader';
import SearchSection from '../../components/common/searchSection/searchSection';
import PhotoCardListItem from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem';
import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';
import { axiosFilteredCards } from '@/src/lib/axios/types/api/marketplaceMain/MainpageCards';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Dropdown from '@/src/components/common/CommonDropDown/DropDown';
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

const getPosts = async (page: any) => {
  console.log(page);
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page.pageParam}`,
  );
  if (!res.ok) {
    throw new Error('There was an error!');
  }
  return res.json();
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
  });

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
      };
      const combinedFilters = {
        ...transformedFilters,
        query,
        placeOrder: selectedPrice,
      };
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
    });
    setSelectedPrice('');
    setQuery('');
  };

  const handleFilterChange = (filterQuery: string) => {
    const params = new URLSearchParams(filterQuery);

    const newFilters = {
      grade: params.get('grade') || '',
      genre: params.get('genre') || '',
      status: params.get('status') || '',
    };
    const newQuery = params.get('keyword') || '';
    setFilters(newFilters);
    setQuery(newQuery);
  };

  useEffect(() => {
    fetchFilteredCards(filters, query, selectedPrice);
  }, [filters, query, selectedPrice, triggerRefresh]);

  /* 무한 스크롤 테스트 부분 */
  const { ref, inView } = useInView();
  const {
    isPending,
    error,
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 10000,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length + 1;
    },
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (isPending) {
    return (
      <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>
        Loading...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>
        Error: {error.message}
      </h1>
    );
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
          onModalClose={handleModalClose}
        />
        <div className='border-b border-white w-[1480px] mx-auto mt-[20px]'></div>
        <div className='w-[1480px] h-[50px] flex justify-between  mx-auto mt-[20px]'>
          <SearchSection
            key={renderKey}
            variant='marketplace'
            onSubmitFilter={handleFilterChange}
          />
          <Dropdown
            options={['최신순', '오래된 순', '높은 가격순', '낮은 가격순']}
            selectedValue={selectedPrice}
            placeholder='낮은 가격순'
            onValueChange={setSelectedPrice}
            className='border border-[#dddddd] w-[180px]'
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
        <div className={`${isFetching ? '' : ''}`}>
          {data.pages.map((page) => (
            <div key={page.id}>
              {page.map((post: any) => (
                <div
                  key={post.id}
                  className='border p-4 my-4'
                >
                  <h2 className='text-xl font-bold'>{post.title}</h2>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          ))}
          {/* 무한 스크롤 테스트 부분  */}
          <div>
            {hasNextPage && (
              <div
                ref={ref}
                className='h-4 text-3xl text-center w-full bg-blue-200'
              >
                {isFetchingNextPage ? 'Loading more...' : ''}
              </div>
            )}
            {/* {hasNextPage && (
              <button
                disabled={isFetchingNextPage}
                className='px-3 py-1 bg-blue rounded-md text-white font-bold'
                onClick={() => fetchNextPage()}
              >
                Load more
              </button>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}
