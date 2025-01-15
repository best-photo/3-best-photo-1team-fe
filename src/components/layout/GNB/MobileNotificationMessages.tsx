import { formatTimeAgo } from '@/src/utils/formatTimeAgo';
import cn from '@/src/utils/cn';
import { useRouter } from 'next/navigation';
import { useNotificationStore } from '@/src/store/useNotificationStore';
import { notificationsService } from '@/src/services/notificationsService';

const MobileNotificationMessages = () => {
  const router = useRouter();

  const { notificationData, updateNotificationStatus } = useNotificationStore();

  // 알림 읽음 처리 함수
  const patchNotification = async (id: string) => {
    try {
      await notificationsService.patchNotification(id);
      updateNotificationStatus(id);
    } catch (error) {
      console.error('Failed to update notification:', error);
    }
  };

  // 알림 클릭 시 처리
  const handleNotificationClick = (id: string, url?: string) => {
    // 이미 읽은 알림인지 확인
    const notification = notificationData?.notifications.find(
      (n) => n.id === id,
    );

    if (notification?.isRead) {
      console.log('이미 읽은 메시지입니다');
      return;
    }

    // 알림 읽음 처리 (상태 업데이트)
    console.log('알림 읽음 처리', id);
    patchNotification(id);

    // 해당 알림의 상세 페이지로 이동
    if (url) {
      router.push(url);
    }
  };

  if (!notificationData) return <div>Loading...</div>;

  return (
    <ul
      className='fixed top-[60px] left-0 right-0 bottom-0 overflow-y-scroll bg-black'
      onClick={(e) => e.stopPropagation()}
    >
      {notificationData.notifications.map((notification) => (
        <li
          key={notification.id}
          className={cn(
            'p-5 border-b border-gray-400',
            !notification.isRead
              ? 'bg-gray-500 text-white'
              : 'bg-black text-gray-300',
          )}
        >
          <p
            className='text-sm mb-[10px] cursor-pointer hover:underline'
            onClick={() =>
              handleNotificationClick(notification.id /* notification.url */)
            }
          >
            {notification.content}
          </p>
          <span className='text-gray-300 text-xs'>
            {formatTimeAgo(notification.createdAt)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default MobileNotificationMessages;
