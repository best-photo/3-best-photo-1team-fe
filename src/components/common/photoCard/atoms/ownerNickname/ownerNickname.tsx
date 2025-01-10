import { OwnerNicknameProps } from './ownerNickname.types';

export default function OwnerNickname({
  variant,
  nickname,
}: OwnerNicknameProps) {
  return (
    <span className='text-[14px] md:text-[20px] lg:text-[24px]'>
      {nickname}
      {variant === 'sale' ? '님이 판매 중인 포토카드' : '님이 보유한 포토카드'}
    </span>
  );
}
