import { Meta, StoryFn } from '@storybook/react';
import HorizontalDivider from './horizontalDivider';

export default {
  title: 'common/atoms/HorizontalDivider',
  component: HorizontalDivider,
  tags: ['autodocs'],
} satisfies Meta<typeof HorizontalDivider>;

const Template: StoryFn<typeof HorizontalDivider> = (args) => (
  <HorizontalDivider {...args} />
);

export const Horizontal = Template.bind({});
