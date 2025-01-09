import { Meta, StoryFn } from '@storybook/react';
import PhotoCardPageHeader from './photoCardPageHeader';
import { PhotoCardPageHeaderProps } from './photoCardPageHeader.types';
import { PhotoCardPageHeaderCodeSnippet } from './codeExample';

export default {
  title: 'common/organisms/PhotoCardPageHeader',
  component: PhotoCardPageHeader,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['sale', 'gallery'],
      defaultValue: 'sale',
    },
  },
} satisfies Meta<typeof PhotoCardPageHeader>;

const Template: StoryFn<typeof PhotoCardPageHeader> = (args) => (
  <PhotoCardPageHeader {...args} />
);

export const SalePage = Template.bind({});

const SalePageProps = {
  variant: 'sale',
  nickname: '유디',
  common: 10,
  rare: 10,
  superRare: 10,
  legendary: 10,
} as PhotoCardPageHeaderProps;

SalePage.args = SalePageProps;
SalePage.parameters = {
  codeExample: PhotoCardPageHeaderCodeSnippet(SalePageProps),
};

export const GalleryPage = Template.bind({});

const GalleryPageProps = {
  variant: 'gallery',
  nickname: '유디',
  common: 10,
  rare: 10,
  superRare: 10,
  legendary: 10,
} as PhotoCardPageHeaderProps;

GalleryPage.args = GalleryPageProps;
GalleryPage.parameters = {
  codeExample: PhotoCardPageHeaderCodeSnippet(GalleryPageProps),
};
