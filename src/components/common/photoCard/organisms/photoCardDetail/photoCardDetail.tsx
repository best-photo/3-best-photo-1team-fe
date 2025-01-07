import Image from 'next/image';
import CardInformationHeader from '../../molecules/cardInformationHeader/cardInformationHeader';
import HorizontalDivider from '../../atoms/divider/horizontalDivider';
import Description from '../../atoms/description/description';
import CustomLabel from '../../molecules/customLabel/customLabel';
import { PhotoCardDetailProps } from './photoCardDetail.types';
import Title from '../../../title/title';
import OthersCardDetail from './othersCardDetailSection';
import MyCardDetailSection from './myCardDetailSection';

const RemainingAmount = ({
  soldAmount,
  totalAmount,
}: {
  soldAmount: number;
  totalAmount: number;
}) => {
  return (
    <div className='flex gap-[5px]'>
      {soldAmount}
      <span className='text-gray-300 font-light'>/{totalAmount}</span>
    </div>
  );
};

export default function PhotoCardDetail(props: PhotoCardDetailProps) {
  const {
    variant,
    image,
    cardName,
    grade,
    genre,
    nickname,
    description,
    price,
    totalAmount,
    soldAmount,
  } = props;

  if (totalAmount < soldAmount)
    throw new Error('판매된 수량은 총 수량보다 클 수 없습니다.');

  return (
    <>
      <Title
        variant='secondary'
        font='noto'
      >
        {cardName}
      </Title>
      <div className='flex flex-col md:flex-row lg:flex-row gap-5 md:gap-5 lg:gap-20'>
        <Image
          src={image}
          alt={cardName}
          className='w-[358px] md:w-[342px] lg:w-[960px] h-[258px] md:h-[256.5px] lg:h-[720px]'
        />
        <div className='flex flex-col w-full md:w-[342px] lg:w-[440px]'>
          <CardInformationHeader
            textSize='big'
            fontWeight='bold'
            grade={grade}
            genre={genre}
            nickname={nickname}
          />
          <HorizontalDivider />
          <Description variant='secondary'>{description}</Description>
          <HorizontalDivider />
          <div className='flex flex-col gap-[10px] mb-[60px]'>
            <CustomLabel
              title='가격'
              titleWeight='normal'
              contentWeight='bold'
              size='big'
              className='text-gray-300'
            >
              <span>{price}P</span>
            </CustomLabel>
            <CustomLabel
              title='잔여'
              titleWeight='normal'
              contentWeight='bold'
              size='big'
              className='text-gray-300'
            >
              <RemainingAmount
                totalAmount={totalAmount}
                soldAmount={soldAmount}
              />
            </CustomLabel>
          </div>
          {variant === 'othersCard' && (
            <OthersCardDetail
              onPurchase={props.onPurchase}
              maxAmount={totalAmount - soldAmount}
              price={price}
            />
          )}
          {variant === 'myCard' && (
            <MyCardDetailSection
              tradeGrade={props.tradeGrade}
              tradeGenre={props.tradeGenre}
              tradeDescription={props.tradeDescription}
              onEdit={props.onEdit}
              onDelete={props.onDelete}
            />
          )}
        </div>
      </div>
    </>
  );
}
