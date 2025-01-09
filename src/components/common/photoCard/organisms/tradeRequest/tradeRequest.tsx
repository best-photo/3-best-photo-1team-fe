'use client';

import useScreenWidth from '@/src/hooks/useScreenWidth';
import { CommonBtn } from '../../../CommonBtn/CommonBtn';
import Title from '../../../title/title';
import Description from '../../atoms/description/description';
import CardInformationHeader from '../../molecules/cardInformationHeader/cardInformationHeader';
import { TradeRequestProps } from './tradeRequest.types';

const TradeButton = ({ handleTrade }: { handleTrade: () => void }) => {
  return (
    <CommonBtn
      width='custom'
      variant='primary'
      heightPreset={2}
      onClick={handleTrade}
      className='w-[345px] md:w-[342px] lg:w-[440px]'
    >
      포토카드 교환하기
    </CommonBtn>
  );
};

export default function TradeRequest({
  tradeGrade,
  tradeGenre,
  tradeDescription,
  handleTrade,
}: TradeRequestProps) {
  const screenWidth = useScreenWidth();

  return (
    <div className='flex flex-col'>
      <div className='mb-10 md:mb-0'>
        <Title
          font='noto'
          variant='secondary'
          buttonText={screenWidth !== 'small' ? '포토카드 교환하기' : ''}
          onButtonClick={screenWidth !== 'small' ? handleTrade : undefined}
        >
          교환 희망 정보
        </Title>
        <Description variant='tertiary'>{tradeDescription}</Description>
        <CardInformationHeader
          textSize='big'
          fontWeight='bold'
          grade={tradeGrade}
          genre={tradeGenre}
        ></CardInformationHeader>
      </div>
      {screenWidth === 'small' && <TradeButton handleTrade={handleTrade} />}
    </div>
  );
}
