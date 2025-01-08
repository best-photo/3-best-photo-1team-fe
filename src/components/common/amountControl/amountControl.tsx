import plus from '@/public/icons/plus.svg';
import minus from '@/public/icons/minus.svg';
import Image from 'next/image';
import { AmountControlProps } from './amountControl.types';

export default function AmountControl({
  amount,
  onMinusClick,
  onPlusClick,
}: AmountControlProps) {
  return (
    <div className='border border-gray-200 px-3 py-[10px] rounded-sm w-[144px] md:w-[144px] lg:w-[176px]'>
      <div className='flex justify-between'>
        <button onClick={onMinusClick}>
          <Image
            src={minus}
            alt='마이너스'
            width={24}
            height={24}
          />
        </button>
        <span className='text-lg md:text-lg lg:text-xl'>{amount}</span>
        <button onClick={onPlusClick}>
          <Image
            src={plus}
            alt='플러스'
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
