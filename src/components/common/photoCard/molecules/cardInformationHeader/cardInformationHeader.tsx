import cn from '@/src/utils/cn';
import { CardInformationHeaderProps } from './cardInformationHeader.types';
import Genre from '../../atoms/genre/genre';
import Grade from '../../atoms/grade/grade';
import VerticalDivider from '../../atoms/divider/verticalDivider';
import PurchasePointLabel from '../../atoms/purchasePointLabel/purchasePointLabel';

const TEXT_STYLE = {
  small: 'text-[10px] md:text-base lg:text-base',
  big: 'text-[18px] md:text-[18px] lg:text-[24px]',
};

const FONT_WEIGHT = {
  normal: 'font-normal',
  bold: 'font-bold',
};

export default function CardInformationHeader({
  textSize,
  fontWeight,
  grade,
  genre,
  price,
  nickname,
}: CardInformationHeaderProps) {
  return (
    <div
      className={cn(
        'flex justify-between items-end',
        TEXT_STYLE[textSize],
        FONT_WEIGHT[fontWeight],
      )}
    >
      <div className='text-gray-300 gap-[10px] flex flex-col md:flex-col lg:flex-row'>
        <div className='flex gap-[10px]'>
          <Grade grade={grade} />
          <VerticalDivider />
          <Genre genre={genre} />
        </div>
        {price && (
          <>
            <VerticalDivider className='hidden md:hidden lg:block' />
            <PurchasePointLabel point={price} />
          </>
        )}
      </div>
      {nickname && <span className='text-white underline'>{nickname}</span>}
    </div>
  );
}
