import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  login as loginAPI,
  signup as signupAPI,
  logout as logoutAPI,
  checkAuthStatus,
  refresh,
} from '@/src/services/authService';
import {
  LoginRequest,
  SignupRequest,
} from '@/src/lib/axios/types/api/axiosInstance';

// User 인터페이스
interface User {
  id: string;
  email: string;
  nickname: string;
  points: number;
}

// AuthState 인터페이스 정의
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (credentials: SignupRequest) => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
  logout: () => Promise<void>;
}

// zustand 상태 생성
const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    isAuthenticated: false,

    // 로그인
    login: async (credentials) => {
      try {
        const user = await loginAPI(credentials); // 로그인 API 호출
        localStorage.setItem('user', JSON.stringify(user)); // 사용자 정보 저장
        set({
          user,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('로그인 실패:', error);
        set({ isAuthenticated: false, user: null });
        throw error;
      }
    },

    // 회원가입
    signup: async (credentials) => {
      await signupAPI(credentials);
      set({ isAuthenticated: false });
    },

    //인증 상태 확인
    checkAuth: async () => {
      try {
        const isAuthenticated = await checkAuthStatus(); // 서버에서 인증 상태 확인
        if (!isAuthenticated) {
          localStorage.removeItem('user'); // 로컬 스토리지 초기화
          set({ user: null, isAuthenticated: false });
        }
      } catch (error) {
        console.error('인증 상태 확인 실패:', error);
        localStorage.removeItem('user'); // 실패 시 초기화
        set({ user: null, isAuthenticated: false });
        throw error; // 에러를 호출한 곳으로 전달
      }
    },

    // 리프레시 토큰으로 Access Token 갱신
    refreshToken: async () => {
      try {
        await refresh();
        const isAuthenticated = await checkAuthStatus(); // 인증 상태 확인
        if (isAuthenticated) {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            set({
              isAuthenticated: true,
              user: JSON.parse(storedUser), // 사용자 정보 복원
            });
          }
        } else {
          set({ isAuthenticated: false, user: null });
        }
      } catch (error) {
        console.error('리프레시 후 인증 상태 확인 실패:', error);
        set({ isAuthenticated: false, user: null });
      }
    },

    // 로그아웃
    logout: async () => {
      await refresh();
      await logoutAPI();
      localStorage.removeItem('user'); // 사용자 정보 제거
      set({ isAuthenticated: false, user: null });
    },
  })),
);

export default useAuthStore;
