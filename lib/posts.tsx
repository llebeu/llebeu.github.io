import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

export interface PostMeta {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  cover?: string
}

export interface Post {
  meta: PostMeta
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): PostMeta[] {
  // content/posts 폴더가 존재하지 않으면 빈 배열 반환
  if (!fs.existsSync(postsDirectory)) {
    console.warn('content/posts 폴더가 존재하지 않습니다.')
    return []
  }

  const getAllMdxFiles = (dir: string): string[] => {
    const items = fs.readdirSync(dir, { withFileTypes: true })
    let mdxFiles: string[] = []
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      if (item.isDirectory()) {
        // 디렉토리인 경우 재귀적으로 검색
        mdxFiles = mdxFiles.concat(getAllMdxFiles(fullPath))
      } else if (item.isFile() && item.name.endsWith('.mdx')) {
        // .mdx 파일인 경우 상대 경로 저장
        mdxFiles.push(fullPath)
      }
    }
    
    return mdxFiles
  }

  const mdxFilePaths = getAllMdxFiles(postsDirectory)
  const posts = mdxFilePaths
    .map(filePath => {
      const relativePath = path.relative(postsDirectory, filePath)
      const slug = relativePath
        .replace(/\.mdx$/, '')           // .mdx 제거
        .replace(/\\/g, '/')             // Windows 경로 구분자 처리
        .replace('/index', '')            // /index 제거
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        title: data.title || '제목 없음',
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || '일반',
        tags: data.tags || [],
        excerpt: data.excerpt || data.summary || '',
        cover: data.cover || undefined,
      }
    })
    .filter(post => post.title !== '제목 없음') // 유효한 포스트만 필터링

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // slug가 디렉토리인 경우 index.mdx 파일을 찾음
    let filePath = path.join(postsDirectory, `${slug}.mdx`)
    
    // 파일이 존재하지 않으면 디렉토리 안의 index.mdx를 찾음
    if (!fs.existsSync(filePath)) {
      const indexPath = path.join(postsDirectory, slug, 'index.mdx')
      if (fs.existsSync(indexPath)) {
        filePath = indexPath
      } else {
        return null
      }
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // unified를 사용하여 마크다운을 HTML로 변환
    const processedContent = await unified()
      .use(remarkParse)      // 마크다운 파싱
      .use(remarkGfm)        // GitHub Flavored Markdown (테이블, 취소선 등) 처리
      .use(remarkRehype)     // remark → rehype 변환
      .use(rehypeHighlight)  // 코드 구문 강조
      .use(rehypeStringify)  // HTML 문자열로 변환
      .process(content)
    
    const htmlContent = processedContent.toString()

    return {
      meta: {
        slug,
        title: data.title || '제목 없음',
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || '일반',
        tags: data.tags || [],
        excerpt: data.excerpt || data.summary || '',
        cover: data.cover || undefined,
      },
      content: htmlContent,
    }
  } catch (error) {
    console.error(`포스트 ${slug}를 읽는 중 오류 발생:`, error)
    return null
  }
}

export function getPostsByCategory(category: string): PostMeta[] {
  const posts = getAllPosts()
  return posts
    .filter((post) => post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getCategories(): string[] {
  const posts = getAllPosts()
  const categories = posts.map((post) => post.category)
  return Array.from(new Set(categories))
}

export function groupByCategory(posts: PostMeta[]): Record<string, PostMeta[]> {
  return posts.reduce(
    (groups, post) => {
      const category = post.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(post)
      return groups
    },
    {} as Record<string, PostMeta[]>,
  )
}
