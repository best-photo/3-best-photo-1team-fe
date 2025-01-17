import axios from 'axios';
import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';
import { mapApiDataToAmountListItem } from '../../marketplaceMain/mainpagecardType';

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

  console.log('Request params:', params);

  const response = await axios.get<any[]>(
    `http://localhost:8000/shop/cards/${userId}`,
    {
      params,
    },
  );
  return response.data.map(mapApiDataToAmountListItem);
};
