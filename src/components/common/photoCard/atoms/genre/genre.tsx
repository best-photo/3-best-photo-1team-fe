import { Genres } from '../../types';

export default function Genre({ genre }: { genre: Genres }) {
  return <span>{genre}</span>;
}
