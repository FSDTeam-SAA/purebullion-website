"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = ["New 2", "Open 5", "Closed 143"];

export function SignalsHeaderBar() {
  const [active, setActive] = useState("New 2");
  return (
    <div className="flex h-[84px] items-center justify-between border-b border-pb-line bg-pb-sidebar px-6">
      <div className="flex items-center gap-1 rounded-[4px] bg-pb-surface p-1">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            className={cn(
              "h-[34px] rounded-[4px] px-4 text-[14px] text-pb-text",
              active === t && "border border-pb-gold-dark bg-gold-gradient-soft text-pb-gold"
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="light" className="h-[52px] w-[194px] rounded-[4px] text-[18px]">
          <Bell className="size-5" /> Alert Settings
        </Button>
        <Button variant="gold" asChild className="h-[52px] w-[190px] rounded-[4px] text-[18px]">
          <Link href="/dashboard">
            <TrendingUp className="size-5" /> Performance
          </Link>
        </Button>
      </div>
    </div>
  );
}
