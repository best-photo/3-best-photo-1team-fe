import { create } from 'zustand';

type User = {
  id: string;
  nickName: string;
  password: string;
  email: string;
  points: number;
};

type AuthState = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  user: User | null;
};

const mockUserInfo = {
  id: '1',
  nickName: 'test',
  password: 'test',
  email: 'test@naver.com',
  points: 1000,
};

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  user: mockUserInfo || null,
  login: () => set({ isLogin: true }),
  logout: () => set({ isLogin: false }),
}));
