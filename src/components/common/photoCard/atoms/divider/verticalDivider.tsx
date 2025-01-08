import cn from '@/src/utils/cn';
import { DividerProps } from './divider.types';

export default function VerticalDivider({ className }: DividerProps) {
  return <span className={cn('text-gray-400', className)}>|</span>;
}
