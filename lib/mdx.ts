import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export type PostFrontmatter = {
  title: string
  slug: string
  date: string
  excerpt: string
}

export type MDXPost = PostFrontmatter & {
  content: any
  filePath: string
}

export type PostMetadata = PostFrontmatter

/**
 * Get all blog posts from the content directory
 * Returns post metadata without compiled content for listing views
 */
export async function getAllPosts(): Promise<PostMetadata[]> {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'))
  
  const posts = files.map(filename => {
    const filePath = path.join(CONTENT_DIR, filename)
    const source = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(source)
    
    return {
      title: data.title,
      slug: data.slug,
      date: data.date,
      excerpt: data.excerpt,
    } as PostMetadata
  })

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get a single post by slug with compiled MDX content
 */
export async function getPostBySlug(slug: string): Promise<MDXPost | null> {
  const filename = `${slug}.mdx`
  const filePath = path.join(CONTENT_DIR, filename)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)

  // Compile MDX content
  const compiledSource = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
    },
  })

  return {
    title: data.title,
    slug: data.slug,
    date: data.date,
    excerpt: data.excerpt,
    content: compiledSource.content,
    filePath,
  }
}

/**
 * Get all slugs for static generation (ISR)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map(post => post.slug)
}
