'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // App Router에서 경로 변경 감지
import useAuthStore from '@/src/store/useAuthStore';
import { getProfile } from '@/src/services/authService';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refreshToken, setUserInfo } = useAuthStore();
  const pathname = usePathname(); // 현재 경로를 가져옴

  useEffect(() => {
    const refreshOnPathChange = async () => {
      try {
        const updatedUser = await getProfile();
        useAuthStore.getState().setUserInfo(updatedUser);
        setTimeout(() => {
          refreshToken(); // 토큰 갱신
        }, 10000);
      } catch (error) {
        setUserInfo(null, false); // 토큰 갱신 실패 시 회원정보 초기화
        console.error(
          '토큰 갱신 실패 시 회원정보 초기화와 동시에 에러:',
          error,
        );
      }
    };

    refreshOnPathChange();
  }, [pathname, refreshToken]); // 경로(pathname)가 변경될 때마다 실행

  return <>{children}</>;
}
