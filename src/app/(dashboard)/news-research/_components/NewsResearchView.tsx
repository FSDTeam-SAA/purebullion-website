"use client";

import { useEffect, useState } from "react";
import { TablePagination } from "../../_components/shared";
import { PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { useNewsList } from "@/hooks/useNews";
import { ArticleRow } from "./ArticleRow";
import { NewsToolbar } from "./NewsToolbar";
import { PAGE_SIZE, categoryId, pageList, type Category } from "./data";

export function NewsResearchView() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [active, setActive] = useState<Category>("All News");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 350);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => setPage(1), [debounced, active]);

  const { data, isLoading, isError, refetch } = useNewsList({
    category: categoryId[active],
    search: debounced || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const articles = data?.articles ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const info = data?.paginationInfo;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-bold leading-[1.2] text-pb-text">News &amp; Research</h1>
        <p className="text-[12px] leading-[1.2] text-pb-muted">Desk publications on a fixed schedule, plus company news for covered names</p>
      </div>
      <NewsToolbar query={query} onQuery={setQuery} active={active} onActive={setActive} />
      <div className="flex flex-col gap-5 overflow-hidden rounded-lg border border-white/10 bg-[#101010] p-4">
        {isLoading ? (
          <PanelLoading rows={5} />
        ) : isError ? (
          <PanelError message={undefined} onRetry={() => refetch()} />
        ) : articles.length === 0 ? (
          <p className="py-16 text-center text-[16px] text-pb-muted">No articles match your filters.</p>
        ) : (
          articles.map((a) => <ArticleRow key={a._id} a={a} />)
        )}
        <TablePagination
          from={info?.from ?? 0}
          to={info?.to ?? 0}
          total={info?.total ?? 0}
          page={page}
          pages={pageList(page, totalPages)}
          onPageChange={(p) => setPage(Math.max(1, Math.min(totalPages, p)))}
        />
      </div>
    </div>
  );
}
