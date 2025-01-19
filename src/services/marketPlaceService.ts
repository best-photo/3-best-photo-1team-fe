import axiosInstance from '../lib/axios/axiosInstance';
import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';
import { mapApiDataToAmountListItem } from '../lib/axios/types/marketplaceMain/mainpagecard.type';

interface ShopEntryParams {
  sellerId: string;
  cardId: string;
  price: number;
  quantity: number;
  exchangeGrade: string;
  exchangeGenre: string;
  exchangeDescription?: string;
}

export const fetchAllShops = async (): Promise<any[]> => {
  try {
    const response = await axiosInstance.get('/api/shop/all');
    return response.data;
  } catch (error) {
    console.error('Shop 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

export const axiosFilteredCards = async (filters: {
  query: string;
  grade: string;
  genre: string;
  status: string;
  placeOrder: string;
}): Promise<AmountListItem[]> => {
  const params = {
    query: filters.query || '',
    grade: filters.grade || '',
    genre: filters.genre || '',
    status: filters.status || '',
    placeOrder: filters.placeOrder || '',
  };

  const response = await axiosInstance.get<any[]>('/shop/cards', {
    params,
  });
  return response.data.map((data) => {
    const mappedItem = mapApiDataToAmountListItem(data);
    const nickname = data.owner.nickname;
    return { ...mappedItem, nickname };
  });
};

export const axiosUserCards = async (
  userId: string,
  filters: {
    query: string;
    grade: string;
    genre: string;
  },
): Promise<AmountListItem[]> => {
  const params = {
    query: filters.query || '',
    grade: filters.grade || '',
    genre: filters.genre || '',
  };

  console.log('params : ' + params.grade);
  const response = await axiosInstance.get(`/shop/cards/${userId}`, {
    params,
  });
  const mapData = response.data.map(mapApiDataToAmountListItem);
  console.log(mapData);
  return mapData;
};

export const createShopEntry = async (
  params: ShopEntryParams,
): Promise<any> => {
  try {
    const response = await axiosInstance.post('/shop', params);
    console.log('판매 등록 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('판매 등록 중 오류 발생:', error);
    throw error;
  }
};

export const fetchCardByUserAndId = async (userId: string, cardId: string) => {
  try {
    const response = await axiosInstance.get(`/shop/card/${userId}/${cardId}`);
    const mappedData = mapApiDataToAmountListItem(response.data);
    console.log('Mapped Data:', mappedData);
    return mappedData;
  } catch (error) {
    console.error('카드 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

export const fetchCardData = async (cardId: string) => {
  const response = await axiosInstance.get(`/cards/${cardId}`);
  const mappedData = mapApiDataToAmountListItem(response.data);
  return mappedData;
};

export const axiosGetFilterCountsByCategory = async (
  category: 'grades' | 'genres' | 'stockState',
): Promise<number[]> => {
  try {
    const response = await axiosInstance.get(`/shop/filters/${category}`);
    console.log('Fetched Data:', response.data);

    if (Array.isArray(response.data)) {
      return response.data;
    }

    console.warn('Unexpected response format:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching category data:', error);
    return [];
  }
};
