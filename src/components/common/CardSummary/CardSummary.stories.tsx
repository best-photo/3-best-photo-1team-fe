import { Meta, StoryObj } from '@storybook/react';
import CardSummary from './CardSummary';

const meta: Meta<typeof CardSummary> = {
  title: 'common/CardSummary',
  component: CardSummary,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='p-4'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['common', 'rare', 'superRare', 'legendary'],
      description: '카드 등급 선택',
    },
    totalCards: {
      control: 'number',
      description: '카드 수량',
    },
  },
};

export default meta;

// 스토리 타입 정의
type Story = StoryObj<typeof CardSummary>;

// 일반
export const Common: Story = {
  args: {
    variant: 'common',
    totalCards: 10,
  },
};

// 희귀
export const Rare: Story = {
  args: {
    variant: 'rare',
    totalCards: 5,
  },
};

// 슈퍼 레어
export const SuperRare: Story = {
  args: {
    variant: 'superRare',
    totalCards: 3,
  },
};

// 레전더리
export const Legendary: Story = {
  args: {
    variant: 'legendary',
    totalCards: 1,
  },
};
