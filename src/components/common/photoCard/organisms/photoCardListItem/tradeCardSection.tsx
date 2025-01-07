import { CommonBtn } from '../../../CommonBtn/CommonBtn';
import { TradeSectionProps } from './photoCardListItem.types';

export const TradeCardSection = ({
  onCancel,
  onDecline,
  onConfirm,
}: TradeSectionProps) => {
  if (
    onCancel !== undefined &&
    (onDecline !== undefined || onConfirm !== undefined)
  )
    throw new Error('onCancel과 onDecline/onConfirm 중 하나만 입력해주세요.');

  if (
    onCancel === undefined &&
    (onDecline === undefined || onConfirm === undefined)
  )
    throw new Error('onCancel이나 onDecline과 onConfirm을 입력해주세요.');

  return (
    <div className='flex flex-col gap-'>
      {onCancel && (
        <CommonBtn
          variant='secondary'
          width='full'
          heightPreset={1}
          onClick={onCancel}
        >
          취소하기
        </CommonBtn>
      )}
      {onDecline && onConfirm && (
        <div className='flex gap-[20px]'>
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
      )}
    </div>
  );
};
