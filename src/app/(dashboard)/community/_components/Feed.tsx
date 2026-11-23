"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PostCard } from "./PostCard";
import type { CommunityPostDto } from "@/services/community.service";
import { PanelError, PanelLoading } from "../../_components/shared/QueryState";

type Props = {
  posts: CommunityPostDto[];
  loading?: boolean;
  error?: boolean;
  refreshing: boolean;
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
  onAdd: () => void;
  onRefresh: () => void;
  onLike: (id: string) => void;
  onComment: (post: CommunityPostDto) => void;
  onReport: (post: CommunityPostDto) => void;
  onDelete: (post: CommunityPostDto) => void;
};

export function Feed({ posts, loading, error, refreshing, hasMore, loadingMore, onLoadMore, onAdd, onRefresh, onLike, onComment, onReport, onDelete }: Props) {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-5 overflow-hidden rounded-lg border border-white/10 bg-[#101010] p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-semibold leading-[1.2] text-white">Feed</h2>
        <Button variant="gold" className="h-[51px] rounded-lg px-8 text-[16px]" onClick={onAdd}>
          Add New Post
        </Button>
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onRefresh} className="text-[16px] font-medium leading-[1.2] text-[#c09248] hover:brightness-125">
          Refresh
        </button>
      </div>
      <div className={cn("flex flex-col gap-5 transition-opacity", refreshing && "opacity-50")}>
        {loading && <PanelLoading rows={4} />}
        {error && !loading && <PanelError message="Could not load the community feed." onRetry={onRefresh} />}
        {!loading && !error && posts.length === 0 && <p className="py-10 text-center text-[14px] text-pb-muted">No discussions match these filters.</p>}
        {posts.map((p) => (
          <PostCard
            key={p._id}
            post={p}
            onLike={() => onLike(p._id)}
            onComment={() => onComment(p)}
            onReport={() => onReport(p)}
            onDelete={() => onDelete(p)}
          />
        ))}
        {hasMore && (
          <button
            type="button"
            onClick={onLoadMore}
            disabled={loadingMore}
            className="self-center text-[16px] font-medium leading-[1.2] text-[#c09248] hover:brightness-125 disabled:opacity-50"
          >
            {loadingMore ? "Loading…" : "Load more"}
          </button>
        )}
      </div>
    </section>
  );
}
