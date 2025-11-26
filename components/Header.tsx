'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

const SOUND_URL = '/music/rising-pops.mp3'

export default function Header() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [play] = useSound(SOUND_URL, { volume: 0.5 })

  useEffect(() => {
    setMounted(true)
    // Check localStorage for sound preference
    const saved = localStorage.getItem('soundEnabled')
    if (saved !== null) {
      setSoundEnabled(saved === 'true')
    }
  }, [])

   const toggleSound = () => {
    const newState = !soundEnabled
    setSoundEnabled(newState)
    localStorage.setItem('soundEnabled', String(newState))
    if (newState) {
      play()
    }
  }


  const handleNavClick = () => {
    if (soundEnabled) {
      play()
    }
  }

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-40 bg-dark-surface/80 backdrop-blur-md border-dark-border">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <Image
            src="/images/mascot.png"
            alt="Phoenix Mascot"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <span className="text-2xl font-bold text-cream-base">Rakesh</span>
        </Link>
        <nav className="flex gap-8 items-center text-lg">
          <Link href="/blog" className="text-cream-dark hover:text-phoenix-warm transition" onClick={handleNavClick}>
            Blog
          </Link>
          <Link href="/projects" className="text-cream-dark hover:text-phoenix-warm transition" onClick={handleNavClick}>
            Projects
          </Link>
          <Link href="/about" className="text-cream-dark hover:text-phoenix-warm transition" onClick={handleNavClick}>
            About
          </Link>

          <button
            onClick={toggleSound}
            className="text-cream-dark hover:text-phoenix-warm transition p-2 rounded-lg hover:bg-dark-surface/50 duration-200"
            aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
            title={soundEnabled ? "Click to mute" : "Click to unmute"}
          >
            {soundEnabled ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6.5 9L3 9C1.89543 9 1 9.89543 1 11V13C1 14.1046 1.89543 15 3 15H6.5L11 19V5L6.5 9Z" fill="currentColor" />
                <path d="M16 7C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
