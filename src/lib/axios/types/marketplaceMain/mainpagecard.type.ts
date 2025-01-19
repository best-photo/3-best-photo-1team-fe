import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';
import { CARD_GENRES, CARD_GRADES } from '@/src/constants/photoCardInformation';

interface ApiData {
  name?: string;
  genre?: string | null;
  grade?: string | null;
  price?: number;
  totalQuantity?: number;
  remainingQuantity?: number;
  id?: string | null;
  quantity?: number;
  nickname: string;
}

export const mapApiDataToAmountListItem = (data: ApiData): AmountListItem => {
  const validGrades = Object.keys(CARD_GRADES);

  const totalQuantity = data.totalQuantity || 0;
  const remainingQuantity = data.remainingQuantity || 0;

  return {
    cardName: data.name || 'Default Card Name',
    genre:
      typeof data.genre === 'string' &&
      Object.keys(CARD_GENRES).includes(data.genre.toLowerCase())
        ? (data.genre.toLowerCase() as AmountListItem['genre'])
        : 'portrait',
    grade:
      typeof data.grade === 'string' &&
      validGrades.includes(data.grade.toLowerCase())
        ? (data.grade.toLowerCase() as AmountListItem['grade'])
        : 'superRare',
    nickname: data.nickname,
    price: data.price || 0,
    image: '/images/sample-image-1.webp',
    fontWeight: 'bold',
    totalAmount: data.totalQuantity || 0,
    remainingAmount: remainingQuantity,
    headerWeight: 'normal',
    state: undefined,
    variant: 'amount',
    cardId: data.id ?? '0',
    onClick: (id: string) => {
      console.log(`Card ${id} clicked`);
    },
  };
};