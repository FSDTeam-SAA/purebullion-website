import { PanelCard, SideTag } from "../../_components/shared";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CountBadge } from "./CountBadge";
import { openSignals } from "./data";

const head = "h-12 px-4 text-[14px] font-medium text-pb-text";
const cell = "px-4 py-3 text-[14px] text-pb-muted";

export function OpenSignals() {
  return (
    <PanelCard title="Open signals" icon badge={<CountBadge>5 open</CountBadge>} action={{ label: "Manage", href: "/signals" }}>
      <Table>
        <TableHeader className="bg-pb-head [&_tr]:border-0">
          <TableRow className="border-0 hover:bg-transparent">
            <TableHead className={head}>Signal</TableHead>
            <TableHead className={`${head} text-center`}>Entry</TableHead>
            <TableHead className={`${head} text-center`}>Stop</TableHead>
            <TableHead className={`${head} text-center`}>Last</TableHead>
            <TableHead className={`${head} text-center`}>From entry</TableHead>
            <TableHead className={`${head} text-center`}>Progress</TableHead>
            <TableHead className={`${head} text-center`}>Opened</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {openSignals.map((r, i) => (
            <TableRow key={i} className="border-b border-pb-head hover:bg-white/[0.02]">
              <TableCell className={cell}>
                <div className="flex items-center gap-2">
                  <SideTag side="BUY" className="rounded-[4px] px-2 py-1 leading-none" />
                  <span className="font-medium text-pb-text">{r.ticker}</span>
                  <span className="ml-auto pl-6 text-right">{r.name}</span>
                </div>
              </TableCell>
              <TableCell className={`${cell} text-center`}>{r.entry}</TableCell>
              <TableCell className={`${cell} text-center`}>{r.stop}</TableCell>
              <TableCell className={`${cell} text-center`}>{r.last}</TableCell>
              <TableCell className={`${cell} text-center text-[12px]`}>{r.from}</TableCell>
              <TableCell className={cell}>
                <div className="h-2 w-[72px] overflow-hidden rounded-full bg-pb-head">
                  <div className="h-full rounded-full bg-pb-up" style={{ width: `${Math.max(r.progress, 8)}%` }} />
                </div>
              </TableCell>
              <TableCell className={`${cell} w-[90px] text-center`}>{r.opened}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PanelCard>
  );
}
