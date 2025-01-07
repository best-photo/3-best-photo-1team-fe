import cn from '@/src/utils/cn';

export default function HorizontalDivider({
  className,
}: {
  className?: string;
}) {
  return (
    <hr
      className={cn('border-1 border-gray-400 mt-[30px] mb-[30px]', className)}
    />
  );
}
