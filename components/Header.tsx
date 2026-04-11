'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <Image
            src="/images/profilepic.jpeg"
            alt="Profile Picture"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <span className="text-2xl font-bold text-slate-50">Rakesh</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center text-lg">
          <Link href="/blog" className="text-slate-400 hover:text-teal-300 transition" onClick={handleNavClick}>
            Blog
          </Link>
          <Link href="/work" className="text-slate-400 hover:text-teal-300 transition" onClick={handleNavClick}>
            Work
          </Link>
          <Link href="/projects" className="text-slate-400 hover:text-teal-300 transition" onClick={handleNavClick}>
            Case Studies
          </Link>
          <Link href="/about" className="text-slate-400 hover:text-teal-300 transition" onClick={handleNavClick}>
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden gap-3 items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-slate-400 hover:text-teal-300 transition p-2 rounded-lg hover:bg-slate-800 duration-200"
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
        <nav className="md:hidden border-t border-slate-800 bg-slate-900/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            <Link href="/blog" className="text-slate-400 hover:text-teal-300 transition py-2" onClick={handleNavClick}>
              Blog
            </Link>
            <Link href="/work" className="text-slate-400 hover:text-teal-300 transition py-2" onClick={handleNavClick}>
              Work
            </Link>
            <Link href="/projects" className="text-slate-400 hover:text-teal-300 transition py-2" onClick={handleNavClick}>
              Case Studies
            </Link>
            <Link href="/about" className="text-slate-400 hover:text-teal-300 transition py-2" onClick={handleNavClick}>
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
