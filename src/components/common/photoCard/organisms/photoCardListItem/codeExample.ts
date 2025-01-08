import { PhotoCardListItemProps } from './photoCardListItem.types';

export const PhotoCardListItemCodeSnippet = (props: PhotoCardListItemProps) => {
  let code = `
# PhotoCardListItem.tsx
\`\`\`tsx
import PhotoCardListItem from '@/src/components/common/photoCard/organisms/photoCardListItem/photoCardListItem';

    <PhotoCardDetail
        variant="${props.variant}"
        cardName="${props.cardName}"
        image=${props.image}
        grade="${props.grade}"
        genre="${props.genre}"
        nickname="${props.nickname}"
        price="${props.price}"
        `;

  if (props.variant === 'amount') {
    code += `totalAmount=${props.totalAmount}
        soldAmount=${props.soldAmount}
        state="${props.state}"
    />
\`\`\`
`;
  } else
    code += `
        description="${props.description}"
        ${(props.onCancel && `onCancel=${props.onCancel} // 취소 버튼을 눌렀을 때 실행할 함수`) ?? ''}
        ${(props.onDecline && `onDecline=${props.onDecline} // 거절 버튼을 눌렀을 때 실행할 함수`) ?? ''}
        ${(props.onConfirm && `onConfirm=${props.onConfirm} // 승인 버튼을 눌렀을 때 실행할 함수`) ?? ''}
    />
\`\`\`    
  `;
  return code;
};
