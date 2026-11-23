import { apiClient } from "./apiClient";
import type { ApiResponse } from "@/types/auth.types";

export interface MarketIndex {
  symbol: string;
  label: string;
  name?: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  change: number;
  percentChange: number;
  previousClose: number;
  volume?: number;
  isMarketOpen?: boolean;
  timestamp?: number;
}

export interface MarketState {
  name: string;
  code: string;
  country: string;
  is_market_open: boolean;
  time_to_open: string;
  time_to_close: string;
  time_after_open: string;
}

export interface MarketNewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
  imageUrl: string;
  relatedSymbols: string[];
}

export interface MoverItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  volume: number;
}

export interface EarningsItem {
  symbol: string;
  company: string;
  date: string;
  time: string;
  epsEstimate: string | null;
  epsActual: string | null;
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
  meta: Record<string, unknown>;
  candles: Candle[];
}

export type MoverKind = "gainers" | "losers" | "most-active";
export type ChartInterval = "1min" | "5min" | "15min" | "30min" | "1h" | "2h" | "4h" | "1day" | "1week" | "1month";

export const marketDataService = {
  async getIndices() {
    const { data } = await apiClient.get<ApiResponse<MarketIndex[]>>("/market-data/indices");
    return data.data;
  },
  async getMarketState() {
    const { data } = await apiClient.get<ApiResponse<MarketState[]>>("/market-data/market-state");
    return data.data;
  },
  async getNews(limit = 20, symbol?: string) {
    const { data } = await apiClient.get<ApiResponse<MarketNewsItem[]>>("/market-data/news", {
      params: { limit, ...(symbol ? { symbol } : {}) },
    });
    return data.data;
  },
  async getMovers(kind: MoverKind) {
    const { data } = await apiClient.get<ApiResponse<MoverItem[]>>(`/market-data/${kind}`);
    return data.data;
  },
  async getEarnings(outputsize = 20, symbol?: string) {
    const { data } = await apiClient.get<ApiResponse<EarningsItem[]>>("/market-data/earnings", {
      params: { outputsize, ...(symbol ? { symbol } : {}) },
    });
    return data.data;
  },
  async getChart(symbol: string, interval: ChartInterval = "1day", outputsize = 90) {
    const { data } = await apiClient.get<ApiResponse<ChartData>>(`/market-data/chart/${encodeURIComponent(symbol)}`, {
      params: { interval, outputsize },
    });
    return data.data;
  },
};
