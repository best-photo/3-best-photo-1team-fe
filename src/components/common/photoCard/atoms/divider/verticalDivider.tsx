import cn from '@/src/utils/cn';

export default function VerticalDivider({ className }: { className?: string }) {
  return <span className={cn('text-gray-400', className)}>|</span>;
}
