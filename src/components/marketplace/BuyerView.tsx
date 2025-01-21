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
import {
  convertGenreToLowerCase,
  convertGradeToLowerCase,
} from '@/src/utils/convertCase';
import { usePurchaseAmountStore } from '@/src/store/purchaseAmountStore';

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
  const amount = usePurchaseAmountStore((state) => state.amount);

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
  const onPurchaseClick = async () => {
    if (shopId === undefined && !shopId) {
      alert('shopId가 없습니다.');
      return;
    }

    try {
      await purchaseCard(shopId, amount);
      router.push(
        `/purchase-success?name=${shopData.card.name}&grade=${shopData.card.grade}&quantity=${amount}`,
      );
    } catch (error) {
      console.error('Error purchasing card:', error);
      router.push(
        `/purchase-failure?name=${shopData.card.name}&grade=${shopData.card.grade}&quantity=${amount}`,
      );
    }
  };

  return (
    <>
      <PhotoCardDetail
        cardName={shopData.card.name}
        description={shopData.card.description as string}
        genre={convertGenreToLowerCase(shopData.card.genre)}
        grade={convertGradeToLowerCase(shopData.card.grade)}
        // image={'/images/sample-image-1.webp'}
        image={shopData.card.imageUrl}
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
        tradeDescription={shopData.shop.exchangeInfo.description as string}
        tradeGenre={convertGenreToLowerCase(shopData.shop.exchangeInfo.genre)}
        tradeGrade={convertGradeToLowerCase(shopData.shop.exchangeInfo.grade)}
      />
      <div className='mb-[120px]'></div>
      {/* 내가 제시한 교환 목록 */}
      {shopData.exchanges.offeredExchanges.length > 0 && (
        <TradeList
          variant='outgoing'
          trades={shopData.exchanges.targetExchanges.map((exchange: any) => ({
            id: exchange.id, // id 추가 -> 백엔드 수정 필요
            card: {
              name: exchange.card.name,
              imageUrl: exchange.card.imageUrl,
              grade: exchange.card.grade,
              genre: exchange.card.genre,
            },
            requester: exchange.requester,
            description: exchange.description,
            status: exchange.status,
          }))}
          onCancel={() => setModalVisible(true)}
        />
      )}

      {/* Modals */}
      {isPurchaseAlertVisible && (
        <CommonAlertModal
          title='포토카트 구매'
          content={`[${shopData.card.grade} | ${shopData.card.name}] ${amount}장을 구매하시겠습니까?`}
          buttonText='구매하기'
          onClose={() => setPurchaseAlertVisible(false)}
          onClick={onPurchaseClick}
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
          content={`[${shopData.card.grade} | ${shopData.card.name}] 교환 제시를 취소하시겠습니까?`}
          buttonText='취소하기'
          onClose={() => setModalVisible(false)}
          onClick={onExchangeListCancelClick}
        />
      )}
    </>
  );
};

export default BuyerView;
