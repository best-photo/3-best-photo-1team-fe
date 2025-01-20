import Image from 'next/image';
import Dropdown from '../common/CommonDropDown/DropDown';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Grade from '../common/photoCard/atoms/grade/grade';
import Genre from '../common/photoCard/atoms/genre/genre';
import { createShopEntry } from '@/src/services/marketPlaceService';
import { getCardById } from '@/src/services/mygalleryPhotocardService';
import {
  convertGradeToLowerCase,
  convertGenreToLowerCase,
} from '@/src/utils/convertCase';

interface MyGalleryModalProps {
  isVisible: boolean;
  onClose: () => void;
  cardId: string; // Get cardId from props
}

export default function MyGalleryModal({
  isVisible,
  onClose,
  cardId, // Get cardId from props
}: MyGalleryModalProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState<string>('');
  const [cardData, setCardData] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null); // State to store userId

  const router = useRouter();

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPrice(value === '' ? '' : Number(value));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const fetchData = async () => {
    if (!isVisible || !cardId) return;

    try {
      const data = await getCardById(cardId); // Fetch card data by cardId
      setCardData(data);
    } catch (err) {
      console.error('Error fetching card data:', err);
    }
  };

  const fetchUserId = async () => {
    try {
      const response = await fetch('/api/auth/user');
      const data = await response.json();
      setUserId(data.userId); // Assuming the response contains the userId
    } catch (err) {
      console.error('Error fetching user ID:', err);
    }
  };

  useEffect(() => {
    if (isVisible && cardId) {
      fetchData(); // Fetch card data
    }
  }, [isVisible, cardId]);

  useEffect(() => {
    fetchUserId(); // Fetch user ID when the modal is first loaded
  }, []);

  const decreaseQuantity = () => {
    setQuantity((prev) => {
      // 최소값은 0, 0보다 작아지지 않도록 설정
      return prev > 0 ? prev - 1 : 0;
    });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => {
      // cardData가 제대로 로드된 후에 remainingQuantity를 사용
      if (cardData && cardData.remainingQuantity !== undefined) {
        const maxQuantity = cardData.remainingQuantity || 0; // null이나 undefined일 경우 0 처리
        if (prev < maxQuantity) {
          return prev + 1; // maxQuantity를 초과하지 않도록 설정
        }
      } else {
        // cardData가 없을 경우, quantity를 계속 증가시킬 수 있음
        return prev + 1;
      }
      return prev; // 증가 조건을 만족하지 않으면 기존값 유지
    });
  };

  const handleRegister = async () => {
    if (!quantity || !price || !selectedGrade || !selectedGenre || !userId) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      await createShopEntry({
        sellerId: userId, // Use userId here
        cardId,
        price: Number(price),
        quantity,
        exchangeGrade: selectedGrade,
        exchangeGenre: selectedGenre,
        exchangeDescription: description,
      });
      router.push(
        `/sell-success?grade=${encodeURIComponent(cardData.grade)}&name=${encodeURIComponent(cardData.cardName)}&quantity=${quantity}`,
      );
    } catch (error) {
      console.error('판매 등록 중 오류 발생:', error);
      router.push(
        `/sell-failure?grade=${encodeURIComponent(cardData.grade)}&name=${encodeURIComponent(cardData.cardName)}&quantity=${quantity}`,
      );
    }
  };

  if (!isVisible) return null;

  if (!cardData) {
    return (
      <div className='fixed top-0 left-0 w-full h-full bg-[#000000CC] bg-opacity-[80] z-[50]'>
        <div className='fixed top-[40px] left-1/2 transform -translate-x-1/2 w-[1160px] h-[1000px] bg-[#161616] rounded-[2px] z-[60] flex items-center justify-center'>
          <p>Loading card data...</p>
        </div>
      </div>
    );
  }

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
          <div className='absolute top-[60px] left-[120px] h-[25px] text-[24px] font-baskin leading-[24.58px] tracking-[-0.03em] text-[#A4A4A4]'>
            나의 포토카드 판매하기
          </div>
          {/* 사진제목 */}
          <div className='absolute top-[120px] left-[120px] text-[40px] font-noto font-[700] leading-[47.1px] tracking-[-0.03em] text-[#FFFFFF]'>
            {cardData.name}
          </div>
          <div className='border-b border-white w-[920px] mx-auto mt-[192px]'></div>
          <div>
            <Image
              src={cardData.imageUrl}
              alt='Search Icon'
              className='fixed top-[243px] left-[120px]'
              width={440}
              height={330}
            />
            <div className='fixed flex flex-row justify-between w-[440px] gap-[10px] top-[243px] left-[600px]'>
              <div className='flex gap-[10px]'>
                <div className='text-[24px] font-noto font-bold leading-[34.75px] text-left  decoration-skip-ink-none text-[#FF2A6A]'>
                  <Grade grade={convertGradeToLowerCase(cardData.grade)} />
                </div>
                <div className='text-[24px] font-noto font-bold leading-[34.75px] text-left decoration-skip-ink-none text-[#A4A4A4]'>
                  | <Genre genre={convertGenreToLowerCase(cardData.genre)} />
                </div>
              </div>
              <div className='text-[24px] font-noto font-bold leading-[34.75px] underline text-left  decoration-skip-ink-none text-[#A4A4A4]'>
                {cardData.nickname}
              </div>
            </div>
            <div className='fixed flex flex-col gap-[20px] top-[338px] left-[600px]'>
              <div className='flex justify-between items-center w-[440px]'>
                <div className='text-[20px] font-noto leading-[28.96px] text-left '>
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

                  <div className='w-[80px] h-[50px]'>
                    <div className='text-[20px] font-noto leading-[28.96px] text-left'>
                      / {cardData.remainingQuantity}
                    </div>
                    <div className='text-[14px] leading-[28.96px] text-left font-noto'>
                      최대 {cardData.remainingQuantity}장
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className='flex justify-between items-center w-[440px]'>
                  <div className='text-[20px] font-noto leading-[28.96px] text-left '>
                    장당 가격
                  </div>
                  <div className='w-[246px] h-[50px] flex flex-row gap-[20px]'>
                    <div className='flex w-[245px] h-[50px] rounded-[2px] gap-[25px] border border-[#DDDDDD]'>
                      <input
                        type='text'
                        value={price}
                        onChange={handlePriceChange}
                        className='bg-[#161616] outline-none px-[20px] py-[23.5px] w-[180px] h-[23px]'
                        placeholder='숫자만 입력'
                      />
                      <div className='flex justify-center items-center text-[20px] font-noto leading-[28.96px] text-right text-[#FFFFFF] '>
                        P
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='fixed top-[653px] left-[120px] text-[28px] font-noto leading-[28.96px] text-left'>
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
                type='text'
                value={description}
                onChange={handleDescriptionChange}
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
              <div
                onClick={handleRegister}
                className='w-[440px] h-[55px] px-[186px] py-[17px] gap-[10px] bg-[#EFFF04] text-[black] text-[16px] font-bold leading-[23.17px] rounded-[2px] border border-[#EEEEEE] cursor-[pointer] font-noto'
              >
                판매하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
