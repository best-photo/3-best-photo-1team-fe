import cn from '@/src/utils/cn';
import { DividerProps } from './divider.types';

export default function HorizontalDivider({ className }: DividerProps) {
  return <hr className={cn('border-1 border-gray-400 my-[30px]', className)} />;
}
