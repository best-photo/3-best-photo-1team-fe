import cn from '@/src/utils/cn';
import { StateBadgeProps } from './stateBadge.types';

const TEXT_COLOR = {
  sale: 'text-white',
  exchange: 'text-main',
};

const TEXT = {
  sale: '판매 중',
  exchange: '교환 제시 대기 중',
};

export default function StateBadge({ state }: StateBadgeProps) {
  return (
    <div
      className={cn(
        'px-2 md:px-2 lg:px-[10px] py-1 bg-black-50 rounded-[2px] text-[10px] md:text-[14px] lg:text-base absolute left-[5px] md:left-[10px] lg:left-[10px] top-[5px] md:top-[10px] lg:top-[10px]',
        TEXT_COLOR[state],
      )}
    >
      {TEXT[state]}
    </div>
  );
}
