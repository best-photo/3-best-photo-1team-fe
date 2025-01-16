import { Grades, Genres } from '@/src/components/common/photoCard/types';

// utils/normalizeCardData.ts
export const normalizeGrade = (grade: string): Grades => {
  switch (grade.toUpperCase()) {
    case 'COMMON':
      return 'common';
    case 'RARE':
      return 'rare';
    case 'SUPER_RARE':
      return 'superRare';
    case 'LEGENDARY':
      return 'legendary';
    default:
      throw new Error(`Invalid grade value: ${grade}`);
  }
};

export const normalizeGenre = (genre: string): Genres => {
  switch (genre.toUpperCase()) {
    case 'TRAVEL':
      return 'travel';
    case 'LANDSCAPE':
      return 'landscape';
    case 'PORTRAIT':
      return 'portrait';
    case 'OBJECT':
      return 'object';
    default:
      throw new Error(`Invalid genre value: ${genre}`);
  }
};

export const translateGenre = (genre: Genres): string => {
  switch (genre) {
    case 'travel':
      return '여행';
    case 'landscape':
      return '풍경';
    case 'portrait':
      return '인물';
    case 'object':
      return '사물';
    default:
      return genre;
  }
};
