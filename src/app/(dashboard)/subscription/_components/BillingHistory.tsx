"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PanelCard } from "../../_components/shared/PanelCard";
import { TablePagination } from "../../_components/shared/TablePagination";
import { invoices } from "./data";

const th = "h-[50px] px-5 text-[14px] font-normal text-pb-text";
const td = "h-[50px] px-5 py-0 text-[14px] text-pb-muted";

export function BillingHistory() {
  const [page, setPage] = useState(1);
  return (
    <PanelCard
      title="Billing history"
      bodyClassName="p-0"
      headerExtra={
        <Button variant="light" className="my-1 h-[52px] gap-2 rounded-lg border border-white bg-[#F1F5F9] px-6 text-[16px] font-medium text-[#0f172a]">
          <FileDown className="!size-5" />
          Download All
        </Button>
      }
    >
      <Table>
        <TableHeader>
          <TableRow className="border-0 bg-[#121719] hover:bg-[#121719]">
            <TableHead className={th}>Invoice</TableHead>
            <TableHead className={`${th} text-center`}>Date</TableHead>
            <TableHead className={th}>Description</TableHead>
            <TableHead className={`${th} text-center`}>Amount</TableHead>
            <TableHead className={`${th} text-center`}>Status</TableHead>
            <TableHead className={`${th} text-center`}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv, i) => (
            <TableRow key={`${inv.id}-${i}`} className="border-0 hover:bg-white/[0.02]">
              <TableCell className={td}>{inv.id}</TableCell>
              <TableCell className={`${td} text-center`}>{inv.date}</TableCell>
              <TableCell className={td}>{inv.description}</TableCell>
              <TableCell className={`${td} text-center`}>{inv.amount}</TableCell>
              <TableCell className={`${td} text-center`}>
                <span className="inline-block rounded-[3px] border border-[#20a978] bg-[#e7f6ef] px-2 py-1 text-[12px] font-medium leading-[1.2] text-[#20a978]">
                  {inv.status}
                </span>
              </TableCell>
              <TableCell className={`${td} text-center`}>
                <button type="button" className="inline-flex items-center gap-1 text-pb-gold underline underline-offset-2">
                  <FileDown className="size-5" />
                  Download
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination page={page} onPageChange={setPage} className="py-4" />
    </PanelCard>
  );
}
