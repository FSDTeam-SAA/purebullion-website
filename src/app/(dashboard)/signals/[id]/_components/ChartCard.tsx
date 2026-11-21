"use client";

import { useMemo, useState } from "react";
import { Maximize2, RefreshCw, SlidersHorizontal } from "lucide-react";
import { Bar, Cell, CartesianGrid, ComposedChart, Line, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { useSignalChart } from "@/hooks/useSignals";
import type { SignalDetail } from "@/services/signals.service";
import { fmtCompact, fmtPct } from "@/lib/format";
import { PanelEmpty, PanelLoading } from "../../../_components/shared";

const UP = "#20A978";
const DOWN = "#EF4444";

/** UI range -> Twelve Data interval / bars */
const RANGE_CONFIG: Record<string, { interval: string; size: number }> = {
  "1D": { interval: "5min", size: 78 },
  "1W": { interval: "1h", size: 35 },
  "1M": { interval: "1day", size: 22 },
  "3M": { interval: "1day", size: 66 },
  "6M": { interval: "1day", size: 130 },
  "1Y": { interval: "1week", size: 52 },
  "5Y": { interval: "1month", size: 60 },
  All: { interval: "1month", size: 240 },
};
const ranges = Object.keys(RANGE_CONFIG);

type Candle = { t: string; label: string; open: number; close: number; low: number; high: number; range: [number, number]; vol: number; ma: number };
type ShapeProps = { x?: number; y?: number; width?: number; height?: number; payload?: Candle };

function CandleShape({ x = 0, y = 0, width = 0, height = 0, payload }: ShapeProps) {
  if (!payload) return null;
  const { open, close, high, low } = payload;
  const up = close >= open;
  const color = up ? UP : DOWN;
  const span = high - low || 1;
  const px = height / span;
  const bodyTop = y + (high - Math.max(open, close)) * px;
  const bodyH = Math.max(1.5, Math.abs(close - open) * px);
  const cx = x + width / 2;
  const bw = Math.max(2, width * 0.55);
  return (
    <g>
      <line x1={cx} x2={cx} y1={y} y2={y + height} stroke={color} strokeWidth={1} />
      <rect x={cx - bw / 2} y={bodyTop} width={bw} height={bodyH} fill={color} />
    </g>
  );
}

function labelFor(datetime: string, intraday: boolean) {
  const d = new Date(datetime.replace(" ", "T"));
  if (isNaN(d.getTime())) return datetime;
  return intraday
    ? d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ChartCard({ d }: { d: SignalDetail }) {
  const [range, setRange] = useState("3M");
  const cfg = RANGE_CONFIG[range];
  const { data: chart, isLoading } = useSignalChart(d.symbol, cfg.interval, cfg.size);

  const data = useMemo<Candle[]>(() => {
    const raw = [...(chart?.candles ?? d.chart?.candles ?? [])].sort((a, b) => a.datetime.localeCompare(b.datetime));
    const intraday = cfg.interval.endsWith("min") || cfg.interval.endsWith("h");
    return raw.map((c, i, arr) => {
      const win = arr.slice(Math.max(0, i - 13), i + 1);
      return {
        t: String(i),
        label: labelFor(c.datetime, intraday),
        open: c.open,
        close: c.close,
        high: c.high,
        low: c.low,
        range: [c.low, c.high] as [number, number],
        vol: c.volume,
        ma: win.reduce((s, x) => s + x.close, 0) / win.length,
      };
    });
  }, [chart, d.chart, cfg.interval]);

  const q = d.quote;
  const ohlc = [
    { value: q?.open?.toFixed(2) ?? "—", label: "Open", tone: "" },
    { value: q?.low?.toFixed(2) ?? "—", label: "Day Low", tone: "" },
    { value: q?.high?.toFixed(2) ?? "—", label: "Day High", tone: "" },
    { value: fmtCompact(q?.volume), label: "Volume", tone: "" },
    { value: fmtCompact(q?.avgVolume), label: "Avg. Volume", tone: "" },
    { value: fmtPct(q?.percentChange), label: "Day Change", tone: (q?.percentChange ?? 0) >= 0 ? "text-pb-up" : "text-pb-down" },
    { value: "—", label: "YTD Change", tone: "" },
  ];

  const last = data.length ? data[data.length - 1].close : undefined;
  const lows = data.map((c) => c.low);
  const highs = data.map((c) => c.high);
  const pad = data.length ? (Math.max(...highs) - Math.min(...lows)) * 0.08 || 1 : 1;
  const yDomain: [number, number] = data.length ? [Math.min(...lows) - pad, Math.max(...highs) + pad] : [0, 1];
  const maxVol = data.length ? Math.max(...data.map((c) => c.vol)) : 1;
  const tickCount = Math.min(9, data.length);
  const tickIdx = Array.from({ length: tickCount }, (_, i) =>
    String(tickCount > 1 ? Math.round((i * (data.length - 1)) / (tickCount - 1)) : 0)
  );

  return (
    <section className="rounded-[8px] border border-pb-line bg-pb-surface p-4">
      <div className="rounded-[8px] border border-pb-line bg-[#05090B] p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-[4px] border border-pb-line bg-pb-surface p-1">
            {ranges.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={cn(
                  "h-9 min-w-[46px] rounded-[4px] border border-transparent px-3 text-[14px] text-pb-text",
                  range === r && "border-pb-gold bg-[rgba(231,192,66,0.12)]"
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="flex h-10 items-center gap-2 rounded-[4px] border border-pb-line bg-pb-surface px-4 text-[14px] text-pb-text">
              <SlidersHorizontal className="size-4" /> Indicators
            </button>
            <button type="button" className="flex h-10 items-center gap-2 rounded-[4px] border border-pb-line bg-pb-surface px-4 text-[14px] text-pb-text">
              <RefreshCw className="size-4" /> Compare
            </button>
            <button type="button" aria-label="Fullscreen" className="flex size-10 items-center justify-center rounded-[4px] border border-pb-line bg-pb-surface text-pb-text">
              <Maximize2 className="size-4" />
            </button>
          </div>
        </div>
        <div className="h-[290px]">
          {isLoading && !data.length ? (
            <PanelLoading rows={5} />
          ) : !data.length ? (
            <PanelEmpty>No chart data available.</PanelEmpty>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 8, right: 0, bottom: 0, left: 0 }} barCategoryGap="22%">
                <CartesianGrid stroke="#1B2227" vertical={false} />
                <XAxis
                  dataKey="t"
                  ticks={tickIdx}
                  tickFormatter={(v) => data[Number(v)]?.label ?? ""}
                  tick={{ fill: "#F1F4F3", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="p"
                  orientation="right"
                  domain={yDomain}
                  tickCount={7}
                  tickFormatter={(v) => Number(v).toFixed(2)}
                  tick={{ fill: "#F1F4F3", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={64}
                />
                <YAxis yAxisId="v" hide domain={[0, maxVol * 4]} />
                <Bar yAxisId="v" dataKey="vol" isAnimationActive={false}>
                  {data.map((c, i) => (
                    <Cell key={i} fill={c.close >= c.open ? "rgba(32,169,120,0.75)" : "rgba(239,68,68,0.75)"} />
                  ))}
                </Bar>
                <Bar yAxisId="p" dataKey="range" shape={<CandleShape />} isAnimationActive={false} />
                <Line yAxisId="p" dataKey="ma" dot={false} stroke="#D9A21B" strokeWidth={1.2} isAnimationActive={false} />
                {last !== undefined && (
                  <ReferenceLine yAxisId="p" y={last} stroke="#20A978" strokeDasharray="2 3" label={{ value: `${last.toFixed(2)}`, position: "right", fill: "#fff", fontSize: 12 }} />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 rounded-[8px] border border-pb-line px-5 py-5">
        {ohlc.map((o) => (
          <div key={o.label} className="flex flex-col gap-1">
            <span className={cn("text-[16px] font-semibold", o.tone || "text-pb-text")}>{o.value}</span>
            <span className="text-[14px] text-pb-text">{o.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
