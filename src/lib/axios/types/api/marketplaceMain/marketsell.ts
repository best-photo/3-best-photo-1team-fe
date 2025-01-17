import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ShopEntryParams {
  sellerId: string;
  cardId: string;
  price: number;
  quantity: number;
  exchangeGrade: string;
  exchangeGenre: string;
  exchangeDescription?: string;
}

export const createShopEntry = async (
  params: ShopEntryParams,
): Promise<any> => {
  try {
    const response = await apiClient.post('/shop', params);
    console.log('판매 등록 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('판매 등록 중 오류 발생:', error);
    throw error;
  }
};
