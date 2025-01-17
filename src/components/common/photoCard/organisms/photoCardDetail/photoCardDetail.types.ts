import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Genres, Grades } from '../../types';

interface BaseProps {
  cardName: string;
  description: string;
  image: string | StaticImport;
  grade: Grades;
  genre: Genres;
  nickname: string;
  price: number;
  totalAmount: number;
  remainingAmount: number;
}

export interface MySellingCardDetailSectionProps {
  tradeGenre: Genres;
  tradeGrade: Grades;
  tradeDescription: string;
  onEdit: () => void;
  onDelete: () => void;
}

export interface OthersCardDetailSectionProps {
  onPurchase: () => void;
  maxAmount: number;
  price: number;
}

export interface MyHoldingCardDetailSectionProps {
  onSale: () => void;
}

export type MySellingCardDetailProps = MySellingCardDetailSectionProps &
  BaseProps & { variant: 'mySellingCard' };

export type OthersCardDetailProps = OthersCardDetailSectionProps &
  BaseProps & { variant: 'othersCard' };

export type MyHoldingCardDetailProps = MyHoldingCardDetailSectionProps &
  BaseProps & { variant: 'myHoldingCard' };

export type PhotoCardDetailProps =
  | MySellingCardDetailProps
  | OthersCardDetailProps
  | MyHoldingCardDetailProps;
