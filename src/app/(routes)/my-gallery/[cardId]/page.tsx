'use client'; // 클라이언트에서만 렌더링되도록 지정

import { useState, useEffect } from 'react';
import {
  PhotoCard,
  getCardById,
  getDetailCard,
} from '@/src/services/mygalleryPhotocardService';
import PhotoCardDetail from '@/src/components/common/photoCard/organisms/photoCardDetail/photoCardDetail';
import {
  convertGradeToLowerCase,
  convertGenreToLowerCase,
} from '@/src/utils/convertCase';

export default function PhotoCardDetailPage({
  params,
}: {
  params: { cardId: string };
}) {
  const { cardId } = params;

  // 상태 관리
  const [photoCard, setPhotoCard] = useState<PhotoCard | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 비동기 함수로 카드 정보 불러오기
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const card = await getCardById(cardId);
        setPhotoCard(card); // 카드 정보 상태로 설정
      } catch (err) {
        setError('카드 정보를 불러오는 데 실패했습니다.');
        console.error('Error fetching card details:', err);
      }
    };

    fetchCard();
  }, [cardId]); // cardId가 변경되면 다시 호출

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  if (!photoCard) {
    return (
      <div>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className='w-[1480px] mx-[240px]'>
      <PhotoCardDetail
        variant='myHoldingCard'
        cardName={photoCard.name}
        description={photoCard.description}
        image={`http://localhost:8080/${photoCard.imageUrl}`}
        grade={convertGradeToLowerCase(photoCard.grade)}
        genre={convertGenreToLowerCase(photoCard.genre)}
        nickname={photoCard.nickname}
        totalAmount={photoCard.totalQuantity}
        remainingAmount={photoCard.remainingQuantity || 0}
        price={photoCard.price}
        onSale={() => alert('판매버튼 클릭')}
      />
    </div>
  );
}
