import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  const mockProps = {
    title: 'Test Title',
    description: 'Test description for the card',
    href: '/test-link',
  }

  it('renders the card with title and description', () => {
    render(<Card {...mockProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test description for the card')).toBeInTheDocument()
  })

  it('renders a link with correct href', () => {
    render(<Card {...mockProps} />)
    
    const link = screen.getByRole('link', { name: /read more/i })
    expect(link).toHaveAttribute('href', '/test-link')
  })

  it('renders as an article element', () => {
    const { container } = render(<Card {...mockProps} />)
    
    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
  })
})
