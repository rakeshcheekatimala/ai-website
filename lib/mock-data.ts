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

export const mockPosts: Post[] = [
  {
    title: 'Designing delightful developer experiences',
    slug: 'designing-developer-experiences',
    excerpt: 'Thoughts on how to craft interfaces and docs that respect developers time and focus.',
    content: 'Full content for designing delightful developer experiences...',
    date: '2025-01-01'
  },
  {
    title: 'AI for front-end: practical experiments',
    slug: 'ai-for-frontend',
    excerpt: 'A hands-on look at simple AI integrations that improve UX and DX.',
    content: 'Full content for AI experiments...',
    date: '2025-06-10'
  },
  {
    title: 'Testing patterns that scale',
    slug: 'testing-patterns',
    excerpt: 'A collection of testing strategies and patterns for modern apps.',
    content: 'Full content for testing patterns...',
    date: '2024-12-20'
  }
]

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

export async function getMockPosts() { return mockPosts }
export async function getMockProjects() { return mockProjects }
