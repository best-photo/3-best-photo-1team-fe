import Image from 'next/image';
import { PhotoCardListItemProps } from './photoCardListItem.types';
import CardInformationHeader from '../../molecules/cardInformationHeader/cardInformationHeader';
import HorizontalDivider from '../../atoms/divider/horizontalDivider';
import { TradeCardSection } from './tradeCardSection';
import Description from '../../atoms/description/description';
import soldOut from '@/public/icons/sold-out.svg';
import StateBadge from '../../atoms/stateBadge/stateBadge';
import { CardAmountSection } from './cardAmountSection';

export default function PhotoCardListItem(props: PhotoCardListItemProps) {
  const isPrimary = props.variant === 'amount';
  const isSecondary = props.variant === 'trade';
  const isSoldOut =
    isPrimary && props.totalAmount && props.soldAmount === props.totalAmount;

  if (isPrimary && props.soldAmount && props.totalAmount < props.soldAmount)
    throw new Error('전체 수량은 판매 수량보다 많거나 같아야 합니다.');

  return (
    <article className='w-[170px] md:w-[342px] lg:w-[440px] border border-white-10 bg-gray-500 flex flex-col p-[10px] md:p-[20px] lg:p-[40px] justify-center'>
      <div className='relative flex items-center justify-center bg-black w-full h-full mb-[10px] md:mb-[25px] lg:mb-[25px]'>
        {isPrimary && props.state && !isSoldOut && (
          <StateBadge state={props.state} />
        )}
        {isSoldOut && (
          <>
            <div className='bg-black opacity-80 absolute w-full h-full' />
            <Image
              src={soldOut}
              alt='품절'
              className='absolute w-[82px] md:w-[146px] lg:w-[168px]'
            />
          </>
        )}
        <Image
          src={props.image}
          alt={props.cardName}
          className='w-[150px] md:w-[302px] lg:w-[360px] h-[110px] md:h-[226px] lg:h-[270px]'
        />
      </div>
      <h1 className='text-[14px] md:text-[22px] lg:text-[22px] font-bold mb-[5px] md:mb-[10px] lg:mb-[10px]'>
        {props.cardName}
      </h1>
      <div className={isSecondary ? 'mb-5 md:mb-10' : ''}>
        <CardInformationHeader
          textSize='small'
          fontWeight={props.fontWeight}
          grade={props.grade}
          genre={props.genre}
          nickname={props.nickname}
          price={isSecondary ? props.price : undefined}
        />
        <HorizontalDivider className='mb-[10px] md:mb-5 mt-[10px] md:mt-[20px]' />
        {isSecondary && (
          <Description variant='primary'>{props.description}</Description>
        )}
      </div>
      {isPrimary && (
        <CardAmountSection
          price={props.price}
          totalAmount={props.totalAmount}
          soldAmount={props.soldAmount}
          headerWeight={props.headerWeight}
          state={props.state}
        />
      )}
      {isSecondary && (
        <TradeCardSection
          onCancel={props.onCancel}
          onDecline={props.onDecline}
          onConfirm={props.onConfirm}
        />
      )}
    </article>
  );
}
