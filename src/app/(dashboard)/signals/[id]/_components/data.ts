export const stats = [
  { label: "Market Cap", value: "$3.48T", tone: "" },
  { label: "P/E Ratio", value: "34.5", tone: "" },
  { label: "52W High", value: "$237.49", tone: "text-pb-up" },
  { label: "52W Low", value: "$164.08", tone: "text-pb-down" },
  { label: "Volume", value: "28.4M", tone: "" },
  { label: "Avg Volume", value: "32.1M", tone: "" },
];

export const ohlc = [
  { value: "225.33", label: "Open", tone: "" },
  { value: "222.11", label: "Day Low", tone: "" },
  { value: "226.48", label: "Day High", tone: "" },
  { value: "28.4M", label: "Volume", tone: "" },
  { value: "32.1M", label: "Avg. Volume", tone: "" },
  { value: "+2.16%", label: "Day Change", tone: "text-pb-up" },
  { value: "+18.42%", label: "YTD Change", tone: "text-pb-up" },
];

export const ranges = ["1D", "1W", "1M", "3M", "6M", "1Y", "5Y", "All"];

export const related = [
  { t: "PLTR", img: "pltr" },
  { t: "NVDA", img: "nvda" },
  { t: "TSLA", img: "tsla" },
  { t: "AMD", img: "amd" },
  { t: "AVGO", img: "avgo" },
].map((r) => ({ ...r, price: "$42.18", chg: "+12.36%" }));

export const keyInfo = [
  ["Sector", "Technology"],
  ["Industry", "Consumer Electronics"],
  ["Market Cap", "$3.48T"],
  ["Shares Outstanding", "15.488"],
  ["EPS (TTM)", "$6.53"],
  ["P/E Ratio", "34.5"],
  ["Dividend Yield", "0.49%"],
  ["Ex-Divined Date", "Nov 08, 2025"],
];

export const news = [
  { title: "Apple shares rise on strong iPhone demand and services growth", src: "Bloomberg", time: "2h ago", img: "news1.jpg" },
  { title: "Apple unveils new AI features across its devices", src: "Reuter", time: "2h ago", img: "news2.jpg" },
  { title: "Analysts maintain Buy ratings on Apple, see long-term upside", src: "CNBC", time: "6h ago", img: "news3.jpg" },
];

export const rationaleFacts = [
  ["Market condition at publication", "Risk-On · score 72"],
  ["Momentum", "Accelerating across all three lookbacks"],
  ["Technical confirmation", "Close above the prior range high on 1.9x average volume"],
  ["Relative strength", "Accelerating across all three lookbacks"],
  ["Volatility regime", "Contained · ATR 2.4% of price"],
  ["Liquidity", "Median dollar volume 5.2x the minimum floor"],
];

export const timeline = [
  ["Signal generated", "All six condition families cleared threshold. Composite score 78."],
  ["Members notified", "Delivered in-platform, by email and browser push simultaneously."],
  ["Entry reference confirmed", "Reference price $251.30. Not a guaranteed fill."],
  ["Position tracking active", "All six condition families cleared threshold. Composite score 78."],
  ["Signal closed", "Stop loss triggered · return -2.90%"],
];

export type Candle = { t: string; open: number; close: number; low: number; high: number; range: [number, number]; vol: number; ma: number };

/** deterministic pseudo-random candles ending at ~226 */
export function buildCandles(n = 78): Candle[] {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  let price = 216.3;
  const out: Candle[] = [];
  const ma: number[] = [];
  for (let i = 0; i < n; i++) {
    const drift = i < 20 ? 0.18 : i < 50 ? 0.08 : i < 58 ? -0.15 : 0.12;
    const open = price;
    const close = open + drift + (rnd() - 0.5) * 1.6;
    const high = Math.max(open, close) + rnd() * 0.7;
    const low = Math.min(open, close) - rnd() * 0.7;
    price = close;
    ma.push(close);
    const win = ma.slice(-14);
    out.push({
      t: String(i),
      open, close, high, low,
      range: [low, high],
      vol: 40 + rnd() * 80 + (i === n - 1 ? 150 : 0),
      ma: win.reduce((a, b) => a + b, 0) / win.length - 0.6,
    });
  }
  return out;
}
