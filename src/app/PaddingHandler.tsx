'use client';

import { usePathname } from 'next/navigation';
import cn from '../utils/cn';

export const hiddenRoutes = {
  login: '/login',
  signup: '/signin',
};

// GNB 유무에 따라 padding 처리
const PaddingHandler = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const hideNav = Object.values(hiddenRoutes).includes(pathname);

  return (
    <div className={cn(!hideNav && 'pt-[60px] sm:pt-[70px] md:pt-[80px]')}>
      {children}
    </div>
  );
};

export default PaddingHandler;
