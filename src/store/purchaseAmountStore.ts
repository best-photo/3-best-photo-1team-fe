import { create } from 'zustand';

interface PurchaseAmountStore {
  amount: number;
  plusAmount: (max: number) => void;
  minusAmount: () => void;
  reset: () => void;
}

export const usePurchaseAmountStore = create<PurchaseAmountStore>((set) => ({
  amount: 1,
  plusAmount: (max) =>
    set((state) => ({
      amount: Math.min(state.amount + 1, max),
    })),
  minusAmount: () =>
    set((state) => ({
      amount: Math.max(state.amount - 1, 1),
    })),
  reset: () => set({ amount: 1 }),
}));
