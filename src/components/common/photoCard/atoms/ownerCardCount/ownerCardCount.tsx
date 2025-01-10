import { OwnerCardCountProps } from './ownerCardCount.types';

export default function OwnerCardCount({ cardCount }: OwnerCardCountProps) {
  return <span className='text-gray-300'>({cardCount}장)</span>;
}
