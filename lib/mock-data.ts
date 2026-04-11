import { getAllPosts } from './mdx'
import { mockProjects, type Project } from './projects'

export { mockProjects, type Project } from './projects'

export type Post = {
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
}

export async function getMockPosts(): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.map(post => ({
    ...post,
    content: '', // Content is loaded separately in post pages
  }))
}

export async function getMockProjects() { return mockProjects }
