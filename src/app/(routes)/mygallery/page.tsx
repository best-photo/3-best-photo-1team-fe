'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Dropdown from '@/src/components/common/CommonDropDown/DropDown';
import SearchInput from '@/src/components/common/CommonSearchBox/SearchInput';
import PhotoCardListItem from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem';
import PhotoCardPageHeader from '@/src/components/common/photoCard/organisms/photoCardPageHeader/photoCardPageHeader';
import Title from '@/src/components/common/title/title';

export default function MyGalleryPage() {
  const router = useRouter();

  // States for managing data
  const [galleryData, setGalleryData] = useState({
    nickname: '',
    common: 0,
    rare: 0,
    superRare: 0,
    legendary: 0,
  });
  const [query, setQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
 
  return (
    <div className="w-[1480px] mx-[240px]">
      {/* Header */}
      <div>
        <Title
          variant="primary"
          font="baskin"
          children="마이갤러리"
          buttonText="포토카드 생성하기"
          onButtonClick={() => router.push('/createcard')}
        />
        <PhotoCardPageHeader
          variant="gallery"
          nickname={galleryData.nickname}
          common={galleryData.common}
          rare={galleryData.rare}
          superRare={galleryData.superRare}
          legendary={galleryData.legendary}
        />
        <div className="border border-gray-400 mt-[30px]"></div>
      </div>

      {/* Search Box */}
      <div className="flex flex-row gap-[10px] items-center mt-[30px]">
        <div className="relative w-[320px] h-[50px]">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSearchClick={() => {}}
            placeholder="검색"
            className="w-[320px]"
          />
          <Image
            src="/icons/search.svg"
            alt="Search Icon"
            className="absolute right-[10px] top-1/2 transform -translate-y-1/2 z-10"
            width={20}
            height={20}
          />
        </div>
        <Dropdown
          options={['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY']}
          selectedValue={selectedGrade}
          placeholder="등급"
          onValueChange={setSelectedGrade}
        />
        <Dropdown
          options={['여행', '풍경', '인물', '사물']}
          selectedValue={selectedGenre}
          placeholder="장르"
          onValueChange={setSelectedGenre}
        />
      </div>

      {/* Display filtered and sorted photo cards */}
      <div className="flex gap-[80px] flex-wrap w-[1480px] mx-auto pt-[60px] mb-[100px]">
        {/* {photoCards.map((card,index) => (
          <PhotoCardListItem
            key={index}
            {...card}
          />
        ))} */}
      </div>
    </div>
  );
}
