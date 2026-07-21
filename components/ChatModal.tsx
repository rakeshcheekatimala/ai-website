'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useEffect, useMemo, useRef, useState } from 'react'

const STARTER_QUESTIONS = [
  "Summarize Rakesh's frontend platform impact",
  'Which teams would Rakesh fit best?',
  'Show his payments and eKYC proof',
  'What delivery risks can he reduce?',
]

interface ChatModalProps {
  onClose: () => void
}

export default function ChatModal({ onClose }: ChatModalProps) {
  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), [])

  const { messages, sendMessage, status, stop } = useChat({ transport })

  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleSend() {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    sendMessage({ text })
  }

  function handleStarterClick(question: string) {
    sendMessage({ text: question })
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(23, 26, 31, 0.48)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-2xl h-[85vh] flex flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-card-hover"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <div>
              <h2 className="text-ink font-semibold text-base leading-tight">Ask My Agent</h2>
              <p className="text-muted text-xs">Hiring-focused answers about Rakesh&apos;s work</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-ink transition-colors p-1.5 rounded-lg hover:bg-wash"
            aria-label="Close chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <div>
                <p className="text-graphite text-base mb-1">Ask a focused hiring question.</p>
                <p className="text-muted text-sm">I can summarize Rakesh&apos;s experience, impact, case studies, and team fit.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleStarterClick(q)}
                    className="rounded-lg border border-line px-4 py-3 text-left text-sm text-graphite transition-all duration-200 hover:border-accent/50 hover:bg-accent-soft hover:text-accent-dim"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => {
            const textPart = message.parts?.find((p) => p.type === 'text')
            const text = textPart ? (textPart as { type: 'text'; text: string }).text : ''
            if (!text) return null

            return (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mr-2.5 mt-0.5 flex-shrink-0">
                    <span className="text-accent-dim text-xs font-bold">R</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-accent text-white font-medium'
                      : 'bg-wash text-graphite border border-line'
                  }`}
                >
                  {text}
                </div>
              </div>
            )
          })}

          {isLoading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mr-2.5 flex-shrink-0">
                <span className="text-accent-dim text-xs font-bold">R</span>
              </div>
              <div className="rounded-lg border border-line bg-wash px-4 py-3">
                <div className="flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-4 border-t border-line">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about Rakesh's fit, impact, or case studies..."
              rows={1}
              className="flex-1 resize-none rounded-lg border border-line bg-wash px-4 py-3 text-sm text-graphite placeholder-subtle transition-all focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/30"
              style={{ maxHeight: '120px' }}
            />
            {isLoading ? (
              <button
                onClick={stop}
                className="flex-shrink-0 w-10 h-10 rounded-lg border border-line bg-wash hover:bg-accent-soft transition-all flex items-center justify-center"
                aria-label="Stop generation"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent hover:bg-accent-dim disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-subtle text-xs text-center mt-2">Press Enter to send - Shift+Enter for new line - Esc to close</p>
        </div>
      </div>
    </div>
  )
}
