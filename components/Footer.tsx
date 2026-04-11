export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50 mt-24">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="font-bold text-slate-50 mb-4">Site</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="/" className="hover:text-teal-300 transition">Home</a></li>
              <li><a href="https://rakeshcheekatimala.substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">Blog</a></li>
              <li><a href="/work" className="hover:text-teal-300 transition">Work</a></li>
              <li><a href="/projects" className="hover:text-teal-300 transition">Case Studies</a></li>
              <li><a href="/about" className="hover:text-teal-300 transition">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-50 mb-4">Social</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="https://x.com/RCheekatim12238" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">Twitter</a></li>
              <li><a href="https://github.com/rakeshcheekatimala" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/rakesh-cheekatimala/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-50 mb-4">Writing</h4>
            <p className="text-slate-400 text-base leading-relaxed mb-3">Notes on frontend architecture, testing, AI experiments, and developer experience.</p>
            <a href="https://rakeshcheekatimala.substack.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-400 hover:text-teal-300 transition">
              Read on Substack
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} — Built with Next.js, Tailwind & 💙</p>
        </div>
      </div>
    </footer>
  )
}
