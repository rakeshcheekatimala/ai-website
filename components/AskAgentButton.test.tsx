import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AskAgentButton from './AskAgentButton'

// Mock next/dynamic to return a simple component synchronously (ChatModal is loaded via dynamic)
jest.mock('next/dynamic', () => () => {
  return function MockChatModal({ onClose }: { onClose: () => void }) {
    return React.createElement(
      'div',
      { 'data-testid': 'chat-modal' },
      React.createElement('button', { onClick: onClose }, 'Close')
    )
  }
})

describe('AskAgentButton', () => {
  it('renders the button with correct text', () => {
    render(<AskAgentButton />)
    expect(screen.getByRole('button', { name: /ask my agent/i })).toBeInTheDocument()
  })

  it('opens ChatModal when clicked', () => {
    render(<AskAgentButton />)
    expect(screen.queryByTestId('chat-modal')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /ask my agent/i }))

    expect(screen.getByTestId('chat-modal')).toBeInTheDocument()
  })

  it('closes ChatModal when Close is clicked', () => {
    render(<AskAgentButton />)
    fireEvent.click(screen.getByRole('button', { name: /ask my agent/i }))
    expect(screen.getByTestId('chat-modal')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /close/i }))

    expect(screen.queryByTestId('chat-modal')).not.toBeInTheDocument()
  })
})
