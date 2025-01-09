import { PhotoCardPageHeaderProps } from './photoCardPageHeader.types';

export const PhotoCardPageHeaderCodeSnippet = (
  props: PhotoCardPageHeaderProps,
) => {
  return `
    # PhotoCardPageHeader.tsx
\`\`\`tsx
import PhotoCardPageHeader from '@/src/components/common/photoCard/organisms/PhotoCardPageHeader/PhotoCardPageHeader';

<PhotoCardPageHeader
        variant="${props.variant}"
        nickname="${props.nickname}"
        common=${props.common}
        rare=${props.rare}
        superRare=${props.superRare}
        legendary=${props.legendary}
        />
\`\`\`
  `;
};
