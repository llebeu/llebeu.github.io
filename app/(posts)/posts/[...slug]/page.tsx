import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getAllPosts, getPostBySlug } from "@/lib/posts"

interface PostPageProps {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  
  // catch-all 라우트를 위해 slug를 배열로 분할
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  // slug 배열을 문자열로 결합
  const slugString = slug.join('/')
  const post = await getPostBySlug(slugString)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.meta.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <time dateTime={post.meta.date}>
              {new Date(post.meta.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.meta.category && (
              <Link href={`/posts?category=${encodeURIComponent(post.meta.category)}`} className="hover:text-primary">
                {post.meta.category}
              </Link>
            )}
          </div>
          {post.meta.tags && post.meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.meta.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <div 
          className="
            max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-ol:list-decimal prose-ul:list-disc prose-li:my-1
            prose-pre:rounded-lg
            [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:tracking-tight [&>h1]:mt-8 [&>h1]:mb-4
            [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:mt-6 [&>h2]:mb-3
            [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:tracking-tight [&>h3]:mt-4 [&>h3]:mb-2
            [&>p]:mb-4 [&>p]:leading-relaxed
            [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4
            [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4
            [&>li]:mb-1
            [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:py-2 [&>blockquote]:my-4 [&>blockquote]:text-gray-600 [&>blockquote]:dark:text-gray-400
            [&>table]:w-full [&>table]:border-collapse [&>table]:text-sm [&>table]:my-4
            [&>table_th]:border [&>table_th]:p-2 [&>table_th]:bg-gray-50 [&>table_th]:dark:bg-gray-800
            [&>table_td]:border [&>table_td]:p-2
            [&>code]:bg-gray-100 [&>code]:dark:bg-gray-800 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
            [&>pre]:bg-gray-900 [&>pre]:dark:bg-gray-800 [&>pre]:text-gray-100 [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:my-4 [&>pre]:border [&>pre]:border-gray-700 [&>pre]:dark:border-gray-600
            [&>pre_code]:bg-transparent [&>pre_code]:p-0 [&>pre_code]:text-sm [&>pre_code]:font-mono
            [&>a]:text-blue-600 [&>a]:dark:text-blue-400 [&>a]:hover:underline
            [&>strong]:font-semibold
            [&>em]:italic
            [&>hr]:my-8 [&>hr]:border-gray-300 [&>hr]:dark:border-gray-600
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <nav className="mt-12 pt-8 border-t">
        <Link href="/posts" className="text-sm text-primary hover:underline">
          ← 모든 게시글로 돌아가기
        </Link>
      </nav>
    </div>
  )
}
