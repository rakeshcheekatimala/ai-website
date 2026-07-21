import Link from 'next/link'
import SocailLinks from '../components/SocailLinks'
import AskAgentButton from '../components/AskAgentButton'
import { getMockProjects } from '../lib/mock-data'

const proofPoints = [
  { value: '60%', label: 'bundle-size reduction on a payments app' },
  { value: '25%', label: 'sales lift from new payment methods' },
  { value: '30%', label: 'test automation coverage increase' },
  { value: '10+', label: 'years across Singapore engineering teams' },
]

const valuePillars = [
  {
    title: 'Revenue-critical frontend',
    description: 'Payments, checkout, and onboarding work where speed, reliability, and business outcomes have to move together.',
  },
  {
    title: 'Platform architecture',
    description: 'Micro-frontends, shared UI standards, Storybook documentation, and integration boundaries that help teams scale cleanly.',
  },
  {
    title: 'Delivery confidence',
    description: 'Testing strategy, CI quality gates, Lighthouse workflows, Sentry visibility, and internal tooling that reduce delivery friction.',
  },
]

export default async function Home() {
  const projects = await getMockProjects()

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="reveal space-y-7">
            <p className="text-sm md:text-base font-semibold uppercase text-accent">
              Senior Software Engineer — Platforms & Applied AI
            </p>
            <h1 className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-tight text-ink md:text-6xl lg:text-7xl">
              I build revenue critical systems that customers can trust.
            </h1>
            <p className="text-xl md:text-2xl text-graphite leading-relaxed max-w-3xl">
              I&apos;m Rakesh Cheekatimala, a Singapore-based engineer with 10+ years across payments, eKYC, property, commerce, and enterprise platforms. I focus on performance, clean architecture, reliable tests, and developer tooling that helps teams ship with confidence.
            </p>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
              <Link
                href="https://www.linkedin.com/in/rakesh-cheekatimala/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-center font-semibold text-white transition hover:bg-accent-dim hover:shadow-glow sm:w-auto"
              >
                Connect on LinkedIn
              </Link>
              <AskAgentButton />
            </div>
            <SocailLinks />
          </div>

          <div className="surface-grid reveal rounded-lg border border-line bg-paper/80 p-4 shadow-card md:p-6 lg:delay-150">
            <div className="grid gap-3 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <div key={point.value} className="rounded-lg border border-line bg-paper p-5 shadow-card transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover">
                  <p className="text-4xl font-black tracking-tight text-ink">{point.value}</p>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{point.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase text-accent">What I&apos;m hired to improve</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-5xl">Calm engineering judgment for frontend systems.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {valuePillars.map((pillar) => (
            <article key={pillar.title} className="group rounded-lg border border-line bg-paper p-7 shadow-card transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover">
              <div className="mb-7 h-1 w-12 rounded-full bg-accent transition group-hover:w-20" />
              <h3 className="text-2xl font-bold text-ink">{pillar.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      {projects.length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <p className="text-sm font-semibold uppercase text-accent">Case Studies</p>
            <Link href="/projects" className="hidden font-semibold text-accent hover:text-accent-dim sm:inline-flex">
              Case Studies
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex min-h-80 flex-col justify-between overflow-hidden rounded-lg border border-line bg-paper p-7 shadow-card transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
              >
                <div>
                  <p className="mb-5 text-sm font-semibold text-accent">{project.outcome}</p>
                  <h3 className="text-2xl font-bold leading-tight text-ink transition group-hover:text-accent">{project.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">{project.impact ?? project.summary}</p>
                </div>
                <span className="mt-8 inline-flex font-semibold text-accent transition group-hover:translate-x-1">
                  Read case study
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="overflow-hidden rounded-lg border border-line bg-paper px-8 py-10 shadow-card md:px-10">
          <div className="mb-8 h-1 w-16 rounded-full bg-accent" />
          <p className="text-sm font-semibold uppercase text-accent">For hiring teams</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Looking for a senior engineer who can connect platform quality to business outcomes?
          </h2>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="https://www.linkedin.com/in/rakesh-cheekatimala/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-center font-semibold text-white transition hover:bg-accent-dim hover:shadow-glow sm:w-auto"
            >
              Connect on LinkedIn
            </Link>
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-line bg-white px-5 py-3 text-center font-semibold text-ink transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent sm:w-auto"
            >
              Review work history
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
