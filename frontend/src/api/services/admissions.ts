import axiosInstance from '@/api/axiosInstance';

export type AdmissionApplicationPayload = {
  name: string;
  course: string;
  parentContact: string;
  email: string;
  message?: string;
};

export type AdmissionApplicationResponse = {
  sent: boolean;
  message: string;
  timestamp: number;
};

export const submitAdmissionApplication = async (payload: AdmissionApplicationPayload) => {
  const res = await axiosInstance.post('/email/admissions-application', payload);
  return (res.data?.data ?? res.data) as AdmissionApplicationResponse;
};
