import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ApiErrorResponse } from '@/types/auth.types';
import { getSession, signOut } from 'next-auth/react';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

/**
 * Validate that a token string looks like a genuine, unexpired JWT
 */
function isValidJwt(token: string | null | undefined): boolean {
  if (!token || typeof token !== 'string') return false;
  if (token === 'mock-jwt-token') return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
    );
    if (payload.exp && typeof payload.exp === 'number') {
      if (Date.now() >= (payload.exp - 10) * 1000) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

// Request interceptor: attach token from localStorage or NextAuth session
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('accessToken');

      if (!isValidJwt(token)) {
        try {
          const session = await getSession();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const sessionToken = (session?.user as any)?.accessToken;
          if (isValidJwt(sessionToken)) {
            token = sessionToken;
            localStorage.setItem('accessToken', sessionToken);
          } else {
            localStorage.removeItem('accessToken');
            token = null;
          }
        } catch {
          // ignore session fetch errors
        }
      }

      if (token && config.headers && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (config.data instanceof FormData && config.headers) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const storedRefreshToken =
          typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
        if (!storedRefreshToken) throw new Error('No refresh token available');

        const refreshResponse = await axios.post<{
          success: boolean;
          data?: { accessToken?: string; refreshToken?: string };
        }>(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken: storedRefreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const newAccessToken = refreshResponse.data?.data?.accessToken;
        const newRefreshToken = refreshResponse.data?.data?.refreshToken;

        if (newAccessToken && isValidJwt(newAccessToken)) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', newAccessToken);
            if (newRefreshToken) {
              localStorage.setItem('refreshToken', newRefreshToken);
            }
          }
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          processQueue(null, newAccessToken);
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          if (window.location.pathname.startsWith('/dashboard')) {
            signOut({ callbackUrl: '/login?error=SessionExpired' });
          }
        }
      } finally {
        isRefreshing = false;
      }
    }

    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.response?.data) {
      const data = error.response.data;
      if (Array.isArray(data.errorSources) && data.errorSources.length > 0) {
        const msgs = data.errorSources
          .map((s: { message?: string }) => s.message)
          .filter(Boolean);
        errorMessage =
          msgs.length > 0
            ? msgs.join(', ')
            : (typeof data.message === 'string' ? data.message : errorMessage);
      } else if (data.error?.message) {
        errorMessage = data.error.message;
      } else if (Array.isArray(data.message)) {
        errorMessage = data.message.join(', ');
      } else if (typeof data.message === 'string') {
        errorMessage = data.message;
      }
    } else if (error.message) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please check your connection.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Cannot connect to the server. Please ensure the backend is running.';
      } else {
        errorMessage = error.message;
      }
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Something went wrong. Please try again.';
}
