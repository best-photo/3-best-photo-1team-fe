import { GENRES, GRADES } from '@/src/constants/photoCardInformation';

export type TextSize = 'big' | 'small';

export type FontWeight = 'normal' | 'bold';

export type Grades = keyof typeof GRADES;

export type Genres = keyof typeof GENRES;
