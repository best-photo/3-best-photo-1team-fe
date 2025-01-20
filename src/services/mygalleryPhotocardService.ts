import axiosInstance from '@/src/lib/axios/axiosInstance';
import { Genres } from '@/src/components/common/photoCard/types';
import { Card } from '../components/mySales/cardContainer/cardContainer';

export interface CreateCardData {
  imageUrl: File;
  price: number;
  totalQuantity: number;
  name: string;
  grade: string;
  genre: string;
  description: string;
}

export interface PhotoCard {
  id: string;
  name: string;
  imageUrl: string;
  grade: 'COMMON' | 'RARE' | 'SUPER RARE' | 'LEGENDARY';
  genre: Genres;
  price: number;
  totalQuantity: number;
  remainingQuantity: number;
  description: string;
  nickname: string;
}

export interface CardInfo {
  nickname: string;
  common: number;
  rare: number;
  superRare: number;
  legendary: number;
}

export const myGalleryPhotoCard = async (filters: {
  search?: string;
  grade?: string;
  genre?: string;
}): Promise<PhotoCard[]> => {
  try {
    // 로그인한 사용자의 ID를 NextJS API Routes에서 불러옴
    const getUserId = await fetch('/api/auth/user');
    if (!getUserId.ok) {
      throw new Error(`인증 실패: ${getUserId.status}`);
    }
    const { userId } = await getUserId.json();

    if (!userId) {
      throw new Error('사용자가 로그인되지 않았습니다.');
    }

    // API 호출하여 로그인한 사용자의 포토카드 목록 조회
    const response = await axiosInstance.get(`/users/my-cards`, {
      params: {
        userId,
        search: filters.search || '', // 검색어
        sortGrade: filters.grade || '', // 필터링할 등급
        sortGenre: filters.genre || '', // 필터링할 장르
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 응답 데이터에서 cards 배열만 반환
    return response.data.cards;
  } catch (error) {
    console.error('포토카드 조회 중 오류:', error);
    throw error; // 오류를 호출한 곳으로 전달
  }
};

export const getCardById = async (cardId: string): Promise<PhotoCard> => {
  try {
    const response = await axiosInstance.get(`/cards/public-cards/${cardId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 서버에서 반환된 데이터가 PhotoCard 타입과 맞는지 확인하고 반환
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('카드 정보를 불러오는 데 실패했습니다.');
  }
};

export const getDetailCard = async (
  userId: string,
  cardId: string,
): Promise<PhotoCard> => {
  try {
    const response = await axiosInstance.get(
      `/users/my-cards/${userId}/${cardId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Fetched card data:', response.data);

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('카드 정보를 불러오는 데 실패했습니다.');
  }
};

export const fetchUserGalleryData = async (): Promise<CardInfo> => {
  try {
    const response = await axiosInstance.get('/users/card-info', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
