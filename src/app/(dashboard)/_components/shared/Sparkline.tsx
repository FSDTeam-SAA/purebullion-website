import { cn } from "@/lib/utils";

type SparklineProps = {
  /** y values; auto-scaled into the box */
  data?: number[];
  trend?: "up" | "down";
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
};

const UP = [8, 10, 7, 12, 9, 14, 11, 16, 13, 18, 15, 22, 20, 28, 24, 34];
const DOWN = [8, 7, 10, 8, 12, 9, 14, 12, 16, 14, 18, 20, 17, 26, 24, 34];

export function Sparkline({ data, trend = "up", width = 190, height = 68, className, fill = false }: SparklineProps) {
  const values = data ?? (trend === "up" ? UP : DOWN);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const step = width / (values.length - 1);
  const pts = values.map((v, i) => [i * step, height - 4 - ((v - min) / (max - min || 1)) * (height - 8)] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const color = trend === "up" ? "#20A978" : "#EF4444";
  const id = `spark-${trend}-${values.length}-${Math.round(values[1] * 10)}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("block", className)}
      aria-hidden
    >
      {fill && (
        <>
          <defs>
            <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${line} L${width} ${height} L0 ${height} Z`} fill={`url(#${id})`} />
        </>
      )}
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
