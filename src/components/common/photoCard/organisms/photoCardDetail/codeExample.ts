import { PhotoCardDetailProps } from './photoCardDetail.types';

export const PhotoCardDetailCodeSnippet = (props: PhotoCardDetailProps) => {
  let code = `
  # photoCardDetail.tsx
\`\`\`tsx
import PhotoCardDetail from '@/src/components/common/photoCard/organisms/photoCardDetail/photoCardDetail';

    <PhotoCardDetail
        variant="${props.variant}"
        cardName="${props.cardName}"
        description="${props.description}"
        image=${props.image}
        grade="${props.grade}"
        genre="${props.genre}"
        nickname="${props.nickname}"
        price="${props.price}"
  `;

  if (props.variant === 'myCard')
    code += `
        totalAmount=${props.totalAmount}
        soldAmount=${props.soldAmount}
        tradeGenre="${props.variant === 'myCard' && props.tradeGenre}"
        tradeGrade="${props.tradeGrade}"
        tradeDescription="${props.tradeDescription}"
        onEdit=${props.onEdit} // 편집 버튼 클릭 시 실행할 함수
        onDelete=${props.onDelete} // 삭제 버튼 클릭 시 실행할 함수
    />
\`\`\`
`;
  else
    code += `
        totalAmount=${props.totalAmount}
        soldAmount=${props.soldAmount}
        onPurchase=${props.onPurchase} // 구매버튼 클릭 시 실행할 함수
        maxAmount=${props.totalAmount - props.soldAmount} // totalAmount - soldAmount
    />
\`\`\`
`;
  return code;
};
