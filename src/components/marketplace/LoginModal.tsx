'use client';

import Image from 'next/image';
import React from 'react';

interface LoginAlertModalProps {
  onClose: () => void;
  onRedirectToLogin: () => void;
}

const LoginAlertModal: React.FC<LoginAlertModalProps> = ({
  onClose,
  onRedirectToLogin,
}) => {
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full bg-[#000000CC] bg-opacity-[80] z-[50]' />
      <div className='fixed top-1/3 left-1/2 transform -translate-x-1/2 w-[560px] h-[375px] bg-[#161616] rounded-[2px] z-[60]'>
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='text-xl font-bold mb-4 text-white'>
            로그인이 필요합니다.
          </div>
          <Image
            src='/icons/close.svg'
            alt='Search Icon'
            className='absolute top-[30px] right-[30px] cursor-[pointer]'
            onClick={onClose}
            width={18}
            height={18}
          />
          <div className='mb-4 text-[#A4A4A4] text-center mt-[40px] font-[var(--font-noto-sans-kr)] text-[16px] font-[400] leading-[23.17px] decoration-none'>
            로그인 하시겠습니까? <br />
            다양한 서비스를 편리하게 이용하실 수 있습니다.
          </div>
          <button
            onClick={onRedirectToLogin}
            className='bg-[#EFFF04] text-black rounded-[2px] w-[170px] h-[60px] font-[var(--font-noto-sans-kr)] text-[18px] font-[800] leading-[26.06px] text-center decoration-none mt-[60px]'
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginAlertModal;
