import { useEffect, useState } from 'react';
import Image from 'next/image';
import PhotoCardListItem from '../common/photoCard/organisms/photoCardListItem/photoCardListItem';
import { AmountListItem } from '../common/photoCard/organisms/photoCardListItem/photoCardListItem.types';
import SearchSection from '../common/searchSection/searchSection';
import usePhotoCardStore from '@/src/store/photoCardId';
import useAuthStore from '@/src/store/useAuthStore';
import { usePathname } from 'next/navigation';
import { axiosUserCards } from '@/src/services/marketPlaceService';

export function Modal({
  onClose,
  isVisible,
  onPhotoCardClick,
}: {
  onClose: () => void;
  isVisible: boolean;
  onPhotoCardClick: () => void;
}) {
  const pathname = usePathname();
  const basePath = pathname.split('/')[1];
  let title = '타이틀을 넣어주세요';
  if (basePath === '') {
    title = '나의 포토카드 판매하기';
  }
  if (basePath === 'photo-card') {
    title = '포토카드 교환하기';
  }

  const setSelectedPhotoCardId = usePhotoCardStore(
    (state) => state.setSelectedPhotoCardId,
  );

  const [userCards, setUserCards] = useState<AmountListItem[]>([]);
  const [filters, setFilters] = useState({ grade: '', genre: '' });
  const [query, setQuery] = useState('');

  const userId = useAuthStore((state) => state.user?.id);

  const fetchUserCards = async (
    filters: { grade: string; genre: string },
    query: string,
  ) => {
    if (!userId) return;

    try {
      const combinedFilters = { ...filters, query };
      const cards = await axiosUserCards(userId, combinedFilters);
      setUserCards(cards);
    } catch (error) {
      console.error(
        '유저 카드 데이터를 가져오는 중 오류가 발생했습니다:',
        error,
      );
    }
  };

  const handleModalClose = () => {
    setFilters({
      grade: '',
      genre: '',
    });
    setQuery('');
    onClose();
  };

  const handleFilterChange = (filterQuery: string) => {
    const params = new URLSearchParams(filterQuery);
    const newFilters = {
      grade: params.get('grade') || '',
      genre: params.get('genre') || '',
    };
    const newQuery = params.get('keyword') || '';
    setFilters(newFilters);
    setQuery(newQuery);
  };

  const PhotoCardClick = (cardId: string) => {
    setSelectedPhotoCardId(cardId);
    onPhotoCardClick();
  };

  useEffect(() => {
    if (isVisible) {
      fetchUserCards(filters, query);
    }
  }, [filters, query, isVisible]);

  return (
    <>
      {isVisible && (
        <div className='fixed top-0 left-0 w-full h-full bg-[#000000CC] bg-opacity-[80] z-[50]'>
          <div className='fixed top-[40px] left-1/2 transform -translate-x-1/2 w-[1160px] h-[1000px] bg-[#161616] rounded-[2px] z-[60]'>
            <div className='absolute top-[60px] left-[120px] text-[24px] font-baskin'>
              마이갤러리
            </div>
            <Image
              src='/icons/close.svg'
              alt='Close'
              className='absolute top-[30px] right-[30px] cursor-pointer'
              onClick={handleModalClose}
              width={18}
              height={18}
            />
            <div
              className='absolute top-[120px] left-[120px] text-[46px] font-normal leading-[47.1px] tracking-[-0.03em] text-[#FFFFFF]'
              style={{ fontFamily: 'var(--font-baskin-robbins)' }}
            >
              {title}
            </div>
            <div className='border-b border-white w-[920px] mx-auto mt-[192px]'></div>
            <div className='flex flex-row gap-[10px] mt-[30px] ml-[120px]'>
              <SearchSection
                variant='myGallery'
                // 수정 필요
                optionCounts={[10, 10]}
                onSubmitFilter={handleFilterChange}
              />
            </div>
            <div className='w-[930px] mx-auto flex flex-wrap h-[600px] overflow-y-auto custom-scroll'>
              <div className='flex gap-[20px] flex-wrap w-[930px] mx-auto'>
                {userCards.map((card) => (
                  <PhotoCardListItem
                    key={card.cardId}
                    {...card}
                    onClick={() => PhotoCardClick(card.cardId)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
