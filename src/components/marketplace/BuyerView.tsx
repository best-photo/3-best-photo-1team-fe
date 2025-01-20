'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhotoCardDetail from '@/src/components/common/photoCard/organisms/photoCardDetail/photoCardDetail';
import TradeRequest from '@/src/components/common/photoCard/organisms/tradeRequest/tradeRequest';
import TradeList from '@/src/components/common/photoCard/organisms/tradeList/tradeList';
import CommonAlertModal from '@/src/components/common/AlertModal/CommonAlertModal';
import { Modal } from '@/src/components/marketplace/Modal';
import PhotoCardExchangeModal from '@/src/components/marketplace/PhotoCardExchangeModal';
import axiosInstance from '@/src/lib/axios/axiosInstance';

interface BuyerViewProps {
  shopId: string;
  shopData: any;
}

const purchaseCard = async (shopId: string, quantity: number) => {
  const payload = {
    shopId,
    quantity,
  };

  const response = await axiosInstance.post('/shop/purchase', payload, {
    withCredentials: true,
  });
  return response;
};

const BuyerView = ({ shopId, shopData }: BuyerViewProps) => {
  const router = useRouter();

  const [tradeCardList, setTradeCardList] = useState([
    {
      id: '1',
      cardName: '풍경 사진 1',
      grade: 'rare' as const,
      genre: 'landscape' as const,
      nickname: '사용자1',
      price: 1000,
      image: '/images/sample-image-1.webp',
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
    setPurchaseAlertVisible(false);
    setPhotoCardExchangeModalVisible(false);
    setExchangeModalVisible(false);
    setModalVisible(false);
  };

  const onExchangeListCancelClick = () => {
    setModalVisible(false);
  };

  // 포토카드 구매 이벤트
  const onPurchaseClick = () => {
    if (shopId === undefined && !shopId) {
      alert('shopId가 없습니다.');
      return;
    }
    purchaseCard(shopId, 1);
    alert('1장 구매 완료, 마이갤러리로 이동합니다.');
    router.push(`/my-gallery`);
  };

  return (
    <>
      <PhotoCardDetail
        cardName={shopData.card.name}
        description={shopData.card.description}
        genre={shopData.card.genre.toLowerCase()}
        grade={shopData.card.grade.toLowerCase()}
        image={'/images/sample-image-1.webp'}
        // image={shopData.card.imageUrl}
        nickname={shopData.card.owner}
        price={shopData.shop.price}
        remainingAmount={shopData.shop.remainingQuantity}
        totalAmount={shopData.shop.initialQuantity}
        variant='othersCard'
        onPurchase={() => setPurchaseAlertVisible(true)}
        maxAmount={shopData.shop.remainingQuantity}
      />
      <div className='mb-[120px]'></div>
      {/* 교환 희망 정보 */}
      <TradeRequest
        handleTrade={() => setPhotoCardExchangeModalVisible(true)}
        tradeDescription={shopData.shop.exchangeInfo.description}
        tradeGenre={shopData.shop.exchangeInfo.genre.toLowerCase()}
        tradeGrade={shopData.shop.exchangeInfo.grade.toLowerCase()}
      />
      <div className='mb-[120px]'></div>
      {/* 내가 제시한 교환 목록 */}
      {shopData.exchanges.offeredExchanges.length > 0 && (
        <TradeList
          variant='outgoing'
          trades={shopData.exchanges.offeredExchanges}
          onCancel={() => setModalVisible(true)}
        />
      )}

      {/* Modals */}
      {isPurchaseAlertVisible && (
        <CommonAlertModal
          title='포토카트 구매'
          content={`[LEGENDARY | 우리집 앞마당] 2장을 구매하시겠습니까?`}
          buttonText='구매하기'
          onClose={() => setPurchaseAlertVisible(false)}
          onClick={
            onPurchaseClick
            // router.push(
            //   `/purchase-success?grade=legendary&name=우리집 앞마당&quantity=2`,
            // )
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
          shopId={shopId}
          onClose={onExchangeModalVisibleClose}
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
