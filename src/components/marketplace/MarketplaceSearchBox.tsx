'use client';

import Image from 'next/image';
import { useState } from 'react';
import Dropdown from '../common/CommonDropDown/DropDown';
import SearchInput from '../common/CommonSearchBox/SearchInput';

export default function MarketplaceSearchBox() {
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className='w-[1480px] h-[50px] flex justify-between items-center mx-auto mt-[20px]'>
      <div className='flex flex-row gap-[10px] items-center'>
        <div className='relative w-[320px] h-[50px]'>
          <SearchInput
            value={query}
            onChange={handleInputChange}
            placeholder='검색'
            className='w-[320px]'
          />
        </div>
        <Dropdown
          options={['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY']}
          selectedValue={selectedGrade}
          placeholder='등급'
          onValueChange={setSelectedGrade}
        />
        <Dropdown
          options={['여행', '풍경', '인물', '사물']}
          selectedValue={selectedGenre}
          placeholder='장르'
          onValueChange={setSelectedGenre}
        />
        <Dropdown
          options={['판매 중', '판매 완료']}
          selectedValue={selectedStatus}
          placeholder='매진여부'
          onValueChange={setSelectedStatus}
        />
      </div>
      <Dropdown
        options={['최신순', '오래된 순', '높은 가격순', '낮은 가격순']}
        selectedValue={selectedPrice}
        placeholder='낮은 가격순'
        onValueChange={setSelectedPrice}
        className='border border-[#dddddd]'
      />
    </div>
  );
}
