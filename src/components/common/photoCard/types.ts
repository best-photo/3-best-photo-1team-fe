import { CARD_GENRES, CARD_GRADES } from '@/src/constants/photoCardInformation';

export type TextSize = 'big' | 'small';

export type FontWeight = 'normal' | 'bold';

export type Grades = keyof typeof CARD_GRADES;

export type Genres = keyof typeof CARD_GENRES;
