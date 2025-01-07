import { GENRES } from '@/src/constants/photoCardInformation';
import { Genres } from '../../types';

export default function Genre({ genre }: { genre: Genres }) {
  return <span>{GENRES[genre]}</span>;
}
