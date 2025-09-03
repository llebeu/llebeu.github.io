import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { PostMeta } from "@/lib/posts"

interface PostCardProps {
  post: PostMeta
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      {post.cover && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img src={post.cover || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold line-clamp-2">
          <Link href={`/posts/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </CardHeader>
      <CardContent>
        {post.excerpt && <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.excerpt}</p>}
        <div className="flex flex-wrap gap-1">
          {(post.tags || []).slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
