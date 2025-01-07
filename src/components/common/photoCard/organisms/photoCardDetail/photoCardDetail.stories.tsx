import { Meta, StoryFn } from '@storybook/react';
import PhotoCardDetail from './photoCardDetail';
import ExampleImage from '@/public/images/sample-image-1.webp';

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

OthersPhotoCardDetail.args = {
  image: ExampleImage,
  cardName: '우리집 앞마당',
  grade: 'legendary',
  genre: 'landscape',
  nickname: '미쓰손',
  description:
    '우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 ',
  price: 4,
  totalAmount: 5,
  soldAmount: 2,
  variant: 'othersCard',
};

export const MyPhotoCardDetail = Template.bind({});

MyPhotoCardDetail.args = {
  image: ExampleImage,
  cardName: '우리집 앞마당',
  grade: 'legendary',
  genre: 'landscape',
  nickname: '미쓰손',
  description:
    '우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 멋지죠? 우리집 앞마당 사진이에요 ',
  price: 4,
  totalAmount: 5,
  soldAmount: 2,
  variant: 'myCard',
  tradeGrade: 'legendary',
  tradeGenre: 'travel',
  tradeDescription: '여행 사진이 갖고 싶어요.',
};
