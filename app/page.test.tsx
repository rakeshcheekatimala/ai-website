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
    
    expect(screen.getByText(/I build revenue critical frontend systems/i)).toBeInTheDocument()
    expect(screen.getByText(/Rakesh Cheekatimala/)).toBeInTheDocument()
  })

  it('renders the introduction text', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByText(/Singapore-based engineer/)).toBeInTheDocument()
    expect(screen.getByText(/10\+ years/)).toBeInTheDocument()
  })

  it('renders the AskAgentButton', async () => {
    const page = await Home()
    render(page)
    
    expect(screen.getByRole('button', { name: /ask my agent/i })).toBeInTheDocument()
  })

  it('renders links to articles and work', async () => {
    const page = await Home()
    render(page)
    
    const caseStudiesLink = screen.getByRole('link', { name: /view case studies/i })
    expect(caseStudiesLink).toHaveAttribute('href', '/projects')
    
    const workLink = screen.getByRole('link', { name: /view work/i })
    expect(workLink).toHaveAttribute('href', '/work')
  })

  it('renders proof points', async () => {
    const page = await Home()
    render(page)

    expect(screen.getByText('60%')).toBeInTheDocument()
    expect(screen.getByText(/bundle-size reduction/)).toBeInTheDocument()
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
