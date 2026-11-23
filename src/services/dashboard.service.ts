import { apiClient } from "./apiClient";
import type { ApiResponse } from "@/types/auth.types";

export type Side = "BUY" | "SELL";

export interface DashboardIndex {
  name: string;
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  sparkline: number[];
  isPositive: boolean;
}

export interface DashboardOverview {
  greeting: string;
  summary: string;
  marketStatus: string;
  indices: DashboardIndex[];
  marketCondition: { badge: string; title: string; description: string; conditionScore: number };
  dailyBriefing: {
    updated: string;
    headline: string;
    body: string;
    breadth: string;
    sectorLeader: string;
    laggard: string;
    fullBriefingUrl?: string;
  };
  approachingEntry: {
    symbol: string;
    companyName: string;
    type: Side;
    subtext: string;
    triggerPrice: number;
    distancePct: string;
  }[];
  openSignals: {
    signalId: string;
    symbol: string;
    type: Side;
    companyName: string;
    entry: number;
    stopLoss: number;
    last: number;
    fromEntry: string;
    progress: number;
    openedDate: string;
  }[];
  newSignals: {
    signalId: string;
    symbol: string;
    type: Side;
    companyName: string;
    entry: number;
    target: number;
    stopLoss: number;
    last: number;
    riskReward: string;
    actionUrl: string;
  }[];
  watchlistMovement: {
    symbol: string;
    companyName: string;
    price: number;
    change: string;
    isPositive: boolean;
    volume: string;
    signalBadge: string;
    sparkline: number[];
  }[];
  recentlyClosed: {
    symbol: string;
    companyName: string;
    type: Side;
    subtext: string;
    held: string;
    result: string;
    isPositive: boolean;
  }[];
}

export const dashboardService = {
  async getOverview(): Promise<DashboardOverview> {
    const res = await apiClient.get<ApiResponse<DashboardOverview>>("/dashboard/overview");
    return res.data.data;
  },
};
