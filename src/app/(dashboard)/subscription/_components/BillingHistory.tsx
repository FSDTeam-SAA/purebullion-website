"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PanelCard } from "../../_components/shared/PanelCard";
import { TablePagination } from "../../_components/shared/TablePagination";
import { PanelEmpty, PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { useBillingHistory, useDownloadAllInvoices, useDownloadInvoice } from "@/hooks/useSubscription";
import { fmtDate } from "@/lib/format";

const th = "h-[50px] px-5 text-[14px] font-normal text-pb-text";
const td = "h-[50px] px-5 py-0 text-[14px] text-pb-muted";
const LIMIT = 10;

export function BillingHistory() {
  const [page, setPage] = useState(1);
  const q = useBillingHistory(page, LIMIT);
  const downloadOne = useDownloadInvoice();
  const downloadAll = useDownloadAllInvoices();

  const items = q.data?.billingHistory ?? [];
  const info = q.data?.paginationInfo;
  const total = info?.totalData ?? 0;
  const totalPages = info?.totalPages ?? 1;
  const pages: (number | "...")[] =
    totalPages <= 5
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : [1, 2, 3, "...", totalPages];

  return (
    <PanelCard
      title="Billing history"
      bodyClassName="p-0"
      headerExtra={
        <Button
          variant="light"
          disabled={downloadAll.isPending || total === 0}
          onClick={() => downloadAll.mutate()}
          className="my-1 h-[52px] gap-2 rounded-lg border border-white bg-[#F1F5F9] px-6 text-[16px] font-medium text-[#0f172a]"
        >
          <FileDown className="!size-5" />
          Download All
        </Button>
      }
    >
      {q.isLoading ? (
        <PanelLoading />
      ) : q.isError ? (
        <PanelError message={q.error?.message} onRetry={() => q.refetch()} />
      ) : items.length === 0 ? (
        <PanelEmpty>No invoices yet.</PanelEmpty>
      ) : (
        <>
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
              {items.map((inv) => (
                <TableRow key={inv._id} className="border-0 hover:bg-white/[0.02]">
                  <TableCell className={td}>{inv.invoice}</TableCell>
                  <TableCell className={`${td} text-center`}>{inv.formattedDate || fmtDate(inv.date)}</TableCell>
                  <TableCell className={`${td} capitalize`}>{inv.description}</TableCell>
                  <TableCell className={`${td} text-center`}>{inv.formattedAmount}</TableCell>
                  <TableCell className={`${td} text-center`}>
                    <span className="inline-block rounded-[3px] border border-[#20a978] bg-[#e7f6ef] px-2 py-1 text-[12px] font-medium leading-[1.2] text-[#20a978]">
                      {inv.status}
                    </span>
                  </TableCell>
                  <TableCell className={`${td} text-center`}>
                    <button
                      type="button"
                      disabled={downloadOne.isPending}
                      onClick={() => downloadOne.mutate({ id: inv._id, invoice: inv.invoice })}
                      className="inline-flex items-center gap-1 text-pb-gold underline underline-offset-2 disabled:opacity-60"
                    >
                      <FileDown className="size-5" />
                      Download
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            from={(page - 1) * LIMIT + 1}
            to={Math.min(page * LIMIT, total)}
            total={total}
            page={page}
            pages={pages}
            onPageChange={(p) => setPage(Math.min(Math.max(1, p), totalPages))}
            className="py-4"
          />
        </>
      )}
    </PanelCard>
  );
}
