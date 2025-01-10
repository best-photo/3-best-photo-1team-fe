import { CardSummaryGroupProps } from '../../molecules/cardSummaryGroup/cardSummaryGroup.types';
import { NicknameLabelProps } from '../../molecules/nicknameLabel/nicknameLabel.types';

export type PhotoCardPageHeaderProps = Omit<NicknameLabelProps, 'cardCount'> &
  CardSummaryGroupProps & { className?: string };
