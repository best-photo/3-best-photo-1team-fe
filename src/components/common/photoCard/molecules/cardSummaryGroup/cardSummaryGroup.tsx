import CardSummary from '../../../CardSummary/CardSummary';
import { CardSummaryGroupProps } from './cardSummaryGroup.types';

export default function CardSummaryGroup({
  common,
  rare,
  superRare,
  legendary,
}: CardSummaryGroupProps) {
  return (
    <div className='flex gap-[10px] md:gap-[10px] lg:gap-5'>
      <CardSummary
        variant='common'
        totalCards={common}
      />
      <CardSummary
        variant='rare'
        totalCards={rare}
      />
      <CardSummary
        variant='superRare'
        totalCards={superRare}
      />
      <CardSummary
        variant='legendary'
        totalCards={legendary}
      />
    </div>
  );
}
