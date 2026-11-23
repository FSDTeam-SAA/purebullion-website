import Link from "next/link";
import { Newspaper, ScanSearch, Sparkles, SignalHigh } from "lucide-react";
import { CardHeader } from "./CardHeader";
import type { ScannerDetail } from "@/services/stockScanner.service";

const ICONS = { ask_ai: Sparkles, signal_detail: SignalHigh, news: Newspaper, scanner: ScanSearch } as const;

const hrefFor = (action: string, target: string) =>
  action === "ask_ai" ? "/ai-assistant" : action === "signal_detail" ? `/signals/${target}` : action === "news" ? "/news-research" : target || "/stock-scanner";

export function ContinueCard({ d }: { ticker: string; d: ScannerDetail }) {
  return (
    <section className="overflow-hidden rounded-[8px] bg-[#121719]">
      <CardHeader title="Continue from here" />
      <div className="flex flex-col gap-4 p-4">
        {d.continueFromHere.map((l) => {
          const Icon = ICONS[l.action as keyof typeof ICONS] ?? ScanSearch;
          return (
            <Link
              key={l.label}
              href={hrefFor(l.action, l.target)}
              className="flex h-[52px] items-center justify-center gap-2 rounded-[4px] border border-white bg-[#f1f5f9] text-[16px] font-medium text-black transition-colors hover:bg-white"
            >
              <Icon className="size-5" />
              {l.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
