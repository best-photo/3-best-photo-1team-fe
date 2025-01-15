import { Meta, StoryFn } from '@storybook/react';
import FilterModal from './filterModal';

export default {
  title: 'common/organisms/FilterModal',
  component: FilterModal,
  tags: ['autodocs'],
} satisfies Meta<typeof FilterModal>;

const Template: StoryFn<typeof FilterModal> = () => <FilterModal />;

export const Example = Template.bind({});
