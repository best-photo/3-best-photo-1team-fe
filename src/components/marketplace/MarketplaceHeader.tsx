'use client';

import { Modal } from './Modal';
import LoginAlertModal from './LoginModal';
import PhotoCardDetailModal from './ProductModal';
import useAuthStore from '@/src/store/useAuthStore';
import { useState } from 'react';
import { useRerenderStore } from '@/src/store/rerenderStore';

interface MarketplaceHeaderProps {
  isAlertVisible: boolean;
  setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginAlertVisible: boolean;
  setIsLoginAlertVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isProductVisible: boolean;
  setProductVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onModalClose: () => void;
}

export default function MarketplaceHeader({
  isAlertVisible,
  setAlertVisible,
  isLoginAlertVisible,
  setIsLoginAlertVisible,
  isProductVisible,
  setProductVisible,
  onModalClose,
}: MarketplaceHeaderProps) {
  const [selectedPhotoCardId, setSelectedPhotoCardId] = useState<string | null>(
    null,
  );
  const { setRenderKey } = useRerenderStore();

  const user = useAuthStore((state) => state.user);
  const userId = user?.id || null;

  const handleButtonClick = () => {
    if (user) {
      if (!isAlertVisible) {
        setAlertVisible(true);
        console.log(user.id);
      }
    } else {
      setIsLoginAlertVisible(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    onModalClose();
    setRenderKey();
  };

  const handleCloseLoginAlert = () => {
    setIsLoginAlertVisible(false);
    onModalClose();
  };

  const handlePhotoCardClick = (photoCardId: string) => {
    setSelectedPhotoCardId(photoCardId); // 클릭된 카드 ID 저장
    setAlertVisible(false); // 기존 모달 닫기
    setProductVisible(true); // 상세 모달 열기
  };

  const handleCloseProductModal = () => {
    setProductVisible(false);
    setSelectedPhotoCardId(null); // 선택된 카드 ID 초기화
    onModalClose();
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login'; // 로그인 페이지 URL로 변경
  };

  return (
    <div className='w-[1480px] h-[63px] flex justify-between items-center mx-auto '>
      <div
        className='w-[320px] h-[63px] text-[62px] font-normal leading-[63.49px] tracking-[-0.03em] text-left'
        style={{ fontFamily: 'var(--font-baskin-robbins)' }}
      >
        마켓플레이스
      </div>
      <button
        onClick={handleButtonClick}
        className='w-[440px] h-[60px] rounded-[2px] bg-[var(--color-main)] text-[18px] font-bold leading-[26.06px] text-center text-black no-underline'
        style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
      >
        나의 포토카드 판매하기
      </button>

      {/* 상품 정보 모달 */}
      <Modal
        isVisible={isAlertVisible}
        onClose={handleCloseAlert}
        onPhotoCardClick={handlePhotoCardClick}
        userId={userId}
      />

      {/* 로그인 필요 모달을 LoginAlertModal로 분리하여 사용 */}
      {isLoginAlertVisible && (
        <LoginAlertModal
          onClose={handleCloseLoginAlert}
          onRedirectToLogin={handleLoginRedirect}
        />
      )}

      {isProductVisible && (
        <PhotoCardDetailModal
          isVisible={isProductVisible}
          onClose={handleCloseProductModal}
          userId={userId}
          photoCardId={selectedPhotoCardId} // 선택된 카드 ID 전달
        />
      )}
    </div>
  );
}
