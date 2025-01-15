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

export interface CreateCardData {
  photo: File | undefined; // null 대신 undefined 사용
  price: number;
  totalQuantity: number;
  cardname: string;
  grade: string;
  genre: string;
  description: string;
}