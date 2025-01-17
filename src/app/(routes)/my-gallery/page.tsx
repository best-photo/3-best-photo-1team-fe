'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchSection from '@/src/components/common/searchSection/searchSection';
import PhotoCardListItem from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem';
import PhotoCardPageHeader from '@/src/components/common/photoCard/organisms/photoCardPageHeader/photoCardPageHeader';
import { CardInfo, PhotoCard } from '@/src/services/mygalleryPhotocardService';
import { myGalleryPhotoCard } from '@/src/services/mygalleryPhotocardService';
import Title from '@/src/components/common/title/title';
import { convertGradeToLowerCase, convertGenreToLowerCase, convertGradeToUpperCase, convertGenreToUpperCase } from '@/src/utils/convertCase';
import { fetchUserGalleryData } from '@/src/services/mygalleryPhotocardService'; // 추가한 서비스

export default function MyGalleryPage() {
  const router = useRouter();
  const [galleryData, setGalleryData] = useState<CardInfo>({
    nickname: '',
    common: 0,
    rare: 0,
    superRare: 0,
    legendary: 0,
  });
  const [photoCards, setPhotoCards] = useState<PhotoCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<PhotoCard[]>([]);
  const [query, setQuery] = useState<string>('');

  // 첫 번째 useEffect - 사용자 갤러리 정보 가져오기
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // 로그인한 사용자 ID 가져오기
        if (userId) {
          const data = await fetchUserGalleryData(); // 사용자 포토카드 데이터 가져오기
          console.log('Fetched gallery data:', data); // 데이터 확인
          setGalleryData(data); // 상태 업데이트
        } else {
          console.log('사용자가 로그인되지 않았습니다.');
        }
      } catch (error) {
        console.error('포토카드 데이터를 가져오는 데 실패했습니다:', error);
      }
    };
  
    fetchGalleryData();
  }, []);

  useEffect(() => {
    console.log('Gallery Data updated:', galleryData); // galleryData 상태 변화를 확인
  }, [galleryData]);

  // 두 번째 useEffect - 포토카드 데이터 필터링
  useEffect(() => {
    const fetchPhotoCards = async () => {
      try {
        // query를 객체 형태로 변환
        const params = new URLSearchParams(query);
        const filters = {
          search: params.get('search') || '',
          grade: params.get('grade') || '',
          genre: params.get('genre') || '',
        };

        console.log('Fetching with filters:', filters); // 디버깅: filters 값 확인
        const cards = await myGalleryPhotoCard(filters); // 필터를 적용한 포토카드 조회
        setPhotoCards(cards);
        setFilteredCards(cards); // 초기 필터링된 카드를 설정
      } catch (error) {
        console.error('포토카드를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchPhotoCards();
  }, [query]); // query가 변경될 때마다 실행

  const handleCardClick = (cardId: string) => {
    router.push(`/my-gallery/${cardId}`);
  };

  const handleFilterSubmit = (query: string) => {
    try {
      // query 문자열 파싱
      const params = new URLSearchParams(query);

      // grade와 genre를 변환
      const grade = params.get('grade')
        ? convertGradeToUpperCase(params.get('grade') || '')
        : '';
      const genre = params.get('genre')
        ? convertGenreToUpperCase(params.get('genre') || '')
        : '';
      const searchQuery = params.get('search') || '';

      // 변환된 필터 값으로 새로운 query 생성
      const newQuery = [
        searchQuery ? `search=${searchQuery}` : '',
        grade ? `grade=${grade}` : '',
        genre ? `genre=${genre}` : '',
      ]
        .filter(Boolean)
        .join('&');

      // 최종 query 설정
      setQuery(newQuery);
    } catch (error) {
      console.error('필터 처리 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="w-[1480px] mx-[240px]">
      {/* Header */}
      <div>
        <Title
          variant="primary"
          font="baskin"
          children="마이갤러리"
          buttonText="포토카드 생성하기"
          onButtonClick={() => router.push('/my-gallery/create-photo-card')}
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
        <SearchSection
          variant="myGallery"
          onSubmitFilter={handleFilterSubmit} // 필터링 이벤트 전달
        />
      </div>

      {/* Display filtered and sorted photo cards */}
      <div className="flex gap-[80px] flex-wrap w-[1480px] mx-auto pt-[60px] mb-[100px]">
        {Array.isArray(filteredCards) && filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <PhotoCardListItem
              key={card.id}
              variant="amount"
              cardId={card.id}
              cardName={card.name}
              image={`http://localhost:8080/${card.imageUrl}`}
              grade={convertGradeToLowerCase(card.grade)}
              genre={convertGenreToLowerCase(card.genre)}
              nickname={card.nickname}
              price={card.price}
              totalAmount={card.totalQuantity}
              fontWeight="normal"
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
