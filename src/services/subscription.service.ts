import { apiClient } from "./apiClient";
import type { ApiResponse } from "@/types/auth.types";

export type BillingCycle = "monthly" | "yearly";

export interface PlanFeatures {
  [key: string]: unknown;
}

export interface SubscriptionPlan {
  _id: string;
  name: string;
  slug: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  benefits: string[];
  features: PlanFeatures;
  isActive: boolean;
  isPopular: boolean;
  sortOrder: number;
}

export interface UserSubscription {
  _id: string;
  plan: SubscriptionPlan | string;
  billingCycle: BillingCycle;
  amount: number;
  currency: string;
  status: "ACTIVE" | "SUSPENDED" | "EXPIRED" | "CANCELLED";
  startDate: string;
  renewalDate: string;
  endDate: string;
  cancelledAt?: string | null;
  autoRenew: boolean;
  paymentStatus: string;
  paymentMethod?: string;
  invoiceNumber?: string;
}

export interface MySubscription {
  hasActiveSubscription: boolean;
  daysRemaining?: number;
  subscription?: UserSubscription;
  currentSubscription?: null;
  lastSubscription?: UserSubscription | null;
  features?: PlanFeatures;
  benefits?: string[];
}

export interface BillingItem {
  _id: string;
  invoice: string;
  date: string;
  formattedDate: string;
  description: string;
  amount: number;
  formattedAmount: string;
  status: string;
}

export interface BillingHistoryData {
  billingHistory: BillingItem[];
  paginationInfo: {
    currentPage: number;
    totalPages: number;
    totalData: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/** Save a blob response as a file download. */
function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const subscriptionService = {
  async getPlans() {
    const r = await apiClient.get<ApiResponse<SubscriptionPlan[]>>("/subscription/plans");
    return r.data.data;
  },
  async getMySubscription() {
    const r = await apiClient.get<ApiResponse<MySubscription>>("/subscription/my-subscription");
    return r.data.data;
  },
  async subscribe(payload: { planId: string; billingCycle: BillingCycle; paymentMethod?: string }) {
    const r = await apiClient.post<ApiResponse<{ subscription: UserSubscription }>>("/subscription/subscribe", payload);
    return r.data;
  },
  async cancel() {
    const r = await apiClient.post<ApiResponse<UserSubscription>>("/subscription/cancel");
    return r.data;
  },
  async getBillingHistory(page = 1, limit = 10) {
    const r = await apiClient.get<ApiResponse<BillingHistoryData>>("/subscription/billing-history", {
      params: { page, limit },
    });
    return r.data.data;
  },
  async downloadInvoice(id: string, invoice: string) {
    const r = await apiClient.get<Blob>(`/subscription/billing-history/${id}/download`, { responseType: "blob" });
    saveBlob(r.data, `invoice-${invoice}.html`);
  },
  async downloadAllInvoices() {
    const r = await apiClient.get<Blob>("/subscription/billing-history/download-all", { responseType: "blob" });
    saveBlob(r.data, "purebullion-billing-statement.html");
  },
};
