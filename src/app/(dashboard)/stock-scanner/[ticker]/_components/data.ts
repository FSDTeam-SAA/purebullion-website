export const RANGES = ["1D", "5D", "1M", "6M", "6M", "1Y"];

export const QUOTE = {
  price: "$182.42",
  change: "+4.96 (+2.80%)",
  asOf: "Sep 19 · 16:00 ET close",
  entry: 180.8,
  stop: 175.4,
  /** upper reference level drawn as a green dashed line */
  upper: 188.5,
  avgVolume: "30-day average 176.1M",
};

export type Candle = { i: number; open: number; close: number; high: number; low: number; up: boolean };

// deterministic pseudo random so server/client markup matches
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const ANCHORS: [number, number][] = [
  [0, 176.5], [3, 175.2], [8, 173.6], [11, 174.8], [15, 178.5], [19, 183.4], [23, 187.2],
  [28, 185.6], [33, 186.4], [37, 185.2], [41, 181.6], [44, 180.4], [47, 187.6],
];

function anchorAt(i: number) {
  for (let a = 0; a < ANCHORS.length - 1; a++) {
    const [x0, y0] = ANCHORS[a];
    const [x1, y1] = ANCHORS[a + 1];
    if (i >= x0 && i <= x1) return y0 + ((y1 - y0) * (i - x0)) / (x1 - x0);
  }
  return ANCHORS[ANCHORS.length - 1][1];
}

export const CANDLES: Candle[] = (() => {
  const rand = rng(42);
  let prevClose = anchorAt(0);
  return Array.from({ length: 48 }, (_, i) => {
    const open = prevClose;
    const close = anchorAt(i) + (rand() - 0.5) * 2.2;
    const high = Math.max(open, close) + rand() * 1.1 + 0.2;
    const low = Math.min(open, close) - rand() * 1.1 - 0.2;
    prevClose = close;
    return { i, open, close, high, low, up: close >= open };
  });
})();

export const VOLUME = [
  { v: 22, up: true }, { v: 14, up: false }, { v: 38, up: true }, { v: 18, up: true },
  { v: 30, up: false }, { v: 50, up: true }, { v: 20, up: true }, { v: 10, up: false },
  { v: 34, up: true }, { v: 42, up: true }, { v: 16, up: false }, { v: 36, up: true },
  { v: 14, up: true }, { v: 44, up: true }, { v: 18, up: false }, { v: 32, up: true },
];

export const KEY_DATA = [
  { label: "Market Cap", value: "$4.44T" },
  { label: "Volume", value: "214.8M" },
  { label: "Momentum", value: "Strong" },
  { label: "Liquidity", value: "High" },
  { label: "Risk", value: "Moderate" },
  { label: "Setup", value: "Breakout continuation" },
  { label: "Sector", value: "Technology" },
];

export const SCORES = [
  { label: "Trend", score: 84, note: "Above 20, 50 and 200-day; all three sloping up" },
  { label: "Momentum", score: 81, note: "Accelerating across 10, 20 and 60-day lookbacks" },
  { label: "Relative strength", score: 76, note: "20-day RS versus S&P 500 at a new high" },
  { label: "Volatility", score: 62, note: "ATR 2.4% of price; range expanding" },
  { label: "Liquidity", score: 95, note: "Median dollar volume well above the floor" },
  { label: "Market condition", score: 72, note: "Risk-On permits long publication" },
];

export const ACTIVE_SIGNAL = {
  side: "BUY" as const,
  ticker: "NVDA",
  company: "NVIDIA Corp",
  id: "PB-2481",
  entry: "$180.80",
  target: "$194.00",
  stop: "$175.40",
  progress: "+0.90% from entry",
  facts: [
    { label: "Opened", value: "Sep 18, 2026 · 10:14 ET" },
    { label: "Risk / reward", value: "1 : 2.44" },
    { label: "Confidence", value: "High" },
    { label: "Typical hold", value: "3–10 sessions" },
  ],
  rationale:
    "Price cleared a six-session consolidation on 1.9x average volume while relative strength versus the S&P 500 made a new 20-day high. Momentum, trend and volume conditions aligned at the close.",
};

export const CONTINUE_LINKS = [
  { label: "Ask AI About NVDA", href: "/ai-assistant", icon: "ai" as const },
  { label: "Open Signal Details", href: "/signals", icon: "signals" as const },
  { label: "NVDA News", href: "/news-research", icon: "news" as const },
  { label: "Back to Scanner", href: "/stock-scanner", icon: "scan" as const },
];

export const NEWS = [
  { title: "NVIDIA shares rise on data-center demand", source: "Bloomberg", time: "2h ago", image: "/images/stock-scanner/news-27.jpg" },
  { title: "NVIDIA expands AI platform capabilities", source: "Reuter", time: "2h ago", image: "/images/stock-scanner/news-28.jpg" },
  { title: "Analysts update NVIDIA outlook after earnings", source: "CNBC", time: "6h ago", image: "/images/stock-scanner/news-29.jpg" },
];

export const HISTORY = [
  { id: "PB-2481", side: "BUY" as const, entry: "$180.80", last: "$182.42", ret: "+0.90%", outcome: "Open", closed: "Sep 18, 2026" },
  { id: "PB-2477", side: "SELL" as const, entry: "$180.80", last: "$182.42", ret: "+2.14%", outcome: "Target reached", closed: "Sep 11, 2026" },
  { id: "PB-2473", side: "BUY" as const, entry: "$180.80", last: "$182.42", ret: "+5.73%", outcome: "Stop loss triggered", closed: "Sep 10, 2026" },
];
