import Image from 'next/image';
import AlarmIcon from '@/public/icons/alarm-default.svg';
import { formatTimeAgo } from '@/src/utils/formatTimeAgo';
import { useNotificationStore } from '@/src/store/useNotificationStore';
import { notifications } from './mockNotifications';
import cn from '@/src/utils/cn';

import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

const NotificationBell = () => {
  const router = useRouter();
  const { isNotificationOpen, toggleNotification, closeNotification } =
    useNotificationStore();

  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead,
  );

  const unreadNotificationsCount =
    unreadNotifications.length > 9 ? '9+' : unreadNotifications.length;

  // 알림 클릭 시 처리
  const handleNotificationClick = (id: number, url: string) => {
    // 해당 알림을 읽음 처리 (상태 업데이트)
    console.log('알림 읽음 처리', id);

    // 해당 알림의 상세 페이지로 이동
    router.push(url);
  };

  return (
    <div
      className='relative flex items-center'
      onClick={(e) => e.stopPropagation()} // 이벤트 전파 중단
    >
      <button
        className='relative'
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 중단
          toggleNotification();
        }}
      >
        <Image
          src={AlarmIcon}
          alt='알람'
        />
        {/* 알림 숫자 카운터 */}
        {unreadNotifications.length > 0 && (
          <div className='absolute top-0 -right-1 w-3 h-3 bg-red text-[6px] text-white flex items-center justify-center rounded-full p-1'>
            {unreadNotificationsCount}
          </div>
        )}
      </button>
      {/* 알림 목록 드롭다운 */}
      {isNotificationOpen && (
        <>
          {createPortal(
            <div
              className='fixed inset-0 bg-red-500 bg-opacity-50'
              onClick={closeNotification}
            />,
            document.body,
          )}
          <div className='box-border absolute top-6 right-0 bg-black border border-gray-400 shadow-lg z-10'>
            <div className=' max-h-[240px] overflow-y-auto'>
              {notifications.length === 0 ? (
                <div className='p-5'>알림이 없습니다.</div>
              ) : (
                <ul>
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={cn(
                        'p-5 w-[300px] border border-b border-gray-400',
                        !notification.isRead
                          ? 'bg-gray-500 text-white'
                          : 'bg-black text-gray-300',
                      )}
                      onClick={() =>
                        handleNotificationClick(
                          notification.id,
                          notification.url,
                        )
                      }
                    >
                      <p className='text-sm mb-2.5'>{notification.title}</p>
                      <span className='text-gray-300 text-xs'>
                        {formatTimeAgo(notification.createdAt)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
