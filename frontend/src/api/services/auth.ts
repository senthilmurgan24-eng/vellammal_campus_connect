import axiosInstance from '@/api/axiosInstance';
import { tokenStore } from '@/utils/tokenStore';

export interface LoginPayload {
  identifier: string;
  password: string;
  role: 'student' | 'parent' | 'faculty';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    role: string;
  };
}

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const res = await axiosInstance.post('/auth/login', payload);
  const data = res.data?.data ?? res.data;
  tokenStore.setTokens(data.accessToken, data.refreshToken);
  return data as AuthResponse;
};

export const logout = () => tokenStore.clear();
