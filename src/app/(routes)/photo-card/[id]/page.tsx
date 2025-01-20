'use client';

import { useEffect, useState } from 'react';

import useAuthStore from '@/src/store/useAuthStore';
import SellerView from '@/src/components/marketplace/SellerView';
import BuyerView from '@/src/components/marketplace/BuyerView';
import axiosInstance from '@/src/lib/axios/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const getShopDetail = async (shopId: string) => {
  const response = await axiosInstance(`/shop/${shopId}`);
  return response.data;
};

export type CardGrade = 'COMMON' | 'RARE' | 'SUPER_RARE' | 'LEGENDARY';
export type CardGenre = 'TRAVEL' | 'LANDSCAPE' | 'PORTRAIT' | 'OBJECT';
export type ExchangeStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'COMPLETED';

interface ExchangeCardInfo {
  card: {
    name: string;
    imageUrl: string;
    grade: CardGrade;
    genre: CardGenre;
    description?: string | null;
  };
  description?: string | null;
  status: ExchangeStatus;
}

interface shopDataResponse {
  card: {
    name: string;
    imageUrl: string;
    grade: CardGrade;
    genre: CardGenre;
    owner: string; // 닉네임
    description?: string | null;
  };
  shop: {
    price: number;
    initialQuantity: number;
    remainingQuantity: number;
    exchangeInfo: {
      grade: CardGrade;
      genre: CardGenre;
      description?: string | null;
    };
  };
  exchanges: {
    offeredExchanges: ExchangeCardInfo[]; // 내가 제시한 교환 목록
    targetExchanges: ExchangeCardInfo[]; // 다른 사람이 제시한 교환 목록
  };
}

const PhotoCardDetailPage = ({ params }: { params: { id: string } }) => {
  const { user } = useAuthStore();

  // 카드ID를 통해 포토카드 정보 가져오기
  const {
    data: shopData,
    isLoading,
    error,
  } = useQuery<shopDataResponse>({
    queryKey: ['shop', params.id],
    queryFn: () => getShopDetail(params.id),
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    retry: 2, // Retry failed requests twice
  });
  console.log('shopData', shopData);

  if (isLoading || !user || !shopData) return <p>Loading...</p>;

  if (error) return <p>Error loading photo card details</p>;

  return (
    <article className='max-w-[1480px] mx-auto pb-[180px]'>
      {user.nickname === shopData.card.owner ? (
        <SellerView
          shopId={params.id}
          shopData={shopData}
        /> // 판매자
      ) : (
        <BuyerView
          shopId={params.id}
          shopData={shopData}
        /> // 구매자
      )}
    </article>
  );
};

export default PhotoCardDetailPage;
