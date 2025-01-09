import Title from '../../../title/title';
import PhotoCardListItem from '../photoCardListItem/photoCardListItem';
import { PhotoCardListItemProps } from '../photoCardListItem/photoCardListItem.types';
import { TradeListProps } from './tradeList.types';

export default function TradeList(props: TradeListProps) {
  return (
    <div>
      <Title
        variant='tertiary'
        font='noto'
      >
        {props.variant === 'incoming'
          ? '교환 제시 목록'
          : '내가 제시한 교환 목록'}
      </Title>
      <div className='flex items-start gap-[5px] md:gap-4 lg:gap-[80px]'>
        {props.trades.map((trade) => {
          const cardProps = {
            variant: 'trade',
            tradeId: trade.id,
            cardName: trade.cardName,
            grade: trade.grade,
            genre: trade.genre,
            nickname: trade.nickname,
            price: trade.price,
            image: trade.image,
            description: trade.description,
          };
          let finalProps = {} as PhotoCardListItemProps;
          if (props.variant === 'incoming') {
            finalProps = {
              ...cardProps,
              onDecline: props.onDecline,
              onConfirm: props.onConfirm,
            } as PhotoCardListItemProps;
          }

          if (props.variant === 'outgoing') {
            finalProps = {
              ...cardProps,
              onCancel: props.onCancel,
            } as PhotoCardListItemProps;
          }

          return (
            <PhotoCardListItem
              key={trade.id}
              {...finalProps}
            />
          );
        })}
      </div>
    </div>
  );
}
