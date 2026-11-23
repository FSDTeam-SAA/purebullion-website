"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PanelEmpty, PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { fmtCompact, fmtPct, fmtPrice } from "@/lib/format";
import { useMovers } from "@/hooks/useMarketData";
import type { MoverKind } from "@/services/marketData.service";
import { logoFor } from "./data";

export function MoversTable({ title, kind }: { title: string; kind: MoverKind }) {
  const { data, isLoading, isError, refetch } = useMovers(kind);
  const rows = (data ?? []).slice(0, 5);
  return (
    <section className="flex min-w-0 flex-col gap-3 rounded-[12px] border border-white/10 bg-[#101010] p-3">
      <h2 className="text-[24px] font-semibold leading-[1.2] text-white">{title}</h2>
      <div className="bg-[#121719]">
        {isLoading ? (
          <PanelLoading rows={5} />
        ) : isError ? (
          <PanelError onRetry={() => refetch()} />
        ) : rows.length === 0 ? (
          <PanelEmpty />
        ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#e4eaf8] hover:bg-transparent">
              {["#", "Name", "Price", "Change", "Volume"].map((h, i) => (
                <TableHead key={h} className={cn("h-[58px] text-[18px] font-bold text-pb-text", i === 0 ? "w-10 text-left" : "text-center")}>
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, idx) => {
              const logo = logoFor(r.symbol);
              const down = r.percentChange < 0;
              return (
              <TableRow key={r.symbol} className="border-0 hover:bg-transparent">
                <TableCell className="py-3.5 text-[16px] text-pb-text">{idx + 1}</TableCell>
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-3">
                    {logo ? (
                      <Image src={logo} alt="" width={36} height={36} className="size-9 rounded-full" />
                    ) : (
                      <span className="flex size-9 items-center justify-center rounded-full bg-[#1B2227] text-[14px] text-pb-text">{r.symbol[0]}</span>
                    )}
                    <span className="text-[16px] text-pb-text">{r.symbol}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3.5 text-center text-[16px] text-pb-text">{fmtPrice(r.price)}</TableCell>
                <TableCell className={cn("py-3.5 text-center text-[16px]", down ? "text-pb-down" : "text-pb-up")}>
                  {fmtPct(r.percentChange)}
                </TableCell>
                <TableCell className="py-3.5 text-center text-[16px] text-pb-text">{fmtCompact(r.volume)}</TableCell>
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
