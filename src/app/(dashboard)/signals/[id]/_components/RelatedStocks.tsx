import Image from "next/image";
import { PanelCard } from "../../../_components/shared";
import { related } from "./data";

export function RelatedStocks() {
  return (
    <PanelCard title="Related Stocks" icon action={{ label: "View all →", href: "/stock-scanner" }} bordered={false} className="rounded-[8px]">
      <ul className="bg-pb-surface py-1">
        {related.map((r) => (
          <li key={r.t} className="grid h-[62px] grid-cols-3 items-center px-4">
            <div className="flex items-center gap-4">
              <Image src={`/images/signals-detail/${r.img}.png`} alt="" width={36} height={36} className="rounded-full" />
              <span className="text-[16px] text-white">{r.t}</span>
            </div>
            <span className="text-center text-[16px] text-pb-text">{r.price}</span>
            <span className="text-center text-[16px] text-pb-up">{r.chg}</span>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}
