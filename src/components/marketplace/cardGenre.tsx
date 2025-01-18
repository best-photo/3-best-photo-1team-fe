import Genre from '../common/photoCard/atoms/genre/genre';
import { AmountListItem } from '../common/photoCard/organisms/photoCardListItem/photoCardListItem.types';

export default function PhotoCardDetail({
  cardData,
}: {
  cardData: AmountListItem;
}) {
  return (
    <div>
      {/* 다른 UI 요소 */}
      <div>
        <Genre genre={cardData.genre} />
      </div>
    </div>
  );
}
