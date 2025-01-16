import axios from 'axios';
import { mapApiDataToAmountListItem } from '../../marketplaceMain/mainpagecardType';

export const fetchCardByUserAndId = async (userId: string, cardId: string) => {
  console.log(userId);
  console.log(cardId);
  try {
    const response = await axios.get(
      `http://localhost:8000/shop/card/${userId}/${cardId}`,
    );
    console.log(response.data);
    return mapApiDataToAmountListItem(response.data);
  } catch (error) {
    console.error('카드 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};
