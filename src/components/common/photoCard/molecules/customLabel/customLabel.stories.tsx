import { Meta, StoryFn } from '@storybook/react';
import CustomLabel from './customLabel';

export default {
  title: 'common/molecules/CustomLabel',
  component: CustomLabel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[440px]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CustomLabel>;

const Template: StoryFn<typeof CustomLabel> = (args) => (
  <CustomLabel {...args} />
);

export const Label = Template.bind({});

Label.args = {
  title: '가격',
  children: <span>4P</span>,
  titleWeight: 'normal',
  contentWeight: 'normal',
  size: 'big',
};
