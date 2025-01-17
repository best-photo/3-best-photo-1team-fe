'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useProfileModalStore } from '@/src/store/useProfileModalStore';
import Image from 'next/image';
import MenuIcon from '@/public/icons/menu.svg';
import RandomPointModal from '@/src/components/RandomPoint/RandomPointModal';
// import useRandomPointModalStore from '@/src/store/useRandomPointModalStore';

interface ProfileModalProps {
  user: {
    id: string;
    email: string;
    nickname: string;
    points: number;
  };
  logout: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, logout }) => {
  const { isProfileModalOpen, toggleProfileModal, closeProfileModal } =
    useProfileModalStore();

  // const { isRandomPointModalOpen, openModal, closeModal } =
  //   useRandomPointModalStore();

  const [isRandomPointModalOpen, setRandomPointModalOpen] = useState(false);

  const handleOpenRandomPointModal = () => {
    setRandomPointModalOpen(true);
    closeProfileModal();
  };

  const handleCloseRandomPointModal = () => setRandomPointModalOpen(false);

  // const handleOpenRandomPointModal = () => {
  //   openModal();
  //   closeProfileModal();
  // };

  return (
    <div
      className='relative'
      onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
    >
      {/* 버튼: 모달 열기/닫기 */}
      <button
        className='relative'
        onClick={toggleProfileModal}
      >
        <div className='hidden font-baskin md:flex items-center truncate max-w-[101px]'>
          {user.nickname}
        </div>
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
      {isProfileModalOpen && (
        <>
          <div
            className='fixed inset-0 z-10 backdrop-blur-[4px] md:backdrop-blur-none'
            onClick={closeProfileModal} // 외부 클릭 시 닫기
          ></div>
          {/* 태블릿, 데스크탑 */}
          <div className='hidden md:block'>
            <div className='absolute right-0 mt-2 w-[260px] bg-black text-white z-20'>
              <div className='p-[20px] h-[107px] flex flex-col justify-between border-b-[1px] border-b-gray-400'>
                <p className='text-[18px] font-bold truncate'>
                  안녕하세요, {user.nickname}님!
                </p>
                <p className='text-[13px] flex justify-between items-center'>
                  <span className='text-gray-300'>보유 포인트</span>
                  <span className='flex justify-between items-center gap-[9px]'>
                    <span className='text-main'>
                      {user.points.toLocaleString()} P
                    </span>
                    <span
                      className='flex justify-between items-center gap-[5px] bg-gray-200 text-black cursor-pointer px-[6px] py-[3px] rounded-[5px] text-[12px]'
                      onClick={handleOpenRandomPointModal}
                    >
                      <Image
                        src='/images/rBox.png'
                        width={322 * 0.055}
                        height={351 * 0.055}
                        alt='랜덤포인트'
                      />
                      <span>열기</span>
                    </span>
                  </span>
                </p>
              </div>
              <div className='p-[20px] h-[103px] text-[14px] font-bold flex flex-col justify-between'>
                <Link href='/my-gallery'>
                  <div>마이갤러리</div>
                </Link>
                <Link href='/my-sales'>
                  <div>나의 판매 포토카드</div>
                </Link>
              </div>
            </div>
          </div>
          {/* 모바일 */}
          <div className='block md:hidden'>
            <div className='fixed left-0 top-0 w-[69%] min-w-[230px] max-w-[310px] h-screen bg-black text-white z-20'>
              <div className='p-[20px] h-[127px] flex flex-col justify-between border-b-[1px] border-b-gray-400'>
                <p className='text-[18px] pt-[20px] font-bold truncate'>
                  안녕하세요, {user.nickname}님!
                </p>
                <p className='text-[13px] flex justify-between items-center'>
                  <span className='text-gray-300'>보유 포인트</span>
                  <span className='flex justify-between items-center gap-[9px]'>
                    <span className='text-main'>
                      {user.points.toLocaleString()} P
                    </span>
                    <span
                      className='flex justify-between items-center gap-[5px] bg-gray-200 text-black cursor-pointer px-[6px] py-[3px] rounded-[5px] text-[12px]'
                      onClick={handleOpenRandomPointModal}
                    >
                      <Image
                        src='/images/rBox.png'
                        width={322 * 0.055}
                        height={351 * 0.055}
                        alt='랜덤포인트'
                      />
                      <span>열기</span>
                    </span>
                  </span>
                </p>
              </div>
              <div className='p-[20px] h-[108px] text-[14px] font-bold flex flex-col justify-between'>
                <Link href='/my-gallery'>
                  <div>마이갤러리</div>
                </Link>
                <Link href='/my-sales'>
                  <div>나의 판매 포토카드</div>
                </Link>
              </div>
              <div>
                <div
                  className='absolute bottom-[40px] left-[20px] text-[14px] text-gray-400 cursor-pointer'
                  onClick={logout}
                >
                  로그아웃
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* 랜덤포인트 모달 */}
      <RandomPointModal
        isOpen={isRandomPointModalOpen}
        onClose={handleCloseRandomPointModal}
      />
      {/* <RandomPointModal
        isOpen={isRandomPointModalOpen}
        onClose={closeModal}
      /> */}
    </div>
  );
};

export default ProfileModal;
