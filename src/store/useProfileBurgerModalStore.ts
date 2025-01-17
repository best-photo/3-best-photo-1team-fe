import { create } from 'zustand';

type ProfileBurgerModalState = {
  isProfileBurgerModalOpen: boolean;
  toggleProfileBurgerModal: () => void;
  closeProfileBurgerModal: () => void;
};

export const useProfileBurgerModalStore = create<ProfileBurgerModalState>(
  (set) => ({
    isProfileBurgerModalOpen: false,
    toggleProfileBurgerModal: () =>
      set((state) => ({
        isProfileBurgerModalOpen: !state.isProfileBurgerModalOpen,
      })),
    closeProfileBurgerModal: () => set({ isProfileBurgerModalOpen: false }),
  }),
);
