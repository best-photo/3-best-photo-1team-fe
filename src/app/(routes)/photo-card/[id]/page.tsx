'use client';

import { useEffect, useState } from 'react';

import useAuthStore from '@/src/store/useAuthStore';
import SellerView from '@/src/components/marketplace/SellerView';
import BuyerView from '@/src/components/marketplace/BuyerView';

const PhotoCardDetailPage = ({ params }: { params: { id: string } }) => {
  const { user } = useAuthStore();
  const [card, setCard] = useState({
    ownerId: '1',
  });
  console.log(user?.id);

  // 카드ID를 통해 포토카드 정보 가져오기
  const getPhotoCard = async () => {};

  useEffect(() => {
    getPhotoCard();
  }, []);
  if (!user) return <p>Loading...</p>;

  return (
    <article className='max-w-[1480px] mx-auto pb-[180px]'>
      {user?.id === card.ownerId ? (
        <SellerView cardId={params.id} /> // 판매자
      ) : (
        <BuyerView cardId={params.id} /> // 구매자
      )}
    </article>
  );
};

export default PhotoCardDetailPage;
