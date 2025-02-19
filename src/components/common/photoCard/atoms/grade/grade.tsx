import cn from '@/src/utils/cn';
import { Grades } from '../../types';
import { CARD_GRADES } from '@/src/constants/photoCardInformation';

const TEXT_COLOR = {
  common: 'text-main',
  legendary: 'text-pink',
  rare: 'text-blue',
  superRare: 'text-purple',
};

export default function Grade({ grade }: { grade: Grades }) {
  return <span className={cn(TEXT_COLOR[grade])}>{CARD_GRADES[grade]}</span>;
}
