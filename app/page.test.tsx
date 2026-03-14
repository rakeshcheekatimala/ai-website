import { render, screen } from '@testing-library/react'
import Home from './page'

// Mock dependencies
jest.mock('../lib/mock-data', () => ({
  getMockPosts: jest.fn().mockResolvedValue([]),
  getMockProjects: jest.fn().mockResolvedValue([]),
}))

jest.mock('../components/Card', () => {
  return function MockCard() {
    return <div data-testid="card">Card</div>
  }
})

jest.mock('../components/LocationBanner', () => {
  return function MockLocationBanner() {
    return <div data-testid="location-banner">Location Banner</div>
  }
})

jest.mock('../components/SocailLinks', () => {
  return function MockSocailLinks() {
    return <div data-testid="social-links">Social Links</div>
  }
})

jest.mock('../components/AskAgentButton', () => {
  return function MockAskAgentButton() {
    return <button>Ask My Agent</button>
  }
})

describe('Home', () => {
  it('renders the hero section with name', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByText(/Hello/)).toBeInTheDocument()
    expect(screen.getByText(/I'm Rakesh!/)).toBeInTheDocument()
  })

  it('renders the introduction text', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByText(/Currently based in Singapore/)).toBeInTheDocument()
    expect(screen.getByText(/10\+ years of experience/)).toBeInTheDocument()
  })

  it('renders the AskAgentButton', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByRole('button', { name: /ask my agent/i })).toBeInTheDocument()
  })

  it('renders links to articles and work', async () => {
    const page = await Home()
    render(page)
    
    const articlesLink = screen.getByRole('link', { name: /read articles/i })
    expect(articlesLink).toHaveAttribute('href', 'https://rakeshcheekatimala.substack.com')
    expect(articlesLink).toHaveAttribute('target', '_blank')
    
    const workLink = screen.getByRole('link', { name: /view work/i })
    expect(workLink).toHaveAttribute('href', '/work')
  })

  it('renders social links component', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByTestId('social-links')).toBeInTheDocument()
  })

  it('renders location banner component', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByTestId('location-banner')).toBeInTheDocument()
  })
})
