import axios from 'axios';
import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';

export const axiosUserCards = async (
  userId: string,
  filters: { query: string; grade: string; genre: string },
): Promise<AmountListItem[]> => {
  const params = {
    query: filters.query || '',
    grade: filters.grade || '',
    genre: filters.genre || '',
  };

  const response = await axios.get<any[]>(
    `http://localhost:8000/cards/user/${userId}`,
    {
      params,
    },
  );
  return response.data; // 데이터 포맷에 따라 필요한 매핑 추가 가능
};
