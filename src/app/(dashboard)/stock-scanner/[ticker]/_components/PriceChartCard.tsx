"use client";

import { useState } from "react";
import { Bar, BarChart, Cell, ComposedChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { CANDLES, QUOTE, RANGES, VOLUME, type Candle } from "./data";

const UP = "#20A978";
const DOWN = "#EF4444";
const Y_MIN = 172;
const Y_MAX = 190;

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

const priceData = CANDLES.map((c) => ({ ...c, range: [c.low, c.high] as [number, number] }));

function LevelLabel({ viewBox, text, color }: { viewBox?: { x: number; y: number; width: number }; text: string; color: string }) {
  if (!viewBox) return null;
  return (
    <text x={viewBox.x + viewBox.width - 2} y={viewBox.y - 6} textAnchor="end" fontSize={8} fontWeight={600} fill={color}>
      {text}
    </text>
  );
}

export function PriceChartCard() {
  const [range, setRange] = useState(2);

  return (
    <section className="overflow-hidden rounded-[8px] bg-[#121719]">
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 pt-5">
        <div className="flex items-baseline gap-3">
          <span className="text-[28px] font-semibold leading-[1.2] text-pb-text">{QUOTE.price}</span>
          <span className="text-[12px] font-medium text-pb-up">{QUOTE.change}</span>
          <span className="text-[10px] text-pb-muted">{QUOTE.asOf}</span>
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
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={priceData} margin={{ top: 28, right: 126, bottom: 8, left: 136 }} barCategoryGap={0}>
            <XAxis dataKey="i" hide />
            <YAxis domain={[Y_MIN, Y_MAX]} hide />
            <ReferenceLine y={QUOTE.upper} stroke={UP} strokeDasharray="3 3" strokeWidth={1} ifOverflow="extendDomain" />
            <ReferenceLine
              y={QUOTE.entry}
              stroke="#C9B83F"
              strokeDasharray="3 3"
              strokeWidth={1}
              label={<LevelLabel text={`Entry $${QUOTE.entry.toFixed(2)}`} color="#C9B83F" />}
            />
            <ReferenceLine
              y={QUOTE.stop}
              stroke={DOWN}
              strokeDasharray="3 3"
              strokeWidth={1}
              label={<LevelLabel text={`Stop $${QUOTE.stop.toFixed(2)}`} color={DOWN} />}
            />
            <Bar dataKey="range" shape={<CandleShape />} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="px-3 pb-4 pt-2">
        <div className="h-[44px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={VOLUME} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barCategoryGap="6%">
              <XAxis hide />
              <YAxis hide domain={[0, 56]} />
              <Bar dataKey="v" isAnimationActive={false} radius={[1, 1, 0, 0]}>
                {VOLUME.map((d, i) => (
                  <Cell key={i} fill={d.up ? UP : DOWN} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-pb-muted">
          <span>Volume</span>
          <span>{QUOTE.avgVolume}</span>
        </div>
      </div>
    </section>
  );
}
