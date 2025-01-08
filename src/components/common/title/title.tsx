import cn from '@/src/utils/cn';
import { TitleProps } from './title.types';

const VARIANT_STYLE = {
  primary: 'pb-5 md:text-[48px] lg:text-[62px]',
  secondary: 'pb-5 text-2xl md:text-[32px] lg:text-[40px]',
  tertiary: 'pb-[10px] text-[22px] md:text-[22px] lg:text-[28px]',
};

const FONT = {
  noto: 'font-noto',
  baskin: 'font-baskin',
};

export default function Title({
  variant,
  font,
  children,
  className,
}: TitleProps) {
  return (
    <div
      className={cn(
        'border-b-2 border-gray-100',
        VARIANT_STYLE[variant],
        FONT[font],
        'font-bold',
        'mb-5 md:mb-10 lg:mb-[60px] flex',
        className,
      )}
    >
      {children}
    </div>
  );
}
