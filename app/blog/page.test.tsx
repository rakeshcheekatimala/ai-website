import { render, screen } from '@testing-library/react'
import BlogPage from './page'

// Mock getMockPosts
jest.mock('../../lib/mock-data', () => ({
  getMockPosts: jest.fn().mockResolvedValue([
    {
      title: 'First Blog Post',
      slug: 'first-post',
      excerpt: 'This is the first post excerpt',
      content: '',
      date: '2024-01-15',
    },
    {
      title: 'Second Blog Post',
      slug: 'second-post',
      excerpt: 'This is the second post excerpt',
      content: '',
      date: '2024-02-20',
    },
  ]),
}))

// Mock Card component
jest.mock('../../components/Card', () => {
  return function MockCard({ title, description, href }: any) {
    return (
      <div data-testid="card">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={href}>Read more</a>
      </div>
    )
  }
})

describe('BlogPage', () => {
  it('renders the page title and description', async () => {
    const page = await BlogPage()
    const { container } = render(page)
    
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText(/In-depth articles about testing/)).toBeInTheDocument()
  })

  it('renders all blog posts', async () => {
    const page = await BlogPage()
    render(page)
    
    expect(screen.getByText('First Blog Post')).toBeInTheDocument()
    expect(screen.getByText('Second Blog Post')).toBeInTheDocument()
    expect(screen.getByText('This is the first post excerpt')).toBeInTheDocument()
    expect(screen.getByText('This is the second post excerpt')).toBeInTheDocument()
  })

  it('renders post dates', async () => {
    const page = await BlogPage()
    render(page)
    
    expect(screen.getByText('2024-01-15')).toBeInTheDocument()
    expect(screen.getByText('2024-02-20')).toBeInTheDocument()
  })

  it('renders links to individual blog posts', async () => {
    const page = await BlogPage()
    render(page)
    
    const links = screen.getAllByRole('link', { name: /read more/i })
    expect(links[0]).toHaveAttribute('href', '/blog/first-post')
    expect(links[1]).toHaveAttribute('href', '/blog/second-post')
  })
})
