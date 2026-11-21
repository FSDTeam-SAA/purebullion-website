export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role?: string;
  accountStatus?: string;
  emailVerified?: boolean;
  avatarUrl?: string | null;
  profileImage?: string | null;
  preferredLocale?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
  message?: string;
}

export interface ApiErrorResponse {
  success: boolean;
  statusCode?: number;
  error?: {
    code?: string;
    message?: string;
  };
  errorSources?: Array<{ path?: string; message?: string }>;
  message?: string | string[];
}

// Request DTOs
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  preferredLocale?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  email?: string;
  code?: string;
  resetToken?: string;
  token?: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  email?: string;
  code?: string;
  token?: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Response DTOs
export interface LoginResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
}

export interface RegisterResponseData {
  user: User;
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  nextStep?: string;
  message?: string;
}

export interface VerifyResetCodeResponseData {
  resetToken: string;
  expiresInMinutes?: number;
}
