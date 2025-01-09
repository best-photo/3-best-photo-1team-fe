import { Meta, StoryFn } from '@storybook/react';
import PurchasePointLabel from './purchasePointLabel';

export default {
  title: 'common/atoms/PurchasePointLabel',
  component: PurchasePointLabel,
  tags: ['autodocs'],
} satisfies Meta<typeof PurchasePointLabel>;

const Template: StoryFn<typeof PurchasePointLabel> = (args) => (
  <PurchasePointLabel {...args} />
);

export const Example = Template.bind({});

Example.args = {
  point: 5,
};
