"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/services/apiClient";
import { alertsService, type AlertTab, type NotificationSettingsDto } from "@/services/alerts.service";

export const alertKeys = {
  all: ["alerts"] as const,
  list: (tab: AlertTab, page: number, limit: number) => ["alerts", "list", tab, page, limit] as const,
  unread: ["alerts", "unread-count"] as const,
  settings: ["alerts", "settings"] as const,
};

export function useAlertsList(tab: AlertTab, page: number, limit = 9) {
  return useQuery({
    queryKey: alertKeys.list(tab, page, limit),
    queryFn: () => alertsService.list({ tab, page, limit }),
    placeholderData: keepPreviousData,
    refetchInterval: 30_000,
  });
}

/** Unread alert badge count (for TopNav / Sidebar). */
export function useUnreadAlertsCount() {
  const q = useQuery({
    queryKey: alertKeys.unread,
    queryFn: () => alertsService.unreadCount(),
    refetchInterval: 30_000,
  });
  return { count: q.data?.unreadCount ?? 0, subtitle: q.data?.headerSubtitle, ...q };
}

function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: alertKeys.all });
}

export function useMarkAllAlertsRead() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: alertsService.markAllRead,
    onSuccess: () => {
      toast.success("All alerts marked as read");
      invalidate();
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useMarkAlertRead() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: alertsService.markRead,
    onSuccess: invalidate,
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useDismissAlert() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: alertsService.dismiss,
    onSuccess: invalidate,
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useNotificationSettings() {
  return useQuery({ queryKey: alertKeys.settings, queryFn: alertsService.getSettings });
}

export function useUpdateNotificationSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: Partial<NotificationSettingsDto>) => alertsService.updateSettings(p),
    onSuccess: (data) => qc.setQueryData(alertKeys.settings, data),
    onError: (e) => {
      toast.error(getErrorMessage(e));
      qc.invalidateQueries({ queryKey: alertKeys.settings });
    },
  });
}
