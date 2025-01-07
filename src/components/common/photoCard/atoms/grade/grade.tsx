import cn from '@/src/utils/cn';
import { Grades } from '../../types';

const TEXT_COLOR = {
  COMMON: 'text-main',
  LEGENDARY: 'text-pink',
  RARE: 'text-blue',
  'SUPER RARE': 'text-purple',
};

export default function Grade({ grade }: { grade: Grades }) {
  return <span className={cn(TEXT_COLOR[grade])}>{grade}</span>;
}
