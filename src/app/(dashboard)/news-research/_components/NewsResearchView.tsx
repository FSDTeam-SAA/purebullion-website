"use client";

import { useMemo, useState } from "react";
import { TablePagination } from "../../_components/shared";
import { ArticleRow } from "./ArticleRow";
import { NewsToolbar } from "./NewsToolbar";
import { articles, type Category } from "./data";

export function NewsResearchView() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category>("All News");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (active === "All News" || a.tag === active) &&
        (!q || a.title.toLowerCase().includes(q) || a.source.toLowerCase().includes(q) || a.body.join(" ").toLowerCase().includes(q))
    );
  }, [query, active]);

  const showAll = active === "All News" && !query.trim();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-[20px] font-bold leading-[1.2] text-pb-text">News &amp; Research</h1>
        <p className="text-[12px] leading-[1.2] text-pb-muted">Desk publications on a fixed schedule, plus company news for covered names</p>
      </div>
      <NewsToolbar query={query} onQuery={setQuery} active={active} onActive={setActive} />
      <div className="flex flex-col gap-5 overflow-hidden rounded-lg border border-white/10 bg-[#101010] p-4">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-[16px] text-pb-muted">No articles match your filters.</p>
        ) : (
          filtered.map((a) => <ArticleRow key={a.id} a={a} />)
        )}
        <TablePagination
          from={filtered.length ? 1 : 0}
          to={showAll ? 9 : filtered.length}
          total={showAll ? 120 : filtered.length}
          page={page}
          onPageChange={(p) => setPage(Math.min(17, p))}
        />
      </div>
    </div>
  );
}
