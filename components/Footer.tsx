export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line/80 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h4 className="mb-4 font-bold text-white">Site</h4>
            <ul className="space-y-2 text-line">
              <li><a href="/" className="hover:text-accent-light transition">Home</a></li>
              <li><a href="/work" className="hover:text-accent-light transition">Work</a></li>
              <li><a href="/projects" className="hover:text-accent-light transition">Case Studies</a></li>
              <li><a href="/about" className="hover:text-accent-light transition">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Social</h4>
            <ul className="space-y-2 text-line">
              <li><a href="https://x.com/RCheekatim12238" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition">Twitter</a></li>
              <li><a href="https://github.com/rakeshcheekatimala" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/rakesh-cheekatimala/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Writing</h4>
            <p className="mb-3 text-base leading-relaxed text-line">Notes on frontend architecture, testing, AI experiments, and developer experience.</p>
            <a href="https://rakeshcheekatimala.substack.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-light hover:text-white transition">
              Read on Substack
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-line">
          <p>© {new Date().getFullYear()} - Built with Next.js and Tailwind.</p>
        </div>
      </div>
    </footer>
  )
}
