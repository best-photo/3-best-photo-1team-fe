import { create } from 'zustand';

type ProfileModalState = {
  isProfileModalOpen: boolean;
  toggleProfileModal: () => void;
  closeProfileModal: () => void;
};

export const useProfileModalStore = create<ProfileModalState>((set) => ({
  isProfileModalOpen: false,
  toggleProfileModal: () =>
    set((state) => ({ isProfileModalOpen: !state.isProfileModalOpen })),
  closeProfileModal: () => set({ isProfileModalOpen: false }),
}));
