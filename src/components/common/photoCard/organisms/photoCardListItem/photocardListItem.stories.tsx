import { Meta, StoryFn } from '@storybook/react';
import PhotoCardListItem from './photoCardListItem';
import defaultPhoto from '@/public/images/sample-image-1.webp';
import { CARD_GENRES } from '@/src/constants/photoCardInformation';
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
      options: Object.values(CARD_GENRES),
      description: '카드 종류',
      defaultValue: Object.values(CARD_GENRES)[0],
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

export const IncomingTradeCard = Template.bind({});

const IncomingTradeCardProps = {
  tradeId: 1,
  cardName: '카드카드',
  grade: 'legendary',
  genre: 'stillLife',
  nickname: '최애',
  price: 5,
  image: defaultPhoto,
  variant: 'trade',
  description:
    '카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 ',
  onDecline: (id) => alert(id),
  onConfirm: (id) => alert(id),
} as PhotoCardListItemProps;

IncomingTradeCard.args = IncomingTradeCardProps;
IncomingTradeCard.parameters = {
  codeExample: PhotoCardListItemCodeSnippet(IncomingTradeCardProps),
};

export const OutgoingTradeCard = Template.bind({});

const SubmittedTradeCardProps = {
  tradeId: 1,
  cardName: '카드카드',
  grade: 'legendary',
  genre: 'stillLife',
  nickname: '최애',
  price: 5,
  image: defaultPhoto,
  variant: 'trade',
  description:
    '카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 카드 설명서 ',
  onCancel: (id) => alert(id),
} as PhotoCardListItemProps;

OutgoingTradeCard.args = SubmittedTradeCardProps;
OutgoingTradeCard.parameters = {
  codeExample: PhotoCardListItemCodeSnippet(SubmittedTradeCardProps),
};

OutgoingTradeCard.argTypes = {
  variant: {
    table: {
      disabled: true,
    },
  },
};

export const MyCardList = Template.bind({});

const MyCardListProps: PhotoCardListItemProps = {
  cardId: 1,
  cardName: '우리집 앞마당',
  fontWeight: 'normal',
  grade: 'legendary',
  genre: 'landscape',
  nickname: '최애',
  price: 5,
  image: defaultPhoto,
  variant: 'amount',
  totalAmount: 5,
  state: 'trading',
  soldAmount: 1,
  onClick: (id) => alert(id),
};

MyCardList.args = MyCardListProps;
MyCardList.parameters = {
  codeExample: PhotoCardListItemCodeSnippet(MyCardListProps),
};

export const MarketPlaceCard = Template.bind({});
const MarketPlaceCardProps: PhotoCardListItemProps = {
  cardId: 1,
  cardName: '우리집 앞마당',
  fontWeight: 'normal',
  grade: 'legendary',
  genre: 'landscape',
  nickname: '미쓰손',
  price: 4,
  image: defaultPhoto,
  variant: 'amount',
  totalAmount: 5,
  soldAmount: 5,
  onClick: (id) => alert(id),
};

MarketPlaceCard.args = MarketPlaceCardProps;
MarketPlaceCard.parameters = {
  codeExample: PhotoCardListItemCodeSnippet(MarketPlaceCardProps),
};
