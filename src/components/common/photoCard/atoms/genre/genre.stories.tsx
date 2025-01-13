import { Meta, StoryFn } from '@storybook/react';
import Genre from './genre';
import { CARD_GENRES } from '@/src/constants/photoCardInformation';

export default {
  title: 'common/atoms/genre',
  component: Genre,
  tags: ['autodocs'],
  argTypes: {
    genre: {
      control: 'select',
      options: Object.keys(CARD_GENRES),
    },
  },
} satisfies Meta<typeof Genre>;

const Template: StoryFn<typeof Genre> = (args) => <Genre {...args} />;

export const Genres = Template.bind({});

Genres.args = {
  genre: 'landscape',
};
