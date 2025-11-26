export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-24">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Site</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="/" className="hover:text-slate-900">Home</a></li>
              <li><a href="/blog" className="hover:text-slate-900">Blog</a></li>
              <li><a href="/projects" className="hover:text-slate-900">Work</a></li>
              <li><a href="/about" className="hover:text-slate-900">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Social</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:text-slate-900">Twitter</a></li>
              <li><a href="#" className="hover:text-slate-900">GitHub</a></li>
              <li><a href="#" className="hover:text-slate-900">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Newsletter</h4>
            <p className="text-slate-600 text-sm">Subscribe for insights on web dev, testing & AI.</p>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} — Built with Next.js, Tailwind & 💙</p>
        </div>
      </div>
    </footer>
  )
}
