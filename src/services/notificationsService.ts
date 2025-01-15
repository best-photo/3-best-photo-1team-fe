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
  const response = await axiosInstance.get(
    `/notifications?page=${page}&limit=${limit}`,
  );
  return response.data;
};

const patchNotification = async (id: string): Promise<void> => {
  await axiosInstance.patch(`/notifications/${id}`);
};

export const notificationsService = {
  getNotifications,
  patchNotification,
};
