import { FontWeight, Genres, Grades, TextSize } from '../../types';

export interface CardInformationHeaderProps {
  textSize: TextSize;
  fontWeight: FontWeight;
  grade: Grades;
  genre: Genres;
  price?: number;
  nickname?: string;
}
