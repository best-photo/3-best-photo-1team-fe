import Image from 'next/image';
import CustomLabel from '../../molecules/customLabel/customLabel';
import { AmountSectionProps } from './photoCardListItem.types';
import Logo from '@/public/icons/logo.svg';

export const CardAmountSection = ({
  price,
  totalAmount,
  headerWeight = 'normal',
  remainingAmount,
  state,
}: AmountSectionProps) => {
  return (
    <div className='flex flex-col gap-2.5'>
      <CustomLabel
        title='가격'
        titleWeight={headerWeight}
        contentWeight={headerWeight}
        size='small'
        className='text-gray-300'
      >
        <span>{price}P</span>
      </CustomLabel>
      <CustomLabel
        title={remainingAmount && !state ? '잔여' : '수량'}
        titleWeight={headerWeight}
        contentWeight={headerWeight}
        size='small'
        className='text-gray-300'
      >
        {remainingAmount && !state ? (
          <div className='flex gap-[5px]'>
            {remainingAmount}
            <span className='text-gray-300 font-light'>/{totalAmount}</span>
          </div>
        ) : (
          <span>{totalAmount}</span>
        )}
      </CustomLabel>
      <Image
        src={Logo}
        alt='최애의 포토 로고'
        width={100}
        height={18}
        className='mx-auto mt-10 hidden md:block lg:block'
      />
    </div>
  );
};
