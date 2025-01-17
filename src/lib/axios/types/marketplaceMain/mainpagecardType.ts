import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';

interface ApiData {
  name?: string;
  genre?: string | null;
  grade?: string | null;
  price?: number;
  totalQuantity?: number;
  remainingQuantity?: number;
  id?: string | null;
}

export const mapApiDataToAmountListItem = (data: ApiData): AmountListItem => ({
  cardName: data.name || 'Default Card Name',
  genre:
    typeof data.genre === 'string' &&
    ['travel', 'landscape', 'portrait', 'stillLife'].includes(
      data.genre.toLowerCase(),
    )
      ? (data.genre.toLowerCase() as AmountListItem['genre'])
      : 'travel',
  grade:
    typeof data.grade === 'string' &&
    ['legendary', 'common', 'rare', 'superRare'].includes(
      data.grade.toLowerCase(),
    )
      ? (data.grade.toLowerCase() as AmountListItem['grade'])
      : 'common',
  nickname: '테스트유저',
  price: data.price || 0,
  image: '/images/sample-image-1.webp',
  fontWeight: 'bold',
  totalAmount: data.totalQuantity || 0,
  remainingAmount: (data.totalQuantity || 0) - (data.remainingQuantity || 0),
  headerWeight: 'normal',
  state: undefined,
  variant: 'amount',
  cardId: data.id ?? '0',
  onClick: (id: string) => {
    console.log(`Card ${id} clicked`);
  },
});
