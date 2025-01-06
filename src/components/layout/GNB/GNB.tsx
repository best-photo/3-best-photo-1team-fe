'use client';

import { usePathname } from 'next/navigation';

import GNBLeftSection from './GNBLeftSection';
import GNBRightSection from './GNBRightSection';
import MobileNavDefault from './MobileNavDefault';
import { useNotificationStore } from '@/src/store/useNotificationStore';
import MobileNavWithBack from './MobileNavWithBack';
import MobileNotificationMessages from './MobileNotificationMessages';
import { hiddenRoutes } from '@/src/app/PaddingHandler';

const GNB = () => {
  const pathname = usePathname();
  const isMyGallery = pathname.split('/')[1] === 'my-gallery';
  const { isNotificationOpen, closeNotification } = useNotificationStore();

  // hiddenRoutes에 해당하는 페이지에서는 Nav를 숨김
  if (Object.values(hiddenRoutes).includes(pathname)) {
    return null; // Nav를 렌더링하지 않음
  }

  // 알림 목록이 열려있을 때, GNB를 클릭하면 알림 목록을 닫음
  const handleCloseNotifications = () => {
    if (isNotificationOpen) closeNotification();
  };

  return (
    <nav
      className='fixed box-border left-0 right-0 top-0 z-10 h-[60px] sm:h-[70px] md:h-[80px] min-w-[375px] bg-black text-white'
      onClick={handleCloseNotifications}
    >
      {/* 375px 이상 Desktop Layout */}
      <div className='hidden h-full mx-auto sm:flex max-w-[1480px] items-center justify-between px-5 md:px-10 '>
        <GNBLeftSection />
        <GNBRightSection />
      </div>
      {/* 375px 이하  Mobile Layout */}
      <div className='sm:hidden box-border h-full'>
        {isMyGallery ? (
          <MobileNavWithBack
            title='마이갤러리'
            backPath='/my-gallery'
          />
        ) : isNotificationOpen ? (
          <>
            <MobileNavWithBack
              title='알림'
              onClick={closeNotification}
            />
            <MobileNotificationMessages />
          </>
        ) : (
          <MobileNavDefault />
        )}
      </div>
    </nav>
  );
};

export default GNB;
