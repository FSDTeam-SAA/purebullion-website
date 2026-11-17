import Link from "next/link";
import { Eye } from "lucide-react";
import { PanelCard, SideTag } from "../../_components/shared";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CountBadge } from "./CountBadge";
import { newSignals } from "./data";

const head = "h-12 px-4 text-center text-[14px] font-medium text-pb-text";
const cell = "px-4 py-3 text-center text-[14px] text-pb-muted";

export function NewSignals() {
  return (
    <PanelCard title="New signals" icon badge={<CountBadge>2 Today</CountBadge>} action={{ label: "All signals", href: "/signals" }}>
      <Table>
        <TableHeader className="bg-pb-head [&_tr]:border-0">
          <TableRow className="border-0 hover:bg-transparent">
            <TableHead className={`${head} text-left`}>Signal</TableHead>
            <TableHead className={head}>Entry</TableHead>
            <TableHead className={head}>Target</TableHead>
            <TableHead className={head}>Stop</TableHead>
            <TableHead className={head}>Last</TableHead>
            <TableHead className={head}>R:R</TableHead>
            <TableHead className={head}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newSignals.map((r, i) => (
            <TableRow key={i} className="border-b border-pb-head hover:bg-white/[0.02]">
              <TableCell className={`${cell} text-left`}>
                <div className="flex items-center gap-2">
                  <SideTag side="BUY" className="rounded-[4px] px-2 py-1 leading-none" />
                  <span className="font-medium text-pb-text">{r.ticker}</span>
                  <span className="ml-auto pl-6 text-right">{r.name}</span>
                </div>
              </TableCell>
              <TableCell className={cell}>{r.entry}</TableCell>
              <TableCell className={cell}>{r.target}</TableCell>
              <TableCell className={cell}>{r.stop}</TableCell>
              <TableCell className={cell}>{r.last}</TableCell>
              <TableCell className={`${cell} text-[12px]`}>{r.rr}</TableCell>
              <TableCell className={cell}>
                <Link href="/signals/nvda" className="inline-flex items-center gap-1 text-pb-gold underline underline-offset-2">
                  <Eye className="size-4" />
                  Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PanelCard>
  );
}
