"use client";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/services/apiClient";
import {
  communityService,
  type CommunityPostDto,
  type FeedSort,
  type ReportPayload,
} from "@/services/community.service";

const POSTS_KEY = ["community", "posts"] as const;
const PAGE_SIZE = 10;

export function useCommunityStats() {
  return useQuery({ queryKey: ["community", "stats"], queryFn: communityService.statistics });
}

export function useCommunityFeed(params: { topic: string; sort: FeedSort; search?: string }) {
  return useInfiniteQuery({
    queryKey: [...POSTS_KEY, params],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => communityService.posts({ ...params, page: pageParam, limit: PAGE_SIZE }),
    getNextPageParam: (last) => (last.meta.page < last.meta.totalPages ? last.meta.page + 1 : undefined),
  });
}

export function useTrendingPosts(limit = 7) {
  return useQuery({
    queryKey: ["community", "trending", limit],
    queryFn: () => communityService.posts({ topic: "all", sort: "trending", limit }),
    select: (d) => d.posts,
  });
}

export function useCommunityAnnouncements() {
  return useQuery({ queryKey: ["community", "announcements"], queryFn: communityService.announcements });
}

export function usePostComments(postId?: string) {
  return useQuery({
    queryKey: ["community", "comments", postId],
    queryFn: () => communityService.comments(postId!),
    enabled: !!postId,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: communityService.createPost,
    onSuccess: () => {
      toast.success("Post published");
      qc.invalidateQueries({ queryKey: ["community"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: communityService.deletePost,
    onSuccess: () => {
      toast.success("Post deleted");
      qc.invalidateQueries({ queryKey: ["community"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

/** Like toggle with the response patched into every cached feed page. */
export function useToggleLike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: communityService.toggleLike,
    onSuccess: (res, id) => {
      qc.setQueriesData<{ pages: { posts: CommunityPostDto[] }[]; pageParams: unknown[] }>(
        { queryKey: POSTS_KEY },
        (old) =>
          old && {
            ...old,
            pages: old.pages.map((p) => ({
              ...p,
              posts: p.posts.map((x) => (x._id === id ? { ...x, isLikedByMe: res.isLiked, likesCount: res.likesCount } : x)),
            })),
          }
      );
      qc.invalidateQueries({ queryKey: ["community", "stats"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, content, parentCommentId }: { postId: string; content: string; parentCommentId?: string }) =>
      communityService.addComment(postId, { content, parentCommentId }),
    onSuccess: (_r, v) => {
      toast.success("Comment added");
      qc.invalidateQueries({ queryKey: ["community", "comments", v.postId] });
      qc.invalidateQueries({ queryKey: ["community"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useDeleteComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: communityService.deleteComment,
    onSuccess: () => {
      toast.success("Comment deleted");
      qc.invalidateQueries({ queryKey: ["community"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useReportContent() {
  return useMutation({
    mutationFn: (p: ReportPayload) => communityService.report(p),
    onSuccess: () => toast.success("Report submitted. Our team will review it shortly."),
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
