'use client';

import useScreenWidth from '@/src/hooks/useScreenWidth';
import { CommonBtn } from '../../../CommonBtn/CommonBtn';
import { TradeSectionProps } from './photoCardListItem.types';

export const TradeCardSection = ({
  tradeId,
  onCancel,
  onDecline,
  onConfirm,
}: TradeSectionProps) => {
  const onCancelValid = onCancel !== undefined;
  const onDeclineValid = onDecline !== undefined;
  const onConfirmValid = onConfirm !== undefined;
  const screenWidth = useScreenWidth();

  if (onCancelValid && (onDeclineValid || onConfirmValid))
    console.error('onCancel과 onDecline/onConfirm 중 하나만 입력해주세요.');

  if (!onCancelValid && (!onDeclineValid || !onConfirmValid))
    console.error('onCancel이나 onDecline과 onConfirm을 입력해주세요.');

  if (onCancelValid)
    return (
      <div className='flex'>
        <CommonBtn
          variant='secondary'
          width='full'
          heightPreset={1}
          onClick={() => onCancel(tradeId)}
        >
          취소하기
        </CommonBtn>
      </div>
    );

  if (onDeclineValid && onConfirmValid)
    return (
      <div className='flex gap-[5px] md:gap-[5px] lg:gap-5'>
        <CommonBtn
          variant='secondary'
          width='half'
          heightPreset={1}
          onClick={() => onDecline(tradeId)}
        >
          {screenWidth !== 'small' ? '거절하기' : '거절'}
        </CommonBtn>
        <CommonBtn
          variant='primary'
          width='half'
          heightPreset={1}
          onClick={() => onConfirm(tradeId)}
        >
          {screenWidth !== 'small' ? '승인하기' : '승인'}
        </CommonBtn>
      </div>
    );
};
