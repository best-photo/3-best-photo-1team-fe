'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // App Router에서 경로 변경 감지
import useAuthStore from '@/src/store/useAuthStore';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refreshToken } = useAuthStore();
  const pathname = usePathname(); // 현재 경로를 가져옴

  useEffect(() => {
    const refreshOnPathChange = async () => {
      try {
        await refreshToken(); // 토큰 갱신
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
      }
    };

    refreshOnPathChange();
  }, [pathname, refreshToken]); // 경로(pathname)가 변경될 때마다 실행

  return <>{children}</>;
}
