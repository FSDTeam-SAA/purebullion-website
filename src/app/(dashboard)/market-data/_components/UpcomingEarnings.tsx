import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { earnings } from "./data";

export function UpcomingEarnings() {
  return (
    <section className="flex min-w-0 flex-col gap-3 rounded-[12px] border border-white/10 bg-[#101010] p-3">
      <h2 className="text-[24px] font-semibold leading-[1.2] text-white">Upcoming Earnings</h2>
      <div className="bg-[#121719]">
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
            {earnings.map((e) => (
              <TableRow key={e.symbol} className="border-0 hover:bg-transparent">
                <TableCell className="px-4 py-3.5 text-[16px] text-pb-text">{e.date}</TableCell>
                <TableCell className="px-4 py-3.5">
                  <Image src={e.logo} alt={e.symbol} width={36} height={36} className="size-9 rounded-full" />
                </TableCell>
                <TableCell className="px-4 py-3.5 text-center text-[16px] text-pb-text">{e.company}</TableCell>
                <TableCell className="px-4 py-3.5 text-center text-[16px] text-pb-text">{e.eps}</TableCell>
                <TableCell className="whitespace-pre px-4 py-3.5 text-center text-[16px] text-pb-text">{e.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
