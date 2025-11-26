import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-dark-surface/80 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-cream-base hover:text-phoenix-gold transition">
          🔥 Phoenix
        </Link>
        <nav className="flex gap-8 items-center text-lg">
          <Link href="/blog" className="text-cream-dark hover:text-phoenix-warm transition">
            Blog
          </Link>
          <Link href="/projects" className="text-cream-dark hover:text-phoenix-warm transition">
            Projects
          </Link>
          <Link href="/about" className="text-cream-dark hover:text-phoenix-warm transition">
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
