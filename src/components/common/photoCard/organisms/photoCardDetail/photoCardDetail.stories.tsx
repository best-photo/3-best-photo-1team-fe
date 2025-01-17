import { Meta, StoryFn } from '@storybook/react';
import PhotoCardDetail from './photoCardDetail';
import ExampleImage from '@/public/images/sample-image-1.webp';
import { PhotoCardDetailProps } from './photoCardDetail.types';
import { PhotoCardDetailCodeSnippet } from './codeExample';

export default {
  title: 'common/organisms/PhotoCardDetail',
  component: PhotoCardDetail,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[345px] md:w-[704px] lg:w-[1480px]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PhotoCardDetail>;

const Template: StoryFn<typeof PhotoCardDetail> = (args) => (
  <PhotoCardDetail {...args} />
);

export const OthersPhotoCardDetail = Template.bind({});

const OthersPhotoCardDetailProps = {
  image: ExampleImage,
  cardName: '우리집 앞마당',
  grade: 'legendary',
  genre: 'landscape',
  nickname: '미쓰손',
  description:
    '우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 ',
  price: 4,
  totalAmount: 5,
  remainingAmount: 2,
  variant: 'othersCard',
} as PhotoCardDetailProps;

OthersPhotoCardDetail.args = {
  ...OthersPhotoCardDetailProps,
};
OthersPhotoCardDetail.parameters = {
  codeExample: PhotoCardDetailCodeSnippet(OthersPhotoCardDetailProps),
};

export const MyPhotoCardDetail = Template.bind({});

const MyPhotoCardDetailProps = {
  image: ExampleImage,
  cardName: '우리집 앞마당',
  grade: 'legendary',
  genre: 'landscape',
  nickname: '미쓰손',
  description:
    '우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 ',
  price: 4,
  totalAmount: 5,
  remainingAmount: 2,
  variant: 'mySellingCard',
  onDelete: () => console.log(''),
  onEdit: () => console.log(''),
  tradeGrade: 'legendary',
  tradeGenre: 'travel',
  tradeDescription: '여행 사진이 갖고 싶어요.',
} as PhotoCardDetailProps;

MyPhotoCardDetail.args = MyPhotoCardDetailProps;
MyPhotoCardDetail.parameters = {
  codeExample: PhotoCardDetailCodeSnippet(MyPhotoCardDetailProps),
};

export const MyHoldingPhotoCardDetail = Template.bind({});

const MyHoldingPhotoCardDetailProps = {
  image: ExampleImage,
  cardName: '우리집 앞마당',
  grade: 'legendary',
  genre: 'landscape',
  nickname: '미쓰손',
  description:
    '우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 ',
  price: 4,
  totalAmount: 5,
  remainingAmount: 2,
  variant: 'myHoldingCard',
  onSale: () => alert('판매버튼 클릭'),
} as PhotoCardDetailProps;

MyHoldingPhotoCardDetail.args = MyHoldingPhotoCardDetailProps;
MyHoldingPhotoCardDetail.parameters = {
  codeExample: PhotoCardDetailCodeSnippet(MyHoldingPhotoCardDetailProps),
};
