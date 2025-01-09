import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Genres, Grades } from '../../types';

export interface Trade {
  id: number;
  image: string | StaticImport;
  cardName: string;
  price: number;
  nickname: string;
  grade: Grades;
  genre: Genres;
  description: string;
}

interface TradeListBaseProps {
  trades: Trade[];
}

interface OutgoingTradeListProps extends TradeListBaseProps {
  variant: 'outgoing';
  onCancel: (id: number) => void;
}

interface IncomingTradeListProps extends TradeListBaseProps {
  variant: 'incoming';
  onDecline: (id: number) => void;
  onConfirm: (id: number) => void;
}

export type TradeListProps = OutgoingTradeListProps | IncomingTradeListProps;
