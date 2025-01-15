import { SearchSectionProps } from './searchSection.types';

export const searchSectionCodeSnippet = (props: SearchSectionProps) => {
  return `
  # SearchSection.tsx
\`\`\`tsx
// 이 컴포넌트에는 모바일 사이즈일 때 표시될 모달 컴포넌트가 포함되어 있습니다.
// 스토리북에서 viewport 옵션을 선택해서 확인할 수 있습니다.
import SearchSection from '@/src/components/common/searchSection/searchSection';

    <SearchSection
        variant="${props.variant}"
        onSubmitFilter={onSubmitFilter} // 전달되는 query string을 처리할 함수를 입력해주세요.
    />
\`\`\`
  `;
};
