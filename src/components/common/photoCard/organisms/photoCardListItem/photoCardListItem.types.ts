import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { FontWeight, Genres, Grades } from '../../types';
import { CardState } from '../../atoms/stateBadge/stateBadge.types';

interface BaseProps {
  fontWeight: FontWeight;
  cardName: string;
  grade: Grades;
  genre: Genres;
  nickname: string;
  price: number;
  image: string | StaticImport;
}

export interface AmountSectionProps {
  price: number;
  totalAmount: number;
  remainingAmount?: number;
  headerWeight?: 'normal' | 'bold';
  state?: CardState;
}

export interface TradeSectionProps {
  tradeId: string;
  onCancel?: (id: string) => void;
  onDecline?: (id: string) => void;
  onConfirm?: (id: string) => void;
}

export type AmountListItem = BaseProps &
  AmountSectionProps & {
    variant: 'amount';
    cardId: string;
    onClick: (id: string) => void;
    shopId?: string;
  };

export type TradeListItem = BaseProps &
  TradeSectionProps & { variant: 'trade'; description: string };

export type PhotoCardListItemProps = AmountListItem | TradeListItem;
