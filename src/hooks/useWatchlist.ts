"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/services/apiClient";
import { watchlistService, type WatchTab } from "@/services/watchlist.service";

export function useWatchlist(params: { tab: WatchTab; page: number; limit: number }) {
  return useQuery({
    queryKey: ["watchlist", "list", params],
    queryFn: () => watchlistService.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useWatchlistStats() {
  return useQuery({ queryKey: ["watchlist", "stats"], queryFn: watchlistService.stats });
}

export function useWatchlistSuggestions(enabled = true) {
  return useQuery({ queryKey: ["watchlist", "suggestions"], queryFn: watchlistService.suggestions, enabled });
}

export function useUniverseSearch(q: string) {
  return useQuery({
    queryKey: ["watchlist", "search", q],
    queryFn: () => watchlistService.search(q),
    enabled: q.trim().length > 0,
    staleTime: 60_000,
  });
}

function useInvalidateWatchlist() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["watchlist"] });
    qc.invalidateQueries({ queryKey: ["dashboard"] });
  };
}

export function useAddTicker() {
  const invalidate = useInvalidateWatchlist();
  return useMutation({
    mutationFn: watchlistService.add,
    onSuccess: (res) => {
      toast.success(res.message || "Added to watchlist");
      invalidate();
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useRemoveTicker() {
  const invalidate = useInvalidateWatchlist();
  return useMutation({
    mutationFn: watchlistService.remove,
    onSuccess: (res) => {
      toast.success(res.message || "Removed from watchlist");
      invalidate();
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useExportWatchlist() {
  return useMutation({
    mutationFn: watchlistService.exportFile,
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
