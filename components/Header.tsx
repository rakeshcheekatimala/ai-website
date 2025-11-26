import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-slate-700">
          Rakesh
        </Link>
        <nav className="flex gap-8 items-center text-lg">
          <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition">
            Blog
          </Link>
          <Link href="/projects" className="text-slate-600 hover:text-slate-900 transition">
            Work
          </Link>
          <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
