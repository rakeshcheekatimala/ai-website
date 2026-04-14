import { render, screen } from '@testing-library/react'
import AboutPage from './page'

// Mock LocationBanner component
jest.mock('../../components/LocationBanner', () => {
  return function MockLocationBanner() {
    return <div data-testid="location-banner">Location Banner</div>
  }
})

describe('AboutPage', () => {
  it('renders the page title', () => {
    render(<AboutPage />)
    
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders the introduction text', () => {
    render(<AboutPage />)
    
    expect(screen.getByText(/senior frontend platform engineer/)).toBeInTheDocument()
  })

  it('renders the connect section', () => {
    render(<AboutPage />)
    
    expect(screen.getByText("Let's Connect")).toBeInTheDocument()
    expect(screen.getByText(/LinkedIn is the best place to start/)).toBeInTheDocument()
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
    
    expect(screen.getByText(/My strongest work sits/)).toBeInTheDocument()
    expect(screen.getByText(/systems that hold up after launch/)).toBeInTheDocument()
  })

  it('moves the location detail to the about page', () => {
    render(<AboutPage />)

    expect(screen.getByText(/Based in Singapore/)).toBeInTheDocument()
    expect(screen.getByTestId('location-banner')).toBeInTheDocument()
  })
})
