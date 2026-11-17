type Props = { value: number; min?: number; max?: number; onChange: (v: number) => void };

export function StopDistanceSlider({ value, min = 0, max = 10, onChange }: Props) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[14px] font-medium leading-[17px] text-pb-text">Max stop distance</p>
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-[10px] h-1 rounded-full bg-[#293033]" />
        <div
          className="absolute left-0 top-[10px] h-1 rounded-full bg-[linear-gradient(90deg,#a48226,#e7c042)]"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-[2px] size-5 -translate-x-1/2 rounded-full border-2 border-[#fff5ca] bg-[#d5ab29] shadow"
          style={{ left: `${pct}%` }}
        />
        <input
          type="range"
          aria-label="Max stop distance"
          min={min}
          max={max}
          step={0.1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
      <p className="text-[11px] leading-[13px] text-[#697370]">{value.toFixed(1)}% from entry</p>
    </div>
  );
}
