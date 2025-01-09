import CardSummaryGroup from '../../molecules/cardSummaryGroup/cardSummaryGroup';
import NicknameLabel from '../../molecules/nicknameLabel/nicknameLabel';
import { PhotoCardPageHeaderProps } from './photoCardPageHeader.types';

export default function PhotoCardPageHeader({
  variant,
  nickname,
  common,
  rare,
  superRare,
  legendary,
}: PhotoCardPageHeaderProps) {
  return (
    <div className='flex flex-col gap-[10px] md:gap-[10px] lg:gap-5'>
      <NicknameLabel
        variant={variant}
        nickname={nickname}
        cardCount={common + rare + superRare + legendary}
      />
      <CardSummaryGroup
        common={common}
        rare={rare}
        superRare={superRare}
        legendary={legendary}
      />
    </div>
  );
}
