import Link from 'next/link'
import Image from 'next/image'
import SocailLinks from '../components/SocailLinks'
import AskAgentButton from '../components/AskAgentButton'
import { getMockPosts, getMockProjects } from '../lib/mock-data'

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
  const posts = await getMockPosts()

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid gap-12">
          <div className="space-y-7">
            <p className="text-sm md:text-base font-semibold uppercase text-accent">
              Senior Frontend Platform Engineer
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-ink max-w-5xl">
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

         
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((point) => (
            <div key={point.value} className="rounded-lg border border-line bg-paper p-5 shadow-card">
              <p className="text-3xl font-bold text-ink">{point.value}</p>
              <p className="mt-2 text-sm text-muted leading-relaxed">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase text-accent">What I&apos;m hired to improve</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-ink">Calm engineering judgment for frontend systems.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {valuePillars.map((pillar) => (
            <article key={pillar.title} className="rounded-lg border border-line bg-paper p-7 shadow-card">
              <h3 className="text-2xl font-bold text-ink">{pillar.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-lg bg-white px-8 py-10 md:px-10">
          <p className="text-sm font-semibold uppercase text-accent-light">For hiring teams</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold text-white md:text-4xl">
            Looking for a senior engineer who can connect platform quality to business outcomes?
          </h2>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="https://www.linkedin.com/in/rakesh-cheekatimala/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center ounded-lg bg-accent px-5 py-3 text-center font-semibold text-white transition  hover:shadow-glow sm:w-auto"
            >
              Connect on LinkedIn
            </Link>
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center justify-center ounded-lg bg-accent px-5 py-3 text-center font-semibold text-white transition hover:shadow-glow sm:w-auto"
            >
              Review work history
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
