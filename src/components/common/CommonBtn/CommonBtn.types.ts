import { ComponentPropsWithoutRef } from 'react';

type CommonBtnVariant = 'primary' | 'secondary';
type CommonBtnWidth = 'full' | 'half' | 'custom';

// 세 가지 프리셋 케이스 (1, 2, 3)
type CommonBtnHeightPreset = 1 | 2 | 3;

// 각 프리셋에 따른 높이 값 정의
export const heightPresetMap = {
  1: { sm: 40, md: 50, lg: 60 }, // half 승인 거절하기 용
  2: { sm: 55, md: 55, lg: 60 }, // 로그인, 회원가입, 마켓 플레이스 나의 포토카드 판매, 구매하기 버튼용, 로그인 필요 모달 버튼용, half 모달창 버튼용
  3: { sm: 75, md: 75, lg: 80 }, // 구매하기 버튼용
};

export interface CommonBtnProps extends ComponentPropsWithoutRef<'button'> {
  variant: CommonBtnVariant;
  width: CommonBtnWidth;
  heightPreset: CommonBtnHeightPreset;
  isDisabled?: boolean;
  onClick?: () => void;
}
