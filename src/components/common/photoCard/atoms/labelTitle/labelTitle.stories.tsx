import { Meta, StoryFn } from '@storybook/react';
import LabelTitle from './labelTitle';

export default {
  title: 'common/atoms/labelTitle',
  component: LabelTitle,
  tags: ['autodocs'],
} satisfies Meta<typeof LabelTitle>;

const Template: StoryFn<typeof LabelTitle> = (args) => <LabelTitle {...args} />;

export const Label = Template.bind({});

Label.args = {
  textSize: 'small',
  weight: 'normal',
  title: '수량',
};
