import { Meta, StoryFn } from '@storybook/react';
import VerticalDivider from './verticalDivider';

export default {
  title: 'common/atoms/VerticalDivider',
  component: VerticalDivider,
  tags: ['autodocs'],
} satisfies Meta<typeof VerticalDivider>;

const Template: StoryFn<typeof VerticalDivider> = (args) => (
  <VerticalDivider {...args} />
);

export const Horizontal = Template.bind({});
