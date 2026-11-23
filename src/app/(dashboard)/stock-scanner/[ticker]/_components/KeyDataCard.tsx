import { CardHeader } from "./CardHeader";
import type { ScannerDetail } from "@/services/stockScanner.service";

export function KeyDataCard({ d }: { d: ScannerDetail }) {
  const k = d.keyData;
  const KEY_DATA = [
    { label: "Market Cap", value: k.marketCap },
    { label: "Volume", value: k.volume },
    { label: "Momentum", value: k.momentum },
    { label: "Liquidity", value: k.liquidity },
    { label: "Risk", value: k.risk },
    { label: "Setup", value: k.setup },
    { label: "Sector", value: k.sector },
  ];
  return (
    <section className="overflow-hidden rounded-[8px] bg-[#121719]">
      <CardHeader title="Key data" />
      <dl className="p-2">
        {KEY_DATA.map((x) => (
          <div key={x.label} className="flex h-[46px] items-center justify-between px-4">
            <dt className="text-[20px] text-pb-muted">{x.label}</dt>
            <dd className="text-[20px] font-bold text-pb-text">{x.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
