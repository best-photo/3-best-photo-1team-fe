'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchSection from '@/src/components/common/searchSection/searchSection';
import PhotoCardListItem from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem';
import PhotoCardPageHeader from '@/src/components/common/photoCard/organisms/photoCardPageHeader/photoCardPageHeader';
import { PhotoCard } from '@/src/services/mygalleryPhotocardService';
import { myGalleryPhotoCard } from '@/src/services/mygalleryPhotocardService';
import Title from '@/src/components/common/title/title';

const convertGradeToLowerCase = (
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

// genre 변환 함수
const convertGenreToLowerCase = (
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

export default function MyGalleryPage() {
  const router = useRouter();

  const handleCardClick = (cardId: string) => {
    router.push(`/mygallery/${cardId}`);
  };

  const [galleryData, setGalleryData] = useState({
    nickname: '',
    common: 0,
    rare: 0,
    superRare: 0,
    legendary: 0,
  });
  const [photoCards, setPhotoCards] = useState<PhotoCard[]>([]); // 포토카드 목록
  const [filteredCards, setFilteredCards] = useState<PhotoCard[]>([]); // 필터링된 포토카드 목록
  const [query, setQuery] = useState('');
  const [grade, setGrade] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);

  useEffect(() => {
    // 페이지가 처음 렌더링될 때 포토카드 데이터를 불러옵니다.
    const fetchPhotoCards = async () => {
      try {
        const cards = await myGalleryPhotoCard(); // API 호출
        setPhotoCards(cards); // 포토카드 목록 저장
        setFilteredCards(cards); // 초기에는 모든 포토카드를 필터링 없이 보여줍니다.
      } catch (error) {
        console.error('포토카드를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchPhotoCards();
  }, []);

  // 검색어, 등급, 장르에 따라 필터링
  const onsubmitFilter = (query: string) => {
    const filtered = photoCards.filter((card) => {
      const matchesQuery = card.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesGrade = grade ? card.grade === grade : true;
      const matchesGenre = genre ? card.genre === genre : true;

      return matchesQuery && matchesGrade && matchesGenre;
    });

    setFilteredCards(filtered);
  };

  return (
    <div className='w-[1480px] mx-[240px]'>
      {/* Header */}
      <div>
        <Title
          variant='primary'
          font='baskin'
          buttonText='포토카드 생성하기'
          onButtonClick={() => router.push('/createcard')}
        >
          마이갤러리
        </Title>
        <PhotoCardPageHeader
          variant='gallery'
          nickname={galleryData.nickname}
          common={galleryData.common}
          rare={galleryData.rare}
          superRare={galleryData.superRare}
          legendary={galleryData.legendary}
        />
        <div className='border border-gray-400 mt-[30px]'></div>
      </div>

      {/* Search Box */}
      <div className='flex flex-row gap-[10px] items-center mt-[30px]'>
        <SearchSection
          variant='myGallery'
          onSubmitFilter={onsubmitFilter}
        />
      </div>
      {/* Display filtered and sorted photo cards */}
      <div className='flex gap-[80px] flex-wrap w-[1480px] mx-auto pt-[60px] mb-[100px]'>
        {Array.isArray(filteredCards) && filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <PhotoCardListItem
              key={card.id}
              variant='amount' // 예시로 'amount'로 지정
              cardId={card.id}
              cardName={card.name}
              image={card.image} // image는 별도로 처리할 예정
              grade={convertGradeToLowerCase(card.grade)}
              genre={convertGenreToLowerCase(card.genre)}
              nickname={card.nickname}
              price={card.price} // price는 string 형식으로 전달
              totalAmount={card.totalQuantity}
              fontWeight='normal'
              onClick={handleCardClick}
            />
          ))
        ) : (
          <div>보유한 포토카드가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
