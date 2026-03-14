import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ChatModal from './ChatModal'

// Mock @ai-sdk/react
const mockSendMessage = jest.fn()
const mockStop = jest.fn()

jest.mock('@ai-sdk/react', () => ({
  useChat: jest.fn(() => ({
    messages: [],
    sendMessage: mockSendMessage,
    status: 'idle',
    stop: mockStop,
  })),
}))

jest.mock('ai', () => ({
  DefaultChatTransport: jest.fn().mockImplementation(() => ({})),
}))

const { useChat } = require('@ai-sdk/react')

describe('ChatModal', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: 'idle',
      stop: mockStop,
    })
  })

  it('renders the modal with title', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    expect(screen.getByText('Ask My Agent')).toBeInTheDocument()
    expect(screen.getByText(/Powered by AI/)).toBeInTheDocument()
  })

  it('renders starter questions when no messages', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    expect(screen.getByText('Where has Rakesh worked?')).toBeInTheDocument()
    expect(screen.getByText('What are his core skills?')).toBeInTheDocument()
    expect(screen.getByText('Tell me about his open source work')).toBeInTheDocument()
    expect(screen.getByText('What did he do at Singtel?')).toBeInTheDocument()
  })

  it('sends message when starter question is clicked', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    const starterButton = screen.getByText('Where has Rakesh worked?')
    fireEvent.click(starterButton)
    
    expect(mockSendMessage).toHaveBeenCalledWith({ text: 'Where has Rakesh worked?' })
  })

  it('closes modal when close button is clicked', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    const closeButton = screen.getByLabelText('Close chat')
    fireEvent.click(closeButton)
    
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('closes modal when Escape key is pressed', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    fireEvent.keyDown(document, { key: 'Escape' })
    
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('closes modal when clicking outside', () => {
    const { container } = render(<ChatModal onClose={mockOnClose} />)
    
    // Get the outermost div (backdrop) by finding the fixed inset-0 element
    const backdrop = container.querySelector('.fixed.inset-0')
    if (backdrop) {
      fireEvent.click(backdrop)
      expect(mockOnClose).toHaveBeenCalled()
    }
  })

  it('allows typing in the input field', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    const input = screen.getByPlaceholderText(/Ask about Rakesh's experience/)
    fireEvent.change(input, { target: { value: 'Test message' } })
    
    expect(input).toHaveValue('Test message')
  })

  it('sends message when send button is clicked', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    const input = screen.getByPlaceholderText(/Ask about Rakesh's experience/)
    fireEvent.change(input, { target: { value: 'Test message' } })
    
    const sendButton = screen.getByLabelText('Send message')
    fireEvent.click(sendButton)
    
    expect(mockSendMessage).toHaveBeenCalledWith({ text: 'Test message' })
  })

  it('sends message when Enter key is pressed', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    const input = screen.getByPlaceholderText(/Ask about Rakesh's experience/)
    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: false })
    
    expect(mockSendMessage).toHaveBeenCalledWith({ text: 'Test message' })
  })

  it('does not send message when Shift+Enter is pressed', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    const input = screen.getByPlaceholderText(/Ask about Rakesh's experience/)
    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true })
    
    expect(mockSendMessage).not.toHaveBeenCalled()
  })

  it('disables send button when input is empty', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    const sendButton = screen.getByLabelText('Send message')
    expect(sendButton).toBeDisabled()
  })

  it('clears input after sending message', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    const input = screen.getByPlaceholderText(/Ask about Rakesh's experience/) as HTMLTextAreaElement
    fireEvent.change(input, { target: { value: 'Test message' } })
    
    const sendButton = screen.getByLabelText('Send message')
    fireEvent.click(sendButton)
    
    expect(input.value).toBe('')
  })

  it('renders messages when available', () => {
    useChat.mockReturnValue({
      messages: [
        {
          id: '1',
          role: 'user',
          parts: [{ type: 'text', text: 'Hello' }],
        },
        {
          id: '2',
          role: 'assistant',
          parts: [{ type: 'text', text: 'Hi there!' }],
        },
      ],
      sendMessage: mockSendMessage,
      status: 'idle',
      stop: mockStop,
    })

    render(<ChatModal onClose={mockOnClose} />)
    
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Hi there!')).toBeInTheDocument()
  })

  it('shows loading indicator when status is streaming', () => {
    useChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: 'streaming',
      stop: mockStop,
    })

    render(<ChatModal onClose={mockOnClose} />)
    
    const stopButton = screen.getByLabelText('Stop generation')
    expect(stopButton).toBeInTheDocument()
  })

  it('calls stop when stop button is clicked', () => {
    useChat.mockReturnValue({
      messages: [],
      sendMessage: mockSendMessage,
      status: 'streaming',
      stop: mockStop,
    })

    render(<ChatModal onClose={mockOnClose} />)
    
    const stopButton = screen.getByLabelText('Stop generation')
    fireEvent.click(stopButton)
    
    expect(mockStop).toHaveBeenCalled()
  })

  it('does not send empty messages', () => {
    render(<ChatModal onClose={mockOnClose} />)
    
    const input = screen.getByPlaceholderText(/Ask about Rakesh's experience/)
    fireEvent.change(input, { target: { value: '   ' } })
    
    const sendButton = screen.getByLabelText('Send message')
    fireEvent.click(sendButton)
    
    expect(mockSendMessage).not.toHaveBeenCalled()
  })
})
