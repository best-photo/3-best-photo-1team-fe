// 1. 기본 사용법
export const basicUsage = `
// 기본 버튼 (가장 기본적인 사용)
<CommonBtn 
  variant="primary" 
  width="full" 
  heightPreset={2}
>
  기본 버튼
</CommonBtn>
`;

// 2. 자주 사용되는 케이스
export const commonUseCases = `
// 로그인 버튼
<CommonBtn 
  variant="primary"
  width="full"
  heightPreset={2}
>
  로그인
</CommonBtn>

// 구매하기 버튼
<CommonBtn 
  variant="primary"
  width="full"
  heightPreset={3}
>
  구매하기
</CommonBtn>

// 승인/거절 버튼 그룹
<div className="flex gap-4">
  <CommonBtn 
    variant="primary"
    width="half"
    heightPreset={1}
  >
    승인하기
  </CommonBtn>
  <CommonBtn 
    variant="secondary"
    width="half"
    heightPreset={1}
  >
    거절하기
  </CommonBtn>
</div>
`;

// 3. 특별한 상황
export const specialCases = `
// 커스텀 너비 사용
<CommonBtn 
  variant="primary"
  width="custom"
  heightPreset={1}
  className="w-[200px]"
>
  커스텀 너비 버튼
</CommonBtn>

// 비활성화된 버튼
<CommonBtn 
  variant="primary"
  width="full"
  heightPreset={1}
  isDisabled={true}
>
  비활성화 버튼
</CommonBtn>
`;

// 4. 주의사항
export const notes = `
/*
주의사항:
1. width가 'custom'일 때는 반드시 className으로 너비를 지정해야 합니다.
2. heightPreset은 1, 2, 3만 사용 가능합니다.
3. 버튼 내부에 복잡한 컨텐츠를 넣을 경우, children으로 전달하세요.
*/
`;
