'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

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
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
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

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 backdrop-blur-md sm:items-center sm:p-4 md:p-6"
      style={{ backgroundColor: 'var(--modal-backdrop)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-agent-title"
        className="relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden border border-line bg-paper shadow-card-hover sm:h-[min(760px,calc(100dvh-48px))] sm:max-w-2xl sm:rounded-lg lg:max-w-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur sm:px-5 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent-soft text-sm font-bold text-accent-dim">
              R
            </div>
            <div className="min-w-0">
              <div id="ask-agent-title" className="text-base font-semibold leading-tight text-ink sm:text-lg">Ask My Agent</div>
              <div className="mt-0.5 text-xs leading-snug text-muted sm:text-sm">Hiring-focused answers about Rakesh&apos;s work</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg border border-transparent text-muted transition-colors hover:border-line hover:bg-wash hover:text-ink"
            aria-label="Close chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5 sm:py-6">
          {messages.length === 0 && (
            <div className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-start gap-5 pt-2 text-left sm:justify-center sm:pt-0">
              <div className="space-y-2 sm:text-center">
                <p className="text-base font-semibold text-graphite sm:text-lg">Ask a focused hiring question.</p>
                <p className="text-sm leading-relaxed text-muted sm:text-base">I can summarize Rakesh&apos;s experience, impact, case studies, and team fit.</p>
              </div>
              <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleStarterClick(q)}
                    className="min-h-14 rounded-lg border border-line bg-wash/60 px-4 py-3 text-left text-sm font-medium leading-snug text-graphite transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent-soft hover:text-accent-dim hover:shadow-glow-sm active:translate-y-0 sm:min-h-16 sm:text-base"
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
                  className={`max-w-[min(86%,42rem)] rounded-lg px-4 py-2.5 text-sm leading-relaxed shadow-card whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-accent text-accent-contrast font-medium'
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
        <div className="border-t border-line bg-paper/95 px-3 py-3 backdrop-blur sm:px-5 sm:py-4">
          <div className="flex items-end gap-2 sm:gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about Rakesh's fit, impact, or case studies..."
              rows={1}
              className="min-h-16 flex-1 resize-none rounded-lg border border-line bg-wash px-4 py-3 text-base leading-6 text-graphite placeholder-subtle transition-all focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/30 sm:min-h-12 sm:text-sm"
              style={{ maxHeight: '120px' }}
            />
            {isLoading ? (
              <button
                onClick={stop}
                className="flex h-16 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-line bg-wash transition-all hover:bg-accent-soft sm:h-11 sm:w-11"
                aria-label="Stop generation"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-ink">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex h-16 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent transition-all hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-contrast">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            )}
          </div>
          <p className="mt-2 hidden text-center text-xs text-subtle sm:block">Press Enter to send - Shift+Enter for new line - Esc to close</p>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
