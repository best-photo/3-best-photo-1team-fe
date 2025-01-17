'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MenuIcon from '@/public/icons/menu.svg';
import { useProfileBurgerModalStore } from '@/src/store/useProfileBurgerModalStore';

const ProfileBurgerModal: React.FC = () => {
  const {
    isProfileBurgerModalOpen,
    toggleProfileBurgerModal,
    closeProfileBurgerModal,
  } = useProfileBurgerModalStore();

  return (
    <div
      className='relative'
      onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
    >
      {/* 버튼: 모달 열기/닫기 */}
      <button
        className='relative'
        onClick={toggleProfileBurgerModal}
      >
        <div className='flex md:hidden'>
          <Image
            src={MenuIcon}
            alt='메뉴'
            height={22}
            width={22}
          />
        </div>
      </button>

      {/* 모달 */}
      {isProfileBurgerModalOpen && (
        <>
          <div
            className='fixed inset-0 z-10 backdrop-blur-[4px] md:backdrop-blur-none'
            onClick={closeProfileBurgerModal} // 외부 클릭 시 닫기
          ></div>
          <div>
            <div className='fixed left-0 top-0 w-[69%] min-w-[230px] max-w-[310px] h-screen bg-black text-white z-20'>
              <div className='p-[20px] h-[127px] flex flex-col justify-between border-b-[1px] border-b-gray-400'>
                <p className='text-[18px] pt-[20px] font-bold truncate'>
                  안녕하세요 최애님!
                </p>
                <p className='text-[13px] flex justify-between items-center'>
                  <span className='text-gray-300'>회원가입하고</span>
                  <span className='flex justify-between items-center gap-[9px]'>
                    <span className='text-main'>선물상자</span>
                    <Link href='/signup'>
                      <span className='flex justify-between items-center gap-[5px] bg-gray-200 text-black cursor-pointer px-[6px] py-[3px] rounded-[5px] text-[12px]'>
                        <Image
                          src='/images/rBox.png'
                          width={322 * 0.055}
                          height={351 * 0.055}
                          alt='랜덤포인트'
                        />
                        <span>열기</span>
                      </span>
                    </Link>
                  </span>
                </p>
              </div>
              <div className='p-[20px] h-[108px] text-[14px] font-bold flex flex-col justify-between'>
                <Link href='/login'>로그인</Link>
                <Link href='/signup'>회원가입</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileBurgerModal;
