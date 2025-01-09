import { CARD_RARITY } from '@/src/constants/cardRarity';

export type CardSummaryGroupProps = Record<keyof typeof CARD_RARITY, number>;
