import { getAllPosts } from './mdx'

export type Post = {
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
}

export type Project = {
  title: string
  slug: string
  summary: string
  url?: string
}

export const mockProjects: Project[] = [
  {
    title: 'Interactive AI Playground',
    slug: 'ai-playground',
    summary: 'A small sandbox for testing models and UI ideas.',
    url: '#'
  },
  {
    title: 'Accessible Component Library',
    slug: 'accessible-ui',
    summary: 'A tiny library focusing on accessibility and composability.',
    url: '#'
  }
]

export async function getMockPosts(): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.map(post => ({
    ...post,
    content: '', // Content is loaded separately in post pages
  }))
}

export async function getMockProjects() { return mockProjects }
