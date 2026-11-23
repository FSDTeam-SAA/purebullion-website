export const categories = ["All News", "Technology", "Stocks", "ETFs", "Economy", "Education"] as const;
export type Category = (typeof categories)[number];

/** Tab label -> category id understood by GET /news?category= */
export const categoryId: Record<Category, string> = {
  "All News": "all",
  Technology: "technology",
  Stocks: "stocks",
  ETFs: "etfs",
  Economy: "economy",
  Education: "education",
};

export const PAGE_SIZE = 9;

/** Compact page list for TablePagination: 1 2 3 … last */
export function pageList(page: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 5) return Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1);
  const start = Math.min(Math.max(1, page - 1), totalPages - 3);
  return [start, start + 1, start + 2, "...", totalPages];
}
