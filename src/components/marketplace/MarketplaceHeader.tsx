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

  const handleButtonClick = () => {
    if (user) {
      setAlertVisible(true);
      console.log(user.id);
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

  const handlePhotoCardClick = () => {
    setAlertVisible(false);
    setProductVisible(true);
  };

  const handleCloseProductModal = () => {
    setAlertVisible(true);
    setProductVisible(false);
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login'; // 로그인 페이지 URL로 변경
  };

  return (
    <div className='w-full h-[63px] flex justify-between items-center max-md:fixed max-md:bottom-[15px]'>
      <div className='hidden md:block text-[0px] md:text-[48px] lg:text-[62px] font-normal leading-[63.49px] tracking-[-0.03em] text-left font-baskin'>
        마켓플레이스
      </div>
      <button
        onClick={handleButtonClick}
        className='max-md:w-[calc(100vw_-_40px)] md:w-[342px] lg:w-[440px] h-[55px] md:h-[60px] rounded-[2px] bg-main text-[18px] font-bold leading-[26.06px] text-center text-black no-underline font-noto'
      >
        나의 포토카드 판매하기
      </button>

      {/* 상품 정보 모달 */}
      <Modal
        isVisible={isAlertVisible}
        onClose={handleCloseAlert}
        onPhotoCardClick={handlePhotoCardClick}
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
        />
      )}
    </div>
  );
}
