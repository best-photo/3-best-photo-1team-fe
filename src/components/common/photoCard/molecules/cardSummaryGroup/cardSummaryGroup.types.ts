import { CARD_GRADES } from '@/src/constants/photoCardInformation';

export type CardSummaryGroupProps = Record<keyof typeof CARD_GRADES, number>;
