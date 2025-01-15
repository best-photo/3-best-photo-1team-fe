export interface SearchSectionProps {
  onSubmitFilter: (query: string) => void;
  variant: 'marketplace' | 'mySale' | 'myGallery';
}
