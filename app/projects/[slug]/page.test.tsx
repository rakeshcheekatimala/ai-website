import { render, screen } from '@testing-library/react'
import ProjectPage from './page'

// Mock mockProjects
jest.mock('../../../lib/mock-data', () => ({
  mockProjects: [
    {
      title: 'Test Project',
      slug: 'test-project',
      summary: 'This is a test project summary',
      url: 'https://example.com',
    },
    {
      title: 'Another Project',
      slug: 'another-project',
      summary: 'Another project summary',
    },
  ],
}))

describe('ProjectPage', () => {
  it('renders project when slug exists', () => {
    render(<ProjectPage params={{ slug: 'test-project' }} />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('This is a test project summary')).toBeInTheDocument()
  })

  it('renders not found message when slug does not exist', () => {
    render(<ProjectPage params={{ slug: 'non-existent' }} />)
    
    expect(screen.getByText('Project not found')).toBeInTheDocument()
  })

  it('renders back to work links', () => {
    render(<ProjectPage params={{ slug: 'test-project' }} />)
    
    const backLinks = screen.getAllByRole('link', { name: /back to work/i })
    expect(backLinks.length).toBeGreaterThan(0)
    expect(backLinks[0]).toHaveAttribute('href', '/projects')
  })

  it('renders project action buttons', () => {
    render(<ProjectPage params={{ slug: 'test-project' }} />)
    
    expect(screen.getByRole('link', { name: /view project/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })

  it('renders example project description', () => {
    render(<ProjectPage params={{ slug: 'test-project' }} />)
    
    expect(screen.getByText(/This is an example project/)).toBeInTheDocument()
    expect(screen.getByText(/modern web development practices/)).toBeInTheDocument()
  })
})
