export interface SearchSectionProps {
  onSubmitFilter: (query: string) => void;
  optionCounts: number[];
  variant: 'marketplace' | 'mySale' | 'myGallery';
  mainPageInputclassName?: string;
}
