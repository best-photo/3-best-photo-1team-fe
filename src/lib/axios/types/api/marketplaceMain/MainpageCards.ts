import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';
import { mapApiDataToAmountListItem } from '../../marketplaceMain/mainpagecardType';
import axiosInstance from '../../../axiosInstance';

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

  const response = await axiosInstance.get<any[]>(`/shop/cards`, {
    params,
  });
  return response.data.map((data) => {
    const mappedItem = mapApiDataToAmountListItem(data);
    const quantity = data.quantity || 0;
    const soldAmount = data.totalQuantity - quantity;
    return { ...mappedItem, quantity, soldAmount };
  });
};
