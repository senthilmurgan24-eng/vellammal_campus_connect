import axiosInstance from '@/api/axiosInstance';

export const fetchDashboard = async () => {
  const res = await axiosInstance.get('/student/dashboard');
  return res.data?.data ?? res.data;
};

export const fetchPerformance = async () => {
  const res = await axiosInstance.get('/student/performance');
  return res.data?.data ?? res.data;
};
