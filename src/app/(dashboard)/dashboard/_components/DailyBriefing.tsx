"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDashboardOverview } from "@/hooks/useDashboard";

export function DailyBriefing() {
  const { data } = useDashboardOverview();
  const b = data?.dailyBriefing;
  const briefing = {
    updated: b?.updated ?? "Loading…",
    title: b?.headline ?? "",
    body: b?.body ?? "",
    chips: b
      ? ([
          { label: "Breadth", value: b.breadth, tone: "green" },
          { label: "Sector leader", value: b.sectorLeader, tone: "green" },
          { label: "Laggard", value: b.laggard, tone: "red" },
        ] as const)
      : ([] as const),
  };
  return (
    <section className="relative flex min-h-[352px] min-w-0 flex-col overflow-hidden border border-[#cbd5e1]">
      <Image src="/images/dashboard/briefing-bg.png" alt="" fill sizes="800px" className="object-cover object-bottom" />
      <div className="absolute inset-0 backdrop-blur-[10px] bg-[linear-gradient(-90deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.56)_38%,rgba(0,0,0,0.9)_100%)]" />

      <header className="relative flex items-center justify-between gap-3 border-b border-pb-text p-4">
        <div className="flex items-center gap-4">
          <Image src="/icons/dashboard/news-research.svg" alt="" width={24} height={24} />
          <h2 className="text-[24px] font-medium leading-[1.2] text-pb-text">Daily market briefing</h2>
        </div>
        <span className="rounded-[4px] border border-pb-up bg-[rgba(8,11,12,0.32)] px-2 py-1 text-[12px] font-medium leading-none text-pb-text">
          {briefing.updated}
        </span>
      </header>

      <div className="relative flex flex-1 flex-col justify-center gap-4 p-4">
        <div className="flex w-full max-w-[464px] flex-col gap-4">
          <h3 className="text-[20px] font-bold leading-[1.2] text-pb-text">{briefing.title}</h3>
          <p className="max-w-[403px] text-[12px] leading-[1.2] text-pb-muted">{briefing.body}</p>
          <div className="flex gap-4">
            <Button variant="gold" asChild className="h-auto flex-1 rounded-[8px] px-4 py-2 text-[16px] font-medium text-black">
              <Link href="/news-research">
                Read Full Briefing
                <Image src="/icons/dashboard/arrow-right.svg" alt="" width={20} height={20} />
              </Link>
            </Button>
            <Button variant="light" asChild className="h-auto flex-1 rounded-[8px] px-4 py-2 text-[16px] font-medium">
              <Link href="/ai-assistant">
                <Image src="/icons/dashboard/ai-assistant.svg" alt="" width={20} height={20} />
                Ask AI for Summary
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {briefing.chips.map((c) => (
            <div
              key={c.label}
              className={cn(
                "flex flex-col gap-1 border px-4 py-2 font-medium",
                c.tone === "green" ? "border-pb-up bg-[rgba(22,163,74,0.2)]" : "border-[#d94f59] bg-[rgba(251,44,54,0.2)]"
              )}
            >
              <span className="text-[12px] leading-none text-pb-text">{c.label}</span>
              <span className={cn("text-[16px] leading-[1.2]", c.tone === "green" ? "text-pb-text" : "text-[#d94f59]")}>{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
