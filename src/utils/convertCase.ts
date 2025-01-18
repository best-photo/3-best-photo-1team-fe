export const convertGradeToLowerCase = (
  grade: string,
): 'common' | 'rare' | 'superRare' | 'legendary' => {
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

export const convertGenreToLowerCase = (
  genre: string,
): 'travel' | 'landscape' | 'portrait' | 'object' => {
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

export const convertGradeToUpperCase = (
  grade: string,
): 'COMMON' | 'RARE' | 'SUPER_RARE' | 'LEGENDARY' => {
  switch (grade.toLowerCase()) {
    case 'common':
      return 'COMMON';
    case 'rare':
      return 'RARE';
    case 'superRare':
    case 'superrare':
    case 'super_rare':
      return 'SUPER_RARE';
    case 'legendary':
      return 'LEGENDARY';
    default:
      throw new Error(`Invalid grade value: ${grade}`);
  }
};

export const convertGenreToUpperCase = (
  genre: string,
): 'TRAVEL' | 'LANDSCAPE' | 'PORTRAIT' | 'OBJECT' => {
  switch (genre.toLowerCase()) {
    case 'travel':
      return 'TRAVEL';
    case 'landscape':
      return 'LANDSCAPE';
    case 'portrait':
      return 'PORTRAIT';
    case 'object':
      return 'OBJECT';
    default:
      throw new Error(`Invalid genre value: ${genre}`);
  }
};
