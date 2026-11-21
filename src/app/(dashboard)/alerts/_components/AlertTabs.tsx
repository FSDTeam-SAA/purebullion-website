"use client";

import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { tabs, type TabKey } from "./data";

type Props = { counts?: Partial<Record<TabKey, number>>; active: TabKey; onChange: (k: TabKey) => void; onMarkAllRead: () => void; onOpenSettings: () => void };

export function AlertTabs({ counts, active, onChange, onMarkAllRead, onOpenSettings }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-t-[10px] border-b border-pb-sidebar px-6 py-4">
      <div className="flex flex-wrap items-center gap-[18px]">
        {tabs.map((t) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              className={cn("flex h-8 items-center gap-2 border-b-2 border-transparent p-2 text-[14px] font-bold", on ? "border-pb-gold-dark" : "text-pb-muted")}
            >
              <span className={cn(on && "gold-gradient-text")}>{t.label}</span>
              <span className="rounded-full bg-pb-sidebar px-[6px] py-[2px] text-[10px] font-bold text-pb-muted">{counts?.[t.key] ?? 0}</span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline-gold" onClick={onMarkAllRead} className="h-auto rounded-lg px-8 py-4 text-[16px] font-medium">
          <span className="gold-gradient-text">Mark all as read</span>
        </Button>
        <Button variant="outline-white" onClick={onOpenSettings} className="h-auto gap-2 rounded-lg px-8 py-4 text-[16px] font-medium">
          <Bell className="size-5" />
          Notification settings
        </Button>
      </div>
    </div>
  );
}
