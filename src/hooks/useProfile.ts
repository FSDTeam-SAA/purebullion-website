"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/services/apiClient";
import { authService } from "@/services/auth.service";
import {
  profileService,
  type NotificationPreferences,
  type UpdateProfilePayload,
} from "@/services/profile.service";

export const profileKeys = {
  me: ["profile", "me"] as const,
  notifications: ["profile", "notification-preferences"] as const,
};

/** Current logged-in user's profile (GET /user/me). */
export function useCurrentUser(enabled = true) {
  return useQuery({ queryKey: profileKeys.me, queryFn: profileService.getMe, staleTime: 60_000, enabled });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: UpdateProfilePayload) => profileService.updateMe(p),
    onSuccess: (data) => {
      qc.setQueryData(profileKeys.me, data);
      toast.success("Profile updated");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useUploadAvatar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, hasExisting }: { file: File; hasExisting: boolean }) =>
      profileService.uploadAvatar(file, hasExisting),
    onSuccess: (data) => {
      qc.setQueryData(profileKeys.me, data);
      toast.success("Photo updated");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useNotificationPreferences() {
  return useQuery({
    queryKey: profileKeys.notifications,
    queryFn: profileService.getNotificationPreferences,
  });
}

export function useUpdateNotificationPreferences() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: Partial<NotificationPreferences>) => profileService.updateNotificationPreferences(p),
    onSuccess: (data) => qc.setQueryData(profileKeys.notifications, data),
    onError: (e) => {
      toast.error(getErrorMessage(e));
      qc.invalidateQueries({ queryKey: profileKeys.notifications });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (p: { currentPassword: string; newPassword: string }) => authService.changePassword(p),
    onSuccess: () => toast.success("Password changed successfully"),
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useDeleteConversations() {
  return useMutation({
    mutationFn: profileService.deleteConversations,
    onSuccess: (r) => toast.success(r.message || "Conversation history deleted"),
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useCloseAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: { reason?: string; feedback?: string } = {}) => profileService.closeAccount(p),
    onSuccess: () => {
      toast.success("Account scheduled for closure in 90 days");
      qc.invalidateQueries({ queryKey: profileKeys.me });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useReopenAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: profileService.reopenAccount,
    onSuccess: () => {
      toast.success("Account reactivated");
      qc.invalidateQueries({ queryKey: profileKeys.me });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
