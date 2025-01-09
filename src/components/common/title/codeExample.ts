import { TitleProps } from './title.types';

export const titleCodeSnippet = (props: TitleProps) => {
  let code = `
  # Title.tsx
\`\`\`tsx
import Title from '@/src/components/common/title/title';

    <Title
        variant="${props.variant}"
        font="${props.font}"
  `;

  if (props.onButtonClick !== undefined && props.buttonText !== undefined)
    code += `      onButtonClick=${props.onButtonClick}
        buttonText=${props.buttonText}
    `;
  if (props.className !== undefined)
    code += `
      className="${props.className}"
  `;

  code += `>타이틀에 들어갈 요소를 입력해주세요</Title>
  \`\`\`
    `;
  return code;
};
