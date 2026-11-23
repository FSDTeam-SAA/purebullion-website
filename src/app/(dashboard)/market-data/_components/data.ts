import type { ChartInterval } from "@/services/marketData.service";

export const indexTabs = ["S&P 500", "Nasdaq", "Dow Jones", "Russell 2000", "VIX"] as const;
export const rangeTabs = ["1D", "1W", "1M", "3M", "1Y", "5Y", "All"] as const;
export type IndexName = (typeof indexTabs)[number];
export type RangeName = (typeof rangeTabs)[number];

/** Index tab -> tracking ETF symbol served by the backend (/market-data/indices). */
export const indexSymbol: Record<IndexName, string> = {
  "S&P 500": "SPY",
  Nasdaq: "QQQ",
  "Dow Jones": "DIA",
  "Russell 2000": "IWM",
  VIX: "VXX",
};

/** Tile labels keyed by backend symbol. */
export const tileLabel: Record<string, string> = {
  SPY: "S&P 500",
  QQQ: "NASDAQ",
  DIA: "DOW Jones",
  IWM: "RUSSELL 2000",
  VXX: "VIX",
  TLT: "20Y Treasury",
};

/** Chart range -> Twelve Data interval / number of bars. */
export const rangeConfig: Record<RangeName, { interval: ChartInterval; outputsize: number }> = {
  "1D": { interval: "5min", outputsize: 78 },
  "1W": { interval: "1h", outputsize: 35 },
  "1M": { interval: "1day", outputsize: 22 },
  "3M": { interval: "1day", outputsize: 66 },
  "1Y": { interval: "1week", outputsize: 52 },
  "5Y": { interval: "1month", outputsize: 60 },
  All: { interval: "1month", outputsize: 240 },
};

// NOTE: the backend has no market-breadth or sector-performance endpoint yet,
// so these two cards remain static.
export const marketBreadth = { advancing: "2,246.18", unchanged: "412", declining: "1,276" };

export const sectors = [
  "Advancing",
  "Communication Services",
  "Consumer Cyclical",
  "Financial Services",
  "Industrials",
  "Consumer Defensive",
  "Healthcare",
  "Real estate",
].map((name) => ({ name, pct: 86, change: "+1.86%" }));

/** Local logo files that ship with the dashboard; anything else falls back to an initial. */
const LOGOS = new Set(["amd", "avgo", "dis", "f", "intc", "mrna", "nvda", "pltr", "pypl", "tsla"]);
export const logoFor = (symbol: string) => (LOGOS.has(symbol.toLowerCase()) ? `/images/market-data/${symbol.toLowerCase()}.png` : null);
