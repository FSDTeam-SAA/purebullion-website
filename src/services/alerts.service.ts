import { apiClient } from "./apiClient";
import type { ApiResponse } from "@/types/auth.types";

export type AlertCategory = "signals" | "market" | "community" | "announcements";
export type AlertTab = "all" | AlertCategory;

export interface AlertData {
  symbol?: string;
  companyName?: string;
  entryPrice?: number;
  targetPrice?: number;
  stopLoss?: number;
  action?: string;
  status?: string;
  performance?: string;
  volumeRatio?: string;
  distancePct?: string;
  author?: string;
  quoteText?: string;
  sessions?: number;
  linkUrl?: string;
}

export interface AlertDto {
  _id: string;
  category: AlertCategory;
  type: string;
  title: string;
  message: string;
  data?: AlertData;
  isRead: boolean;
  isHighlighted?: boolean;
  createdAt: string;
  timeAgo: string;
}

export interface AlertsListData {
  alerts: AlertDto[];
  activeTab: string;
  tabCounts: Record<AlertTab, number>;
  unreadCount: number;
  headerSubtitle: string;
  paginationInfo: { from: number; to: number; total: number; label: string };
}

export interface PageMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NotificationSettingsDto {
  toggles: {
    newSignals: boolean;
    signalProximity: boolean;
    signalClosed: boolean;
    marketConditionChange: boolean;
    watchlistMovers: boolean;
    communityReplies: boolean;
    announcements: boolean;
    dailyBriefingEmail?: boolean;
    weeklyWrapEmail: boolean;
  };
  channels: { inPlatform: boolean; email: boolean; browserPush: boolean; sms: boolean };
  quietHours: { enabled: boolean; from: string; to: string; description?: string };
}

export const alertsService = {
  async list(params: { tab?: AlertTab; page?: number; limit?: number; search?: string }) {
    const res = await apiClient.get<ApiResponse<AlertsListData> & { meta?: PageMeta }>("/alerts", { params });
    return res.data as { data: AlertsListData; meta?: PageMeta };
  },
  async unreadCount() {
    const res = await apiClient.get<ApiResponse<{ unreadCount: number; headerSubtitle: string }>>("/alerts/unread-count");
    return res.data.data;
  },
  async markAllRead() {
    const res = await apiClient.patch<ApiResponse<{ modifiedCount: number }>>("/alerts/read-all");
    return res.data.data;
  },
  async markRead(id: string) {
    const res = await apiClient.patch<ApiResponse<AlertDto>>(`/alerts/${id}/read`);
    return res.data.data;
  },
  async dismiss(id: string) {
    const res = await apiClient.delete<ApiResponse<{ id: string }>>(`/alerts/${id}`);
    return res.data.data;
  },
  async getSettings() {
    const res = await apiClient.get<ApiResponse<NotificationSettingsDto>>("/alerts/settings");
    return res.data.data;
  },
  async updateSettings(payload: Partial<NotificationSettingsDto>) {
    const res = await apiClient.put<ApiResponse<NotificationSettingsDto>>("/alerts/settings", payload);
    return res.data.data;
  },
};
