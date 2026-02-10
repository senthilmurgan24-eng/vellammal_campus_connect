import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { tokenStore } from '@/utils/tokenStore';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api';
const pendingRequests = new Map<string, AbortController>();
let refreshPromise: Promise<string | null> | null = null;
type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean; _retryCount?: number };

const getRequestKey = (config: AxiosRequestConfig) => {
  const { method, url, params, data } = config;
  return [method, url, JSON.stringify(params ?? {}), JSON.stringify(data ?? {})].join('|');
};

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const key = getRequestKey(config);
  if (pendingRequests.has(key)) {
    pendingRequests.get(key)?.abort();
    pendingRequests.delete(key);
  }
  const controller = new AbortController();
  config.signal = controller.signal;
  pendingRequests.set(key, controller);

  const token = tokenStore.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    const key = getRequestKey(response.config);
    pendingRequests.delete(key);
    return response;
  },
      async (error: AxiosError) => {
        const config = error.config as RetryableConfig | undefined;
        if (config) pendingRequests.delete(getRequestKey(config));

        const status = error.response?.status;
        if (status === 401 && config && !config._retry) {
          config._retry = true;
          const refreshed = await tryRefreshToken();
          if (refreshed) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${refreshed}`;
            return instance(config);
          }
        }

        if (config && !error.response && !axios.isCancel(error)) {
          // Retry once for transient network errors
          const retryCount = config._retryCount ?? 0;
          if (retryCount < 1) {
            config._retryCount = retryCount + 1;
            return instance(config);
          }
        }

    return Promise.reject(normalizeError(error));
  }
);

async function tryRefreshToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;
  const refreshToken = tokenStore.getRefreshToken();
  if (!refreshToken) return null;

  refreshPromise = instance
    .post('/auth/refresh', { refreshToken })
    .then((res) => {
      const access = (res.data as any)?.data?.accessToken ?? (res.data as any)?.accessToken;
      const nextRefresh = (res.data as any)?.data?.refreshToken ?? refreshToken;
      if (access) tokenStore.setTokens(access, nextRefresh);
      return access ?? null;
    })
    .catch(() => null)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export type NormalizedError = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};

export const normalizeError = (error: AxiosError): NormalizedError => {
  if (axios.isCancel(error)) {
    return { message: 'Request cancelled', code: 'cancelled' };
  }
  const status = error.response?.status;
  const backendMessage = (error.response?.data as any)?.message;
  return {
    message: backendMessage || error.message || 'Unexpected error',
    status,
    code: (error.response?.data as any)?.code,
    details: error.response?.data
  };
};

export default instance;
