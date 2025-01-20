'use client';

import { useState } from 'react';
import PhotoCardDetail from '@/src/components/common/photoCard/organisms/photoCardDetail/photoCardDetail';
import TradeList from '@/src/components/common/photoCard/organisms/tradeList/tradeList';
import PhotoCardDetailModal from './ProductModal';
import CommonAlertModal from '../common/AlertModal/CommonAlertModal';
import axiosInstance from '@/src/lib/axios/axiosInstance';
import { useRouter } from 'next/navigation';

interface SellerViewProps {
  shopId: string;
  shopData: any;
}

const removeShop = async (shopId: string) => {
  const response = await axiosInstance.delete(`/shop/${shopId}`);
  return response.data;
};

const SellerView = ({ shopId, shopData }: SellerViewProps) => {
  console.log(shopData);
  const router = useRouter();

  const [isPhotoCardDetailModalVisible, setPhotoCardDetailModalVisible] =
    useState(false);

  // 교환 제시 거절 모달 보이기
  const [isDeclineModalVisible, setDeclineModalVisible] = useState(false);

  // 교환 제시 승인 모달 보이기
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  // 포토카드 판매 내리기 모달 보이기
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const onDecline = (id: string) => {
    console.log(id, '교환제시 거절하기');
    setDeclineModalVisible(true);
    // 교환 제시 해당 카드 거절 API 호출
  };

  const onConfirm = (id: string) => {
    setConfirmModalVisible(true);
    console.log(id, '교환제시 승인하기');
    // 교환 제시 해당 카드 승인 API 호출
  };

  // 마켓플레이스 페이지 - 판매 포토카드 상세 - 수정하기 모달 (판매자)
  const onEdit = () => {
    console.log('수정하기');
    setPhotoCardDetailModalVisible(true);
  };

  const onDelete = () => {
    console.log('판매 내리기');
    removeShop(shopId);
    alert('판매 내리기 성공');
    setDeleteModalVisible(true);
    router.push('/');
  };

  return (
    <>
      <PhotoCardDetail
        variant='mySellingCard'
        cardName={shopData.card.name}
        description={shopData.card.description}
        // image={shopData.card.imageUrl}
        image='/images/sample-image-1.webp'
        grade={shopData.card.grade.toLowerCase()}
        genre={shopData.card.genre.toLowerCase()}
        nickname={shopData.card.owner}
        price={shopData.shop.price}
        totalAmount={shopData.shop.initialQuantity}
        remainingAmount={shopData.shop.remainingQuantity}
        tradeGenre={shopData.shop.exchangeInfo.genre.toLowerCase()}
        tradeGrade={shopData.shop.exchangeInfo.grade.toLowerCase()}
        tradeDescription={shopData.shop.exchangeInfo.description}
        onEdit={onEdit}
        onDelete={() => setDeleteModalVisible(true)}
      />
      <div className='mb-[120px]'></div>
      {/* 교환 제시 목록 */}
      <TradeList
        variant='incoming'
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
        onConfirm={onConfirm}
        onDecline={onDecline}
      />
      {shopData.exchanges.targetExchanges.length === 0 && (
        <p className='text-center text-gray-400 text-3xl'>
          교환 제시가 없습니다.
        </p>
      )}

      {isPhotoCardDetailModalVisible && (
        <PhotoCardDetailModal
          isVisible={true}
          onClose={() => setPhotoCardDetailModalVisible(false)}
        />
      )}
      {isDeclineModalVisible && (
        <CommonAlertModal
          title='교환 제시 거절'
          content='교환 제시를 거절하시겠습니까?'
          buttonText='거절하기'
          onClose={() => setDeclineModalVisible(false)}
          onClick={() => {
            // 교환 제시 거절 API 호출
            console.log('거절하기 버튼 클릭됨');
            setDeclineModalVisible(false);
          }}
        />
      )}
      {isConfirmModalVisible && (
        <CommonAlertModal
          title='교환 제시 승인'
          content={`[COMMON | 스페인 여행]
카드와의 교환을 승인하시겠습니까?`}
          buttonText='승인하기'
          onClose={() => setDeclineModalVisible(false)}
          onClick={() => {
            // 교환 제시 거절 API 호출
            console.log('승인하기 버튼 클릭됨');
            setConfirmModalVisible(false);
          }}
        />
      )}
      {isDeleteModalVisible && (
        <CommonAlertModal
          title='포토카드 판매 내리기'
          content={`정말로 판매를 중단하시겠습니까?`}
          buttonText='판매 내리기'
          onClose={() => setDeleteModalVisible(false)}
          onClick={() => {
            // 교환 제시 거절 API 호출
            // console.log('판매 내리기 버튼 클릭됨');
            // setDeleteModalVisible(false);
            onDelete();
          }}
        />
      )}
    </>
  );
};

export default SellerView;
