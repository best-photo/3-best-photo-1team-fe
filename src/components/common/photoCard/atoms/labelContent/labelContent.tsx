import cn from '@/src/utils/cn';
import { LabelContentProps } from './labelContent.types';

const TEXT_SIZE = {
  big: 'text-[20px] md:text-[20px] lg:text-[24px]',
  small: 'text-[10px] md:text-[18px] lg:text-[18px]',
};

const FONT_WEIGHT = {
  normal: 'font-normal',
  bold: 'font-bold',
};

export default function LabelContent({
  textSize,
  weight,
  children,
  className,
}: LabelContentProps) {
  return (
    <div
      className={cn(
        TEXT_SIZE[textSize],
        'text-white',
        FONT_WEIGHT[weight],
        className,
      )}
    >
      {children}
    </div>
  );
}
