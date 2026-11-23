import { apiClient } from "./apiClient";
import type { ApiResponse } from "@/types/auth.types";
import type { PageMeta } from "@/lib/pagination";
import type { ChartData, NewsItem, Signal } from "./signals.service";

export interface ScannerStats {
  securitiesScanned: number;
  totalUniverseLabel: string;
  matches: number;
  newSinceOpen: number;
  lastRun: string;
  totalSignalsFound: number;
}

export interface ScannerFilters {
  marketCondition?: string;
  priceBehavior?: string;
  liquidity?: string;
  momentum?: string;
  technicalCondition?: string;
  entryCondition?: string;
  exitCondition?: string;
  maxStopDistance?: number;
  minRiskReward?: string;
}

export interface ScanQuery extends ScannerFilters {
  sort?: string;
  page?: number;
  limit?: number;
}

export type ScanMomentum = "Strong" | "Neutral" | "Weak";
export type ScanSignalSetup = "Buy setup" | "Open Signal" | "Watch" | "Hold";

export interface ScanStock {
  signalId?: string;
  ticker: string;
  companyName: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
  compositeScore: number;
  momentum: ScanMomentum;
  liquidity: string;
  risk: string;
  setup: string;
  priceBehavior: string;
  marketCondition: string;
  signalSetup: ScanSignalSetup;
  activeSignalId?: string;
  entry?: number;
  target?: number;
  stopLoss?: number;
}

export interface ScanResult {
  stocks: ScanStock[];
  paginationInfo: { currentPage: number; totalPages: number; totalData: number };
  meta?: PageMeta;
}

export interface ScannerPreset {
  _id: string;
  name: string;
  filters: ScannerFilters;
  createdAt?: string;
}

export interface ScoreItem {
  score: number;
  description: string;
}

export interface ScannerDetail {
  symbol: string;
  companyName: string;
  badge: string;
  sector: string;
  price: number;
  change: number;
  percentChange: number;
  timestamp: string;
  chartLevels: { entry: number; target: number; stopLoss: number };
  chart: ChartData | null;
  conditionScores: {
    composite: number;
    compositeLabel: string;
    trend: ScoreItem;
    momentum: ScoreItem;
    relativeStrength: ScoreItem;
    volatility: ScoreItem;
    liquidity: ScoreItem;
    marketCondition: ScoreItem;
  };
  keyData: {
    marketCap: string;
    volume: string;
    momentum: string;
    liquidity: string;
    risk: string;
    setup: string;
    sector: string;
  };
  activeSignal: Signal | null;
  signalHistory: {
    id: string;
    signal: "BUY" | "SELL";
    entry: number;
    lastExit: number;
    returnPct: number;
    outcome: string;
    closedDate: string;
  }[];
  relatedNews: NewsItem[];
  continueFromHere: { label: string; action: string; target: string }[];
}

export const stockScannerService = {
  async getStats() {
    const res = await apiClient.get<ApiResponse<ScannerStats>>("/stock-scanner/stats");
    return res.data.data;
  },

  async run(query: ScanQuery): Promise<ScanResult> {
    const params: Record<string, string | number> = {};
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== "") params[k] = v as string | number;
    });
    const res = await apiClient.get<ApiResponse<ScanResult>>("/stock-scanner/run", { params });
    return { ...res.data.data, meta: res.data.meta as unknown as PageMeta | undefined };
  },

  async getDetail(symbol: string) {
    const res = await apiClient.get<ApiResponse<ScannerDetail>>(
      `/stock-scanner/stock/${encodeURIComponent(symbol)}`
    );
    return res.data.data;
  },

  async getPresets() {
    const res = await apiClient.get<ApiResponse<ScannerPreset[]>>("/stock-scanner/presets");
    return res.data.data;
  },

  async savePreset(payload: { name: string; filters: ScannerFilters }) {
    const res = await apiClient.post<ApiResponse<ScannerPreset>>("/stock-scanner/presets", payload);
    return res.data;
  },

  async deletePreset(id: string) {
    const res = await apiClient.delete<ApiResponse<{ id: string }>>(`/stock-scanner/presets/${id}`);
    return res.data;
  },
};
