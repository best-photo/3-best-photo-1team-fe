import axiosInstance from '@/src/lib/axios/axiosInstance';

export const getLastDrawTime = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get('/points/last-draw-time');
    return response.data.lastDrawTime; // 서버 응답에서 lastDrawTime 반환
  } catch (error) {
    console.error('Error fetching last draw time:', error);
    throw new Error('Failed to fetch the last draw time.');
  }
};

// 타입 정의
interface RandomPointSuccessResponse {
  point: number;
  lastDrawTime: string;
}

interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export const openPointBox = async (): Promise<
  RandomPointSuccessResponse | ErrorResponse
> => {
  try {
    const response = await axiosInstance.post('/points/box');
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('Error opening point box:', error);
    throw new Error('Unexpected error occurred.');
  }
};
