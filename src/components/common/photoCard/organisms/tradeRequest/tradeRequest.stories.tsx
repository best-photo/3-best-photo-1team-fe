import { Meta, StoryFn } from '@storybook/react';
import TradeRequest from './tradeRequest';
import { TradeRequestProps } from './tradeRequest.types';

export default {
  title: 'common/organisms/TradeRequest',
  component: TradeRequest,
  tags: ['autodocs'],
} satisfies Meta<typeof TradeRequest>;

const Template: StoryFn<typeof TradeRequest> = (args) => (
  <TradeRequest {...args} />
);

export const Trade = Template.bind({});

const TradeProps = {
  tradeGrade: 'legendary',
  tradeGenre: 'landscape',
  tradeDescription: '풍경 사진으로 교환하고 싶어요.',
  handleTrade: () => alert('교환 버튼을 클릭했습니다.'),
} as TradeRequestProps;

Trade.args = TradeProps;
