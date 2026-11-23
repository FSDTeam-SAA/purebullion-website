"use client";

import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PanelEmpty, PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { fmtDate } from "@/lib/format";
import { useEarnings } from "@/hooks/useMarketData";
import { logoFor } from "./data";

export function UpcomingEarnings() {
  const { data, isLoading, isError, refetch } = useEarnings(20);
  const earnings = (data ?? []).slice(0, 5);
  return (
    <section className="flex min-w-0 flex-col gap-3 rounded-[12px] border border-white/10 bg-[#101010] p-3">
      <h2 className="text-[24px] font-semibold leading-[1.2] text-white">Upcoming Earnings</h2>
      <div className="bg-[#121719]">
        {isLoading ? (
          <PanelLoading rows={5} />
        ) : isError ? (
          <PanelError onRetry={() => refetch()} />
        ) : earnings.length === 0 ? (
          <PanelEmpty />
        ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#e4eaf8] hover:bg-transparent">
              {["Date", "Symbol", "Company", "EPS Est", "Time"].map((h) => (
                <TableHead key={h} className="h-[58px] px-4 text-center text-[18px] font-bold text-pb-text first:text-left">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {earnings.map((e) => {
              const logo = logoFor(e.symbol);
              return (
              <TableRow key={`${e.symbol}-${e.date}`} className="border-0 hover:bg-transparent">
                <TableCell className="px-4 py-3.5 text-[16px] text-pb-text">{fmtDate(e.date)}</TableCell>
                <TableCell className="px-4 py-3.5">
                  {logo ? (
                    <Image src={logo} alt={e.symbol} width={36} height={36} className="size-9 rounded-full" />
                  ) : (
                    <span title={e.symbol} className="flex size-9 items-center justify-center rounded-full bg-[#1B2227] text-[14px] text-pb-text">{e.symbol[0]}</span>
                  )}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-center text-[16px] text-pb-text">{e.company}</TableCell>
                <TableCell className="px-4 py-3.5 text-center text-[16px] text-pb-text">{e.epsEstimate ? `$${e.epsEstimate}` : "—"}</TableCell>
                <TableCell className="whitespace-pre px-4 py-3.5 text-center text-[16px] text-pb-text">{e.time}</TableCell>
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
        )}
      </div>
    </section>
  );
}
