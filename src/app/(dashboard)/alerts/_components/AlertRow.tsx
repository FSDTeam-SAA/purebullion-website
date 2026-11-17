import { Bell, LineChart, MessageCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AlertIcon, AlertItem } from "./data";

const icons: Record<AlertIcon, React.ComponentType<{ className?: string }>> = {
  chart: LineChart,
  trend: TrendingUp,
  message: MessageCircle,
  bell: Bell,
};

export function AlertRow({ a }: { a: AlertItem }) {
  const Icon = icons[a.icon];
  return (
    <div className="flex items-center gap-[14px] border-b border-[#999] bg-pb-head px-6 py-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-[9px] border border-[#282c2d] bg-[#111518]">
        <Icon className={cn("size-4", a.icon === "chart" ? "text-pb-gold" : "text-pb-text")} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 leading-normal">
        <p className="truncate text-[14px] font-bold text-[#e7e9e8]">{a.title}</p>
        <p className="truncate text-[13px] text-[#81868d]">{a.detail}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="whitespace-nowrap text-[12px] text-[#5e646b]">{a.time}</span>
        <span className={cn("size-[6px] rounded-full", a.unread ? "bg-pb-gold" : "bg-transparent")} />
      </div>
    </div>
  );
}
