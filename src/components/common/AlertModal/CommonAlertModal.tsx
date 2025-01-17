'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { CommonBtn } from '@/src/components/common/CommonBtn/CommonBtn';

interface CommonAlertModalProps {
  onClose: () => void;
  onClick: () => void;
  title: string;
  content: string;
  buttonText: string;
}

const PathMatching = {};

const CommonAlertModal: React.FC<CommonAlertModalProps> = ({
  onClose,
  onClick,
  title,
  content,
  buttonText,
}) => {
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full bg-[#000000CC] bg-opacity-[80] z-[50]' />
      <div className='fixed top-1/3 left-1/2 transform -translate-x-1/2 w-[560px] h-[375px] bg-[#161616] rounded-[2px] z-[60]'>
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='text-xl font-bold mb-4 text-white'>{title}</div>
          <Image
            src='/icons/close.svg'
            alt='Search Icon'
            className='absolute top-[30px] right-[30px] cursor-[pointer]'
            onClick={onClose}
            width={18}
            height={18}
          />
          <div className='mb-4 text-[#A4A4A4] text-center mt-[40px] font-[var(--font-noto-sans-kr)] text-[16px] font-[400] leading-[23.17px] decoration-none'>
            {content}
          </div>
          <CommonBtn
            heightPreset={3}
            variant='primary'
            width='full'
            onClick={onClick}
            className='mt-[60px] w-[170px] '
          >
            {buttonText}
          </CommonBtn>
        </div>
      </div>
    </>
  );
};

export default CommonAlertModal;
