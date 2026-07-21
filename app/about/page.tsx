import LocationBanner from '../../components/LocationBanner'

const certifications = [
  {
    title: 'Architecting Agentic AI Solutions',
    issuer: 'National University of Singapore',
    date: 'Issued Mar 2026',
  },
  {
    title: 'Deploying and Operating AI Solutions - LLMOps',
    issuer: 'National University of Singapore',
    date: 'Issued Mar 2026',
  },
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Issued Jan 2026 - Expires Jan 2029',
  },
  {
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    date: 'Issued Mar 2026 - Expires Mar 2029',
  },
]

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-8 text-5xl font-bold leading-none tracking-tight text-ink md:text-7xl">
        About
      </h1>
      
      <div className="space-y-8 text-lg leading-relaxed text-muted">
        <p className="rounded-lg border border-line bg-paper p-6 text-xl leading-relaxed shadow-card">
          I&apos;m a senior platform engineer based in Singapore. Over the last 10+ years, I&apos;ve worked across payments, eKYC, property, e-commerce, enterprise platforms, and developer tooling.
        </p>
        
        <p className="rounded-lg border border-line bg-paper p-6 shadow-card">
          My strongest work sits where product value and engineering quality meet: faster checkout flows, cleaner frontend architecture, reliable testing practices, shared component systems, and tools that help teams move with more confidence.
        </p>
        
        <p className="rounded-lg border border-line bg-paper p-6 shadow-card">
          I care about systems that hold up after launch. That means clear boundaries, practical documentation, measurable performance work, and code that the next engineer can understand without archaeology.
        </p>

        <section className="rounded-lg border border-line bg-paper p-6 shadow-card md:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-ink mb-3">
                Certifications
              </h2>
              <p className="text-muted">
                Recent AI and cloud credentials that support the Applied AI and platform direction.
              </p>
            </div>
            <a
              href="https://sg.linkedin.com/in/rakesh-cheekatimala?trk=public_post_feed-actor-name"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line bg-white px-4 py-2 text-center text-base font-semibold text-ink transition hover:border-accent/40 hover:text-accent"
            >
              Verify on LinkedIn
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((certification) => (
              <article key={certification.title} className="rounded-lg border border-line bg-wash/70 p-5">
                <h3 className="text-xl font-bold text-ink">
                  {certification.title}
                </h3>
                <p className="mt-2 text-base font-semibold text-muted">
                  {certification.issuer}
                </p>
                <p className="mt-1 text-sm text-subtle">
                  {certification.date}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="rounded-lg border border-line bg-ink p-6 shadow-card md:p-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Let&apos;s Connect
          </h2>
          <p className="mb-6 text-line">
            Interested in senior frontend platform work, architecture, payments, eKYC, or developer tooling? LinkedIn is the best place to start.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="https://www.linkedin.com/in/rakesh-cheekatimala/" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-accent px-6 py-3 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-dim">
              LinkedIn
            </a>
            <a href="https://github.com/rakeshcheekatimala" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:border-accent-light hover:text-accent-light">
              GitHub
            </a>
          </div>
        </div>

        <section className="rounded-lg border border-line bg-paper p-6 shadow-card md:p-8">
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
