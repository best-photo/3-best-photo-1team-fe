import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Genres, Grades } from '../../common/photoCard/types';
import PhotoCardListItem from '../../common/photoCard/organisms/photoCardListItem/photoCardListItem';
import { CardState } from '../../common/photoCard/atoms/stateBadge/stateBadge.types';

export interface Card {
  id: string;
  targetId: string;
  price: number;
  image: string | StaticImport;
  name: string;
  state: CardState;
  grade: Grades;
  genre: Genres;
  nickname: string;
}

export default function CardContainer({
  cards,
  onClick,
}: {
  cards: Card[];
  onClick: (id: string) => void;
}) {
  return (
    <div className='w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[5px] md:gap-5 lg:gap-20 pb-[140px]'>
      {cards?.map((card) => (
        <PhotoCardListItem
          key={card.id + card.targetId}
          variant='amount'
          fontWeight='normal'
          cardId={card.id}
          nickname={card.nickname}
          price={card.price}
          image={card.image}
          cardName={card.name}
          state={card.state}
          // 임시방편
          grade={
            card.grade
              .toLowerCase()
              .replace('super_rare', 'superRare') as Grades
          }
          genre={card.genre.toLowerCase() as Genres}
          totalAmount={1}
          onClick={() => onClick(card.targetId)}
        />
      ))}
    </div>
  );
}
