import { render, screen } from '@testing-library/react'
import ExperienceTimeline from './ExperienceTimeline'

// Mock experiences data
jest.mock('../experiences', () => ({
  experiences: [
    {
      role: 'Senior Software Engineer',
      company: 'Test Company',
      start: 'Jan 2020',
      end: 'Present',
      location: 'Singapore',
      summary: 'Test summary for the role',
      highlights: ['Achievement 1', 'Achievement 2'],
      tags: ['React', 'TypeScript'],
    },
    {
      role: 'Software Engineer',
      company: 'Another Company',
      start: 'Jan 2018',
      end: 'Dec 2019',
      summary: 'Another test summary',
      highlights: [],
      tags: ['JavaScript'],
    },
  ],
}))

describe('ExperienceTimeline', () => {
  it('renders the section title and description', () => {
    render(<ExperienceTimeline />)
    
    expect(screen.getByText('Work & Experience')).toBeInTheDocument()
    expect(screen.getByText(/A snapshot of the roles/i)).toBeInTheDocument()
  })

  it('renders all experiences from the data', () => {
    render(<ExperienceTimeline />)
    
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Another Company')).toBeInTheDocument()
  })

  it('renders experience dates', () => {
    render(<ExperienceTimeline />)
    
    expect(screen.getByText(/Jan 2020.*Present/)).toBeInTheDocument()
    expect(screen.getByText(/Jan 2018.*Dec 2019/)).toBeInTheDocument()
  })

  it('renders experience summaries', () => {
    render(<ExperienceTimeline />)
    
    expect(screen.getByText('Test summary for the role')).toBeInTheDocument()
    expect(screen.getByText('Another test summary')).toBeInTheDocument()
  })

  it('renders highlights when available', () => {
    render(<ExperienceTimeline />)
    
    expect(screen.getByText('Achievement 1')).toBeInTheDocument()
    expect(screen.getByText('Achievement 2')).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<ExperienceTimeline />)
    
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('renders location when provided', () => {
    render(<ExperienceTimeline />)
    
    expect(screen.getByText(/Singapore/)).toBeInTheDocument()
  })
})
