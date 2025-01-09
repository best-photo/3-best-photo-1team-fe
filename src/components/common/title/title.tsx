import cn from '@/src/utils/cn';
import { TitleProps } from './title.types';
import { CommonBtn } from '../CommonBtn/CommonBtn';

const VARIANT_STYLE = {
  primary: 'pb-5 md:text-[48px] lg:text-[62px]',
  secondary: 'pb-5 text-2xl md:text-[32px] lg:text-[40px]',
  tertiary: 'pb-[10px] text-[22px] md:text-[22px] lg:text-[28px]',
};

const FONT = {
  noto: 'font-noto font-bold',
  baskin: 'font-baskin font-normal',
};

export default function Title({
  variant,
  font,
  children,
  className,
  onButtonClick,
  buttonText,
}: TitleProps) {
  return (
    <div
      className={cn(
        'border-b-2 border-gray-100',
        VARIANT_STYLE[variant],
        FONT[font],
        'mb-5 md:mb-10 lg:mb-[60px] flex',
        className,
      )}
    >
      <div className='flex w-full justify-between items-center'>
        <span>{children}</span>
        {buttonText && onButtonClick && (
          <CommonBtn
            variant='primary'
            width='custom'
            heightPreset={2}
            onClick={onButtonClick}
            className='w-[345px] md:w-[342px] lg:w-[440px] font-noto'
          >
            {buttonText}
          </CommonBtn>
        )}
      </div>
    </div>
  );
}
