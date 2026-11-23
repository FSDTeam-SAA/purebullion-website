/** Shared formatting helpers for dashboard API data. */
export const fmtPrice = (n?: number | null) =>
  typeof n === "number" && isFinite(n)
    ? `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "—";

export const fmtNumber = (n?: number | null, digits = 2) =>
  typeof n === "number" && isFinite(n)
    ? n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })
    : "—";

export const fmtPct = (n?: number | null, digits = 2) =>
  typeof n === "number" && isFinite(n) ? `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toFixed(digits)}%` : "—";

export const fmtCompact = (n?: number | null) =>
  typeof n === "number" && isFinite(n)
    ? Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n)
    : "—";

export const fmtDate = (d?: string | Date | null) => {
  if (!d) return "—";
  const dt = new Date(d);
  return isNaN(dt.getTime())
    ? "—"
    : dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const timeAgo = (d?: string | Date | null) => {
  if (!d) return "";
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (isNaN(s)) return "";
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};
