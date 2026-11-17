"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { GREETING_SUBTITLE, PAGE_HEADINGS } from "../../_lib/nav";

function greeting() {
  const h = new Date().getHours();
  const part = h < 12 ? "morning" : h < 18 ? "afternoon" : "evening";
  return `Good ${part}, Jordan`;
}

export function TopNav() {
  const pathname = usePathname();
  const custom = PAGE_HEADINGS.find((h) => h.match(pathname))?.heading;
  const title = custom?.title ?? greeting();
  const subtitle = custom?.subtitle ?? GREETING_SUBTITLE;

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 border-b border-pb-gold-dark bg-pb-sidebar px-6 py-3">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="truncate text-[20px] font-bold leading-[1.2] text-pb-text" suppressHydrationWarning>
          {title}
        </h1>
        <p className="truncate text-[12px] leading-[1.2] text-pb-muted">{subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="hidden items-center gap-2 rounded border border-pb-up bg-[rgba(0,122,85,0.2)] px-2 py-1 md:flex">
          <span className="size-2 rounded-full bg-gradient-to-b from-pb-up to-[#d2ffef] opacity-80" />
          <span className="flex flex-col whitespace-nowrap">
            <span className="text-[12px] font-medium leading-normal text-pb-up">Market open</span>
            <span className="text-[10px] leading-normal text-pb-muted">Sep 19 · 16:00 ET</span>
          </span>
        </div>

        <div className="hidden w-[261px] items-center gap-2 rounded border border-pb-gold-dark bg-gold-gradient-soft px-[13px] py-[9px] lg:flex">
          <Search className="size-5 text-pb-text" />
          <input
            placeholder="Search..."
            className="flex-1 bg-transparent text-[12px] text-pb-text placeholder:text-pb-text focus:outline-none"
          />
          <kbd className="rounded border border-pb-gold-dark bg-[rgba(231,192,66,0.34)] px-[9px] py-[5px] text-[12px] text-white">
            ⌘K
          </kbd>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-11 items-center justify-center rounded border border-pb-gold-dark bg-gold-gradient-soft"
        >
          <Bell className="size-5 fill-white text-white" />
          <span className="absolute right-2 top-1.5 flex size-3 items-center justify-center rounded-full bg-pb-down text-[8px] text-white">
            3
          </span>
        </button>

        <button
          type="button"
          aria-label="Profile"
          className="flex size-11 items-center justify-center rounded-full border border-pb-gold-dark bg-gold-gradient p-px"
        >
          <Image
            src="/images/dashboard/avatar.png"
            alt="Jordan Reyes"
            width={42}
            height={42}
            className="size-full rounded-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
