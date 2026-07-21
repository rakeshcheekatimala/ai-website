'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const ChatModal = dynamic(() => import('./ChatModal'), { ssr: false })

export default function AskAgentButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-line bg-paper px-5 py-3 text-center font-semibold text-ink shadow-card transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-glow-sm sm:w-auto"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Ask My Agent
      </button>

      {open && <ChatModal onClose={() => setOpen(false)} />}
    </>
  )
}
