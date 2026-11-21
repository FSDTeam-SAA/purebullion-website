import { apiClient } from "./apiClient";
import type { ApiResponse } from "@/types/auth.types";
import type { PageMeta } from "@/lib/pagination";

export type SignalStatus = "NEW" | "OPEN" | "CLOSED" | "Active";
export type SignalSide = "BUY" | "SELL";

export interface SignalTimelineItem {
  stage: string;
  description: string;
  date?: string;
}

export interface SignalConditionDetails {
  marketConditionAtPublication?: string;
  momentum?: string;
  technicalConfirmation?: string;
  relativeStrength?: string;
  volatilityRegime?: string;
  liquidity?: string;
}

export interface Signal {
  _id: string;
  signalId: string;
  type: SignalSide;
  status: SignalStatus;
  assetType?: string;
  symbol: string;
  companyName?: string;
  entry: number;
  target: number;
  stopLoss: number;
  riskReward?: string;
  confidence?: string;
  typicalHold?: string;
  rationaleTitle?: string;
  signalRationale?: string;
  conditionDetails?: SignalConditionDetails;
  timeline?: SignalTimelineItem[];
  openedAt?: string;
  closedAt?: string;
  lastExit?: number;
  returnPct?: number;
  currentPrice?: number;
  progressToTarget?: number;
  createdAt?: string;
}

export interface SignalListQuery {
  status?: string;
  type?: string;
  assetType?: string;
  symbol?: string;
  sort?: "newest" | "oldest";
  page?: number;
  limit?: number;
}

export interface SignalListData {
  signals: Signal[];
  paginationInfo: {
    currentPage: number;
    totalPages: number;
    totalData: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface SignalStats {
  total: number;
  counts: { new: number; open: number; closed: number };
  performance: { avgReturn: number; winRate: number; totalClosed: number };
}

export interface Quote {
  symbol: string;
  name?: string;
  exchange?: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  previousClose?: number;
  change: number;
  percentChange: number;
  volume?: number;
  avgVolume?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  isMarketOpen?: boolean;
  timestamp?: number;
}

export interface Candle {
  datetime: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartData {
  symbol: string;
  interval: string;
  candles: Candle[];
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url?: string;
  publishedAt: string;
  summary?: string;
  imageUrl?: string;
  relatedSymbols?: string[];
}

export interface KeyStatistics {
  marketCap?: number;
  trailingPE?: number;
  epsBasicTTM?: number;
  dividendYield?: string;
  sharesOutstanding?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  avgVolume3m?: number;
}

export interface CompanyProfile {
  symbol: string;
  name?: string;
  sector?: string;
  industry?: string;
  exchange?: string;
  logoUrl?: string;
}

export interface RelatedStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
}

export interface SignalDetail extends Signal {
  quote?: Quote | null;
  chart?: ChartData | null;
  news?: NewsItem[];
  keyInformation?: KeyStatistics | null;
  profile?: CompanyProfile | null;
  relatedStocks?: RelatedStock[];
}

export const signalsService = {
  async getStats() {
    const res = await apiClient.get<ApiResponse<SignalStats>>("/signals/stats");
    return res.data.data;
  },

  async list(query: SignalListQuery) {
    const params: Record<string, string | number> = {};
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== "" && v !== "all") params[k] = v as string | number;
    });
    const res = await apiClient.get<ApiResponse<SignalListData>>("/signals", { params });
    return { ...res.data.data, meta: res.data.meta as unknown as PageMeta | undefined };
  },

  async getById(id: string) {
    const res = await apiClient.get<ApiResponse<SignalDetail>>(`/signals/${encodeURIComponent(id)}`);
    return res.data.data;
  },

  async getChart(symbol: string, interval: string, outputsize: number) {
    const res = await apiClient.get<ApiResponse<ChartData>>(
      `/market-data/chart/${encodeURIComponent(symbol)}`,
      { params: { interval, outputsize } }
    );
    return res.data.data;
  },

  async addToWatchlist(payload: { symbol: string; companyName?: string }) {
    const res = await apiClient.post<ApiResponse<unknown>>("/watchlist", payload);
    return res.data;
  },
};
