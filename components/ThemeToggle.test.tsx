import { fireEvent, render, screen } from '@testing-library/react'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('dark', 'light')
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: true,
      })),
    })
  })

  it('defaults to the light theme on mount', () => {
    render(<ThemeToggle />)

    expect(document.documentElement).toHaveClass('light')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(screen.getByRole('button', { name: /toggle color theme/i })).toBeInTheDocument()
  })

  it('toggles and saves the next theme', () => {
    render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('button', { name: /toggle color theme/i }))

    expect(document.documentElement).toHaveClass('dark')
    expect(document.documentElement).not.toHaveClass('light')
    expect(window.localStorage.getItem('portfolio-theme')).toBe('dark')
  })

  it('preserves a saved dark preference', () => {
    window.localStorage.setItem('portfolio-theme', 'dark')

    render(<ThemeToggle />)

    expect(document.documentElement).toHaveClass('dark')
  })
})
