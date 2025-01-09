import { Meta, StoryFn } from '@storybook/react';
import AmountControl from './amountControl';

export default {
  title: 'common/atoms/AmountControl',
  component: AmountControl,
  tags: ['autodocs'],
} satisfies Meta<typeof AmountControl>;

const Template: StoryFn<typeof AmountControl> = (args) => (
  <AmountControl {...args} />
);

export const Amount = Template.bind({});

Amount.args = {
  amount: 1,
};
