import { apiClient } from "./apiClient";
import type { ApiResponse } from "@/types/auth.types";

export interface UserProfile {
  _id: string;
  name: string;
  username?: string;
  email: string;
  phone?: string | null;
  role?: string;
  profileImage?: string;
  timezone?: string;
  isVerified?: boolean;
  isFoundingMember?: boolean;
  customUserId?: string;
  subscriptionTier?: string;
  hasActiveSubscription?: boolean;
  subscriptionExpireDate?: string | null;
  isClosed?: boolean;
  scheduledDeletionDate?: string | null;
  createdAt?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  username?: string;
  phone?: string;
  timezone?: string;
}

export interface NotificationPreferences {
  toggles: {
    newSignals: boolean;
    signalProximity: boolean;
    signalClosed: boolean;
    marketConditionChange: boolean;
    watchlistMovers: boolean;
    communityReplies: boolean;
    announcements: boolean;
    dailyBriefingEmail: boolean;
    weeklyWrapEmail: boolean;
  };
  channels?: Record<string, boolean>;
  quietHours?: { enabled: boolean; from: string; to: string; description?: string };
}

export interface CloseAccountResult {
  status: string;
  isClosed: boolean;
  closedAt: string;
  scheduledDeletionDate: string;
  gracePeriodDays: number;
}

export const profileService = {
  async getMe() {
    const r = await apiClient.get<ApiResponse<UserProfile>>("/user/me");
    return r.data.data;
  },
  async updateMe(payload: UpdateProfilePayload) {
    const r = await apiClient.put<ApiResponse<UserProfile>>("/user/me", payload);
    return r.data.data;
  },
  async uploadAvatar(file: File, hasExisting: boolean) {
    const fd = new FormData();
    fd.append("profileImage", file);
    const r = hasExisting
      ? await apiClient.put<ApiResponse<UserProfile>>("/user/upload-avatar", fd)
      : await apiClient.post<ApiResponse<UserProfile>>("/user/upload-avatar", fd);
    return r.data.data;
  },
  async deleteAvatar() {
    const r = await apiClient.delete<ApiResponse<UserProfile>>("/user/upload-avatar");
    return r.data.data;
  },
  async getNotificationPreferences() {
    const r = await apiClient.get<ApiResponse<NotificationPreferences>>("/user/notification-preferences");
    return r.data.data;
  },
  async updateNotificationPreferences(payload: Partial<NotificationPreferences>) {
    const r = await apiClient.put<ApiResponse<NotificationPreferences>>("/user/notification-preferences", payload);
    return r.data.data;
  },
  async exportData() {
    const r = await apiClient.get<ApiResponse<unknown>>("/user/privacy/export-data");
    return r.data.data;
  },
  async deleteConversations() {
    const r = await apiClient.delete<ApiResponse<unknown>>("/user/privacy/conversations");
    return r.data;
  },
  async closeAccount(payload: { reason?: string; feedback?: string } = {}) {
    const r = await apiClient.post<ApiResponse<CloseAccountResult>>("/user/privacy/close-account", payload);
    return r.data.data;
  },
  async reopenAccount() {
    const r = await apiClient.post<ApiResponse<{ status: string; isClosed: boolean }>>("/user/privacy/reopen-account");
    return r.data.data;
  },
};
