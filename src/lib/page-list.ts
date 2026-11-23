/** Build the `pages` array for TablePagination: [1, 2, 3, "...", 17]. */
export function buildPageList(page: number, totalPages: number): (number | "...")[] {
  const total = Math.max(1, totalPages);
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set<number>([1, total, page - 1, page, page + 1]);
  const nums = Array.from(set).filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "...")[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push("...");
    out.push(n);
  });
  return out;
}
