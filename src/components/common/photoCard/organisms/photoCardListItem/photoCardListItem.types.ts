import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { FontWeight, Genres, Grades, TextSize } from '../../types';
import { CardState } from '../../atoms/stateBadge/stateBadge.types';

interface BaseProps {
  textSize: TextSize;
  fontWeight: FontWeight;
  cardName: string;
  grade: Grades;
  genre: Genres;
  nickname: string;
  price: number;
  image: string | StaticImport;
}

export interface amountSectionProps {
  price: number;
  totalAmount: number;
  soldAmount?: number;
  headerWeight?: 'normal' | 'bold';
  state?: CardState;
}

export interface TradeSectionProps {
  onCancel?: () => void;
  onDecline?: () => void;
  onConfirm?: () => void;
}

export type AmountListItem = BaseProps &
  amountSectionProps & { variant: 'amount' };

export type TradeListItem = BaseProps &
  TradeSectionProps & { variant: 'trade'; description: string };

export type PhotoCardListItemProps = AmountListItem | TradeListItem;
