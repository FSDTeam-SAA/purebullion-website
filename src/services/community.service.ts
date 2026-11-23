import { apiClient } from "./apiClient";
import type { ApiResponse } from "@/types/auth.types";
import type { PageMeta } from "./alerts.service";

export interface CommunityAuthor {
  _id?: string;
  name: string;
  username?: string;
  profileImage?: string;
  role?: string;
}

export interface CommunityPostDto {
  _id: string;
  title: string;
  content: string;
  topic: string;
  media: string[];
  mediaType: string;
  likesCount: number;
  repliesCount: number;
  viewsCount?: number;
  isLikedByMe: boolean;
  isMyPost: boolean;
  timeAgo: string;
  createdAt: string;
  author: CommunityAuthor;
}

export interface CommunityStatsDto {
  totalMembers: number;
  formattedMembers: string;
  userTotalPosts: number;
  userTotalLikes: number;
  formattedLikes: string;
  totalPosts: number;
  totalCommunityLikes: number;
}

export interface CommunityCommentDto {
  _id: string;
  content: string;
  likesCount: number;
  repliesCount: number;
  parentComment?: string | null;
  timeAgo: string;
  createdAt: string;
  author: CommunityAuthor;
}

export interface AnnouncementDto {
  _id: string;
  title: string;
  message: string;
  type: string;
  publishedAt?: string;
  createdAt?: string;
}

export type FeedSort = "trending" | "newest" | "most-replies";

export interface PostsParams {
  topic?: string;
  sort?: FeedSort;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  topic: string;
  files?: File[];
}

export interface ReportPayload {
  targetType: "post" | "comment";
  targetId: string;
  reasons: string[];
  description?: string;
}

export const communityService = {
  async statistics() {
    const res = await apiClient.get<ApiResponse<CommunityStatsDto>>("/community/statistics");
    return res.data.data;
  },
  async posts(params: PostsParams) {
    const res = await apiClient.get<
      ApiResponse<{ posts: CommunityPostDto[]; paginationInfo: Record<string, unknown> }> & { meta: PageMeta }
    >("/community/posts", { params });
    return { posts: res.data.data.posts, meta: res.data.meta };
  },
  async post(id: string) {
    const res = await apiClient.get<ApiResponse<CommunityPostDto>>(`/community/posts/${id}`);
    return res.data.data;
  },
  async createPost(payload: CreatePostPayload) {
    const fd = new FormData();
    fd.append("title", payload.title);
    fd.append("content", payload.content);
    fd.append("topic", payload.topic);
    payload.files?.forEach((f) => fd.append("files", f));
    const res = await apiClient.post<ApiResponse<CommunityPostDto>>("/community/posts", fd, { timeout: 60000 });
    return res.data.data;
  },
  async deletePost(id: string) {
    const res = await apiClient.delete<ApiResponse<{ id: string }>>(`/community/posts/${id}`);
    return res.data.data;
  },
  async toggleLike(id: string) {
    const res = await apiClient.post<ApiResponse<{ isLiked: boolean; likesCount: number }>>(`/community/posts/${id}/like`);
    return res.data.data;
  },
  async comments(postId: string, params: { page?: number; limit?: number; parentCommentId?: string } = {}) {
    const res = await apiClient.get<ApiResponse<{ comments: CommunityCommentDto[] }> & { meta: PageMeta }>(
      `/community/posts/${postId}/comments`,
      { params }
    );
    return { comments: res.data.data.comments, meta: res.data.meta };
  },
  async addComment(postId: string, payload: { content: string; parentCommentId?: string }) {
    const res = await apiClient.post<ApiResponse<CommunityCommentDto>>(`/community/posts/${postId}/comments`, payload);
    return res.data.data;
  },
  async deleteComment(id: string) {
    const res = await apiClient.delete<ApiResponse<{ id: string }>>(`/community/comments/${id}`);
    return res.data.data;
  },
  async report(payload: ReportPayload) {
    const res = await apiClient.post<ApiResponse<unknown>>("/community/report", payload);
    return res.data;
  },
  async announcements() {
    const res = await apiClient.get<ApiResponse<AnnouncementDto[]>>("/announcements");
    return res.data.data;
  },
};
