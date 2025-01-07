import cn from '@/src/utils/cn';
import { CardSummaryProps } from './CardSummary.types';

const CardSummary = ({ variant, totalCards }: CardSummaryProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between h-[30px] sm:h-8 md:h-10 px-2.5 md:px-5 border w-fit',
        variant === 'common' && 'border-main text-main',
        variant === 'rare' && 'border-blue text-blue',
        variant === 'superRare' && 'border-purple text-purple',
        variant === 'legendary' && 'border-pink text-pink',
      )}
    >
      <div className='flex items-center text-xs sm:text-sm md:text-base '>
        <span className='font-light mr-[5px] md:mr-2.5'>
          {variant.toUpperCase()}
        </span>
      </div>
      <span className='font-light'>{totalCards}장</span>
    </div>
  );
};

export default CardSummary;
