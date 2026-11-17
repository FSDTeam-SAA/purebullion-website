"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SideTag, StatusPill, TablePagination } from "../../_components/shared";
import { signalRows } from "./data";

const COLS = ["ID", "Signal", "", "Entry", "Target", "Stop", "Last / exit", "Return", "R:R", "STATUS", "DATE", "Action"];

export function AllSignalsTable() {
  const [page, setPage] = useState(1);
  return (
    <section className="overflow-hidden rounded-[8px] border border-white bg-pb-card">
      <header className="flex items-center justify-between border-b border-white px-4 py-4">
        <div className="flex items-center gap-4">
          <Image src="/icons/nav/signals.svg" alt="" width={20} height={20} />
          <h2 className="text-[24px] font-normal text-pb-text">All Signals</h2>
        </div>
        <span className="text-[12px] text-pb-gold underline">151 total</span>
      </header>
      <Table>
        <TableHeader>
          <TableRow className="border-0 bg-pb-head hover:bg-pb-head">
            {COLS.map((c, i) => (
              <TableHead key={i} className={`h-[50px] text-[16px] font-normal text-pb-text ${i >= 3 ? "text-center" : ""}`}>
                {c}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {signalRows.map((r, i) => (
            <TableRow key={i} className="h-[50px] border-b border-pb-line hover:bg-pb-surface/40">
              <TableCell className="text-[16px] text-pb-text">{r.id}</TableCell>
              <TableCell className="w-[80px]"><SideTag side={r.side} className="px-2 py-1 text-[14px]" /></TableCell>
              <TableCell>
                <div className="flex items-center gap-8">
                  <span className="w-[56px] text-[16px] text-pb-text">{r.ticker}</span>
                  <span className="text-[16px] text-pb-muted">{r.company}</span>
                </div>
              </TableCell>
              {[r.entry, r.target, r.stop, r.last].map((v, k) => (
                <TableCell key={k} className="text-center text-[16px] text-pb-text">{v}</TableCell>
              ))}
              <TableCell className="text-center text-[14px] text-pb-muted">{r.ret}</TableCell>
              <TableCell className="text-center text-[16px] text-pb-muted">{r.rr}</TableCell>
              <TableCell className="text-center">
                <StatusPill tone={r.status === "Active" ? "green" : "gray"} className={r.status === "Active" ? "border-transparent bg-[#E8FFF6] px-3 py-1 text-[14px] text-[#007A55]" : "border-transparent bg-[#F1F5F9] px-3 py-1 text-[14px] text-[#475569]"}>
                  {r.status}
                </StatusPill>
              </TableCell>
              <TableCell className="text-center text-[16px] text-pb-text">{r.date}</TableCell>
              <TableCell className="text-center">
                <Link href={`/signals/${r.ticker.toLowerCase()}`} className="inline-flex items-center gap-2 text-[16px] text-pb-gold underline">
                  <Eye className="size-4" /> Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination page={page} onPageChange={setPage} from={1} to={9} total={120} className="px-4 py-4" />
    </section>
  );
}
