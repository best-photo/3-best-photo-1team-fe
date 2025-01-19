'use client';

import React from 'react';
import Image from 'next/image';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearchClick,
  placeholder = '검색',
  className = '',
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  return (
    <div className={`relative w-full h-[50px] ${className}`}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={`w-full h-full p-[13px_20px] gap-[10px] rounded-[2px] border border-[var(--color-gray-200)] bg-[var(--color-black)] text-[var(--color-white)] pr-[30px] outline-none`}
      />
      <Image
        onClick={onSearchClick}
        src='/icons/search.svg'
        alt='Search Icon'
        className='absolute right-[10px] top-1/2 transform -translate-y-1/2'
        width={20}
        height={20}
      />
    </div>
  );
};

export default SearchInput;
