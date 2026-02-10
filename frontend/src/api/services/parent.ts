import axiosInstance from '@/api/axiosInstance';

export const fetchOverview = async () => {
  const res = await axiosInstance.get('/parent/overview');
  return res.data?.data ?? res.data;
};
