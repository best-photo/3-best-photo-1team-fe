import { Meta, StoryFn } from '@storybook/react';
import CardInformationHeader from './cardInformationHeader';
import { GENRES, GRADES } from '@/src/constants/photoCardInformation';

export default {
  title: 'common/molecules/CardInformationHeader',
  component: CardInformationHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div className='w-[500px]'>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    grade: {
      control: 'select',
      options: Object.keys(GRADES),
    },
    genre: {
      control: 'select',
      options: Object.keys(GENRES),
    },
  },
} satisfies Meta<typeof CardInformationHeader>;

const Template: StoryFn<typeof CardInformationHeader> = (args) => (
  <CardInformationHeader {...args} />
);

export const Legendary = Template.bind({});

Legendary.args = {
  textSize: 'small',
  fontWeight: 'normal',
  grade: 'legendary',
  genre: 'travel',
  price: 5,
  nickname: '유디',
};
