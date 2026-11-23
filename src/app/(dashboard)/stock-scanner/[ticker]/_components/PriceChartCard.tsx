"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, Cell, ComposedChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { useSignalChart } from "@/hooks/useSignals";
import type { ScannerDetail } from "@/services/stockScanner.service";
import { fmtCompact, fmtPct, fmtPrice } from "@/lib/format";
import { PanelEmpty, PanelLoading } from "../../../_components/shared";

const UP = "#20A978";
const DOWN = "#EF4444";

const RANGES = ["1D", "5D", "1M", "6M", "1Y"];
const RANGE_CONFIG: Record<string, { interval: string; size: number }> = {
  "1D": { interval: "5min", size: 78 },
  "5D": { interval: "1h", size: 35 },
  "1M": { interval: "1day", size: 22 },
  "6M": { interval: "1day", size: 130 },
  "1Y": { interval: "1week", size: 52 },
};

type Candle = { i: number; open: number; close: number; high: number; low: number; up: boolean; range: [number, number]; vol: number };
type ShapeProps = { x?: number; y?: number; width?: number; height?: number; payload?: Candle };

/** Candlestick drawn as a custom recharts Bar shape: wick across [low, high], body across [open, close]. */
function CandleShape({ x = 0, y = 0, width = 0, height = 0, payload }: ShapeProps) {
  if (!payload) return null;
  const { open, close, high, low, up } = payload;
  const perUnit = height / (high - low || 1);
  const bodyTop = y + (high - Math.max(open, close)) * perUnit;
  const bodyH = Math.max(Math.abs(close - open) * perUnit, 1.5);
  const color = up ? UP : DOWN;
  const bodyW = Math.min(width * 0.7, 9);
  const cx = x + width / 2;
  return (
    <g>
      <line x1={cx} x2={cx} y1={y} y2={y + height} stroke={color} strokeWidth={1} />
      <rect x={cx - bodyW / 2} y={bodyTop} width={bodyW} height={bodyH} fill={color} rx={1} />
    </g>
  );
}

function LevelLabel({ viewBox, text, color }: { viewBox?: { x: number; y: number; width: number }; text: string; color: string }) {
  if (!viewBox) return null;
  return (
    <text x={viewBox.x + viewBox.width - 2} y={viewBox.y - 6} textAnchor="end" fontSize={8} fontWeight={600} fill={color}>
      {text}
    </text>
  );
}

export function PriceChartCard({ d }: { d: ScannerDetail }) {
  const [range, setRange] = useState(2);
  const cfg = RANGE_CONFIG[RANGES[range]];
  const { data: chart, isLoading } = useSignalChart(d.symbol, cfg.interval, cfg.size);

  const data = useMemo<Candle[]>(() => {
    const raw = [...(chart?.candles ?? d.chart?.candles ?? [])].sort((a, b) => a.datetime.localeCompare(b.datetime));
    return raw.map((c, i) => ({
      i,
      open: c.open,
      close: c.close,
      high: c.high,
      low: c.low,
      up: c.close >= c.open,
      range: [c.low, c.high] as [number, number],
      vol: c.volume,
    }));
  }, [chart, d.chart]);

  const { entry, target, stopLoss } = d.chartLevels;
  const levels = [entry, target, stopLoss].filter((n) => typeof n === "number" && isFinite(n));
  const allLow = Math.min(...data.map((c) => c.low), ...levels);
  const allHigh = Math.max(...data.map((c) => c.high), ...levels);
  const pad = (allHigh - allLow) * 0.06 || 1;
  const avgVol = data.length ? data.reduce((s, c) => s + c.vol, 0) / data.length : undefined;
  const up = d.change >= 0;

  return (
    <section className="overflow-hidden rounded-[8px] bg-[#121719]">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 pt-5">
        <div className="flex items-baseline gap-3">
          <span className="text-[28px] font-semibold leading-[1.2] text-pb-text">{fmtPrice(d.price)}</span>
          <span className={cn("text-[12px] font-medium", up ? "text-pb-up" : "text-pb-down")}>
            {up ? "+" : "−"}{Math.abs(d.change).toFixed(2)} ({fmtPct(d.percentChange)})
          </span>
          <span className="text-[10px] text-pb-muted">{d.timestamp}</span>
        </div>
        <div role="tablist" aria-label="Chart range" className="flex rounded-[4px] bg-[#1b2227] p-1">
          {RANGES.map((r, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === range}
              type="button"
              onClick={() => setRange(i)}
              className={cn(
                "w-10 rounded-[4px] py-2 text-[10px] font-medium leading-none text-pb-muted",
                i === range && "bg-[#0b0e0f] font-bold text-pb-gold"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 h-[300px] w-full bg-[#0d1112]">
        {isLoading && !data.length ? (
          <PanelLoading rows={5} />
        ) : !data.length ? (
          <PanelEmpty>No chart data available.</PanelEmpty>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 28, right: 126, bottom: 8, left: 136 }} barCategoryGap={0}>
              <XAxis dataKey="i" hide />
              <YAxis domain={[allLow - pad, allHigh + pad]} hide />
              {typeof target === "number" && (
                <ReferenceLine
                  y={target}
                  stroke={UP}
                  strokeDasharray="3 3"
                  strokeWidth={1}
                  label={<LevelLabel text={`Target ${fmtPrice(target)}`} color={UP} />}
                />
              )}
              {typeof entry === "number" && (
                <ReferenceLine
                  y={entry}
                  stroke="#C9B83F"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                  label={<LevelLabel text={`Entry ${fmtPrice(entry)}`} color="#C9B83F" />}
                />
              )}
              {typeof stopLoss === "number" && (
                <ReferenceLine
                  y={stopLoss}
                  stroke={DOWN}
                  strokeDasharray="3 3"
                  strokeWidth={1}
                  label={<LevelLabel text={`Stop ${fmtPrice(stopLoss)}`} color={DOWN} />}
                />
              )}
              <Bar dataKey="range" shape={<CandleShape />} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="px-3 pb-4 pt-2">
        <div className="h-[44px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barCategoryGap="6%">
              <XAxis hide />
              <YAxis hide domain={[0, "dataMax"]} />
              <Bar dataKey="vol" isAnimationActive={false} radius={[1, 1, 0, 0]}>
                {data.map((c, i) => (
                  <Cell key={i} fill={c.up ? UP : DOWN} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-pb-muted">
          <span>Volume</span>
          <span>{avgVol ? `Average volume ${fmtCompact(avgVol)}` : ""}</span>
        </div>
      </div>
    </section>
  );
}
