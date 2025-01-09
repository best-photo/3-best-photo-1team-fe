import OwnerCardCount from '../../atoms/ownerCardCount/ownerCardCount';
import OwnerNickname from '../../atoms/ownerNickname/ownerNickname';
import { NicknameLabelProps } from './nicknameLabel.types';

export default function NicknameLabel({
  variant,
  nickname,
  cardCount,
}: NicknameLabelProps) {
  return (
    <div className='flex items-center gap-[5px] md:gap-[5px] lg:gap-[10px]'>
      <OwnerNickname
        variant={variant}
        nickname={nickname}
      />
      <OwnerCardCount cardCount={cardCount} />
    </div>
  );
}
