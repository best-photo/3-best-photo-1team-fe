import { Meta, StoryFn } from '@storybook/react';
import SearchSection from './searchSection';
import { SearchSectionProps } from './searchSection.types';

export default {
  title: 'common/organisms/SearchSection',
  component: SearchSection,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchSection>;

const Template: StoryFn<typeof SearchSection> = (args) => (
  <SearchSection {...args} />
);

export const MySale = Template.bind({});

const MySaleProps: SearchSectionProps = {
  variant: 'mySale',
  onSubmitFilter: (query) => alert(query),
};

MySale.args = MySaleProps;

export const Marketplace = Template.bind({});

const MarketplaceProps: SearchSectionProps = {
  variant: 'marketplace',
  onSubmitFilter: (query) => alert(query),
};

Marketplace.args = MarketplaceProps;

export const MyGallery = Template.bind({});

const MyGalleryProps: SearchSectionProps = {
  variant: 'myGallery',
  onSubmitFilter: (query) => alert(query),
};

MyGallery.args = MyGalleryProps;
