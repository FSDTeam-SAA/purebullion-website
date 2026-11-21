"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddComment,
  useCommunityFeed,
  useCreatePost,
  useDeletePost,
  useReportContent,
  useToggleLike,
} from "@/hooks/useCommunity";
import type { CommunityPostDto } from "@/services/community.service";
import { CommentModal } from "./modals/CommentModal";
import { NewPostModal } from "./modals/NewPostModal";
import { ReportModal } from "./modals/ReportModal";
import { Feed } from "./Feed";
import { FiltersPanel } from "./FiltersPanel";
import { SidePanels } from "./SidePanels";
import { StatTiles } from "./StatTiles";
import { SORT_PARAM, topicParam, type SortKey, type Topic } from "./data";

export function CommunityView() {
  const qc = useQueryClient();
  // draft (chips) vs applied (feed) filter state
  const [topic, setTopic] = useState<Topic>("All discussions");
  const [sort, setSort] = useState<SortKey>("Trending");
  const [applied, setApplied] = useState<{ topic: Topic; sort: SortKey }>({ topic: "All discussions", sort: "Trending" });

  const [newOpen, setNewOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<CommunityPostDto | null>(null);
  const [commentTarget, setCommentTarget] = useState<CommunityPostDto | null>(null);

  const feed = useCommunityFeed({ topic: topicParam(applied.topic), sort: SORT_PARAM[applied.sort] });
  const posts = useMemo(() => feed.data?.pages.flatMap((p) => p.posts) ?? [], [feed.data]);

  const like = useToggleLike();
  const createPost = useCreatePost();
  const deletePost = useDeletePost();
  const addComment = useAddComment();
  const report = useReportContent();

  const refresh = () => qc.invalidateQueries({ queryKey: ["community"] });

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
              posts={posts}
              loading={feed.isLoading}
              error={feed.isError}
              refreshing={feed.isRefetching && !feed.isFetchingNextPage}
              hasMore={feed.hasNextPage}
              loadingMore={feed.isFetchingNextPage}
              onLoadMore={() => feed.fetchNextPage()}
              onAdd={() => setNewOpen(true)}
              onRefresh={refresh}
              onLike={(id) => like.mutate(id)}
              onComment={setCommentTarget}
              onReport={setReportTarget}
              onDelete={(p) => {
                if (window.confirm("Delete this post? This cannot be undone.")) deletePost.mutate(p._id);
              }}
            />
          </div>
        </div>
        <SidePanels />
      </div>

      <NewPostModal
        open={newOpen}
        onOpenChange={setNewOpen}
        publishing={createPost.isPending}
        onPublish={({ title, body, category, file }) =>
          createPost.mutate({ title, content: body, topic: category, files: file ? [file] : undefined })
        }
      />
      <ReportModal
        open={!!reportTarget}
        onOpenChange={(o) => !o && setReportTarget(null)}
        onSubmit={(reasons, details) =>
          reportTarget &&
          report.mutate({ targetType: "post", targetId: reportTarget._id, reasons, description: details.trim() || undefined })
        }
      />
      <CommentModal
        open={!!commentTarget}
        onOpenChange={(o) => !o && setCommentTarget(null)}
        onSave={(content) => commentTarget && addComment.mutate({ postId: commentTarget._id, content })}
      />
    </div>
  );
}
