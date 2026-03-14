import { render, screen } from '@testing-library/react'
import SocailLinks from './SocailLinks'

describe('SocailLinks', () => {
  it('renders all social media links', () => {
    render(<SocailLinks />)
    
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('Substack')).toBeInTheDocument()
  })

  it('has correct href for Twitter link', () => {
    render(<SocailLinks />)
    
    const twitterLink = screen.getByLabelText('Twitter')
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/RCheekatim12238')
    expect(twitterLink).toHaveAttribute('target', '_blank')
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has correct href for LinkedIn link', () => {
    render(<SocailLinks />)
    
    const linkedinLink = screen.getByLabelText('LinkedIn')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/rakesh-cheekatimala/')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
  })

  it('has correct href for GitHub link', () => {
    render(<SocailLinks />)
    
    const githubLink = screen.getByLabelText('GitHub')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/rakeshcheekatimala')
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('has correct href for Substack link', () => {
    render(<SocailLinks />)
    
    const substackLink = screen.getByLabelText('Substack')
    expect(substackLink).toHaveAttribute('href', 'https://rakeshcheekatimala.substack.com')
    expect(substackLink).toHaveAttribute('target', '_blank')
  })
})
