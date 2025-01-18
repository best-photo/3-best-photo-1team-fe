'use client';

import { useState } from 'react';
import PhotoCardDetail from '@/src/components/common/photoCard/organisms/photoCardDetail/photoCardDetail';
import TradeList from '@/src/components/common/photoCard/organisms/tradeList/tradeList';
import PhotoCardDetailModal from './ProductModal';
import CommonAlertModal from '../common/AlertModal/CommonAlertModal';

interface SellerViewProps {
  cardId: string;
}

const SellerView = ({ cardId }: SellerViewProps) => {
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
    console.log(id, '교환제시 승인하기');
    // 교환 제시 해당 카드 승인 API 호출
  };

  // 마켓플레이스 페이지 - 판매 포토카드 상세 - 수정하기 모달 (판매자)
  const onEdit = () => {
    console.log('수정하기');
    setPhotoCardDetailModalVisible(true);
  };

  return (
    <>
      <PhotoCardDetail
        variant='mySellingCard'
        cardName='우리집 앞마당'
        description='우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 '
        image='/images/sample-image-1.webp'
        grade='legendary'
        genre='landscape'
        nickname='미쓰손'
        price={4}
        totalAmount={5}
        soldAmount={2}
        tradeGenre='travel'
        tradeGrade='legendary'
        tradeDescription='여행 사진이 갖고 싶어요.'
        onEdit={onEdit}
        onDelete={() => setDeleteModalVisible(true)}
      />
      <div className='mb-[120px]'></div>
      <TradeList
        variant='incoming'
        trades={tradeCardList}
        onConfirm={onConfirm}
        onDecline={onDecline}
      />
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
          onClose={() => setDeclineModalVisible(false)}
          onClick={() => {
            // 교환 제시 거절 API 호출
            console.log('판매 내리기 버튼 클릭됨');
            setDeleteModalVisible(false);
          }}
        />
      )}
    </>
  );
};

export default SellerView;
