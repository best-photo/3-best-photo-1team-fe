import { CARD_GRADES } from '@/src/constants/cardGrades';

export type CardSummaryGroupProps = Record<keyof typeof CARD_GRADES, number>;
