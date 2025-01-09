import Image from 'next/image';
import Dropdown from '../common/CommonDropDown/DropDown';
import { useState } from 'react';

export default function PhotoCardDetailModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);

  if (!isVisible) return null;

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // 수량 증가
  const increaseQuantity = () => {
    setQuantity((prev) => (prev < 3 ? prev + 1 : 3));
  };

  return (
    <>
      {/* 배경 */}
      <div className='fixed top-0 left-0 w-full h-full bg-[#000000CC] bg-opacity-[80] z-[50]' />

      {/* 모달 */}
      <div className='fixed top-[40px] left-1/2 transform -translate-x-1/2 w-[1160px] h-[1000px] bg-[#161616] rounded-[2px] z-[60] overflow-auto custom-scroll'>
        <Image
          src='/icons/close.svg'
          alt='Search Icon'
          className='absolute top-[30px] right-[30px] cursor-[pointer]'
          onClick={onClose}
          width={18}
          height={18}
        />
        <div className='p-4'>
          <div
            className='absolute top-[60px] left-[120px] h-[25px] text-[24px] font-normal leading-[24.58px] tracking-[-0.03em] text-[#A4A4A4]'
            style={{ fontFamily: 'var(--font-baskin-robbins)' }}
          >
            나의 포토카드 판매하기
          </div>
          {/* 사진제목 */}
          <div
            className='absolute top-[120px] left-[120px] text-[40px] font-normal font-[700] leading-[47.1px] tracking-[-0.03em] text-[#FFFFFF]'
            style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
          >
            우리집 앞마당
          </div>
          <div className='border-b border-white w-[920px] mx-auto mt-[192px]'></div>
          <div>
            <Image
              src='/images/sample-image-3.webp'
              alt='Search Icon'
              className='fixed top-[243px] left-[120px]'
              width={440}
              height={330}
            />

            {/* 유저정보 */}
            <div className='fixed flex flex-row gap-[10px] top-[243px] left-[600px]'>
              <div
                className='text-[24px] font-bold leading-[34.75px] text-left  decoration-skip-ink-none text-[#FF2A6A]'
                style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
              >
                LEGENDARY
              </div>
              <div
                className='text-[24px] font-bold leading-[34.75px] text-left  decoration-skip-ink-none text-[#A4A4A4]'
                style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
              >
                | 풍경
              </div>
              <div
                className='ml-[170px] text-[24px] font-bold leading-[34.75px] underline text-left  decoration-skip-ink-none text-[#A4A4A4]'
                style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
              >
                {/* 유저정보, 클릭시에 마이페이지로 이동시킬 예정 */}
                유디
              </div>
            </div>

            {/* 판매수량, 장당가격  */}
            <div className='fixed flex flex-col gap-[20px] top-[338px] left-[600px]'>
              <div className='flex justify-between items-center w-[440px]'>
                <div
                  className='text-[20px] font-normal leading-[28.96px] text-left '
                  style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
                >
                  총 판매 수량
                </div>

                <div className='w-[246px] h-[50px] flex flex-row gap-[20px]'>
                  <div className='w-[176px] h-[50px] flex justify-around items-center rounded-[2px] border border-[#DDDDDD]'>
                    <Image
                      src='/icons/minus.svg'
                      alt='Search Icon'
                      className='flex justify-center items-center cursor-[pointer]'
                      onClick={decreaseQuantity}
                      width={22}
                      height={22}
                    />
                    <div className='w-[60px] text-center text-[20px] font-bold text-[#FFFFFF]'>
                      {quantity}
                    </div>
                    <Image
                      src='/icons/plus.svg'
                      alt='Search Icon'
                      className='flex justify-center items-center cursor-[pointer]'
                      onClick={increaseQuantity}
                      width={22}
                      height={22}
                    />
                  </div>

                  <div className='w-[56px] h-[50px]'>
                    <div
                      className='text-[20px] font-normal leading-[28.96px] text-left '
                      style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
                    >
                      /3
                    </div>
                    <div
                      className='text-[14px] font-normal leading-[28.96px] text-left '
                      style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
                    >
                      최대 3장
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className='flex justify-between items-center w-[440px]'>
                  <div
                    className='text-[20px] font-normal leading-[28.96px] text-left '
                    style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
                  >
                    장당 가격
                  </div>
                  <div className='w-[246px] h-[50px] flex flex-row gap-[20px]'>
                    <div className='flex w-[245px] h-[50px] rounded-[2px] gap-[25px] border border-[#DDDDDD]'>
                      <input
                        type='text'
                        className='bg-[#161616] outline-none px-[20px] py-[23.5px] w-[180px] h-[23px]'
                        placeholder='숫자만 입력'
                      />
                      <div
                        className='flex justify-center items-center text-[20px] font-bold leading-[28.96px] text-right text-[#FFFFFF] '
                        style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
                      >
                        P
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='fixed top-[653px] left-[120px] text-[28px] font-normal leading-[28.96px] text-left'
              style={{ fontFamily: 'var(--font-noto-sans-kr)' }}
            >
              교환 희망 정보
            </div>
            <div className='border-b border-white w-[920px] mx-auto mt-[500px]'></div>

            <div className='w-[920px] flex justify-center gap-[40px] mx-auto mt-[40px]'>
              <div className='w-[440px]'>
                <div className='font-noto text-[16px] font-bold leading-[23.17px] text-left '>
                  등급
                </div>
                <div className='mt-[10px]'>
                  <Dropdown
                    options={['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY']}
                    selectedValue={selectedGrade}
                    placeholder='등급을 선택해주세요'
                    onValueChange={setSelectedGrade}
                    className='border border-[#dddddd]'
                  />
                </div>
              </div>
              <div className='w-[440px]'>
                <div className='font-noto text-[16px] font-bold leading-[23.17px] text-left '>
                  장르
                </div>
                <div className='mt-[10px]'>
                  <Dropdown
                    options={['여행', '풍경', '인물', '사물']}
                    selectedValue={selectedGenre}
                    placeholder='장르를 선택해 주세요'
                    onValueChange={setSelectedGenre}
                    className='border border-[#dddddd]'
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center mt-[30px]'>
              <div className='w-[920px] flex font-noto text-[16px] font-bold leading-[23.17px] text-left text-[#FFFFFF]'>
                교환 희망 설명
              </div>
              <input
                placeholder='설명을 입력해 주세요'
                className='w-[920px] h-[120px] p-[12px_20px] rounded-[2px] bg-[#161616] border border-[#DDDDDD] mt-[10px] pb-[70px] outline-none'
              />
            </div>

            <div className='w-[920px] flex my-[60px] mx-auto gap-[40px]'>
              <div
                onClick={onClose}
                className='w-[440px] h-[55px] px-[186px] py-[17px] gap-[10px] rounded-[2px] text-[16px] font-bold leading-[23.17px] border border-[#EEEEEE] cursor-[pointer]'
              >
                취소하기
              </div>
              <div className='w-[440px] h-[55px] px-[186px] py-[17px] gap-[10px] bg-[#EFFF04] text-[black] text-[16px] font-bold leading-[23.17px] rounded-[2px] border border-[#EEEEEE] cursor-[pointer] font-noto'>
                판매하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
