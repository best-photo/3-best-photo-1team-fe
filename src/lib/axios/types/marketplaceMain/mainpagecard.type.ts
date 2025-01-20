import { AmountListItem } from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem.types';
import { CARD_GENRES, CARD_GRADES } from '@/src/constants/photoCardInformation';

interface ApiData {
  shopId?: string | null;
  name?: string;
  genre?: string | null;
  grade?: string | null;
  price?: number;
  totalQuantity?: number;
  remainingQuantity?: number;
  id?: string | null;
  quantity?: number;
  nickname: string;
  initialQuantity: number;
  imageUrl: string;
}

const formatImageUrl = (imageUrl: string): string => {
  if (!imageUrl) {
    return '/default-image.png';
  }

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  return `http://localhost:8080/${imageUrl.replace(/\\/g, '/')}`;
};

export const mapApiDataToAmountListItem = (data: ApiData): AmountListItem => {
  const validGrades = Object.keys(CARD_GRADES);

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
    image: formatImageUrl(data.imageUrl),
    fontWeight: 'bold',
    totalAmount: data.initialQuantity || 0,
    remainingAmount: data.remainingQuantity || 0,
    headerWeight: 'normal',
    state: undefined,
    variant: 'amount',
    cardId: data.shopId ?? '0',
    onClick: (id: string) => {
      console.log(`Card ${id} clicked`);
    },
  };
};

export const mapApiDataToAmountListItem1 = (data: ApiData): AmountListItem => {
  const validGrades = Object.keys(CARD_GRADES);

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
    image: formatImageUrl(data.imageUrl),
    fontWeight: 'bold',
    totalAmount: data.totalQuantity || 0,
    remainingAmount: data.remainingQuantity || 0,
    headerWeight: 'normal',
    state: undefined,
    variant: 'amount',
    cardId: data.id ?? '0',
    onClick: (id: string) => {
      console.log(`Card ${id} clicked`);
    },
  };
};
