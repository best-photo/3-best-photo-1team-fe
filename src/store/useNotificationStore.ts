import { create } from 'zustand';

type NotificationState = {
  isNotificationOpen: boolean;
  toggleNotification: () => void;
  closeNotification: () => void;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  isNotificationOpen: false,
  toggleNotification: () =>
    set((state) => ({ isNotificationOpen: !state.isNotificationOpen })),
  closeNotification: () => {
    if (get().isNotificationOpen) {
      set({ isNotificationOpen: false });
    }
  },
}));
