"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  getCategories,
} from "@/lib/posts";
import type { PostMeta, Post } from "@/types/posts";

export function useAllPosts() {
  return useQuery<PostMeta[]>({
    queryKey: ["posts", "all"],
    queryFn: getAllPosts,
    placeholderData: keepPreviousData,
  });
}

export function usePostBySlug(slug: string | undefined) {
  return useQuery<Post | null>({
    queryKey: ["posts", "slug", slug],
    queryFn: () => (slug ? getPostBySlug(slug) : Promise.resolve(null)),
    enabled: !!slug,
    placeholderData: keepPreviousData,
  });
}

export function usePostsByCategory(category: string | undefined) {
  return useQuery<PostMeta[]>({
    queryKey: ["posts", "category", category],
    queryFn: () => (category ? getPostsByCategory(category) : Promise.resolve([])),
    enabled: !!category,
    placeholderData: keepPreviousData,
  });
}

export function useCategories() {
  return useQuery<string[]>({
    queryKey: ["posts", "categories"],
    queryFn: getCategories,
    placeholderData: keepPreviousData,
  });
}


