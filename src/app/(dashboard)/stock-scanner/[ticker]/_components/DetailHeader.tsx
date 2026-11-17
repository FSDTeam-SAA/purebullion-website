import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DetailHeader({ ticker }: { ticker: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
      <div className="flex flex-col gap-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[14px] font-medium text-pb-muted">
          <Link
            href="/stock-scanner"
            aria-label="Back to scanner"
            className="flex size-8 items-center justify-center rounded-[8px] bg-[#293033] text-pb-text"
          >
            <ChevronLeft className="size-4" />
          </Link>
          <Link href="/dashboard">Dashboard</Link>
          <ChevronRight className="size-4" />
          <Link href="/stock-scanner">Stock scanner</Link>
          <ChevronRight className="size-4" />
          <span className="gold-gradient-text font-bold">{ticker}</span>
        </nav>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-[36px] font-semibold leading-[1.2] text-pb-text">{ticker}</h1>
            <span className="rounded-[4px] border border-pb-up px-2 py-1 text-[16px] leading-[1.2] text-pb-up">Buy setup</span>
          </div>
          <p className="text-[12px] leading-[1.2] text-pb-muted">NVIDIA Corp · Technology</p>
        </div>
      </div>

      <div className="flex items-end gap-4">
        <Button asChild variant="light" className="h-[52px] rounded-[8px] border border-white px-8 text-[16px] font-medium">
          <Link href="/watchlist">
            <Image src="/icons/stock-scanner-detail/star.svg" alt="" width={20} height={20} className="!size-5" />
            Add to watchlist
          </Link>
        </Button>
        <Button asChild variant="light" className="h-[52px] rounded-[8px] border border-white px-8 text-[16px] font-medium">
          <Link href="/alerts">
            <Image src="/icons/stock-scanner-detail/alerts.svg" alt="" width={20} height={20} className="!size-5" />
            Set Alert
          </Link>
        </Button>
        <Button asChild variant="gold" className="h-[52px] rounded-[8px] px-8 text-[16px] font-medium">
          <Link href="/ai-assistant">
            <Image src="/icons/stock-scanner-detail/ai.svg" alt="" width={20} height={20} className="!size-5" />
            Ask AI About {ticker}
          </Link>
        </Button>
      </div>
    </div>
  );
}
