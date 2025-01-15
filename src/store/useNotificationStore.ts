import { create } from 'zustand';
import { NotificationResponse } from '@/src/services/notificationsService';

type NotificationState = {
  notificationData: NotificationResponse | null;
  isNotificationOpen: boolean;
  toggleNotification: () => void;
  closeNotification: () => void;
  setNotificationData: (data: NotificationResponse) => void;
  updateNotificationStatus: (id: string) => void;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notificationData: null,
  isNotificationOpen: false,
  toggleNotification: () =>
    set((state) => ({ isNotificationOpen: !state.isNotificationOpen })),
  closeNotification: () => {
    if (get().isNotificationOpen) {
      set({ isNotificationOpen: false });
    }
  },
  setNotificationData: (data) => set({ notificationData: data }),
  updateNotificationStatus: (id) =>
    set((state) => {
      if (!state.notificationData) return state;
      return {
        notificationData: {
          ...state.notificationData,
          notifications: state.notificationData.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n,
          ),
          metadata: {
            ...state.notificationData.metadata,
            unreadNotificationsCount:
              state.notificationData.metadata.unreadNotificationsCount - 1,
          },
        },
      };
    }),
}));
