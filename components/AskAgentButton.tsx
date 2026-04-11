'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const ChatModal = dynamic(() => import('./ChatModal'), { ssr: false })

export default function AskAgentButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex w-full flex-col gap-2 sm:w-auto">
        <button
          onClick={() => setOpen(true)}
          aria-describedby="ask-agent-help"
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg border border-accent/40 px-6 py-3.5 font-semibold transition-all duration-200 hover:border-accent hover:shadow-glow sm:w-auto"
          style={{
            background: 'linear-gradient(135deg, #0d9488 0%, #2dd4bf 50%, #5eead4 100%)',
            color: '#030712',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Ask My Agent
        </button>
        <p id="ask-agent-help" className="max-w-64 text-sm leading-relaxed text-slate-400">
          Chat with an AI trained on my work and experience.
        </p>
      </div>

      {open && <ChatModal onClose={() => setOpen(false)} />}
    </>
  )
}
