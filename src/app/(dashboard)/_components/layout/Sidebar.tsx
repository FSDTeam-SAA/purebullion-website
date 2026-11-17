"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_SECTIONS, type NavItem } from "../../_lib/nav";

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "relative flex items-center gap-2 overflow-hidden px-4 py-2 text-[14px] font-medium text-pb-text transition-colors hover:bg-white/5",
        active && "border-y border-l border-pb-gold-dark hover:bg-transparent"
      )}
    >
      {active && (
        <span aria-hidden className="pointer-events-none absolute inset-0">
          <Image src="/images/dashboard/tab-bg.png" alt="" fill sizes="260px" className="object-cover" />
          <span className="absolute inset-0 bg-black/60" />
        </span>
      )}
      <span className="relative size-5 shrink-0">
        <Image src={`/icons/nav/${item.icon}.svg`} alt="" fill sizes="20px" />
      </span>
      <span className={cn("relative flex-1", item.gold && "gold-gradient-text")}>{item.name}</span>
      {item.badge && (
        <span className="relative flex size-5 items-center justify-center rounded-full bg-[rgba(251,44,54,0.4)] text-[10px] font-semibold text-pb-text">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[260px] shrink-0 flex-col bg-pb-sidebar pb-4 pt-2 lg:flex">
      <div className="flex w-full items-center justify-center border-b border-pb-gold-dark px-6 pb-2.5">
        <Link href="/dashboard" className="block w-full">
          <Image
            src="/images/purebullion-logo.png"
            alt="PureBullion"
            width={1416}
            height={390}
            priority
            className="h-auto w-full object-contain"
          />
        </Link>
      </div>

      <nav className="pb-scroll mt-4 flex flex-1 flex-col gap-2 overflow-y-auto pb-4">
        {NAV_SECTIONS.map((section, i) => (
          <div key={section.title ?? i} className="flex flex-col gap-2">
            {section.title && (
              <p className="bg-pb-surface px-4 py-2 text-[14px] text-pb-muted backdrop-blur-[15px]">
                {section.title}
              </p>
            )}
            <div className="flex flex-col">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <button
        type="button"
        className="flex w-full items-center gap-2 border border-black px-4 py-2 text-left backdrop-blur-[15px]"
      >
        <Image
          src="/images/dashboard/avatar.png"
          alt="Jordan Reyes"
          width={36}
          height={36}
          className="size-9 rounded-full object-cover"
        />
        <span className="flex flex-1 flex-col gap-1 whitespace-nowrap">
          <span className="text-[14px] font-bold leading-normal text-pb-text">Jordan Reyes</span>
          <span className="gold-gradient-text text-[10px]">Premium Member</span>
        </span>
        <ChevronDown className="size-4 text-pb-muted" />
      </button>
    </aside>
  );
}
