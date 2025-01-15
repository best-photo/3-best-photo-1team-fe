'use client';

import GNBLogo from './GNBLogo';
import GNBActions from './GNBActions';
import MobileNav from './MobileNav';
import { useNotificationStore } from '@/src/store/useNotificationStore';

const GNB = () => {
  const { closeNotification } = useNotificationStore();

  return (
    <nav
      className='fixed box-border left-0 right-0 top-0 z-20 h-[60px] md:h-[70px] lg:h-[80px] min-w-[375px] bg-black text-white'
      onClick={closeNotification}
    >
      {/* 375px 이상 Desktop Layout */}
      <div className='hidden h-full mx-auto md:flex max-w-[1480px] items-center justify-between px-5 lg:px-10 '>
        <GNBLogo />
        <GNBActions />
      </div>
      {/* 375px 이하  Mobile Layout */}
      <div className='md:hidden box-border h-full'>
        <MobileNav closeNotification={closeNotification} />
      </div>
    </nav>
  );
};

export default GNB;
