"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { k: "New", n: 2 },
  { k: "Open", n: 5 },
  { k: "Closed", n: 143 },
];

export function SignalsTabs() {
  const [active, setActive] = useState("Open");
  return (
    <div className="mt-4 flex gap-8 border-b border-pb-line px-0 pb-3">
      {TABS.map((t) => (
        <button
          key={t.k}
          type="button"
          onClick={() => setActive(t.k)}
          className={cn("text-[16px] font-medium", active === t.k ? "text-pb-gold" : "text-pb-text")}
        >
          {t.k} <span className="ml-1 text-[14px]">{t.n}</span>
        </button>
      ))}
    </div>
  );
}
