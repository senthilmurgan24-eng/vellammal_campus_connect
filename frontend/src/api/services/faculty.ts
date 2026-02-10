import axiosInstance from '@/api/axiosInstance';

export const upload = async (payload: FormData) => {
  const res = await axiosInstance.post('/faculty/upload', payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data?.data ?? res.data;
};

export const submitTest = async (payload: unknown) => {
  const res = await axiosInstance.post('/faculty/test', payload);
  return res.data?.data ?? res.data;
};
