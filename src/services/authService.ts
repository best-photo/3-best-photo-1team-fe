import axiosInstance from '@/src/lib/axios/axiosInstance';
import {
  LoginRequest,
  SignupRequest,
} from '@/src/lib/axios/types/api/axiosInstance';

// 로그인
export const login = async (
  credentials: LoginRequest,
): Promise<{
  id: string;
  email: string;
  nickname: string;
  points: number;
}> => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data.user; // 로그인 응답의 user 데이터 반환
};

// 회원가입
export const signup = async (
  data: SignupRequest,
): Promise<{ status: number; message: string }> => {
  const response = await axiosInstance.post('/auth/signup', data);
  return {
    status: response.status, // HTTP 상태 코드
    message: response.data.message, // 응답 메시지
  };
};

// 인증 상태 확인
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get('/auth/guard');
    return response.status === 200; // 200 응답이면 인증된 상태
  } catch (error) {
    console.error('인증 상태 확인 실패:', error);
    return false; // 실패 시 인증되지 않은 상태
  }
};

// 리프레시 토큰으로 Access Token 갱신
export const refresh = async (): Promise<void> => {
  await axiosInstance.post('/auth/refresh');
};

// 로그아웃
export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

// 유저 정보 가져오기
export const getProfile = async (): Promise<{
  id: string;
  email: string;
  nickname: string;
  points: number;
}> => {
  const response = await axiosInstance.get('/users/profile');
  return response.data; // 서버에서 반환된 유저 정보
};
