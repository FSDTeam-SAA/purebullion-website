import Image from "next/image";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Mover } from "./data";

export function MoversTable({ title, rows }: { title: string; rows: Mover[] }) {
  return (
    <section className="flex min-w-0 flex-col gap-3 rounded-[12px] border border-white/10 bg-[#101010] p-3">
      <h2 className="text-[24px] font-semibold leading-[1.2] text-white">{title}</h2>
      <div className="bg-[#121719]">
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
            {rows.map((r) => (
              <TableRow key={r.rank} className="border-0 hover:bg-transparent">
                <TableCell className="py-3.5 text-[16px] text-pb-text">{r.rank}</TableCell>
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-3">
                    <Image src={r.logo} alt="" width={36} height={36} className="size-9 rounded-full" />
                    <span className="text-[16px] text-pb-text">{r.symbol}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3.5 text-center text-[16px] text-pb-text">{r.price}</TableCell>
                <TableCell className={cn("py-3.5 text-center text-[16px]", r.change.startsWith("-") ? "text-pb-down" : "text-pb-up")}>
                  {r.change}
                </TableCell>
                <TableCell className="py-3.5 text-center text-[16px] text-pb-text">{r.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
