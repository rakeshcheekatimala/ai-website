import { render, screen } from '@testing-library/react'
import ProjectPage from './page'

// Mock mockProjects
jest.mock('../../../lib/mock-data', () => ({
  mockProjects: [
    {
      title: 'Test Project',
      slug: 'test-project',
      summary: 'This is a test project summary',
      outcome: 'This is a test project outcome',
      context: 'This is test context',
      role: 'Led the test project',
      metrics: ['Metric one'],
      highlights: ['Changed one thing'],
      tags: ['React'],
      url: 'https://example.com',
      repoUrl: 'https://github.com/example/test',
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
    
    const backLinks = screen.getAllByRole('link', { name: /back to case studies/i })
    expect(backLinks.length).toBeGreaterThan(0)
    expect(backLinks[0]).toHaveAttribute('href', '/projects')
  })

  it('renders project action buttons', () => {
    render(<ProjectPage params={{ slug: 'test-project' }} />)
    
    expect(screen.getByRole('link', { name: /view project/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })

  it('renders case study details', () => {
    render(<ProjectPage params={{ slug: 'test-project' }} />)
    
    expect(screen.getByText(/This is test context/)).toBeInTheDocument()
    expect(screen.getByText(/Led the test project/)).toBeInTheDocument()
    expect(screen.getByText(/Metric one/)).toBeInTheDocument()
  })
})
