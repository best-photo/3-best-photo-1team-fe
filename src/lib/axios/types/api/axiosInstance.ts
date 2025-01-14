export interface ApiResponse<T> {
  message: string;
  user?: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}
