'use client';

import Image from 'next/image';
import AlarmIcon from '@/public/icons/alarm-default.svg';
import { useNotificationStore } from '@/src/store/useNotificationStore';

import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuthStore from '@/src/store/useAuthStore';
import NotificationItem from './NotificationItem';
import { notificationsService } from '@/src/services/notificationsService';

const NotificationBell = () => {
  const router = useRouter();
  const {
    isNotificationOpen,
    toggleNotification,
    closeNotification,
    notificationData,
    setNotificationData,
    updateNotificationStatus,
  } = useNotificationStore();

  const { isAuthenticated } = useAuthStore();

  // 알림 조회 함수
  const getNotifications = async () => {
    try {
      const response = await notificationsService.getNotifications({});
      setNotificationData(response);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  // 알림 읽음 처리 함수(낙관적 업데이트)
  const patchNotification = async (id: string) => {
    try {
      await notificationsService.patchNotification(id);
      updateNotificationStatus(id);
    } catch (error) {
      console.error('Failed to update notification:', error);
    }
  };

  // 로그인 여부에 따라 알림 조회
  useEffect(() => {
    if (isAuthenticated) {
      getNotifications();
    }
  }, [isAuthenticated]);

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
        {notificationData &&
          notificationData.metadata.unreadNotificationsCount > 0 && (
            <div className='absolute top-0 -right-1 w-3 h-3 bg-red text-[6px] text-white flex items-center justify-center rounded-full p-1'>
              {notificationData.metadata.unreadNotificationsCount}
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
            <div className=' max-h-[535px] overflow-y-auto'>
              {notificationData?.notifications?.length === 0 ? (
                <div className='p-5'>알림이 없습니다.</div>
              ) : (
                <ul>
                  {notificationData?.notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      content={notification.content}
                      isRead={notification.isRead}
                      createdAt={notification.createdAt}
                      onClick={handleNotificationClick}
                    />
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
