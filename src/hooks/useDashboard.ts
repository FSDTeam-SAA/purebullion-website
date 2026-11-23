"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

/** Single shared query for the whole dashboard page (all panels read from it). */
export function useDashboardOverview() {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: dashboardService.getOverview,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}
