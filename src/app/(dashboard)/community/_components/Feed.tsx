"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PostCard } from "./PostCard";
import type { Post } from "./data";

type Props = {
  posts: Post[];
  liked: Set<string>;
  refreshing: boolean;
  onAdd: () => void;
  onRefresh: () => void;
  onLike: (id: string) => void;
  onComment: (post: Post) => void;
  onReport: (post: Post) => void;
};

export function Feed({ posts, liked, refreshing, onAdd, onRefresh, onLike, onComment, onReport }: Props) {
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
        {posts.length === 0 && <p className="py-10 text-center text-[14px] text-pb-muted">No discussions match these filters.</p>}
        {posts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            liked={liked.has(p.id)}
            onLike={() => onLike(p.id)}
            onComment={() => onComment(p)}
            onReport={() => onReport(p)}
          />
        ))}
      </div>
    </section>
  );
}
