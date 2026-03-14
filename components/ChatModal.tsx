'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useEffect, useMemo, useRef, useState } from 'react'

const STARTER_QUESTIONS = [
  'Where has Rakesh worked?',
  'What are his core skills?',
  'Tell me about his open source work',
  'What did he do at Singtel?',
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
      style={{ backgroundColor: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-2xl h-[85vh] flex flex-col rounded-2xl border border-slate-700/50 overflow-hidden"
        style={{ backgroundColor: '#0F172A', boxShadow: '0 0 60px rgba(45, 212, 191, 0.15)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <div>
              <h2 className="text-slate-50 font-semibold text-base leading-tight">Ask My Agent</h2>
              <p className="text-slate-400 text-xs">Powered by AI · Ask anything about Rakesh</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1.5 rounded-lg hover:bg-slate-700/50"
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
                <p className="text-slate-300 text-base mb-1">Hi there! 👋</p>
                <p className="text-slate-400 text-sm">Ask me anything about Rakesh&apos;s experience, skills, or projects.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleStarterClick(q)}
                    className="text-left px-4 py-3 rounded-xl border border-slate-600/50 text-slate-300 text-sm hover:border-accent/50 hover:text-accent hover:bg-accent/5 transition-all duration-200"
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
                    <span className="text-accent text-xs font-bold">R</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-accent text-dark-bg font-medium rounded-br-sm'
                      : 'bg-slate-800/80 text-slate-200 border border-slate-700/40 rounded-bl-sm'
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
                <span className="text-accent text-xs font-bold">R</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/40 px-4 py-3 rounded-2xl rounded-bl-sm">
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
        <div className="px-4 py-4 border-t border-slate-700/50">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about Rakesh's experience..."
              rows={1}
              className="flex-1 resize-none bg-slate-800/60 border border-slate-600/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all"
              style={{ maxHeight: '120px' }}
            />
            {isLoading ? (
              <button
                onClick={stop}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-700 hover:bg-slate-600 transition-all flex items-center justify-center"
                aria-label="Stop generation"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-dark-bg">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-slate-600 text-xs text-center mt-2">Press Enter to send · Shift+Enter for new line · Esc to close</p>
        </div>
      </div>
    </div>
  )
}
