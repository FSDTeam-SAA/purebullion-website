"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/services/apiClient";
import { stockScannerService, type ScanQuery, type ScannerFilters } from "@/services/stockScanner.service";

export const scannerKeys = {
  stats: ["scanner", "stats"] as const,
  run: (q: ScanQuery) => ["scanner", "run", q] as const,
  detail: (s: string) => ["scanner", "detail", s] as const,
  presets: ["scanner", "presets"] as const,
};

export function useScannerStats() {
  return useQuery({ queryKey: scannerKeys.stats, queryFn: stockScannerService.getStats });
}

export function useScanResults(query: ScanQuery) {
  return useQuery({
    queryKey: scannerKeys.run(query),
    queryFn: () => stockScannerService.run(query),
    placeholderData: keepPreviousData,
  });
}

export function useScannerDetail(symbol?: string) {
  return useQuery({
    queryKey: scannerKeys.detail(symbol ?? ""),
    queryFn: () => stockScannerService.getDetail(symbol as string),
    enabled: !!symbol,
  });
}

export function useScannerPresets() {
  return useQuery({ queryKey: scannerKeys.presets, queryFn: stockScannerService.getPresets });
}

export function useSavePreset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: { name: string; filters: ScannerFilters }) => stockScannerService.savePreset(p),
    onSuccess: () => {
      toast.success("Preset saved");
      qc.invalidateQueries({ queryKey: scannerKeys.presets });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useDeletePreset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => stockScannerService.deletePreset(id),
    onSuccess: () => {
      toast.success("Preset deleted");
      qc.invalidateQueries({ queryKey: scannerKeys.presets });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
