import { apiClient } from "./apiClient";
import type { ApiResponse } from "@/types/auth.types";

export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  source: string;
  category: string;
  imageUrl?: string;
  relatedSymbols: string[];
  url?: string;
  author?: string;
  readTime?: string;
  publishedAt: string;
  isDeskPublication: boolean;
  viewsCount: number;
  timeAgo: string;
  formattedCategory: string;
}

export interface NewsCategory {
  id: string;
  label: string;
  count: number;
}

export interface NewsListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NewsListData {
  articles: NewsArticle[];
  paginationInfo: { from: number; to: number; total: number; label: string };
  activeCategory: string;
  categories: NewsCategory[];
}

export interface NewsQuery {
  category?: string;
  search?: string;
  symbol?: string;
  page?: number;
  limit?: number;
}

export const newsService = {
  async list(params: NewsQuery) {
    const { data } = await apiClient.get<ApiResponse<NewsListData> & { meta: NewsListMeta }>("/news", { params });
    return { ...data.data, meta: data.meta };
  },
  async categories() {
    const { data } = await apiClient.get<ApiResponse<NewsCategory[]>>("/news/categories");
    return data.data;
  },
  async getById(idOrSlug: string) {
    const { data } = await apiClient.get<ApiResponse<NewsArticle & { relatedArticles: NewsArticle[] }>>(
      `/news/${encodeURIComponent(idOrSlug)}`
    );
    return data.data;
  },
};
