import { Bell, LineChart, MessageCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AlertDto } from "@/services/alerts.service";
import type { AlertIcon } from "./data";

const icons: Record<AlertIcon, React.ComponentType<{ className?: string }>> = {
  chart: LineChart,
  trend: TrendingUp,
  message: MessageCircle,
  bell: Bell,
};

const categoryIcon: Record<string, AlertIcon> = { signals: "chart", market: "trend", community: "message", announcements: "bell" };

export function AlertRow({ a, onRead }: { a: AlertDto; onRead?: (id: string) => void }) {
  const icon = categoryIcon[a.category] ?? "bell";
  const Icon = icons[icon];
  return (
    <div
      onClick={() => !a.isRead && onRead?.(a._id)}
      className={cn("flex items-center gap-[14px] border-b border-[#999] bg-pb-head px-6 py-4", !a.isRead && onRead && "cursor-pointer")}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-[9px] border border-[#282c2d] bg-[#111518]">
        <Icon className={cn("size-4", icon === "chart" ? "text-pb-gold" : "text-pb-text")} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 leading-normal">
        <p className="truncate text-[14px] font-bold text-[#e7e9e8]">{a.title}</p>
        <p className="truncate text-[13px] text-[#81868d]">{a.message}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="whitespace-nowrap text-[12px] text-[#5e646b]">{a.timeAgo}</span>
        <span className={cn("size-[6px] rounded-full", !a.isRead ? "bg-pb-gold" : "bg-transparent")} />
      </div>
    </div>
  );
}
