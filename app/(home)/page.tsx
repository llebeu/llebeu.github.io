import Link from "next/link"
import { getAllPosts, groupByCategory } from "@/lib/posts"
import PostCard from "@/components/PostCard"

export default function HomePage() {
  const posts = getAllPosts()
  const grouped = groupByCategory(posts)

  const preferred = ["개발", "디자인", "일반"]
  const rest = Object.keys(grouped)
    .filter((c) => !preferred.includes(c))
    .sort((a, b) => a.localeCompare(b))
  const categories = [...preferred.filter((c) => grouped[c]), ...rest]

  const PER_CATEGORY = 6

  if (categories.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">블로그에 오신 것을 환영합니다</h1>
          <p className="text-muted-foreground mb-6">
            아직 게시글이 없습니다. content/posts 디렉토리에 첫 번째 게시글을 작성해보세요.
          </p>
          <div className="text-sm text-muted-foreground">
            <p>
              <code className="bg-muted px-2 py-1 rounded">content/posts/hello-world.mdx</code> 같은 파일을 만들어보세요
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">개발 블로그에 오신 것을 환영합니다</h1>
        <p className="text-xl text-muted-foreground">기술, 개발, 그리고 더 많은 것들에 대한 글을 발견해보세요.</p>
      </div>

      {categories.map((cat) => {
        const list = (grouped[cat] || []).slice(0, PER_CATEGORY)
        return (
          <section key={cat} aria-labelledby={`section-${cat}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 id={`section-${cat}`} className="text-2xl font-semibold">
                {cat}
              </h2>
              <Link
                href={`/posts?category=${encodeURIComponent(cat)}`}
                className="text-sm text-primary hover:underline"
              >
                모두 보기 →
              </Link>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )
      })}
    </main>
  )
}
