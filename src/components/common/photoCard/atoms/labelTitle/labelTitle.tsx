import cn from '@/src/utils/cn';
import { LabelTitleProps } from './labelTitle.types';

const TEXT_SIZE = {
  big: 'text-[18px] md:text-[18px] lg:text-[20px]',
  small: 'text-[10px] md:text-[16px] lg:text-[16px]',
};

const FONT_WEIGHT = {
  normal: 'font-light',
  bold: 'font-bold',
};

export default function LabelTitle({
  textSize,
  title,
  weight,
  className,
}: LabelTitleProps) {
  return (
    <div className={cn(TEXT_SIZE[textSize], FONT_WEIGHT[weight], className)}>
      {title}
    </div>
  );
}
