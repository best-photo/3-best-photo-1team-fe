import cn from '@/src/utils/cn';
import { DescriptionProps } from './description.types';

const DESCRIPTION_STYLE = {
  primary: 'text-[10px] md:text-[16px] lg:text-[16px] line-clamp-2',
  secondary: 'text-[16px] md:text-[16px] lg:text-[18px]',
};

export default function Description({
  children,
  variant,
  className,
}: DescriptionProps) {
  return (
    <div className={cn(DESCRIPTION_STYLE[variant], className)}>{children}</div>
  );
}
