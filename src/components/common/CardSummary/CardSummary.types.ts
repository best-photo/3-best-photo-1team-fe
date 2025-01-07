type CardSummaryVariant = 'common' | 'rare' | 'superRare' | 'legendary';

export type CardSummaryProps = {
  variant: CardSummaryVariant;
  totalCards: number;
};
