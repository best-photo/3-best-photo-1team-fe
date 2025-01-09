import { Meta, StoryFn } from '@storybook/react';
import LabelContent from './labelContent';

export default {
  title: 'common/atoms/labelContent',
  component: LabelContent,
  tags: ['autodocs'],
} satisfies Meta<typeof LabelContent>;

const Template: StoryFn<typeof LabelContent> = (args) => (
  <LabelContent {...args} />
);

export const Label = Template.bind({});

Label.args = {
  textSize: 'small',
  weight: 'normal',
  children: '1개',
};
