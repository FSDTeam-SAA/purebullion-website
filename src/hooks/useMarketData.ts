"use client";

import { useQuery } from "@tanstack/react-query";
import { marketDataService, type ChartInterval, type MoverKind } from "@/services/marketData.service";

export const useIndices = () =>
  useQuery({ queryKey: ["market-data", "indices"], queryFn: marketDataService.getIndices, refetchInterval: 60_000 });

export const useMarketState = () =>
  useQuery({ queryKey: ["market-data", "state"], queryFn: marketDataService.getMarketState, refetchInterval: 60_000 });

export const useMovers = (kind: MoverKind) =>
  useQuery({ queryKey: ["market-data", "movers", kind], queryFn: () => marketDataService.getMovers(kind) });

export const useEarnings = (outputsize = 20) =>
  useQuery({ queryKey: ["market-data", "earnings", outputsize], queryFn: () => marketDataService.getEarnings(outputsize) });

export const useMarketNews = (limit = 20) =>
  useQuery({ queryKey: ["market-data", "news", limit], queryFn: () => marketDataService.getNews(limit) });

export const useChart = (symbol: string, interval: ChartInterval, outputsize: number) =>
  useQuery({
    queryKey: ["market-data", "chart", symbol, interval, outputsize],
    queryFn: () => marketDataService.getChart(symbol, interval, outputsize),
    staleTime: 60_000,
  });
