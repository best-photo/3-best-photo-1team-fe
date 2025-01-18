import axiosInstance from '../../../axiosInstance';

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
    const response = await axiosInstance.post('/shop', params);
    console.log('판매 등록 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('판매 등록 중 오류 발생:', error);
    throw error;
  }
};
