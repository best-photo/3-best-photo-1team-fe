import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Genres, Grades } from '../../common/photoCard/types';
import PhotoCardListItem from '../../common/photoCard/organisms/photoCardListItem/photoCardListItem';
import { CardState } from '../../common/photoCard/atoms/stateBadge/stateBadge.types';

export interface Card {
  cardId: number;
  nickname: string;
  price: number;
  image: string | StaticImport;
  cardName: string;
  state: CardState;
  grade: Grades;
  genre: Genres;
  totalAmount: number;
}

export default function CardContainer({
  cards,
  onClick,
}: {
  cards: Card[];
  onClick: (id: number) => void;
}) {
  return (
    <div className='w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[5px] md:gap-5 lg:gap-20 pb-[140px]'>
      {cards.map((card) => (
        <PhotoCardListItem
          key={card.cardId}
          variant='amount'
          fontWeight='normal'
          {...card}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
