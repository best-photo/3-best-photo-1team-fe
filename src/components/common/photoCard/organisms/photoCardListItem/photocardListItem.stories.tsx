import { Meta, StoryFn } from '@storybook/react';
import PhotoCardListItem from './photoCardListItem';
import defaultPhoto from '@/public/images/sample-image-1.webp';
import { GENRES } from '@/src/constants/photoCardInformation';
import { PhotoCardListItemProps } from './photoCardListItem.types';
import { PhotoCardListItemCodeSnippet } from './codeExample';

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
  },
} satisfies Meta<typeof PhotoCardListItem>;

const Template: StoryFn<typeof PhotoCardListItem> = (args) => (
  <PhotoCardListItem {...args} />
);

export const ReceivedTradeCard = Template.bind({});

const ReceivedTradeCardProps = {
  cardName: '카드카드',
  grade: 'legendary',
  genre: 'stillLife',
  nickname: '최애',
  price: 5,
  image: defaultPhoto,
  variant: 'trade',
  description:
    '카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 ',
  onDecline: () => console.log(''),
  onConfirm: () => console.log(''),
} as PhotoCardListItemProps;

ReceivedTradeCard.args = ReceivedTradeCardProps;
ReceivedTradeCard.parameters = {
  codeExample: PhotoCardListItemCodeSnippet(ReceivedTradeCardProps),
};

export const SubmittedTradeCard = Template.bind({});

const SubmittedTradeCardProps = {
  cardName: '카드카드',
  grade: 'legendary',
  genre: 'stillLife',
  nickname: '최애',
  price: 5,
  image: defaultPhoto,
  variant: 'trade',
  description:
    '카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 ',
  onCancel: () => console.log(''),
} as PhotoCardListItemProps;

SubmittedTradeCard.args = SubmittedTradeCardProps;
SubmittedTradeCard.parameters = {
  codeExample: PhotoCardListItemCodeSnippet(SubmittedTradeCardProps),
};

SubmittedTradeCard.argTypes = {
  variant: {
    table: {
      disabled: true,
    },
  },
};

export const MyCardList = Template.bind({});

const MyCardListProps = {
  cardName: '우리집 앞마당',
  grade: 'legendary',
  genre: 'landscape',
  nickname: '최애',
  price: 5,
  image: defaultPhoto,
  variant: 'amount',
  totalAmount: 5,
  state: 'trading',
  soldAmount: 1,
} as PhotoCardListItemProps;

MyCardList.args = MyCardListProps;
MyCardList.parameters = {
  codeExample: PhotoCardListItemCodeSnippet(MyCardListProps),
};

export const MarketPlaceCard = Template.bind({});
const MarketPlaceCardProps = {
  cardName: '우리집 앞마당',
  grade: 'legendary',
  genre: 'landscape',
  nickname: '미쓰손',
  price: 4,
  image: defaultPhoto,
  variant: 'amount',
  totalAmount: 5,
  soldAmount: 5,
} as PhotoCardListItemProps;

MarketPlaceCard.args = MarketPlaceCardProps;
MarketPlaceCard.parameters = {
  codeExample: PhotoCardListItemCodeSnippet(MarketPlaceCardProps),
};
