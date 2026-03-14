/**
 * Integration test for the home page
 * Tests the full page rendering with all components working together
 */
import { render, screen, fireEvent } from '@testing-library/react'
import Home from '../../app/page'

// Mock all child components to focus on integration
jest.mock('../../lib/mock-data', () => ({
  getMockPosts: jest.fn().mockResolvedValue([
    {
      title: 'Test Post',
      slug: 'test-post',
      excerpt: 'Test excerpt',
      content: '',
      date: '2024-01-01',
    },
  ]),
  getMockProjects: jest.fn().mockResolvedValue([
    {
      title: 'Test Project',
      slug: 'test-project',
      summary: 'Test summary',
    },
  ]),
}))

jest.mock('../../components/LocationBanner', () => {
  return function MockLocationBanner() {
    return (
      <div data-testid="location-banner">
        <p>I&apos;m from Singapore, roughly 1,234km away from your current location</p>
      </div>
    )
  }
})

jest.mock('../../components/SocailLinks', () => {
  return function MockSocailLinks() {
    return (
      <div data-testid="social-links">
        <a href="https://x.com/test" aria-label="Twitter">Twitter</a>
        <a href="https://linkedin.com/test" aria-label="LinkedIn">LinkedIn</a>
      </div>
    )
  }
})

jest.mock('../../components/AskAgentButton', () => {
  return function MockAskAgentButton() {
    return <button>Ask My Agent</button>
  }
})

describe('Home Page Integration', () => {
  it('renders complete home page with all sections', async () => {
    const page = await Home()
    render(page)
    
    // Hero section
    expect(screen.getByText(/Hello/)).toBeInTheDocument()
    expect(screen.getByText(/I'm Rakesh!/)).toBeInTheDocument()
    expect(screen.getByText(/Currently based in Singapore/)).toBeInTheDocument()
    
    // CTA buttons
    expect(screen.getByRole('link', { name: /read articles/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view work/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ask my agent/i })).toBeInTheDocument()
    
    // Social links
    expect(screen.getByTestId('social-links')).toBeInTheDocument()
    
    // Location banner
    expect(screen.getByTestId('location-banner')).toBeInTheDocument()
  })

  it('has correct external link attributes', async () => {
    const page = await Home()
    render(page)
    
    const articlesLink = screen.getByRole('link', { name: /read articles/i })
    expect(articlesLink).toHaveAttribute('target', '_blank')
    expect(articlesLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has correct internal navigation', async () => {
    const page = await Home()
    render(page)
    
    const workLink = screen.getByRole('link', { name: /view work/i })
    expect(workLink).toHaveAttribute('href', '/work')
    expect(workLink).not.toHaveAttribute('target')
  })

  it('renders all major sections in correct order', async () => {
    const page = await Home()
    const { container } = render(page)
    
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThanOrEqual(1)
    
    // Hero section should be first
    const firstSection = sections[0]
    expect(firstSection.textContent).toContain('Hello')
    expect(firstSection.textContent).toContain('Rakesh')
  })
})
