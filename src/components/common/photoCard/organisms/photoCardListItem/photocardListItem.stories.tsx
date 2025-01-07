import { Meta, StoryFn } from '@storybook/react';
import PhotoCardListItem from './photoCardListItem';
import defaultPhoto from '@/public/images/sample-image-1.webp';
import { GENRES } from '@/src/constants/photoCardInformation';

export default {
  title: 'common/organisms/PhotoCard',
  component: PhotoCardListItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[1000px]'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    cardName: {
      control: 'text',
    },
    grade: {
      control: 'select',
      options: ['LEGENDARY', 'RARE', 'SUPER RARE', 'COMMON'],
      description: '카드 등급',
      defaultValue: 'LEGENDARY',
    },
    genre: {
      control: 'select',
      options: Object.values(GENRES),
      description: '카드 종류',
      defaultValue: Object.values(GENRES)[0],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: '카드 타입',
      defaultValue: 'primary',
    },
    totalAmount: {
      control: {
        type: 'number',
      },
    },
    textSize: {
      control: 'select',
      options: ['small', 'big'],
      description: '텍스트 사이즈',
      defaultValue: 'small',
    },
  },
} satisfies Meta<typeof PhotoCardListItem>;

const Template: StoryFn<typeof PhotoCardListItem> = (args) => (
  <PhotoCardListItem {...args} />
);

export const ReceivedTradeCard = Template.bind({});

ReceivedTradeCard.args = {
  cardName: '카드카드',
  grade: 'legendary',
  genre: 'stillLife',
  nickname: '최애',
  price: 5,
  image: defaultPhoto,
  variant: 'trade',
  textSize: 'small',
  description:
    '카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 ',
  onDecline: () => console.log(''),
  onConfirm: () => console.log(''),
};

export const SubmittedTradeCard = Template.bind({});

SubmittedTradeCard.args = {
  cardName: '카드카드',
  grade: 'legendary',
  genre: 'stillLife',
  nickname: '최애',
  price: 5,
  image: defaultPhoto,
  variant: 'trade',
  textSize: 'small',
  description:
    '카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 ',
  onCancel: () => console.log(''),
};

SubmittedTradeCard.argTypes = {
  variant: {
    table: {
      disabled: true,
    },
  },
};

export const MyCardList = Template.bind({});

MyCardList.args = {
  cardName: '우리집 앞마당',
  grade: 'legendary',
  genre: 'landscape',
  nickname: '최애',
  price: 5,
  image: defaultPhoto,
  variant: 'amount',
  totalAmount: 5,
  textSize: 'small',
  state: 'trading',
  soldAmount: 1,
};

export const MarketPlaceCard = Template.bind({});

MarketPlaceCard.args = {
  cardName: '우리집 앞마당',
  grade: 'legendary',
  genre: 'landscape',
  nickname: '미쓰손',
  price: 4,
  image: defaultPhoto,
  variant: 'amount',
  totalAmount: 5,
  soldAmount: 5,
  textSize: 'small',
};
