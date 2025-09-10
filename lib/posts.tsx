import {
  supabase,
  createServerSupabaseClient,
  supabaseAdmin,
} from "./supabase";
import type { Database } from "@/lib/supabase";
import type { PostRow, PostInsert, PostUpdate, PostMeta, Post } from "@/types/posts";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

// 타입은 lib/types/posts.ts에서 가져옵니다

// Supabase에서 모든 게시된 포스트 가져오기 (클라이언트 사이드)
export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("포스트를 가져오는 중 오류 발생:", error);
      return [];
    }
    if (!data) return [];

    const rows = (data ?? []) as PostRow[];
    return rows.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      date: post.created_at.split("T")[0],
      category: post.category,
      tags: post.tags,
      excerpt: post.excerpt,
      cover: post.cover,
      published: post.published,
    }));
  } catch (error) {
    console.error("포스트를 가져오는 중 오류 발생:", error);
    return [];
  }
}

// 서버 사이드에서 모든 게시된 포스트 가져오기
export async function getAllPostsServer(): Promise<PostMeta[]> {
  try {
    const supabaseClient = createServerSupabaseClient();
    const { data, error } = await supabaseClient
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("포스트를 가져오는 중 오류 발생:", error);
      return [];
    }
    if (!data) return [];

    const rows = (data ?? []) as PostRow[];
    return rows.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      date: post.created_at.split("T")[0],
      category: post.category,
      tags: post.tags,
      excerpt: post.excerpt,
      cover: post.cover,
      published: post.published,
    }));
  } catch (error) {
    console.error("포스트를 가져오는 중 오류 발생:", error);
    return [];
  }
}

// Supabase에서 slug로 포스트 가져오기 (클라이언트 사이드)
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      console.error(`포스트 ${slug}를 찾을 수 없습니다:`, error);
      return null;
    }

    const row = data as PostRow;

    // 마크다운을 HTML로 변환
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(row.content);

    const htmlContent = processedContent.toString();
    return {
      meta: {
        id: row.id,
        slug: row.slug,
        title: row.title,
        date: row.created_at.split("T")[0],
        category: row.category,
        tags: row.tags,
        excerpt: row.excerpt,
        cover: row.cover,
        published: row.published,
      },
      content: htmlContent,
    };
  } catch (error) {
    console.error(`포스트 ${slug}를 읽는 중 오류 발생:`, error);
    return null;
  }
}

// 서버 사이드에서 slug로 포스트 가져오기
export async function getPostBySlugServer(slug: string): Promise<Post | null> {
  try {
    const supabaseClient = createServerSupabaseClient();
    const { data, error } = await supabaseClient
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      console.error(`포스트 ${slug}를 찾을 수 없습니다:`, error);
      return null;
    }

    const row = data as PostRow;

    // 마크다운을 HTML로 변환
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(row.content);

    const htmlContent = processedContent.toString();
    return {
      meta: {
        id: row.id,
        slug: row.slug,
        title: row.title,
        date: row.created_at.split("T")[0],
        category: row.category,
        tags: row.tags,
        excerpt: row.excerpt,
        cover: row.cover,
        published: row.published,
      },
      content: htmlContent,
    };
  } catch (error) {
    console.error(`포스트 ${slug}를 읽는 중 오류 발생:`, error);
    return null;
  }
}

// 카테고리별 포스트 가져오기
export async function getPostsByCategory(
  category: string
): Promise<PostMeta[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("category", category)
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("카테고리별 포스트를 가져오는 중 오류 발생:", error);
      return [];
    }
    if (!data) return [];

    const rows = (data ?? []) as PostRow[];
    return rows.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      date: post.created_at.split("T")[0],
      category: post.category,
      tags: post.tags,
      excerpt: post.excerpt,
      cover: post.cover,
      published: post.published,
    }));
  } catch (error) {
    console.error("카테고리별 포스트를 가져오는 중 오류 발생:", error);
    return [];
  }
}

// 모든 카테고리 가져오기
export async function getCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("category")
      .eq("published", true);

    if (error) {
      console.error("카테고리를 가져오는 중 오류 발생:", error);
      return [];
    }

    const categories = (data as Pick<PostRow, "category">[]).map((post) => post.category);
    return Array.from(new Set(categories));
  } catch (error) {
    console.error("카테고리를 가져오는 중 오류 발생:", error);
    return [];
  }
}

// 카테고리별로 포스트 그룹화
export function groupByCategory(posts: PostMeta[]): Record<string, PostMeta[]> {
  return posts.reduce((groups, post) => {
    const category = post.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(post);
    return groups;
  }, {} as Record<string, PostMeta[]>);
}

// 포스트 생성 (관리자용)
export async function createPost(
  postData: PostInsert
): Promise<PostRow | null> {
  try {
    const { data, error } = await (supabaseAdmin as any)
      .from("posts")
      .insert([postData as PostInsert])
      .select()
      .single();

    if (error) {
      console.error("포스트 생성 중 오류 발생:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("포스트 생성 중 오류 발생:", error);
    return null;
  }
}

// 포스트 업데이트 (관리자용)
export async function updatePost(
  id: string,
  postData: PostUpdate
): Promise<PostRow | null> {
  try {
    const payload: PostUpdate = {
      ...postData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await (supabaseAdmin as any)
      .from("posts")
      .update([payload])
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("포스트 업데이트 중 오류 발생:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("포스트 업데이트 중 오류 발생:", error);
    return null;
  }
}

// 포스트 삭제 (관리자용)
export async function deletePost(id: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin.from("posts").delete().eq("id", id);

    if (error) {
      console.error("포스트 삭제 중 오류 발생:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("포스트 삭제 중 오류 발생:", error);
    return false;
  }
}

// 모든 포스트 가져오기 (관리자용 - 게시되지 않은 것도 포함)
export async function getAllPostsAdmin(): Promise<PostMeta[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .returns<PostRow[]>()
      .order("created_at", { ascending: false });

    if (error) {
      console.error("관리자용 포스트를 가져오는 중 오류 발생:", error);
      return [];
    }
    if (!data) return [];

    return data.map((post: PostRow) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      date: post.created_at.split("T")[0],
      category: post.category,
      tags: post.tags,
      excerpt: post.excerpt,
      cover: post.cover,
      published: post.published,
    }));
  } catch (error) {
    console.error("관리자용 포스트를 가져오는 중 오류 발생:", error);
    return [];
  }
}
