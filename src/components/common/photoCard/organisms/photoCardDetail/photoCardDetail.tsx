import Image from 'next/image';
import CardInformationHeader from '../../molecules/cardInformationHeader/cardInformationHeader';
import HorizontalDivider from '../../atoms/divider/horizontalDivider';
import Description from '../../atoms/description/description';
import CustomLabel from '../../molecules/customLabel/customLabel';
import { PhotoCardDetailProps } from './photoCardDetail.types';
import Title from '../../../title/title';
import OthersCardDetail from './othersCardDetailSection';
import MySellingCardDetailSection from './myCardDetailSection';
import { CommonBtn } from '../../../CommonBtn/CommonBtn';

const RemainingAmount = ({
  remainingAmount,
  totalAmount,
}: {
  remainingAmount: number;
  totalAmount: number;
}) => {
  return (
    <div className='flex gap-[5px]'>
      {remainingAmount}
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
    remainingAmount,
  } = props;

  if (totalAmount < remainingAmount) {
    console.error('판매된 수량은 총 수량보다 클 수 없습니다.');
    return <div>판매된 수량이 총 수량보다 크게 입력되었습니다.</div>;
  }

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
          width={960}
          height={720}
          priority={true}
          quality={90}
          className='w-[358px] md:w-[342px] lg:w-[960px] h-[258px] md:h-[256.5px] lg:h-[720px] object-cover'
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
          <div className='flex flex-col gap-[10px] mb-[30px]'>
            <CustomLabel
              title='가격'
              titleWeight='normal'
              contentWeight='bold'
              size='big'
              className='text-gray-300'
            >
              <span>{price.toLocaleString() ?? 0}P</span>
            </CustomLabel>
            <CustomLabel
              title={variant === 'myHoldingCard' ? '보유량' : '잔여'}
              titleWeight='normal'
              contentWeight='bold'
              size='big'
              className='text-gray-300'
            >
              {variant === 'myHoldingCard' ? (
                <span>{totalAmount}</span>
              ) : (
                <RemainingAmount
                  totalAmount={totalAmount}
                  remainingAmount={remainingAmount}
                />
              )}
            </CustomLabel>
          </div>
          {variant === 'othersCard' && (
            <OthersCardDetail
              onPurchase={props.onPurchase}
              maxAmount={remainingAmount}
              price={price}
            />
          )}
          {variant === 'mySellingCard' && (
            <MySellingCardDetailSection
              tradeGrade={props.tradeGrade}
              tradeGenre={props.tradeGenre}
              tradeDescription={props.tradeDescription}
              onEdit={props.onEdit}
              onDelete={props.onDelete}
            />
          )}
          {variant === 'myHoldingCard' && (
            <CommonBtn
              width='full'
              heightPreset={3}
              variant='primary'
              onClick={props.onSale}
            >
              판매하기
            </CommonBtn>
          )}
        </div>
      </div>
    </>
  );
}
