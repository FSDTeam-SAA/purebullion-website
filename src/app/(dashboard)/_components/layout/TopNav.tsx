"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { UserAvatar } from "../shared/UserAvatar";
import { GlobalSearch } from "./GlobalSearch";
import { GREETING_SUBTITLE, PAGE_HEADINGS } from "../../_lib/nav";
import { useCurrentUser } from "@/hooks/useProfile";
import { useUnreadAlertsCount } from "@/hooks/useAlerts";
import { useMarketState } from "@/hooks/useMarketData";

function greeting(name?: string) {
  const h = new Date().getHours();
  const part = h < 12 ? "morning" : h < 18 ? "afternoon" : "evening";
  return `Good ${part}, ${name || "there"}`;
}

export function TopNav() {
  const pathname = usePathname();
  const { data: me } = useCurrentUser();
  const { count: unread } = useUnreadAlertsCount();
  const { data: market } = useMarketState();
  const nyse = market?.[0];
  const isOpen = !!nyse?.is_market_open;
  const marketSub = nyse
    ? isOpen
      ? `Closes in ${nyse.time_to_close}`
      : `Opens in ${nyse.time_to_open}`
    : "";
  const custom = PAGE_HEADINGS.find((h) => h.match(pathname))?.heading;
  const title = custom?.title ?? greeting(me?.name?.split(" ")[0]);
  const subtitle = custom?.subtitle ?? GREETING_SUBTITLE;

  return (
    <header className="box-border flex h-[72px] shrink-0 items-center justify-between gap-4 border-b border-pb-gold-dark bg-pb-sidebar px-6">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="truncate text-[20px] font-bold leading-[1.2] text-pb-text" suppressHydrationWarning>
          {title}
        </h1>
        <p className="truncate text-[12px] leading-[1.2] text-pb-muted">{subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        {nyse && (
        <div className="hidden items-center gap-2 rounded border border-pb-up bg-[rgba(0,122,85,0.2)] px-2 py-1 md:flex">
          <span className="size-2 rounded-full bg-gradient-to-b from-pb-up to-[#d2ffef] opacity-80" />
          <span className="flex flex-col whitespace-nowrap">
            <span className="text-[12px] font-medium leading-normal text-pb-up">{isOpen ? "Market open" : "Market closed"}</span>
            <span className="text-[10px] leading-normal text-pb-muted">{marketSub}</span>
          </span>
        </div>
        )}

        <GlobalSearch />

        <Link
          href="/alerts"
          aria-label="Notifications"
          className="relative flex size-11 items-center justify-center rounded border border-pb-gold-dark bg-gold-gradient-soft"
        >
          <Bell className="size-5 fill-white text-white" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 flex min-w-3 items-center justify-center rounded-full bg-pb-down px-0.5 text-[8px] text-white">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </Link>

        <Link
          href="/settings"
          aria-label="Profile"
          className="flex size-11 items-center justify-center rounded-full border border-pb-gold-dark bg-gold-gradient p-px"
        >
          <UserAvatar name={me?.name} src={me?.profileImage} />
        </Link>
      </div>
    </header>
  );
}
