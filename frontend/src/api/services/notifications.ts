import axiosInstance from '@/api/axiosInstance';

export const fetchNotifications = async () => {
  const res = await axiosInstance.get('/notifications');
  return res.data?.data ?? res.data;
};
