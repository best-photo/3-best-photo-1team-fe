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
  soldAmount: number;
}

export interface MyCardDetailSectionProps {
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

export type MyCardDetailProps = MyCardDetailSectionProps &
  BaseProps & { variant: 'myCard' };

export type OthersCardDetailProps = OthersCardDetailSectionProps &
  BaseProps & { variant: 'othersCard' };

export type PhotoCardDetailProps = MyCardDetailProps | OthersCardDetailProps;
