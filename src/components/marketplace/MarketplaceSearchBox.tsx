'use client';

import Dropdown from '../common/CommonDropDown/DropDown';
import SearchInput from '../common/CommonSearchBox/SearchInput';

interface MarketplaceSearchBoxProps {
  filters: {
    grade: string;
    genre: string;
    status: string;
    priceOrder: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      grade: string;
      genre: string;
      status: string;
      priceOrder: string;
    }>
  >;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearchClick: () => void;
}

export default function MarketplaceSearchBox({
  filters,
  setFilters,
  query,
  setQuery,
  onSearchClick,
}: MarketplaceSearchBoxProps) {
  const handleDropdownChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className='w-[1480px] h-[50px] flex justify-between items-center mx-auto mt-[20px]'>
      <div className='flex flex-row gap-[10px] items-center'>
        <div className='relative w-[320px] h-[50px]'>
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearchClick={onSearchClick}
            placeholder='검색'
            className='w-[320px]'
          />
        </div>
        <Dropdown
          options={['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY']}
          selectedValue={filters.grade}
          placeholder='등급'
          onValueChange={(value) => handleDropdownChange('grade', value)}
        />
        <Dropdown
          options={['여행', '풍경', '인물', '사물']}
          selectedValue={filters.genre}
          placeholder='장르'
          onValueChange={(value) => handleDropdownChange('genre', value)}
        />
        <Dropdown
          options={['판매 중', '판매 완료']}
          selectedValue={filters.status}
          placeholder='매진 여부'
          onValueChange={(value) => handleDropdownChange('status', value)}
        />
      </div>
      <Dropdown
        options={['최신순', '오래된 순', '높은 가격순', '낮은 가격순']}
        selectedValue={filters.priceOrder}
        placeholder='정렬 기준'
        onValueChange={(value) => handleDropdownChange('priceOrder', value)}
        className='border border-[#dddddd]'
      />
    </div>
  );
}
