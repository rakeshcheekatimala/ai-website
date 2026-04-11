import Link from 'next/link'
import LocationBanner from '../components/LocationBanner'
import SocailLinks from '../components/SocailLinks'
import AskAgentButton from '../components/AskAgentButton'
import { getMockProjects } from '../lib/mock-data'

const proofPoints = [
  { value: '60%', label: 'bundle-size reduction on a payments app' },
  { value: '25%', label: 'sales lift from new payment methods' },
  { value: '30%', label: 'test automation coverage increase' },
  { value: '10+', label: 'years across Singapore engineering teams' },
]

export default async function Home() {
  const projects = await getMockProjects()

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-28 max-w-5xl mx-auto px-6">
        <div className="space-y-6 mb-12">
          <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-teal-300">
            Senior Frontend Platform Engineer
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-50 max-w-4xl">
            I build revenue critical frontend systems that teams can trust.
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl">
            I&apos;m Rakesh Cheekatimala, a Singapore-based engineer with 10+ years across payments, eKYC, property, commerce, and enterprise platforms. I focus on performance, clean architecture, reliable tests, and developer tooling that helps teams ship with confidence.
          </p>
          <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-start">
            <AskAgentButton />
            <Link
              href="/projects"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-teal-600 px-6 py-3.5 text-center font-semibold transition hover:bg-teal-500 sm:w-auto"
              style={{ color: '#ffffff' }}
            >
              View Case Studies
            </Link>
            <Link
              href="/work"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-6 py-3.5 text-center font-semibold transition hover:bg-slate-700 sm:w-auto"
              style={{ color: '#ffffff' }}
            >
              View Work
            </Link>
          </div>

          <SocailLinks />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((point) => (
            <div key={point.value} className="rounded-lg border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-3xl font-bold text-teal-300">{point.value}</p>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      {projects.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">Selected Proof</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-50">Work that connects engineering decisions to business outcomes.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group rounded-lg border border-slate-800 bg-slate-900/50 p-6 transition hover:border-teal-500/40 hover:bg-slate-900"
              >
                <p className="text-sm font-semibold text-teal-300">{project.outcome}</p>
                <h3 className="mt-4 text-2xl font-bold text-slate-50 group-hover:text-teal-200 transition">{project.title}</h3>
                <p className="mt-3 text-base text-slate-400 leading-relaxed">{project.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Location Banner */}
      <div className="max-w-5xl mx-auto px-6">
        <LocationBanner />
      </div>
    </>
  )
}
