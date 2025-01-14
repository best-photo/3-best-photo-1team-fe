import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/src/store/useAuthStore';

const useAuthGuard = (): void => {
  const { isAuthenticated, checkAuth, refreshToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        try {
          // await refreshToken(); // Access Token 갱신
          await checkAuth(); // 인증 상태 확인
        } catch {
          router.push('/login'); // 인증 실패 시 로그인 페이지로 이동
        }
      }
    };

    verifyAuth();
  }, [isAuthenticated, checkAuth, refreshToken, router]);
};

export default useAuthGuard;
