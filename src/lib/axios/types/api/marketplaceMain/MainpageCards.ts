import axios from 'axios';
import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';
import { mapApiDataToAmountListItem } from '../../marketplaceMain/mainpagecardType';

export const axiosFilteredCards = async (filters: {
  query: string;
  grade: string;
  genre: string;
  status: string;
  priceOrder: string;
}): Promise<AmountListItem[]> => {
  const params = {
    query: filters.query || '',
    grade: filters.grade || '',
    genre: filters.genre || '',
    status: filters.status || '',
    priceOrder: filters.priceOrder || '',
  };

  console.log('Request params:', params);

  const response = await axios.get<any[]>('http://localhost:8000/shop/cards', {
    params,
  });
  return response.data.map(mapApiDataToAmountListItem);
};
