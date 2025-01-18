'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhotoCardDetail from '@/src/components/common/photoCard/organisms/photoCardDetail/photoCardDetail';
import TradeRequest from '@/src/components/common/photoCard/organisms/tradeRequest/tradeRequest';
import TradeList from '@/src/components/common/photoCard/organisms/tradeList/tradeList';
import CommonAlertModal from '@/src/components/common/AlertModal/CommonAlertModal';
import { Modal } from '@/src/components/marketplace/Modal';
import PhotoCardExchangeModal from '@/src/components/marketplace/PhotoCardExchangeModal';
import usePhotoCardStore from '@/src/store/photoCardId';

interface BuyerViewProps {
  cardId: string;
}

const BuyerView = ({ cardId }: BuyerViewProps) => {
  const router = useRouter();
  const { selectedPhotoCardId } = usePhotoCardStore();

  const [tradeCardList, setTradeCardList] = useState([
    {
      id: '1',
      cardName: '풍경 사진 1',
      grade: 'rare' as const,
      genre: 'landscape' as const,
      nickname: '사용자1',
      price: 1000,
      image: {
        src: '/images/sample-image-1.webp',
        blurDataURL: '/images/sample-image-1-blur.webp',
        height: 270,
        width: 360,
      },
      description: '아름다운 풍경 사진입니다.',
    },
    // ... other trade cards
  ]);

  const [isPurchaseAlertVisible, setPurchaseAlertVisible] = useState(false);
  const [isPhotoCardExchangeModalVisible, setPhotoCardExchangeModalVisible] =
    useState(false);
  const [isExchangeModalVisible, setExchangeModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const onPhotoCardClick = () => {
    setPhotoCardExchangeModalVisible(false);
    setExchangeModalVisible(true);
  };

  const onExchangeModalVisibleClose = () => {
    setPhotoCardExchangeModalVisible(true);
    setExchangeModalVisible(false);
  };

  const onAllModalClose = () => {
    setModalVisible(false);
    setExchangeModalVisible(false);
    setPhotoCardExchangeModalVisible(false);
  };

  const onExchangeListCancelClick = () => {
    setModalVisible(false);
  };

  return (
    <>
      <PhotoCardDetail
        cardName='우리집 앞마당'
        description='우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 '
        genre='landscape'
        grade='legendary'
        image={{
          blurDataURL: '/images/sample-image-1.webp',
          height: 270,
          src: '/images/sample-image-1.webp',
          width: 360,
        }}
        nickname='미쓰손'
        price={4}
        remainingAmount={2}
        totalAmount={5}
        variant='othersCard'
        onPurchase={() => setPurchaseAlertVisible(true)}
        maxAmount={10}
      />
      <div className='mb-[120px]'></div>
      <TradeRequest
        handleTrade={() => setPhotoCardExchangeModalVisible(true)}
        tradeDescription='풍경 사진으로 교환하고 싶어요.'
        tradeGenre='landscape'
        tradeGrade='legendary'
      />
      <div className='mb-[120px]'></div>
      <TradeList
        variant='outgoing'
        trades={tradeCardList}
        onCancel={() => setModalVisible(true)}
      />

      {/* Modals */}
      {isPurchaseAlertVisible && (
        <CommonAlertModal
          title='포토카트 구매'
          content={`[LEGENDARY | 우리집 앞마당] 2장을 구매하시겠습니까?`}
          buttonText='구매하기'
          onClose={() => setPurchaseAlertVisible(false)}
          onClick={() =>
            router.push(
              `/purchase-success?grade=legendary&name=우리집 앞마당&quantity=2`,
            )
          }
        />
      )}
      {isPhotoCardExchangeModalVisible && (
        <Modal
          onClose={() => setPhotoCardExchangeModalVisible(false)}
          isVisible={true}
          onPhotoCardClick={onPhotoCardClick}
        />
      )}
      {isExchangeModalVisible && (
        <PhotoCardExchangeModal
          onClose={onExchangeModalVisibleClose}
          cardId={selectedPhotoCardId}
          onAllModalClose={onAllModalClose}
        />
      )}
      {isModalVisible && (
        <CommonAlertModal
          title='교환 제시 취소'
          content={`[LEGENDARY | 우리집 앞마당] 교환 제시를 취소하시겠습니까?`}
          buttonText='취소하기'
          onClose={() => setModalVisible(false)}
          onClick={onExchangeListCancelClick}
        />
      )}
    </>
  );
};

export default BuyerView;
