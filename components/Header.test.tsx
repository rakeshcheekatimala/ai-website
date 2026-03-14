import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Header from './Header'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock use-sound
jest.mock('use-sound', () => {
  return jest.fn(() => [jest.fn()])
})

describe('Header', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('renders the logo and site name', () => {
    render(<Header />)
    
    expect(screen.getByAltText('Mascot')).toBeInTheDocument()
    expect(screen.getByText('Rakesh')).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(<Header />)
    
    const blogLink = screen.getAllByRole('link', { name: /blog/i })[0]
    expect(blogLink).toHaveAttribute('href', 'https://rakeshcheekatimala.substack.com/')
    
    const workLink = screen.getAllByRole('link', { name: /work/i })[0]
    expect(workLink).toHaveAttribute('href', '/work')
    
    const aboutLink = screen.getAllByRole('link', { name: /about/i })[0]
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('toggles mobile menu when hamburger is clicked', async () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Toggle menu')
    
    // Menu should be closed initially
    expect(screen.queryByText('Projects')).not.toBeInTheDocument()
    
    // Open menu
    fireEvent.click(menuButton)
    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument()
    })
    
    // Close menu
    fireEvent.click(menuButton)
    await waitFor(() => {
      expect(screen.queryByText('Projects')).not.toBeInTheDocument()
    })
  })

  it('toggles sound state and saves to localStorage', async () => {
    render(<Header />)
    
    const soundButton = screen.getAllByLabelText(/sound/i)[0]
    
    // Initial state should be enabled
    expect(soundButton).toHaveAttribute('aria-label', 'Mute sound')
    
    // Toggle sound off
    fireEvent.click(soundButton)
    await waitFor(() => {
      expect(localStorageMock.getItem('soundEnabled')).toBe('false')
    })
    
    // Toggle sound on
    fireEvent.click(soundButton)
    await waitFor(() => {
      expect(localStorageMock.getItem('soundEnabled')).toBe('true')
    })
  })

  it('renders as a header element with sticky positioning', () => {
    const { container } = render(<Header />)
    
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('sticky')
  })
})
