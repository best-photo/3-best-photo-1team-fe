'use client';

import { Modal } from './Modal';
import LoginAlertModal from './LoginModal';
import PhotoCardDetailModal from './ProductModal';

interface MarketplaceHeaderProps {
  isAlertVisible: boolean;
  setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginAlertVisible: boolean;
  setIsLoginAlertVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isProductVisible: boolean;
  setProductVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
}

export default function MarketplaceHeader({
  isAlertVisible,
  setAlertVisible,
  isLoginAlertVisible,
  setIsLoginAlertVisible,
  isProductVisible,
  setProductVisible,
  userId,
}: MarketplaceHeaderProps) {
  const handleButtonClick = () => {
    if (userId) {
      // userId가 있으면 상품 정보를 보여주는 모달로 이동
      if (!isAlertVisible) {
        setAlertVisible(true);
      }
    } else {
      // userId가 없으면 로그인 필요 모달을 띄움
      setIsLoginAlertVisible(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  const handleCloseLoginAlert = () => {
    setIsLoginAlertVisible(false);
  };

  const handlePhotoCardClick = () => {
    setAlertVisible(false); // 기존 모달 닫기
    setProductVisible(true); // 새로운 모달 열기
  };

  const handleCloseProductModal = () => {
    setProductVisible(false);
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
