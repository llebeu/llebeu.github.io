import { getAllPosts } from "@/lib/posts"
import PostCard from "@/components/PostCard"

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Posts</h1>
        <p className="text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
