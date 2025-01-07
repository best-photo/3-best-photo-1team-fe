import Image from 'next/image';
import Title from '../../../title/title';
import exchange from '@/public/icons/exchange.svg';
import CardInformationHeader from '../../molecules/cardInformationHeader/cardInformationHeader';
import HorizontalDivider from '../../atoms/divider/horizontalDivider';
import { CommonBtn } from '../../../CommonBtn/CommonBtn';
import { MyCardDetailSectionProps } from './photoCardDetail.types';

export default function MyCardDetailSection({
  tradeGrade,
  tradeGenre,
  tradeDescription,
  onEdit,
  onDelete,
}: MyCardDetailSectionProps) {
  return (
    <div>
      <Title
        variant='tertiary'
        font='noto'
        className='gap-[6px] md:gap-[6px] lg:gap-[8px] mb-[30px] md:mb-[30px] lg:mb-[30px]'
      >
        <Image
          src={exchange}
          alt='교환 아이콘'
        />
        <span>교환 희망 정보</span>
      </Title>
      <CardInformationHeader
        textSize='big'
        fontWeight='bold'
        grade={tradeGrade}
        genre={tradeGenre}
      />
      <HorizontalDivider />
      <div className='mb-10 md:mb-10 lg:mb-20'>{tradeDescription}</div>
      <div className='flex flex-col gap-5'>
        <CommonBtn
          width='full'
          heightPreset={3}
          variant='primary'
          onClick={onEdit}
        >
          수정하기
        </CommonBtn>

        <CommonBtn
          width='full'
          heightPreset={3}
          variant='secondary'
          onClick={onDelete}
        >
          판매 내리기
        </CommonBtn>
      </div>
    </div>
  );
}
