import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Genres, Grades } from '../../types';

export interface Trade {
  id: string;
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
  onCancel: (id: string) => void;
}

interface IncomingTradeListProps extends TradeListBaseProps {
  variant: 'incoming';
  onDecline: (id: string) => void;
  onConfirm: (id: string) => void;
}

export type TradeListProps = OutgoingTradeListProps | IncomingTradeListProps;
