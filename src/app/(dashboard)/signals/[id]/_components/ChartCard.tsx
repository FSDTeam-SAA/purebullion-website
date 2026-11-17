"use client";

import { useMemo, useState } from "react";
import { Maximize2, RefreshCw, SlidersHorizontal } from "lucide-react";
import { Bar, Cell, CartesianGrid, ComposedChart, Line, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { buildCandles, ohlc, ranges, type Candle } from "./data";

const UP = "#20A978";
const DOWN = "#EF4444";

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

const TICKS = ["9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM", "2:30 PM", "3:30 PM", "4:00 PM"];

export function ChartCard() {
  const [range, setRange] = useState("1D");
  const data = useMemo(() => buildCandles(), []);
  const tickIdx = TICKS.map((_, i) => Math.round((i * (data.length - 1)) / (TICKS.length - 1)));
  const last = data[data.length - 1].close;

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
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 8, right: 0, bottom: 0, left: 0 }} barCategoryGap="22%">
              <CartesianGrid stroke="#1B2227" vertical={false} />
              <XAxis
                dataKey="t"
                ticks={tickIdx.map(String)}
                tickFormatter={(v) => TICKS[tickIdx.indexOf(Number(v))] ?? ""}
                tick={{ fill: "#F1F4F3", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis yAxisId="p" orientation="right" domain={[214, 228]} ticks={[216, 218, 220, 222, 224, 226, 228]} tickFormatter={(v) => `${v}.00`} tick={{ fill: "#F1F4F3", fontSize: 12 }} axisLine={false} tickLine={false} width={64} />
              <YAxis yAxisId="v" hide domain={[0, 700]} />
              <Bar yAxisId="v" dataKey="vol" isAnimationActive={false}>
                {data.map((d, i) => (
                  <Cell key={i} fill={d.close >= d.open ? "rgba(32,169,120,0.75)" : "rgba(239,68,68,0.75)"} />
                ))}
              </Bar>
              <Bar yAxisId="p" dataKey="range" shape={<CandleShape />} isAnimationActive={false} />
              <Line yAxisId="p" dataKey="ma" dot={false} stroke="#D9A21B" strokeWidth={1.2} isAnimationActive={false} />
              <ReferenceLine yAxisId="p" y={last} stroke="#20A978" strokeDasharray="2 3" label={{ value: `${last.toFixed(2)}`, position: "right", fill: "#fff", fontSize: 12 }} />
            </ComposedChart>
          </ResponsiveContainer>
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
