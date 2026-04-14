import LocationBanner from '../../components/LocationBanner'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl md:text-6xl font-bold text-ink mb-8">
        About
      </h1>
      
      <div className="space-y-8 text-lg text-muted leading-relaxed">
        <p>
          I&apos;m a senior frontend platform engineer based in Singapore. Over the last 10+ years, I&apos;ve worked across payments, eKYC, property, e-commerce, enterprise platforms, and developer tooling.
        </p>
        
        <p>
          My strongest work sits where product value and engineering quality meet: faster checkout flows, cleaner frontend architecture, reliable testing practices, shared component systems, and tools that help teams move with more confidence.
        </p>
        
        <p>
          I care about systems that hold up after launch. That means clear boundaries, practical documentation, measurable performance work, and code that the next engineer can understand without archaeology.
        </p>

        <div className="pt-8 border-t border-line">
          <h2 className="text-3xl font-bold text-ink mb-4">
            Let&apos;s Connect
          </h2>
          <p className="mb-6 text-muted">
            Interested in senior frontend platform work, architecture, payments, eKYC, or developer tooling? LinkedIn is the best place to start.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="https://www.linkedin.com/in/rakesh-cheekatimala/" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-accent px-6 py-3 text-center font-semibold text-white transition hover:bg-accent-dim">
              LinkedIn
            </a>
            <a href="https://github.com/rakeshcheekatimala" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-line bg-white px-6 py-3 text-center font-semibold text-ink transition hover:border-accent/40 hover:text-accent">
              GitHub
            </a>
          </div>
        </div>

        <section className="pt-8">
          <h2 className="text-3xl font-bold text-ink mb-4">Based in Singapore</h2>
          <p className="mb-6 text-muted">
            A small geographic note for context, kept here rather than on the hiring-focused homepage.
          </p>
          <LocationBanner />
        </section>
      </div>
    </div>
  )
}
