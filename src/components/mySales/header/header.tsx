'use client';

import Title from '../../common/title/title';
import PhotoCardPageHeader from '../../common/photoCard/organisms/photoCardPageHeader/photoCardPageHeader';
import { HeaderProps } from './header.types';
import HorizontalDivider from '../../common/photoCard/atoms/divider/horizontalDivider';

export default function Header({ nickname, cards }: HeaderProps) {
  return (
    <>
      <Title
        variant='primary'
        font='baskin'
        className='hidden md:block'
      >
        나의 판매 포토카드
      </Title>
      <PhotoCardPageHeader
        variant='sale'
        nickname={nickname}
        className='mb-[15px] md:mb-10 lg:mb-10'
        {...cards}
      />
      <HorizontalDivider className='my-0 mb-[15px] md:mb-[20px] lg:mb-[20px]' />
    </>
  );
}
