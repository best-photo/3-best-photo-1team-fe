import { Meta, StoryFn } from '@storybook/react';
import TradeList from './tradeList';
import DefaultImage from '@/public/images/sample-image-1.webp';
import { Trade } from './tradeList.types';

export default {
  title: 'common/organisms/tradeList',
  component: TradeList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-screen'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TradeList>;

const Template: StoryFn<typeof TradeList> = (args) => <TradeList {...args} />;

export const TradeListExample = Template.bind({});

const mockTradeData = [
  {
    id: 1,
    image: DefaultImage,
    cardName: '카드이름',
    price: 5,
    nickname: '코드잇',
    grade: 'legendary',
    genre: 'landscape',
    description: '풍경 사진을 원해요',
  },
  {
    id: 2,
    image: DefaultImage,
    cardName: '카드이름',
    price: 5,
    nickname: '코드잇',
    grade: 'legendary',
    genre: 'landscape',
    description: '풍경 사진을 원해요',
  },
  {
    id: 3,
    image: DefaultImage,
    cardName: '카드이름',
    price: 5,
    nickname: '코드잇',
    grade: 'legendary',
    genre: 'landscape',
    description: '풍경 사진을 원해요',
  },
  {
    id: 4,
    image: DefaultImage,
    cardName: '카드이름',
    price: 5,
    nickname: '코드잇',
    grade: 'legendary',
    genre: 'landscape',
    description: '풍경 사진을 원해요',
  },
  {
    id: 5,
    image: DefaultImage,
    cardName: '카드이름',
    price: 5,
    nickname: '코드잇',
    grade: 'legendary',
    genre: 'landscape',
    description: '풍경 사진을 원해요',
  },
  {
    id: 6,
    image: DefaultImage,
    cardName: '카드이름',
    price: 5,
    nickname: '코드잇',
    grade: 'legendary',
    genre: 'landscape',
    description: '풍경 사진을 원해요',
  },
] as Trade[];

TradeListExample.args = {
  variant: 'outgoing',
  onCancel: (id: number) => alert(id),
  trades: mockTradeData,
};

export const incomingTradeList = Template.bind({});
incomingTradeList.args = {
  variant: 'incoming',
  onConfirm: (id: number) => alert(id),
  onDecline: (id: number) => alert(id),
  trades: mockTradeData,
};
