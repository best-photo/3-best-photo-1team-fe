import { Meta, StoryFn } from '@storybook/react';
import Description from './description';

export default {
  title: 'common/atoms/Description',
  component: Description,
  tags: ['autodocs'],
} satisfies Meta<typeof Description>;

const Template: StoryFn<typeof Description> = (args) => (
  <Description {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  variant: 'primary',
  children: 'primary description',
};

export const Secondary = Template.bind({});

Secondary.args = {
  variant: 'secondary',
  children: 'secondary description',
};

export const Tertiary = Template.bind({});

Tertiary.args = {
  variant: 'tertiary',
  children: 'tertiary description',
};
