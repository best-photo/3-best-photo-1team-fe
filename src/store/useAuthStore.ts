import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  login as loginAPI,
  signup as signupAPI,
  logout as logoutAPI,
  checkAuthStatus,
  refresh,
  getProfile,
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
        const user = await loginAPI(credentials);
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

    // 인증 상태 확인
    checkAuth: async () => {
      try {
        const isAuthenticated = await checkAuthStatus(); // 서버에서 인증 상태 확인
        if (isAuthenticated) {
          const user = await getProfile(); // 인증 상태가 유효하면 프로필 정보 가져오기
          set({ user, isAuthenticated: true });
        } else {
          set({ user: null, isAuthenticated: false });
        }
      } catch (error) {
        console.error('인증 상태 확인 실패:', error);
        set({ user: null, isAuthenticated: false });
        throw error;
      }
    },

    // 리프레시 토큰으로 Access Token 갱신
    refreshToken: async () => {
      try {
        await refresh();
        const isAuthenticated = await checkAuthStatus(); // 인증 상태 확인
        if (isAuthenticated) {
          const user = await getProfile(); // 프로필 정보 갱신
          set({ user, isAuthenticated: true });
        } else {
          set({ user: null, isAuthenticated: false });
        }
      } catch (error) {
        console.error('리프레시 후 인증 상태 확인 실패:', error);
        set({ user: null, isAuthenticated: false });
      }
    },

    // 로그아웃
    logout: async () => {
      await refresh();
      await logoutAPI();
      set({ isAuthenticated: false, user: null });
    },
  })),
);

export default useAuthStore;
