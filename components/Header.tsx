'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-wash/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6">
        <Link href="/" className="group flex items-center gap-3 transition">
          <Image
            src="/images/profilepic.jpeg"
            alt="Rakesh Cheekatimala"
            width={44}
            height={44}
            className="rounded-lg border border-line bg-paper shadow-card transition group-hover:-translate-y-0.5 group-hover:border-accent/40"
          />
          <span className="text-xl font-bold tracking-tight text-ink">Rakesh</span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {/* Desktop Navigation */}
          <nav className="flex items-center gap-2 rounded-full border border-line/80 bg-paper/70 p-1 text-sm font-semibold shadow-card backdrop-blur">
           
            <Link href="/work" className="rounded-full px-4 py-2 text-muted transition hover:bg-accent-soft hover:text-accent-dim" onClick={handleNavClick}>
              Work
            </Link>
            <Link href="/projects" className="rounded-full px-4 py-2 text-muted transition hover:bg-accent-soft hover:text-accent-dim" onClick={handleNavClick}>
              Case Studies
            </Link>
            <Link href="/about" className="rounded-full px-4 py-2 text-muted transition hover:bg-accent-soft hover:text-accent-dim" onClick={handleNavClick}>
              About
            </Link>
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden gap-3 items-center">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg border border-line bg-paper p-2 text-muted shadow-card transition hover:border-accent/40 hover:text-accent"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="border-t border-line bg-wash/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4">
           
            <Link href="/work" className="rounded-lg px-3 py-3 text-muted transition hover:bg-accent-soft hover:text-accent-dim" onClick={handleNavClick}>
              Work
            </Link>
            <Link href="/projects" className="rounded-lg px-3 py-3 text-muted transition hover:bg-accent-soft hover:text-accent-dim" onClick={handleNavClick}>
              Case Studies
            </Link>
            <Link href="/about" className="rounded-lg px-3 py-3 text-muted transition hover:bg-accent-soft hover:text-accent-dim" onClick={handleNavClick}>
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
