import { Genres, Grades } from '../../types';

export interface TradeRequestProps {
  tradeGrade: Grades;
  tradeGenre: Genres;
  tradeDescription: string;
  handleTrade: () => void;
}
