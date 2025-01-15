import axiosInstance from '../lib/axios/axiosInstance';

export type Notification = {
  id: string;
  content: string;
  isRead: boolean;
  createdAt: string;
};

export type MetaData = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
  unreadNotificationsCount: number;
};

export type NotificationResponse = {
  notifications: Notification[];
  metadata: MetaData;
};

const getNotifications = async ({
  page = 1,
  limit = 99,
}: {
  page?: number;
  limit?: number;
}): Promise<NotificationResponse> => {
  try {
    const response = await axiosInstance.get(
      `/notifications?page=${page}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    // 에러 로깅
    console.error('Failed to fetch notifications:', error);
    throw error;
  }
};

const patchNotification = async (id: string): Promise<void> => {
  try {
    await axiosInstance.patch(`/notifications/${id}`);
  } catch (error) {
    console.error(`Failed to update notification ${id}:`, error);
    throw error;
  }
};

export const notificationsService = {
  getNotifications,
  patchNotification,
};
