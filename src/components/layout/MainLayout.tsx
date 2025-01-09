'use client';

import cn from '@/src/utils/cn';
import GNB from './GNB/GNB';
import { useNotificationStore } from '@/src/store/useNotificationStore';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 모바일 화면에서 알림창이 열려있을 때, 페이지 스크롤을 막기 위해 overflow-hidden을 적용

  const { isNotificationOpen } = useNotificationStore();

  return (
    <>
      <GNB />
      <div
        className={cn(
          'md:block',
          isNotificationOpen ? 'hidden overflow-hidden' : 'block',
        )}
      >
        <main className='pt-[60px] md:pt-[70px] lg:pt-[80px]'>{children}</main>
      </div>
    </>
  );
}
