import axios from 'axios';

const createCardAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 5000,
  headers: {
    Accept: '*/*', // 기본적으로 모든 응답을 허용
  },
  withCredentials: true,
});

// Interceptor를 통해 multipart/form-data 헤더 자동 설정
createCardAxios.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // FormData가 포함된 경우 Content-Type을 자동 설정
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});

export default createCardAxios;
