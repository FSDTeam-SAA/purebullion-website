"use client";

import { useMemo, useState } from "react";
import { CommentModal } from "./modals/CommentModal";
import { NewPostModal } from "./modals/NewPostModal";
import { ReportModal } from "./modals/ReportModal";
import { Feed } from "./Feed";
import { FiltersPanel } from "./FiltersPanel";
import { SidePanels } from "./SidePanels";
import { StatTiles } from "./StatTiles";
import { INITIAL_POSTS, type Post, type SortKey, type Topic } from "./data";

export function CommunityView() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  // draft (chips) vs applied (feed) filter state
  const [topic, setTopic] = useState<Topic>("All discussions");
  const [sort, setSort] = useState<SortKey>("Trending");
  const [applied, setApplied] = useState<{ topic: Topic; sort: SortKey }>({ topic: "All discussions", sort: "Trending" });
  const [refreshing, setRefreshing] = useState(false);

  const [newOpen, setNewOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<Post | null>(null);
  const [commentTarget, setCommentTarget] = useState<Post | null>(null);

  const visible = useMemo(() => {
    const list = posts.filter((p) => applied.topic === "All discussions" || p.category === applied.topic);
    const score = (p: Post) => p.likes + p.comments + (liked.has(p.id) ? 1 : 0);
    return [...list].sort((a, b) =>
      applied.sort === "Newest" ? a.minutesAgo - b.minutesAgo : applied.sort === "Most replies" ? b.comments - a.comments : score(b) - score(a)
    );
  }, [posts, applied, liked]);

  const toggleLike = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <div className="flex flex-col gap-6 pb-6 pt-6">
      <div className="flex flex-col gap-4 px-6">
        <h1 className="text-[20px] font-bold leading-[1.2] text-pb-text">Community</h1>
        <p className="text-[12px] leading-[1.2] text-pb-muted">512 securities screened continuously — 502 S&amp;P 500 constituents and 10 liquid ETFs</p>
      </div>

      <div className="flex items-start gap-5 pr-6">
        <div className="flex min-w-0 flex-1 flex-col gap-[21px]">
          <StatTiles />
          <div className="flex items-start gap-4 pl-4">
            <FiltersPanel
              topic={topic}
              sort={sort}
              onTopic={setTopic}
              onSort={setSort}
              onApply={() => setApplied({ topic, sort })}
              onReset={() => {
                setTopic("All discussions");
                setSort("Trending");
                setApplied({ topic: "All discussions", sort: "Trending" });
              }}
            />
            <Feed
              posts={visible}
              liked={liked}
              refreshing={refreshing}
              onAdd={() => setNewOpen(true)}
              onRefresh={refresh}
              onLike={toggleLike}
              onComment={setCommentTarget}
              onReport={setReportTarget}
            />
          </div>
        </div>
        <SidePanels />
      </div>

      <NewPostModal
        open={newOpen}
        onOpenChange={setNewOpen}
        onPublish={({ title, body, category, image }) =>
          setPosts((p) => [
            { id: `new-${Date.now()}`, author: "Jordan R.", topicLabel: category, category, timeLabel: "Just now", minutesAgo: 0, title, body, image, comments: 0, likes: 0 },
            ...p,
          ])
        }
      />
      <ReportModal open={!!reportTarget} onOpenChange={(o) => !o && setReportTarget(null)} onSubmit={() => undefined} />
      <CommentModal
        open={!!commentTarget}
        onOpenChange={(o) => !o && setCommentTarget(null)}
        onSave={() => commentTarget && setPosts((p) => p.map((x) => (x.id === commentTarget.id ? { ...x, comments: x.comments + 1 } : x)))}
      />
    </div>
  );
}
