import Grade from '../common/photoCard/atoms/grade/grade';
import { AmountListItem } from '../common/photoCard/organisms/photoCardListItem/photoCardListItem.types';

export default function PhotoCardDetail({
  cardData,
}: {
  cardData: AmountListItem;
}) {
  return (
    <div>
      <div>
        <Grade grade={cardData.grade} />
      </div>
    </div>
  );
}
