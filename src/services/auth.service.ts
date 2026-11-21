import { apiClient } from './apiClient';
import {
  ApiResponse,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponseData,
  RegisterRequest,
  RegisterResponseData,
  ResetPasswordRequest,
  VerifyEmailRequest,
  VerifyResetCodeRequest,
  VerifyResetCodeResponseData,
  User,
} from '@/types/auth.types';

export const authService = {
  /**
   * Log in user with email & password directly via API
   */
  async login(payload: LoginRequest): Promise<ApiResponse<LoginResponseData>> {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>(
      '/auth/login',
      payload
    );
    if (response.data.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }
    if (response.data.data?.refreshToken) {
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }
    return response.data;
  },

  /**
   * Register a new user
   */
  async register(payload: RegisterRequest): Promise<ApiResponse<RegisterResponseData>> {
    const response = await apiClient.post<ApiResponse<RegisterResponseData>>(
      '/auth/register',
      payload
    );
    if (response.data.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
    }
    if (response.data.data?.refreshToken) {
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }
    return response.data;
  },

  /**
   * Request password reset code to email
   */
  async forgotPassword(
    payload: ForgotPasswordRequest
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(
        '/auth/forget-password',
        payload
      );
      return response.data;
    } catch {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(
        '/auth/forgot-password',
        payload
      );
      return response.data;
    }
  },

  /**
   * Verify email 6-digit code for password reset to get a reset token
   */
  async verifyResetCode(
    payload: VerifyResetCodeRequest
  ): Promise<ApiResponse<VerifyResetCodeResponseData>> {
    try {
      const response = await apiClient.post<ApiResponse<VerifyResetCodeResponseData>>(
        '/auth/verify-code',
        { email: payload.email, otp: payload.code }
      );
      return response.data;
    } catch {
      const response = await apiClient.post<ApiResponse<VerifyResetCodeResponseData>>(
        '/auth/verify-reset-code',
        payload
      );
      return response.data;
    }
  },

  /**
   * Reset password using reset token / code and new password
   */
  async resetPassword(
    payload: ResetPasswordRequest
  ): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(
        '/auth/reset-password',
        { email: payload.email, newPassword: payload.newPassword }
      );
      return response.data;
    } catch {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(
        '/auth/reset-password',
        payload
      );
      return response.data;
    }
  },

  /**
   * Verify user email address after signup
   */
  async verifyEmail(
    payload: VerifyEmailRequest
  ): Promise<ApiResponse<{ message: string; user?: User }>> {
    const response = await apiClient.post<ApiResponse<{ message: string; user?: User }>>(
      '/auth/verify-email',
      payload
    );
    return response.data;
  },

  /**
   * Resend verification email code
   */
  async resendVerification(
    payload: { email: string }
  ): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/resend-verification',
      payload
    );
    return response.data;
  },

  /**
   * Get current authenticated user profile
   */
  async getMe(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  /**
   * Change password for logged in user
   */
  async changePassword(
    payload: ChangePasswordRequest
  ): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/auth/change-password',
      payload
    );
    return response.data;
  },

  /**
   * Logout user from server
   */
  async logout(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(
        '/auth/logout'
      );
      return response.data;
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
};
