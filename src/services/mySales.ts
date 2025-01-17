import axiosInstance from '../lib/axios/axiosInstance';

interface MySalesQueryParams {
  keyword?: string;
  grade?: string;
  genre?: string;
  stockState?: string;
  page: number;
  limit: number;
}

export const getMySalesCard = async (params: MySalesQueryParams) => {
  try {
    const { data } = await axiosInstance.get('/users/my-cards/sales', {
      params: {
        ...params,
        page: params.page || 1,
        limit: params.limit || 30,
      },
    });
    return data;
  } catch (e: any) {
    console.error('Error response:', e.response?.data);
    throw e;
  }
};
