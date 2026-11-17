import Link from "next/link";
import { Newspaper, ScanSearch, Sparkles, SignalHigh } from "lucide-react";
import { CardHeader } from "./CardHeader";
import { CONTINUE_LINKS } from "./data";

const ICONS = { ai: Sparkles, signals: SignalHigh, news: Newspaper, scan: ScanSearch };

export function ContinueCard({ ticker }: { ticker: string }) {
  return (
    <section className="overflow-hidden rounded-[8px] bg-[#121719]">
      <CardHeader title="Continue from here" />
      <div className="flex flex-col gap-4 p-4">
        {CONTINUE_LINKS.map((l) => {
          const Icon = ICONS[l.icon];
          return (
            <Link
              key={l.label}
              href={l.href}
              className="flex h-[52px] items-center justify-center gap-2 rounded-[4px] border border-white bg-[#f1f5f9] text-[16px] font-medium text-black transition-colors hover:bg-white"
            >
              <Icon className="size-5" />
              {l.label.replace("NVDA", ticker)}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
