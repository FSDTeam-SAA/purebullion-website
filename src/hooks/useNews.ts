"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { newsService, type NewsQuery } from "@/services/news.service";

export const useNewsList = (params: NewsQuery) =>
  useQuery({ queryKey: ["news", "list", params], queryFn: () => newsService.list(params), placeholderData: keepPreviousData });

export const useNewsCategories = () =>
  useQuery({ queryKey: ["news", "categories"], queryFn: newsService.categories });

export const useNewsArticle = (idOrSlug?: string) =>
  useQuery({ queryKey: ["news", "article", idOrSlug], queryFn: () => newsService.getById(idOrSlug!), enabled: !!idOrSlug });
