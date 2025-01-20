import Title from '@/src/components/common/title/title';
import Image from 'next/image';
import { CommonBtn } from '@/src/components/common/CommonBtn/CommonBtn';
import PhotoCardListItem from '../common/photoCard/organisms/photoCardListItem/photoCardListItem';
import { useEffect, useState } from 'react';
import CommonAlertModal from '../common/AlertModal/CommonAlertModal';
import axiosInstance from '@/src/lib/axios/axiosInstance';
import usePhotoCardStore from '@/src/store/photoCardId';
import { useQuery } from '@tanstack/react-query';
import { CardGenre, CardGrade } from '@/src/app/(routes)/photo-card/[id]/page';

interface PhotoCardExchangeModalProps {
  shopId: string;
  onClose: () => void;
  onAllModalClose: () => void;
}

interface CardDetailresponse {
  id: string;
  ownerId: string;
  name: string;
  price: number;
  imageUrl: string;
  grade: CardGrade;
  genre: CardGenre;
  description: string;
  totalQuantity: number;
  remainingQuantity: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    nickname: string;
  };
  nickname: string;
}

const proposePhotoCardExchange = async (
  shopId: string,
  offeredCardId: string,
  exchangeDescription: string,
) => {
  const payload = {
    shopId,
    offeredCardId,
    exchangeDescription,
  };

  const response = await axiosInstance.post(
    `/cards/${shopId}/exchange`,
    payload,
  );
  return response;
};

const getPhotoCard = async (cardId: string) => {
  console.log('cardId', cardId);
  const response = await axiosInstance.get(`/cards/public-cards/${cardId}`);
  return response.data;
};

// 마켓플레이스 페이지 - 교환 제시 정보 입력 모달 (교환할 포토카드 선택 후) (구매자)
const PhotoCardExchangeModal = ({
  shopId,
  onClose,
  onAllModalClose,
}: PhotoCardExchangeModalProps) => {
  const selectedPhotoCardId = usePhotoCardStore(
    (state) => state.selectedPhotoCardId,
  );

  console.log('selectedPhotoCardId', selectedPhotoCardId);

  const {
    data: card,
    isLoading,
    error,
  } = useQuery<CardDetailresponse>({
    queryKey: ['card', selectedPhotoCardId],
    queryFn: () => getPhotoCard(selectedPhotoCardId as string),
    // staleTime: 1000 * 60 * 5,
    retry: 5,
  });
  console.log(card);

  // const [card, setCard] = useState<{
  //   cardId: string;
  //   cardName: string;
  //   grade: 'common' | 'rare' | 'superRare' | 'legendary';
  //   genre: 'object' | 'landscape' | 'travel' | 'portrait';
  //   nickname: string;
  //   price: number;
  //   totalAmount: number;
  //   imageUrl: string;
  // }>({
  //   cardId: '1',
  //   cardName: '우리집 앞마당',
  //   grade: 'legendary',
  //   genre: 'landscape',
  //   nickname: '최애',
  //   price: 5,
  //   totalAmount: 5,
  //   imageUrl: '/images/sample-image-1.webp',
  // });

  // 교환 목록 취소 모달 보이기
  const [isExchangeListCancelModalVisible, setExchangeListCancelModalVisible] =
    useState(false);

  const onExchangeListCancelClick = () => {
    setExchangeListCancelModalVisible(false);
    onClose();
  };

  // 교환 버튼 클릭시 이벤트
  const onExchangeClick = () => {
    if (shopId === undefined && !shopId) {
      alert('shopId가 없습니다.');
      return;
    }

    if (selectedPhotoCardId === undefined && !selectedPhotoCardId) {
      alert('교환할 포토카드를 선택해주세요.');
      return;
    }

    proposePhotoCardExchange(
      shopId,
      selectedPhotoCardId as string,
      '교환 제시합니다.',
    );
    alert('교환 제시 완료');
    onAllModalClose();
  };

  if (isLoading || !card) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <dialog className='fixed inset-0 flex items-center justify-center w-full h-full bg-[#000000CC] bg-opacity-[80] z-[50]'>
      <div className='bg-gray-500 w-[1160px] h-[903px] p-6 rounded-lg shadow-lg overflow-auto relative py-[60px] px-[120px] text-white'>
        <Image
          src='/icons/close.svg'
          alt='Search Icon'
          className='absolute top-[30px] right-[30px] cursor-pointer'
          onClick={onClose}
          width={18}
          height={18}
        />
        <h1 className='text-gray-300 font-baskin text-2xl mb-4'>
          포토카드 교환하기
        </h1>
        <Title
          variant='secondary'
          font='noto'
        >
          {card.name}
        </Title>
        <div className='flex'>
          {/* 공통 컴포넌트 카드 추가 해주세요 */}
          <div className='flex-1'>
            <PhotoCardListItem
              cardId={card.id}
              variant='amount'
              cardName={card.name}
              // image={card.imageUrl}  next 이미지 에러
              image='/images/sample-image-1.webp'
              grade={card.grade.toLocaleLowerCase()}
              genre={card.genre.toLocaleLowerCase()}
              nickname={card.nickname}
              price={card.price}
              totalAmount={card.remainingQuantity}
              fontWeight='normal'
              onClick={() => console.log('Photo card clicked')}
            />
          </div>
          <div className='flex-1'>
            <h2 className='font-bold text-xl mb-2'>교환 제시 내용</h2>
            <textarea
              className='w-full h-[120px] p-[18px] bg-gray-500 border border-gray-200 rounded-tl-[2px] rounded-tr-none rounded-bl-none rounded-br-none text-white resize-none mb-[60px]'
              placeholder='내용을 입력해 주세요'
            />

            <div className='flex gap-5'>
              <CommonBtn
                heightPreset={3}
                variant='secondary'
                width='half'
                onClick={() => setExchangeListCancelModalVisible(true)}
              >
                취소하기
              </CommonBtn>
              <CommonBtn
                heightPreset={3}
                variant='primary'
                width='half'
                onClick={onExchangeClick}
              >
                교환하기
              </CommonBtn>
            </div>
          </div>
        </div>
      </div>
      {/* 교환 목록 취소 모달 */}
      {isExchangeListCancelModalVisible && (
        <CommonAlertModal
          title='교환 제시 취소'
          content={`[${card.grade} | ${card.cardName}] 교환 제시를 취소하시겠습니까?`}
          buttonText='취소하기'
          onClose={() => setExchangeListCancelModalVisible(false)}
          onClick={onExchangeListCancelClick}
        />
      )}
    </dialog>
  );
};

export default PhotoCardExchangeModal;
