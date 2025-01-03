import type { CommonBtnProps } from './CommonBtn.types';
import cn from '@/src/utils/cn';

export const CommonBtn = ({
  variant = 'primary',
  width = 'full',
  heightPreset = 1,
  type = 'button',
  isDisabled = false,
  onClick,
  className,
  children,
  ...props
}: Readonly<CommonBtnProps>) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        'flex items-center justify-center rounded-sm focus:outline-none font-bold border font-noto`',
        {
          'bg-main border-main text-black': variant === 'primary',
          'bg-black border-gray-100 text-white': variant === 'secondary',
        },
        // width가 custom이 아닐 때만 width 클래스 적용
        width !== 'custom' && {
          'w-full': width === 'full',
          'w-1/2': width === 'half',
        },
        {
          'h-[40px] md:h-[50px] lg:h-[60px] text-xs md:text-base lg:text-lg':
            heightPreset === 1,
          'h-[55px] lg:h-[60px] text-base lg:text-lg': heightPreset === 2,
          'h-[75px] lg:h-[80px] text-lg lg:text-xl': heightPreset === 3,
        },
        {
          'border-gray-400 bg-gray-400 text-gray-300 cursor-not-allowed':
            isDisabled,
        },
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};
