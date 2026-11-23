/** Build the page-number list consumed by <TablePagination pages=... />. */
export function buildPages(page: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 5) return Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1);
  const out: (number | "...")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) out.push("...");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < totalPages - 1) out.push("...");
  out.push(totalPages);
  return out;
}

export interface PageMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** "Showing {from} to {to} of {total}" bounds. */
export function pageRange(meta?: Partial<PageMeta>) {
  const total = meta?.total ?? 0;
  const page = meta?.page ?? 1;
  const limit = meta?.limit ?? 10;
  return {
    from: total === 0 ? 0 : (page - 1) * limit + 1,
    to: Math.min(page * limit, total),
    total,
  };
}
