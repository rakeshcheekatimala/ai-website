import { render, screen } from '@testing-library/react'
import AboutPage from './page'

// Mock ExperienceTimeline component
jest.mock('../../components/ExperienceTimeline', () => {
  return function MockExperienceTimeline() {
    return <div data-testid="experience-timeline">Experience Timeline</div>
  }
})

describe('AboutPage', () => {
  it('renders the page title', () => {
    render(<AboutPage />)
    
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders the introduction text', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/I'm a senior engineer with experience/)).toBeInTheDocument()
  })

  it('renders the connect section', () => {
    render(<AboutPage />)
    
    expect(screen.getByText("Let's Connect")).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<AboutPage />)
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/rakesh-cheekatimala/')
    
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/rakeshcheekatimala')
  })

  it('renders all paragraphs', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/Curiosity drives my work/)).toBeInTheDocument()
    expect(screen.getByText(/What matters most to me/)).toBeInTheDocument()
  })
})
