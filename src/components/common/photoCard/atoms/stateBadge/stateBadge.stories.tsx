import { Meta, StoryFn } from '@storybook/react';
import StateBadge from './stateBadge';

export default {
  title: 'common/atoms/StateBadge',
  component: StateBadge,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[155px] h-[50px] p-2 bg-white relative flex items-center justify-center'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StateBadge>;

const Template: StoryFn<typeof StateBadge> = (args) => <StateBadge {...args} />;

export const Selling = Template.bind({});

Selling.args = {
  state: 'sale',
};
