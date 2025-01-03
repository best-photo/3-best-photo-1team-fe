import type { Meta, StoryObj } from '@storybook/react';
import { CommonBtn } from './CommonBtn';

// 메타데이터 설정
const meta: Meta<typeof CommonBtn> = {
  title: 'common/CommonBtn',
  component: CommonBtn,
  tags: ['autodocs'],
  // 버튼을 보여주는 영역 스타일 설정
  decorators: [
    (Story) => (
      <div className='p-4'>
        <Story />
      </div>
    ),
  ],
  // 공통 argTypes 설정
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: '버튼의 색상 변형',
    },
    width: {
      control: 'radio',
      options: ['full', 'half', 'custom'],
      description: '버튼의 너비',
    },
    heightPreset: {
      control: 'radio',
      options: [1, 2, 3],
      description: '버튼의 높이 프리셋',
    },
    isDisabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    children: {
      control: 'text',
      description: '버튼 내부 텍스트',
    },
  },
};

export default meta;

// 스토리 타입 정의
type Story = StoryObj<typeof CommonBtn>;

// 로그인
export const Login: Story = {
  args: {
    children: '로그인',
    variant: 'primary',
    width: 'full',
    heightPreset: 2,
  },
};

// 포토카드 그매하기
export const BuyPhotoCard: Story = {
  args: {
    children: '포토카드 구매하기',
    variant: 'primary',
    width: 'full',
    heightPreset: 3,
  },
};

// 포토카드 판매하기
export const SellPhotoCard: Story = {
  args: {
    children: '포토카드 판매하기',
    variant: 'secondary',
    width: 'full',
    heightPreset: 2,
  },
};

// 포토카트 판매하기 (버튼 비활성)
export const SellPhotoCardDisabled: Story = {
  args: {
    children: '포토카드 판매하기',
    variant: 'secondary',
    width: 'full',
    heightPreset: 2,
    isDisabled: true,
  },
};

// 승인하기
export const Approve: Story = {
  args: {
    children: '승인하기',
    variant: 'primary',
    width: 'half',
    heightPreset: 1,
  },
};

// 거절하기
export const Reject: Story = {
  args: {
    children: '거절하기',
    variant: 'secondary',
    width: 'half',
    heightPreset: 1,
  },
};

// 판매 내리기
export const CancelSell: Story = {
  args: {
    children: '판매 내리기',
    variant: 'secondary',
    width: 'full',
    heightPreset: 3,
  },
};

// 프라이머리 버튼
export const Primary: Story = {
  args: {
    children: '프라이머리 버튼',
    variant: 'primary',
    width: 'full',
    heightPreset: 1,
  },
};

// 세컨더리 버튼
export const Secondary: Story = {
  args: {
    children: '세컨더리 버튼',
    variant: 'secondary',
    width: 'full',
    heightPreset: 1,
  },
};

// 반너비 버튼
export const HalfWidth: Story = {
  args: {
    children: '반너비 버튼',
    variant: 'primary',
    width: 'half',
    heightPreset: 1,
  },
};

// 높이 프리셋 2 버튼
export const HeightPreset2: Story = {
  args: {
    children: '높이 프리셋 2',
    variant: 'primary',
    width: 'full',
    heightPreset: 2,
  },
};

// 비활성화된 버튼
export const Disabled: Story = {
  args: {
    children: '비활성화 버튼',
    variant: 'primary',
    width: 'full',
    heightPreset: 1,
    isDisabled: true,
  },
};

// 여러 버튼 함께 보기
export const ButtonGroup: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <CommonBtn
        variant='primary'
        width='full'
        heightPreset={1}
      >
        프라이머리 버튼
      </CommonBtn>
      <CommonBtn
        variant='secondary'
        width='full'
        heightPreset={1}
      >
        세컨더리 버튼
      </CommonBtn>
      <div className='flex gap-4'>
        <CommonBtn
          variant='primary'
          width='half'
          heightPreset={1}
        >
          반너비 버튼
        </CommonBtn>
        <CommonBtn
          variant='secondary'
          width='half'
          heightPreset={1}
        >
          반너비 버튼
        </CommonBtn>
      </div>
    </div>
  ),
};
