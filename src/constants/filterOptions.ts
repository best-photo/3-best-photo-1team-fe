import {
  CARD_GENRES,
  CARD_GRADES,
  SALES_METHODS,
} from './photoCardInformation';

export const FILTER_CATEGORIES = [
  { value: '등급', queryString: 'grade' },
  { value: '장르', queryString: 'genre' },
  { value: '판매 방법', queryString: 'salesMethod' },
  { value: '매진 여부', queryString: 'stockState' },
];

// 등급 필터
// [ { value : 'legendary' , query : 'legendary'} ... ]
export const GRADE_FILTER = Object.keys(CARD_GRADES).map((grade) => ({
  value: grade,
  query: grade.toUpperCase().replace('SUPERRARE', 'SUPER_RARE'),
}));

// 장르 필터
// [ {value : '풍경' , query : 'landscape'} ... ]
export const GENRE_FILTER = Object.entries(CARD_GENRES).map(([key, value]) => ({
  value,
  query: key.toUpperCase(),
}));

// 판매 방식 필터
// [ { value : '판매 중' , 'sale'},{ value : '교환 제시 대기 중', query : 'trade' } ]
export const SALES_METHODS_FILTER = Object.entries(SALES_METHODS).map(
  ([key, value]) => ({
    value,
    query: key.toUpperCase(),
  }),
);

// 재고 상태 필터
export const STOCK_STATE_FILTER = [
  { value: '판매 중', query: 'IN_STOCK' },
  { value: '판매 완료', query: 'OUT_OF_STOCK' },
];

export const GRADES_OPTION = {
  등급: GRADE_FILTER,
};

export const GENRES_OPTION = {
  장르: GENRE_FILTER,
};

export const SALES_METHODS_OPTION = {
  '판매 방법': SALES_METHODS_FILTER,
};

export const STOCK_STATE_OPTION = {
  '매진 여부': STOCK_STATE_FILTER,
};
