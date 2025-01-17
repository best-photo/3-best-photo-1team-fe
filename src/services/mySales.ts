import axiosInstance from '../lib/axios/axiosInstance';

interface MySalesQueryParams {
  keyword?: string;
  grade?: string;
  genre?: string;
  stockSTate?: string;
  page: number;
  limit: number;
}

export const getMySalesCard = async (params: MySalesQueryParams) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined),
  );

  try {
    const { data } = await axiosInstance.get('/users/my-cards/sales', {
      params: filteredParams,
    });
    return data;
  } catch (e: any) {
    console.error('Error response:', e.response?.data);
    throw e;
  }
};
