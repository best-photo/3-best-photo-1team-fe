import { Meta, StoryFn } from '@storybook/react';
import SearchSection from './searchSection';
import { SearchSectionProps } from './searchSection.types';
import { searchSectionCodeSnippet } from './codeExample';

export default {
  title: 'common/organisms/SearchSection',
  component: SearchSection,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchSection>;

const Template: StoryFn<typeof SearchSection> = (args) => (
  <SearchSection {...args} />
);

export const MySale = Template.bind({});

const onSubmitFilter = (query: string) => alert(query);

const MySaleProps: SearchSectionProps = {
  variant: 'mySale',
  optionCounts: [10, 10, 10, 10],
  onSubmitFilter,
};

MySale.args = MySaleProps;
MySale.parameters = {
  codeExample: searchSectionCodeSnippet(MySaleProps),
};

export const Marketplace = Template.bind({});

const MarketplaceProps: SearchSectionProps = {
  variant: 'marketplace',
  optionCounts: [10, 10, 10, 10],
  onSubmitFilter,
};

Marketplace.args = MarketplaceProps;
Marketplace.parameters = {
  codeExample: searchSectionCodeSnippet(MySaleProps),
};

export const MyGallery = Template.bind({});

const MyGalleryProps: SearchSectionProps = {
  variant: 'myGallery',
  optionCounts: [10, 10, 10, 10],
  onSubmitFilter,
};

MyGallery.args = MyGalleryProps;
MyGallery.parameters = {
  codeExample: searchSectionCodeSnippet(MySaleProps),
};
