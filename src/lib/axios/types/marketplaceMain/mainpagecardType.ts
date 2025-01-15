import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';

export const mapApiDataToAmountListItem = (data: any): AmountListItem => ({
  cardName: data.name || 'Default Card Name',
  genre: ['travel', 'landscape', 'portrait', 'stillLife'].includes(
    data.genre?.toLowerCase(),
  )
    ? (data.genre.toLowerCase() as AmountListItem['genre'])
    : 'travel', // 기본값
  grade: ['legendary', 'common', 'rare', 'superRare'].includes(
    data.grade?.toLowerCase(),
  )
    ? (data.grade.toLowerCase() as AmountListItem['grade'])
    : 'common', // 기본값
  nickname: '테스트유저',
  price: data.price || 0,
  image: '/images/sample-image-1.webp', // StaticImport를 사용하는 경우 import 필요
  fontWeight: 'bold',
  totalAmount: data.totalQuantity || 0,
  soldAmount: (data.totalQuantity || 0) - (data.remainingQuantity || 0),
  headerWeight: 'normal',
  state: undefined, // 기본값
  variant: 'amount',
  cardId: data.id || 0, // 필수 속성 추가
  onClick: (id) => {
    console.log(`Card ${id} clicked`);
  }, // 필수 속성 추가
});
