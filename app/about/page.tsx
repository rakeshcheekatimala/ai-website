export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-5xl md:text-6xl font-bold text-slate-50 mb-8">
        About
      </h1>
      
      <div className="space-y-8 text-lg text-slate-300 leading-relaxed">
        <p>
          I&apos;m a senior frontend platform engineer based in Singapore. Over the last 10+ years, I&apos;ve worked across payments, eKYC, property, e-commerce, enterprise platforms, and developer tooling.
        </p>
        
        <p>
          My strongest work sits where product value and engineering quality meet: faster checkout flows, cleaner frontend architecture, reliable testing practices, shared component systems, and tools that help teams move with more confidence.
        </p>
        
        <p>
          I care about systems that hold up after launch. That means clear boundaries, practical documentation, measurable performance work, and code that the next engineer can understand without archaeology.
        </p>

        <div className="pt-8 border-t border-slate-800">
          <h2 className="text-3xl font-bold text-slate-50 mb-4 text-teal-400">
            Let&apos;s Connect
          </h2>
          <p className="mb-6 text-slate-400">
            Interested in collaborating or just want to chat? Feel free to reach out on social media or drop me an email.
          </p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/rakesh-cheekatimala/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500 transition" style={{ color: '#ffffff' }}>
              LinkedIn
            </a>
            <a href="https://github.com/rakeshcheekatimala" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-800 text-slate-50 font-semibold rounded-lg hover:bg-slate-700 border border-slate-700 transition" style={{ color: '#ffffff' }}>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
