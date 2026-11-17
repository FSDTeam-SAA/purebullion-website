"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StatusPill, TablePagination } from "../../_components/shared";
import { cn } from "@/lib/utils";
import { SCAN_ROWS, type Momentum, type SignalSetup } from "./data";

const MOMENTUM_TONE: Record<Momentum, "green" | "gray" | "red"> = { Strong: "green", Neutral: "gray", Weak: "red" };
const SIGNAL_TONE: Record<SignalSetup, "green" | "gold" | "gray" | "red"> = {
  "Buy setup": "green",
  "Open Signal": "gold",
  Watch: "gray",
  Hold: "red",
};

const COLS = ["Ticker", "Company Name", "Price", "Change", "Momentum", "Liquidity", "Risk", "Setup", "Signal Setup"];
const LEFT = new Set(["Ticker", "Company Name", "Setup"]);

export function SignalsTable() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  return (
    <section className="overflow-hidden rounded-[8px] border border-[#cbd5e1] bg-[#0b0e0f]">
      <header className="flex items-center justify-between gap-3 border-b border-[#cbd5e1] px-4 py-4">
        <div className="flex items-center gap-4">
          <Image src="/icons/nav/signals.svg" alt="" width={24} height={24} />
          <h2 className="text-[24px] font-medium leading-[1.2] text-pb-text">All Signals</h2>
        </div>
        <span className="text-[12px] text-pb-gold underline underline-offset-2">151 total</span>
      </header>

      <div className="overflow-x-auto pb-scroll">
        <table className="w-full min-w-[960px] table-fixed border-collapse">
          <thead>
            <tr className="bg-pb-head">
              {COLS.map((c) => (
                <th
                  key={c}
                  className={cn(
                    "h-[49px] px-5 text-[16px] font-medium text-pb-text",
                    LEFT.has(c) ? "text-left" : "text-center"
                  )}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCAN_ROWS.map((row, i) => (
              <tr
                key={i}
                onClick={() => router.push(`/stock-scanner/${row.ticker}`)}
                className={cn("group h-12 cursor-pointer text-[16px] text-pb-muted transition-colors hover:bg-[#121719]", i % 2 === 0 && "bg-[#0d1112]")}
              >
                <td className="px-5 text-left">
                  <Link href={`/stock-scanner/${row.ticker}`} className="block text-pb-text">
                    {row.id}
                  </Link>
                </td>
                <td className="truncate px-5 text-left">{row.company}</td>
                <td className="px-5 text-center text-pb-text">{row.price}</td>
                <td className="px-5 text-center text-pb-text">{row.change}</td>
                <td className="px-5 text-center">
                  <StatusPill tone={MOMENTUM_TONE[row.momentum]} className="px-2 py-1">{row.momentum}</StatusPill>
                </td>
                <td className="px-5 text-center text-pb-text">{row.liquidity}</td>
                <td className="px-5 text-center text-pb-text">{row.risk}</td>
                <td className="truncate px-5 text-left text-pb-text">{row.setup}</td>
                <td className="px-5 text-center">
                  <StatusPill tone={SIGNAL_TONE[row.signal]} className="px-2 py-1">{row.signal}</StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination page={page} onPageChange={setPage} className="px-4 py-4" />
    </section>
  );
}
