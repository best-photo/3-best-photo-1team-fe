import cn from '@/src/utils/cn';
import { PurchasePointLabelProps } from './purchasePointLabel.types';

export default function PurchasePointLabel({
  point,
  className,
}: PurchasePointLabelProps) {
  return (
    <span>
      <span className={cn('text-white', className)}>
        {point.toLocaleString()}P
      </span>{' '}
      에 구매
    </span>
  );
}
