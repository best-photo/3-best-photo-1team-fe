'use client';

import React, { useState, useEffect } from 'react';
import {
  getLastDrawTime,
  openPointBox,
} from '@/src/services/randomPointService';
import ConfettiEffect from '@/src/components/RandomPoint/ConfettiEffect';
import { refresh } from '@/src/services/authService';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/src/services/authService';
import useAuthStore from '@/src/store/useAuthStore';

interface RandomPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string; // 유저 ID를 서버로 전달
}

const RandomPointModal: React.FC<RandomPointModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [canParticipate, setCanParticipate] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫힐 때 상태 초기화
      setTimeLeft(null);
      setCanParticipate(false);
      setEarnedPoints(null);
      return;
    }

    const initialize = async () => {
      try {
        try {
          // await refresh();
          setTimeout(() => {
            refresh();
          }, 2000);
        } catch (error) {
          console.error('랜덤포인트모달 남은시간계산 전 리프레시 실패:', error);
          // router.push('/login'); // refresh 실패 시 로그인 페이지로 이동
          return; // 이후 작업 중단
        }
        await fetchParticipationStatus(); // fetch 실행
      } catch (error) {
        console.error('Error initializing participation status:', error);
      }
    };

    const fetchParticipationStatus = async () => {
      try {
        const lastDrawTime = await getLastDrawTime();
        const lastDrawTimestamp = new Date(lastDrawTime).getTime();
        const currentTimestamp = Date.now();
        const elapsedSeconds = Math.floor(
          (currentTimestamp - lastDrawTimestamp) / 1000,
        );

        const remainingTime = Math.max(3600 - elapsedSeconds, 0);
        setTimeLeft(remainingTime); // 남은 시간 설정
      } catch (error) {
        console.error('랜덤포인트모달 남은시간계산 받아오기 실패', error);
      }
    };

    initialize();
  }, [isOpen, userId, router]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setCanParticipate(true);
    }
  }, [timeLeft]);

  const handleDrawPoints = async () => {
    try {
      try {
        await refresh();
      } catch (error) {
        console.error('랜덤포인트모달 포인트뽑기 전 리프레시 실패:', error);
        // router.push('/login'); // refresh 실패 시 로그인 페이지로 이동
        return; // 이후 작업 중단
      }
      const response = await openPointBox();

      if ('point' in response) {
        setEarnedPoints(response.point); // 성공 시 포인트 설정

        // 최신 유저 정보 가져오기
        const updatedUser = await getProfile();

        // 전역 상태 업데이트
        useAuthStore.getState().setUserInfo(updatedUser);
      } else {
        console.error('Error:', response.message); // 실패 시 에러 처리
      }

      // 참여 제한 시작
      setCanParticipate(false);
      setTimeLeft(3600); // 시간 초기화
    } catch (error) {
      console.error('Error participating:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}분 ${String(secs).padStart(
      2,
      '0',
    )}초`;
  };

  if (!isOpen) return null;

  return (
    <div
      className='modalBackdrop fixed top-0 left-0 w-full h-full text-white backdrop-blur z-10'
      onClick={onClose}
    >
      <dialog
        className='modalContent w-[345px] md:w-[600px] lg:w-[1034px] h-[441px] md:h-[500px] lg:h-[646px] bg-gray-500 fixed top-1/2 transform -translate-y-1/2 border-[2px] border-black z-20 bg-black border-main border-[4px]'
        open
        onClick={(e) => e.stopPropagation()}
      >
        <div className='h-[182px] md:h-[188px] lg:h-[208px] flex flex-col justify-between items-center mx-auto mt-[60px] lg:mt-[80px]'>
          <h1 className='font-baskin text-white text-[30px] md:text-[36px] lg:text-[46px] font-normal'>
            랜덤<span className='text-main'>포인트</span>
          </h1>
          <div className='text-white text-[16px] lg:text-[20px] font-bold text-center'>
            1시간마다 돌아오는 기회! <br />
            랜덤 상자 뽑기를 통해 포인트를 획득하세요!
          </div>
          {!canParticipate ? (
            <div className='flex flex-col lg:flex-row gap-[5px] text-gray-300 text-[16px] text-center font-normal'>
              <div>다음 기회까지 남은 시간</div>
              <div className='text-main'>
                {timeLeft !== null ? formatTime(timeLeft) : '계산 중...'}
              </div>
            </div>
          ) : (
            <div className='text-gray-300 text-[16px] text-center font-normal'>
              아래 상자를 눌러 포인트 뽑기
            </div>
          )}
        </div>
        {canParticipate ? (
          <div className='flex justify-between mt-[60px] lg:mt-[84px] px-[16px] md:px-[35px] lg:px-[100px]'>
            <div
              className='w-[97.87px] md:w-[164.67px] lg:w-[245.96px] h-[75.87px] md:h-[127.11px] lg:h-[190.67px] bg-[url("/images/rBox1.png")] bg-cover cursor-pointer hover:scale-105'
              onClick={handleDrawPoints}
            ></div>
            <div
              className='w-[89.03px] md:w-[149.8px] lg:w-[223.74px] h-[78.79px] md:h-[132px] lg:h-[198px] bg-[url("/images/rBox2.png")] relative bg-cover cursor-pointer hover:scale-105'
              onClick={handleDrawPoints}
            ></div>
            <div
              className='w-[97.87px] md:w-[164.67px] lg:w-[245.96px] h-[75.87px] md:h-[127.11px] lg:h-[190.67px] bg-[url("/images/rBox3.png")] relative bg-cover cursor-pointer  hover:scale-105'
              onClick={handleDrawPoints}
            ></div>
          </div>
        ) : (
          <div>
            <div className='mt-[60px] lg:mt-[84px] mx-auto w-[315px] md:w-[530px] lg:w-[835.66px] h-[78.79px] md:h-[132px] lg:h-[198px] bg-[url("/images/random-boxes.webp")] bg-no-repeat bg-contain relative grayscale'>
              <div className='w-[210px] md:w-[360px] lg:w-[600px] h-[40px] md:h-[70px] lg:h-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-double border-[5px] border-main flex items-center justify-center font-baskin text-main text-[17px] md:text-[31px] lg:text-[53px] -rotate-[4deg] bg-blend-multiply'>
                랜덤포인트 상자 뽑기 완료
              </div>
            </div>
          </div>
        )}
        {earnedPoints !== null && (
          <>
            <ConfettiEffect earnedPoints={earnedPoints} />
            <div className='earnedPoints w-[345px] md:w-[600px] lg:w-[1034px] h-[441px] md:h-[500px] lg:h-[646px] bg-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-around items-center font-baskin text-center text-white text-[30px] md:text-[36px] lg:text-[46px] font-normal py-[60px] lg:py-[80px] border-main border-[4px]'>
              <div className='flex flex-col md:flex-row gap-[10px] md:gap-[20px]'>
                <span>축하합니다!</span>
                <span>
                  <span className='text-main'>{earnedPoints} 포인트</span> 당첨!
                </span>
              </div>
              <div className='w-[113.8px] md:w-[227.6px] lg:w-[284.5px] h-[122.4px] md:h-[244.8px] lg:h-[306px] bg-[url("/images/rBoxPoint.png")] bg-no-repeat bg-cover'></div>
              <canvas
                id='canvas'
                className='fixed top-0 left-0 w-full h-full pointer-events-none'
                style={{ willChange: 'transform' }}
              ></canvas>
            </div>
          </>
        )}
        <button
          className='closeButton absolute top-[21.24px] right-[21.24px] lg:top-[37px] lg:right-[37px] w-[15.53px] h-[15.53px] lg:w-[18px] lg:h-[18px] bg-[url(/icons/close.svg)] bg-no-repeat bg-cover'
          onClick={onClose}
        ></button>
      </dialog>
    </div>
  );
};

export default RandomPointModal;
