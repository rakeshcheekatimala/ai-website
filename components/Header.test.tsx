import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders the logo and site name', () => {
    render(<Header />)
    
    expect(screen.getByAltText('Profile Picture')).toBeInTheDocument()
    expect(screen.getByText('Rakesh')).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(<Header />)
    
    const blogLink = screen.getAllByRole('link', { name: /blog/i })[0]
    expect(blogLink).toHaveAttribute('href', '/blog')
    
    const workLink = screen.getAllByRole('link', { name: /work/i })[0]
    expect(workLink).toHaveAttribute('href', '/work')

    const caseStudiesLink = screen.getAllByRole('link', { name: /case studies/i })[0]
    expect(caseStudiesLink).toHaveAttribute('href', '/projects')
    
    const aboutLink = screen.getAllByRole('link', { name: /about/i })[0]
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('toggles mobile menu when hamburger is clicked', async () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Toggle menu')
    
    // Menu should be closed initially
    expect(screen.queryAllByText('Case Studies')).toHaveLength(1)
    
    // Open menu
    fireEvent.click(menuButton)
    await waitFor(() => {
      expect(screen.getAllByText('Case Studies')).toHaveLength(2)
    })
    
    // Close menu
    fireEvent.click(menuButton)
    await waitFor(() => {
      expect(screen.queryAllByText('Case Studies')).toHaveLength(1)
    })
  })

  it('renders as a header element with sticky positioning', () => {
    const { container } = render(<Header />)
    
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('sticky')
  })
})
