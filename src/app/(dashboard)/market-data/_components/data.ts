export type IndexTile = { label: string; value: string; change: string; trend: "up" | "down" };
export const indexTiles: IndexTile[] = [
  { label: "S&P 500", value: "6,021.13", change: "+0.45%", trend: "up" },
  { label: "NASDAQ", value: "19,432.56", change: "+0.66%", trend: "up" },
  { label: "DOW Jones", value: "43,705.21", change: "-0.19%", trend: "down" },
  { label: "RUSSELL 2000", value: "2,246.18", change: "+0.45%", trend: "up" },
  { label: "VIX", value: "16.42", change: "-3.37%", trend: "down" },
  { label: "10Y Treasury", value: "4.12", change: "+0.45%", trend: "up" },
];

export const indexTabs = ["S&P 500", "Nasdaq", "Dow Jones", "Russell 2000", "VIX"] as const;
export const rangeTabs = ["1D", "1W", "1M", "3M", "1Y", "5Y", "All"] as const;
export type IndexName = (typeof indexTabs)[number];
export type RangeName = (typeof rangeTabs)[number];

export const indexMeta: Record<IndexName, { value: string; change: string; base: number; prevClose: number }> = {
  "S&P 500": { value: "6,021.13", change: "+24.82 (+0.41%)", base: 6000, prevClose: 5996.31 },
  Nasdaq: { value: "19,432.56", change: "+127.40 (+0.66%)", base: 19300, prevClose: 19305.16 },
  "Dow Jones": { value: "43,705.21", change: "-83.10 (-0.19%)", base: 43800, prevClose: 43788.31 },
  "Russell 2000": { value: "2,246.18", change: "+10.07 (+0.45%)", base: 2236, prevClose: 2236.11 },
  VIX: { value: "16.42", change: "-0.57 (-3.37%)", base: 16.9, prevClose: 16.99 },
};

const labelsByRange: Record<RangeName, string[]> = {
  "1D": ["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM", "3:30 PM", "4:00 PM"],
  "1W": ["Mon", "Tue", "Wed", "Thu", "Fri"],
  "1M": ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
  "3M": ["Aug", "Sep", "Oct", "Nov"],
  "1Y": ["Dec", "Mar", "Jun", "Sep", "Nov"],
  "5Y": ["2021", "2022", "2023", "2024", "2025"],
  All: ["2015", "2018", "2021", "2024"],
};

/** Deterministic pseudo-random series so the chart is stable between renders. */
export function buildSeries(index: IndexName, range: RangeName) {
  const { base } = indexMeta[index];
  const n = 72;
  const labels = labelsByRange[range];
  const seed = indexTabs.indexOf(index) * 7 + rangeTabs.indexOf(range) * 13 + 3;
  const amp = base * (range === "1D" ? 0.0035 : range === "1W" ? 0.012 : 0.04);
  const drift = range === "1D" ? 0.8 : 1.2;
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const wave = Math.sin(i * 0.55 + seed) * 0.35 + Math.sin(i * 1.3 + seed * 2) * 0.2 + Math.sin(i * 0.17 + seed) * 0.6;
    const v = base + amp * (wave + t * 3 * drift - 0.2);
    const label = labels[Math.min(labels.length - 1, Math.round(t * (labels.length - 1)))];
    return { i, label, value: Number(v.toFixed(2)) };
  });
}

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

export type Mover = { rank: number; symbol: string; logo: string; price: string; change: string; volume: string };
const mv = (rank: number, symbol: string, change: string): Mover => ({
  rank,
  symbol,
  logo: `/images/market-data/${symbol === "AMZN" ? "dis" : symbol.toLowerCase()}.png`,
  price: "$42.18",
  change,
  volume: "85.5M",
});
export const topGainers: Mover[] = ["PLTR", "NVDA", "TSLA", "AMD", "AVGO"].map((s, i) => mv(i + 1, s, "+12.36%"));
export const topLosers: Mover[] = ["INTC", "MRNA", "PYPL", "F", "DIS"].map((s, i) => mv(i + 1, s, "-12.36%"));
export const mostActive: Mover[] = [
  mv(1, "NVDA", "+12.36%"),
  mv(2, "TSLA", "-12.36%"),
  mv(3, "AAPL", "+12.36%"),
  mv(4, "PLTR", "+12.36%"),
  mv(5, "AMZN", "-12.36%"),
];

export const earnings = [
  { date: "Nov 10, 2025", symbol: "PLTR", company: "Palantir Technologies Inc", eps: "$4.12", time: "Before open" },
  { date: "Nov 10, 2025", symbol: "NVDA", company: "NVIDIA Corp", eps: "$0.18", time: "After  close" },
  { date: "Nov 10, 2025", symbol: "TSLA", company: "Tesla Inc", eps: "$3.00", time: "Before open" },
  { date: "Nov 10, 2025", symbol: "AMD", company: "Advanced Micro Devices Inc", eps: "$2.31", time: "Before open" },
  { date: "Nov 10, 2025", symbol: "AVGO", company: "Broadcom Inc", eps: "$0.58", time: "Before open" },
].map((e) => ({ ...e, logo: `/images/market-data/${e.symbol.toLowerCase()}.png` }));

export const news = [
  { title: "Fed Signals Caution as Inflation Remains Sticky", source: "Bloomberg", time: "2h ago", image: "/images/market-data/news-1.png" },
  { title: "Tech Stocks Lead Market Higher Amid ai Optimism", source: "Reuter", time: "2h ago", image: "/images/market-data/news-2.png" },
  { title: "Oil Prices fall in Higher Inventories , Weaker Demand", source: "CNBC", time: "6h ago", image: "/images/market-data/news-3.png" },
];
