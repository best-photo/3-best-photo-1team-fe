'use client';

import SearchSection from '../common/searchSection/searchSection';

type FiltersType = {
  grade: string;
  genre: string;
  status: string;
  priceOrder: string;
};

interface MarketplaceSearchBoxProps {
  onFilterChange: (filters: FiltersType, query: string) => void;
}

export default function MarketplaceSearchBox({
  onFilterChange,
}: MarketplaceSearchBoxProps) {
  const handleFilterSubmit = (filterQuery: string) => {
    const parsedFilters = parseFilterQuery(filterQuery);

    const { keyword = '', ...filters } = parsedFilters;

    // 필터 데이터를 FiltersType으로 가공
    const formattedFilters: FiltersType = {
      grade: filters.grade || '',
      genre: filters.genre || '',
      status: filters.status || '',
      priceOrder: filters.priceOrder || '',
    };

    // 상위 컴포넌트로 전달
    onFilterChange(formattedFilters, keyword);
  };

  return (
    <div className='w-[1480px] h-[50px] flex justify-between items-center mx-auto mt-[50px]'>
      <div className='flex flex-row gap-[10px] items-center'>
        <SearchSection
          variant='marketplace'
          onSubmitFilter={handleFilterSubmit} // 필터 데이터 처리 함수 전달
        />
      </div>
    </div>
  );
}

// 필터 쿼리 문자열을 객체로 변환
function parseFilterQuery(query: string): Record<string, string> {
  return query
    .split('&')
    .map((item) => item.split('='))
    .reduce((acc, [key, value]) => {
      acc[key] = value || '';
      return acc;
    }, {} as Record<string, string>);
}
