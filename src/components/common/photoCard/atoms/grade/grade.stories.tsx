import { Meta, StoryFn } from '@storybook/react';
import Grade from './grade';
import { CARD_GRADES } from '@/src/constants/photoCardInformation';

export default {
  title: 'common/atoms/Grade',
  component: Grade,
  tags: ['autodocs'],
  argTypes: {
    grade: {
      control: 'select',
      options: Object.keys(CARD_GRADES),
      description: '등급을 선택해주세요.',
      defaultValue: 'legendary',
    },
  },
} satisfies Meta<typeof Grade>;

const Template: StoryFn<typeof Grade> = (args) => <Grade {...args} />;

export const Grades = Template.bind({});

Grades.args = {
  grade: 'legendary',
};
