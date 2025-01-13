import { CARD_GENRES } from '@/src/constants/photoCardInformation';
import { Genres } from '../../types';

export default function Genre({ genre }: { genre: Genres }) {
  return <span>{CARD_GENRES[genre]}</span>;
}
