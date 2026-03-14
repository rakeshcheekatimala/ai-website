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
        className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-lg transition-all duration-200 border border-accent/40 hover:border-accent hover:shadow-glow"
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

      {open && <ChatModal onClose={() => setOpen(false)} />}
    </>
  )
}
