import React from 'react';
import { notifications } from './mockNotifications';
import { formatTimeAgo } from '@/src/utils/formatTimeAgo';
import cn from '@/src/utils/cn';
import { useRouter } from 'next/navigation';

const MobileNotificationMessages = () => {
  const router = useRouter();
  const handleNotificationClick = (id: number, url: string) => {
    // 1. 알림 읽음 처리

    // 2. 해당 URL로 페이지 이동
    router.push(url);
  };

  return (
    <ul
      className='fixed top-[60px] left-0 right-0 bottom-0 overflow-y-scroll bg-black'
      onClick={(e) => e.stopPropagation()}
    >
      {notifications.map((notification) => (
        <li
          key={notification.id}
          className={cn(
            'p-5 border-b border-gray-400',
            !notification.isRead
              ? 'bg-gray-500 text-white'
              : 'bg-black text-gray-300',
          )}
          onClick={() =>
            handleNotificationClick(notification.id, notification.url)
          }
        >
          <p className='text-sm mb-[10px]'>{notification.title}</p>
          <span className='text-gray-300 text-xs'>
            {formatTimeAgo(notification.createdAt)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default MobileNotificationMessages;
