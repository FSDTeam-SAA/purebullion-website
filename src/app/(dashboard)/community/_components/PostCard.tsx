"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Post } from "./data";

type Props = {
  post: Post;
  liked: boolean;
  onLike: () => void;
  onComment: () => void;
  onReport: () => void;
};

const actionCls = "flex items-center gap-[6px] text-[12px] font-medium leading-[1.5] text-white/50 transition-colors hover:text-white";

export function PostCard({ post, liked, onLike, onComment, onReport }: Props) {
  return (
    <article className="flex flex-col gap-6 rounded-xl bg-pb-surface px-3 py-2">
      <header className="flex items-center gap-3">
        <Avatar className="size-12">
          {post.avatar && <AvatarImage src={post.avatar} alt={post.author} />}
          <AvatarFallback className="bg-pb-head text-[14px] text-pb-gold">
            {post.author.split(" ").map((w) => w[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-end gap-[11px]">
          <p className="text-[16px] font-semibold leading-[1.2] text-pb-text">{post.author}</p>
          <div className="flex items-center gap-2 text-[12px] font-medium leading-[1.5] text-pb-muted">
            <span>{post.topicLabel}</span>
            <span className="flex items-center gap-2">
              <span className="size-[3px] rounded-full bg-pb-muted" />
              {post.timeLabel}
            </span>
          </div>
        </div>
      </header>

      <div className="flex items-start gap-6">
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
          <h3 className="text-[16px] font-semibold leading-[1.2] text-pb-text">{post.title}</h3>
          <p className="text-[12px] font-medium leading-[1.5] text-pb-muted">{post.body}</p>
          <div className="flex items-center gap-[15px]">
            <button type="button" onClick={onComment} className={actionCls} aria-label="Write a comment">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/community/comment.svg" alt="" className="size-4" />
              {post.comments}
            </button>
            <button type="button" onClick={onLike} aria-pressed={liked} className={cn(actionCls, liked && "text-pb-gold hover:text-pb-gold")} aria-label="Like">
              {liked ? (
                <Heart className="size-4 fill-pb-gold text-pb-gold" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/icons/community/like.svg" alt="" className="size-4" />
              )}
              {post.likes + (liked ? 1 : 0)}
            </button>
            <button type="button" onClick={onReport} className={actionCls}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/community/report.svg" alt="" className="size-4" />
              Report
            </button>
          </div>
        </div>
        {post.image && (
          <div className="relative w-[191px] shrink-0 self-stretch overflow-hidden rounded-lg bg-[#d9d9d9]">
            <Image src={post.image} alt="" fill sizes="191px" className="object-cover" />
          </div>
        )}
      </div>
    </article>
  );
}
