import { useState } from 'react';
import Image from 'next/image';
import Dropdown from '../common/CommonDropDown/DropDown';
import SearchInput from '../common/CommonSearchBox/SearchInput';
import PhotoCardListItem from '../common/photoCard/organisms/photoCardListItem/photoCardListItem';
import { mockPhotoCards } from './mockData';

export function Modal({
  onClose,
  isVisible,
  onPhotoCardClick,
}: {
  onClose: () => void;
  isVisible: boolean;
  onPhotoCardClick: () => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      {isVisible && (
        <>
          {/* 배경 */}
          <div className='fixed top-0 left-0 w-full h-full bg-[#000000CC] bg-opacity-[80] z-[50]' />

          {/* 모달 */}
          <div className='fixed top-[40px] left-1/2 transform -translate-x-1/2 w-[1160px] h-[1000px] bg-[#161616] rounded-[2px] z-[60]'>
            <div
              className='absolute top-[60px] left-[120px] h-[25px] text-[24px] font-normal leading-[24.58px] tracking-[-0.03em] text-[#A4A4A4]'
              style={{ fontFamily: 'var(--font-baskin-robbins)' }}
            >
              마이갤러리
            </div>
            <Image
              src='/icons/close.svg'
              alt='Search Icon'
              className='absolute top-[30px] right-[30px] cursor-[pointer]'
              onClick={onClose}
              width={18}
              height={18}
            />
            <div
              className='absolute top-[120px] left-[120px] text-[46px] font-normal leading-[47.1px] tracking-[-0.03em] text-[#FFFFFF]'
              style={{ fontFamily: 'var(--font-baskin-robbins)' }}
            >
              나의 포토카드 판매하기
            </div>
            <div className='border-b border-white w-[920px] mx-auto mt-[192px]'></div>

            <div className=' flex flex-row gap-[10px] h-[50px] mt-[30px] ml-[120px]'>
              <div className='w-[320px] relative'>
                <SearchInput
                  value={query}
                  onChange={handleInputChange}
                  placeholder='검색'
                  className='w-[320px]'
                />
                <Image
                  src='/icons/search.svg'
                  alt='Search Icon'
                  className='absolute right-[10px] top-1/2 transform -translate-y-1/2 z-10'
                  width={20}
                  height={20}
                />
              </div>
              <Dropdown
                options={['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY']}
                selectedValue={selectedGrade}
                placeholder='등급'
                onValueChange={setSelectedGrade}
              />
              <Dropdown
                options={['여행', '풍경', '인물', '사물']}
                selectedValue={selectedGenre}
                placeholder='장르'
                onValueChange={setSelectedGenre}
              />
            </div>

            <div className='w-[930px] mx-auto flex flex-wrap h-[600px] overflow-y-auto'>
              <div
                onClick={onPhotoCardClick}
                className='flex gap-[20px] flex-wrap w-[1480px] mx-auto pt-[60px] mb-[100px]'
              >
                {mockPhotoCards.map((card, index) => (
                  <PhotoCardListItem
                    key={index}
                    {...card}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
