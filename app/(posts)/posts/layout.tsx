import type React from "react"
import { getAllPosts, groupByCategory } from "@/lib/posts"
import Sidebar from "@/components/Sidebar"

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const posts = getAllPosts()
  const grouped = groupByCategory(posts)
  const categories = Object.keys(grouped).sort()

  return (
    <div className="flex min-h-screen">
      <Sidebar posts={posts} categories={categories} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
