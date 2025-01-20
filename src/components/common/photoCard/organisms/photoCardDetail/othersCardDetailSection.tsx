'use client';

import CustomLabel from '../../molecules/customLabel/customLabel';
import AmountControl from '../../../amountControl/amountControl';
import { usePurchaseAmountStore } from '@/src/store/purchaseAmountStore';
import { CommonBtn } from '../../../CommonBtn/CommonBtn';
import HorizontalDivider from '../../atoms/divider/horizontalDivider';
import { OthersCardDetailSectionProps } from './photoCardDetail.types';
import { useEffect } from 'react';

export default function OthersCardDetail({
  onPurchase,
  maxAmount,
  price,
}: OthersCardDetailSectionProps) {
  const { amount, plusAmount, minusAmount, reset } = usePurchaseAmountStore();

  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      <HorizontalDivider />
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-5'>
          <CustomLabel
            title='구매수량'
            titleWeight='normal'
            contentWeight='normal'
            size='big'
          >
            <AmountControl
              amount={amount}
              onMinusClick={minusAmount}
              onPlusClick={() => plusAmount(maxAmount)}
            />
          </CustomLabel>
          <CustomLabel
            title='총가격'
            titleWeight='normal'
            contentWeight='bold'
            size='big'
          >
            <div className='flex gap-[10px] items-center'>
              <span>{price * amount}P</span>
              <span className='font-normal text-gray-300 text-[18px] md:text-[18px] lg:text-[20px]'>
                ({amount}장)
              </span>
            </div>
          </CustomLabel>
        </div>
        <CommonBtn
          variant='primary'
          width='full'
          heightPreset={3}
          onClick={onPurchase}
        >
          포토카드 구매하기
        </CommonBtn>
      </div>
    </>
  );
}
