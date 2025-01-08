import { CommonBtn } from '../../../CommonBtn/CommonBtn';
import { TradeSectionProps } from './photoCardListItem.types';

export const TradeCardSection = ({
  onCancel,
  onDecline,
  onConfirm,
}: TradeSectionProps) => {
  const onCancelValid = onCancel !== undefined;
  const onDeclineValid = onDecline !== undefined;
  const onConfirmValid = onConfirm !== undefined;

  if (onCancelValid && (onDeclineValid || onConfirmValid))
    throw new Error('onCancel과 onDecline/onConfirm 중 하나만 입력해주세요.');

  if (!onCancelValid && (!onDeclineValid || !onConfirmValid))
    throw new Error('onCancel이나 onDecline과 onConfirm을 입력해주세요.');

  if (onCancelValid)
    return (
      <CommonBtn
        variant='secondary'
        width='full'
        heightPreset={1}
        onClick={onCancel}
      >
        취소하기
      </CommonBtn>
    );

  if (onDeclineValid && onConfirmValid)
    return (
      <div className='flex gap-[5px] md:gap-[5px] lg:gap-5'>
        <CommonBtn
          variant='secondary'
          width='half'
          heightPreset={1}
          onClick={onDecline}
        >
          거절하기
        </CommonBtn>
        <CommonBtn
          variant='primary'
          width='half'
          heightPreset={1}
          onClick={onConfirm}
        >
          승인하기
        </CommonBtn>
      </div>
    );
};
