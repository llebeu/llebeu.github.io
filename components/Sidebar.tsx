"use client"

import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import type { PostMeta } from "@/lib/posts"

interface SidebarProps {
  posts: PostMeta[]
  categories: string[]
  selectedCategory?: string
}

export default function Sidebar({ posts, categories, selectedCategory }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const recentPosts = posts.slice(0, 5)

  return (
    <aside className="w-64 p-6 border-r bg-muted/30">
      <div className="space-y-6">
        {/* Search */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Search</h3>
          <Input
            type="search"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Categories</h3>
          <div className="space-y-1">
            <Link
              href="/posts"
              className={`block text-sm px-2 py-1 rounded hover:bg-accent ${!selectedCategory ? "bg-accent" : ""}`}
            >
              All Posts
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/posts?category=${encodeURIComponent(category)}`}
                className={`block text-sm px-2 py-1 rounded hover:bg-accent ${
                  selectedCategory === category ? "bg-accent" : ""
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Recent Posts</h3>
          <div className="space-y-2">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="block text-sm hover:text-primary">
                <div className="line-clamp-2">{post.title}</div>
                <div className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
