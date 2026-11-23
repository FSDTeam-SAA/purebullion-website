"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/services/apiClient";
import { signalsService, type SignalListQuery } from "@/services/signals.service";

export const signalKeys = {
  stats: ["signals", "stats"] as const,
  list: (q: SignalListQuery) => ["signals", "list", q] as const,
  detail: (id: string) => ["signals", "detail", id] as const,
  chart: (symbol: string, interval: string, size: number) => ["signals", "chart", symbol, interval, size] as const,
};

export function useSignalStats() {
  return useQuery({ queryKey: signalKeys.stats, queryFn: signalsService.getStats });
}

export function useSignalList(query: SignalListQuery) {
  return useQuery({
    queryKey: signalKeys.list(query),
    queryFn: () => signalsService.list(query),
    placeholderData: keepPreviousData,
  });
}

export function useSignalDetail(id?: string) {
  return useQuery({
    queryKey: signalKeys.detail(id ?? ""),
    queryFn: () => signalsService.getById(id as string),
    enabled: !!id,
  });
}

export function useSignalChart(symbol: string | undefined, interval: string, outputsize: number) {
  return useQuery({
    queryKey: signalKeys.chart(symbol ?? "", interval, outputsize),
    queryFn: () => signalsService.getChart(symbol as string, interval, outputsize),
    enabled: !!symbol,
  });
}

export function useAddToWatchlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: signalsService.addToWatchlist,
    onSuccess: (res) => {
      toast.success(res?.message || "Added to watchlist");
      qc.invalidateQueries({ queryKey: ["watchlist"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
