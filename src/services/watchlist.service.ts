import { apiClient } from "./apiClient";
import type { ApiResponse } from "@/types/auth.types";

export type WatchTab = "all" | "with_signal" | "movers";

export interface WatchlistItem {
  ticker: string;
  companyName: string;
  price: string;
  numericPrice: number;
  dailyChange: string;
  percentChange: number;
  isPositive: boolean;
  sparkline: number[];
  volume: string;
  marketCondition: string;
  signalSetup: string;
  activeSignalId: string | null;
}

export interface WatchlistStats {
  tickersTracked: number;
  withOpenSignals: number;
  upToday: number;
  averageMove: string;
  limitInfo: string;
}

export interface WatchlistPage {
  watchlist: WatchlistItem[];
  paginationInfo: {
    currentPage: number;
    totalPages: number;
    totalData: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  stats: WatchlistStats;
}

export interface WatchlistSuggestion {
  symbol: string;
  name: string;
  change: string;
  isPositive: boolean;
  isAdded: boolean;
}

export interface UniverseResult {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: string;
  pct: number;
  volume: string;
  marketCondition: string;
  badge: string;
}

export const watchlistService = {
  async list(params: { tab: WatchTab; page: number; limit: number; search?: string }) {
    const res = await apiClient.get<ApiResponse<WatchlistPage>>("/watchlist", { params });
    return res.data.data;
  },

  async stats(): Promise<WatchlistStats & { tickersTrackedUniverseLabel?: string }> {
    const res = await apiClient.get<ApiResponse<WatchlistStats & { tickersTrackedUniverseLabel?: string }>>(
      "/watchlist/stats"
    );
    return res.data.data;
  },

  async suggestions() {
    const res = await apiClient.get<ApiResponse<WatchlistSuggestion[]>>("/watchlist/suggestions");
    return res.data.data;
  },

  async search(q: string) {
    const res = await apiClient.get<ApiResponse<UniverseResult[]>>("/watchlist/search", { params: { q } });
    return res.data.data;
  },

  async add(payload: { symbol: string; companyName?: string; notes?: string }) {
    const res = await apiClient.post<ApiResponse<unknown>>("/watchlist", payload);
    return res.data;
  },

  async remove(symbol: string) {
    const res = await apiClient.delete<ApiResponse<{ symbol: string }>>(`/watchlist/${encodeURIComponent(symbol)}`);
    return res.data;
  },

  /** Downloads the watchlist export as a file in the browser. */
  async exportFile(format: "csv" | "json") {
    const res = await apiClient.get(`/watchlist/export`, { params: { format }, responseType: "blob" });
    const blob = res.data as Blob;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `purebullion_watchlist.${format}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },
};
