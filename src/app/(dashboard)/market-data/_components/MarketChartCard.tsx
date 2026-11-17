"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildSeries, indexMeta, indexTabs, rangeTabs, type IndexName, type RangeName } from "./data";

export function MarketChartCard() {
  const [index, setIndex] = useState<IndexName>("S&P 500");
  const [range, setRange] = useState<RangeName>("1D");
  const [full, setFull] = useState(false);
  const meta = indexMeta[index];
  const data = buildSeries(index, range);
  const down = meta.change.startsWith("-");
  const color = down ? "#EF4444" : "#20A978";
  const values = data.map((d) => d.value);
  const lo = Math.min(...values, meta.prevClose);
  const hi = Math.max(...values, meta.prevClose);
  const pad = (hi - lo) * 0.15;
  const ticks = Array.from(new Set(data.map((d) => d.label)));
  const fmt = (v: number) => (v >= 1000 ? v.toLocaleString("en-US", { maximumFractionDigits: 0 }) : v.toFixed(2));

  return (
    <div
      className={cn(
        "bg-[#101010] p-6",
        full ? "fixed inset-4 z-50 overflow-auto rounded-[12px] border border-white/10" : "rounded-[12px]"
      )}
    >
      <div className="flex flex-col rounded-[16px] border border-white/10 bg-[#121719] px-8 pb-5 pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-8 pt-1">
            {indexTabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setIndex(t)}
                className={cn(
                  "relative px-4 py-3 text-[16px] font-medium",
                  t === index
                    ? "rounded-[8px] bg-[#1B2227] text-pb-text after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[3px] after:rounded-full after:bg-gold-gradient"
                    : "text-pb-muted hover:text-pb-text"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={full ? "Exit full screen" : "Full screen"}
            onClick={() => setFull((f) => !f)}
            className="flex size-8 items-center justify-center rounded bg-[#1B2227] text-pb-text hover:text-pb-gold"
          >
            {full ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-end gap-4">
            <span className="text-[34px] font-bold leading-none text-pb-text">{meta.value}</span>
            <span className={cn("pb-1 text-[16px] font-medium", down ? "text-pb-down" : "text-pb-up")}>{meta.change}</span>
          </div>
          <div className="flex items-center gap-1 rounded-[6px] bg-[#1B2227] p-1">
            {rangeTabs.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={cn(
                  "min-w-[36px] rounded-[4px] border px-3 py-1 text-[13px]",
                  r === range ? "border-pb-gold text-pb-gold bg-[#2a2410]" : "border-transparent text-pb-muted hover:text-pb-text"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className={cn("mt-5 w-full", full ? "h-[70vh]" : "h-[290px]")}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 70, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mdFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="label" ticks={ticks} tickLine={false} axisLine={false} tick={{ fill: "#A2ABA8", fontSize: 11 }} interval={0} />
              <YAxis
                orientation="left"
                domain={[lo - pad, hi + pad]}
                tickFormatter={fmt}
                tickLine={false}
                axisLine={false}
                width={52}
                tick={{ fill: "#A2ABA8", fontSize: 11 }}
                tickCount={6}
              />
              <Tooltip
                contentStyle={{ background: "#0B0E0F", border: "1px solid #1B2227", borderRadius: 6, color: "#F1F4F3", fontSize: 12 }}
                labelStyle={{ color: "#A2ABA8" }}
                formatter={(v: number) => [fmt(v), index]}
              />
              <ReferenceLine
                y={meta.prevClose}
                stroke="#A2ABA8"
                strokeDasharray="4 4"
                label={{ value: `Prev Close ${meta.prevClose}`, position: "right", fill: "#A2ABA8", fontSize: 10 }}
              />
              <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill="url(#mdFill)" dot={false} activeDot={{ r: 4, fill: "#121719", stroke: color }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
