import { Meta, StoryFn } from '@storybook/react';
import Title from './title';
import { TitleProps } from './title.types';
import exchangeIcon from '@/public/icons/exchange.svg';
import Image from 'next/image';
import { titleCodeSnippet } from './codeExample';

export default {
  title: 'common/molecules/Title',
  component: Title,
  tags: ['autodoc'],
} satisfies Meta<typeof Title>;

const Template: StoryFn<typeof Title> = (args) => <Title {...args} />;

export const Primary = Template.bind({});

const PrimaryProps = {
  variant: 'primary',
  font: 'baskin',
  children: '마켓플레이스',
  buttonText: '나의 포토카드 판매하기',
  onButtonClick: () => alert('나의 포토카드 판매하기'),
} as TitleProps;

Primary.args = PrimaryProps;
Primary.parameters = {
  codeExample: titleCodeSnippet(PrimaryProps),
};

export const Secondary = Template.bind({});

const SecondaryProps = {
  variant: 'secondary',
  font: 'noto',
  children: '우리집 앞마당',
} as TitleProps;

Secondary.args = SecondaryProps;
Secondary.parameters = {
  codeExample: titleCodeSnippet(SecondaryProps),
};

export const Tertiary = Template.bind({});

const TertiaryProps = {
  variant: 'tertiary',
  font: 'noto',
  children: (
    <div className='flex items-center gap-[11px]'>
      <Image
        src={exchangeIcon}
        alt='교환 아이콘'
        width={20}
        height={20}
        className='w-5 md:w-5 lg:w-6'
      />
      <span>교환 희망 정보</span>
    </div>
  ),
} as TitleProps;

Tertiary.args = TertiaryProps;
Tertiary.parameters = {
  codeExample: titleCodeSnippet(TertiaryProps),
};
