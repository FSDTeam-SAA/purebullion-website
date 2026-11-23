"use client";

import type { ReactNode } from "react";

/** Minimal, theme-matching loading / error / empty states for API-backed panels. */
export function PanelLoading({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3 p-4" aria-busy="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-8 animate-pulse rounded bg-pb-head" />
      ))}
    </div>
  );
}

export function PanelError({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 p-6 text-center text-[14px] text-pb-muted">
      <span>{message || "Something went wrong while loading this data."}</span>
      {onRetry && (
        <button onClick={onRetry} className="rounded border border-pb-head px-3 py-1 text-pb-text hover:bg-white/[0.04]">
          Retry
        </button>
      )}
    </div>
  );
}

export function PanelEmpty({ children }: { children?: ReactNode }) {
  return <div className="p-6 text-center text-[14px] text-pb-muted">{children ?? "No data to show."}</div>;
}
