"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/services/apiClient";
import { subscriptionService, type BillingCycle } from "@/services/subscription.service";
import { profileKeys } from "./useProfile";

export const subscriptionKeys = {
  plans: ["subscription", "plans"] as const,
  mine: ["subscription", "mine"] as const,
  billing: (page: number, limit: number) => ["subscription", "billing", page, limit] as const,
};

export function usePlans() {
  return useQuery({ queryKey: subscriptionKeys.plans, queryFn: subscriptionService.getPlans, staleTime: 5 * 60_000 });
}

export function useMySubscription() {
  return useQuery({ queryKey: subscriptionKeys.mine, queryFn: subscriptionService.getMySubscription });
}

export function useBillingHistory(page: number, limit = 10) {
  return useQuery({
    queryKey: subscriptionKeys.billing(page, limit),
    queryFn: () => subscriptionService.getBillingHistory(page, limit),
    placeholderData: (prev) => prev,
  });
}

function useInvalidateSubscription() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["subscription"] });
    qc.invalidateQueries({ queryKey: profileKeys.me });
  };
}

export function useSubscribe() {
  const invalidate = useInvalidateSubscription();
  return useMutation({
    mutationFn: (p: { planId: string; billingCycle: BillingCycle }) =>
      subscriptionService.subscribe({ ...p, paymentMethod: "card" }),
    onSuccess: (r) => {
      toast.success(r.message || "Subscription updated");
      invalidate();
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useCancelSubscription() {
  const invalidate = useInvalidateSubscription();
  return useMutation({
    mutationFn: subscriptionService.cancel,
    onSuccess: (r) => {
      toast.success(r.message || "Subscription cancelled");
      invalidate();
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useDownloadInvoice() {
  return useMutation({
    mutationFn: ({ id, invoice }: { id: string; invoice: string }) => subscriptionService.downloadInvoice(id, invoice),
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useDownloadAllInvoices() {
  return useMutation({
    mutationFn: subscriptionService.downloadAllInvoices,
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
