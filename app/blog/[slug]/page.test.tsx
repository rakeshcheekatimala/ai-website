import { render, screen } from '@testing-library/react'
import PostPage, { generateStaticParams } from './page'

// Mock the mdx utilities
jest.mock('../../../lib/mdx', () => ({
  getPostBySlug: jest.fn((slug: string) => {
    if (slug === 'test-post') {
      return Promise.resolve({
        title: 'Test Post Title',
        slug: 'test-post',
        date: '2024-01-15',
        excerpt: 'Test excerpt',
        content: <div>Test MDX Content</div>,
        filePath: '/path/to/test-post.mdx',
      })
    }
    return Promise.resolve(null)
  }),
  getAllPostSlugs: jest.fn(() => Promise.resolve(['test-post', 'another-post'])),
}))

describe('PostPage', () => {
  it('renders post when slug exists', async () => {
    const page = await PostPage({ params: { slug: 'test-post' } })
    render(page)
    
    expect(screen.getByText('Test Post Title')).toBeInTheDocument()
    expect(screen.getByText('2024-01-15')).toBeInTheDocument()
    expect(screen.getByText('Test MDX Content')).toBeInTheDocument()
  })

  it('renders not found message when slug does not exist', async () => {
    const page = await PostPage({ params: { slug: 'non-existent' } })
    render(page)
    
    expect(screen.getByText('Post not found')).toBeInTheDocument()
  })

  it('renders back to blog links', async () => {
    const page = await PostPage({ params: { slug: 'test-post' } })
    render(page)
    
    const backLinks = screen.getAllByRole('link', { name: /back to blog/i })
    expect(backLinks.length).toBeGreaterThan(0)
    expect(backLinks[0]).toHaveAttribute('href', 'https://rakeshcheekatimala.substack.com')
  })

  it('renders as an article element', async () => {
    const page = await PostPage({ params: { slug: 'test-post' } })
    const { container } = render(page)
    
    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
  })
})

describe('generateStaticParams', () => {
  it('returns array of slug params', async () => {
    const params = await generateStaticParams()
    
    expect(params).toEqual([
      { slug: 'test-post' },
      { slug: 'another-post' },
    ])
  })
})
