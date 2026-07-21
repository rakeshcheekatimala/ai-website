import Link from 'next/link'
import { mockProjects } from '../../../lib/mock-data'

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = mockProjects.find(p => p.slug === params.slug)
  if (!project) return <p className="text-center py-20 text-muted">Project not found</p>
  const hasActions = project.url || project.repoUrl

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <Link href="/projects" className="mb-8 inline-block font-semibold text-accent hover:text-accent-dim">
        Back to Case Studies
      </Link>
      
      <header className="mb-12 rounded-lg border border-line bg-paper p-8 shadow-card md:p-10">
        <p className="text-sm font-semibold uppercase text-accent mb-4">
          Case Study
        </p>
        <h1 className="mb-6 text-5xl font-bold leading-none tracking-tight text-ink md:text-7xl">
          {project.title}
        </h1>
        {project.outcome ? (
          <p className="text-xl md:text-2xl text-graphite leading-relaxed max-w-4xl">
            {project.outcome}
          </p>
        ) : null}
      </header>
      
      <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
        <div className="space-y-10 text-lg text-muted leading-relaxed">
          <section className="rounded-lg border border-line bg-paper p-7 shadow-card">
            <h2 className="text-2xl font-bold text-ink mb-3">Problem</h2>
            <p>{project.problem ?? project.summary}</p>
            {project.context ? <p className="mt-4">{project.context}</p> : null}
          </section>

          {project.constraints ? (
            <section className="rounded-lg border border-line bg-paper p-7 shadow-card">
              <h2 className="text-2xl font-bold text-ink mb-3">Constraints</h2>
              <p>{project.constraints}</p>
            </section>
          ) : null}

          {project.roleDetails || project.role ? (
            <section className="rounded-lg border border-line bg-paper p-7 shadow-card">
              <h2 className="text-2xl font-bold text-ink mb-3">My Role</h2>
              <p>{project.roleDetails ?? project.role}</p>
            </section>
          ) : null}

          {project.approach?.length || project.highlights?.length ? (
            <section className="rounded-lg border border-line bg-paper p-7 shadow-card">
              <h2 className="text-2xl font-bold text-ink mb-3">Decisions</h2>
              <ul className="space-y-3 text-muted">
                {(project.approach ?? project.highlights ?? []).map((item) => (
                  <li key={item} className="flex gap-3 rounded-lg border border-line/70 bg-wash/70 p-4">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.impact ? (
            <section className="rounded-lg border border-line bg-paper p-7 shadow-card">
              <h2 className="text-2xl font-bold text-ink mb-3">Impact</h2>
              <p>{project.impact}</p>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {project.metrics?.length ? (
            <section className="rounded-lg border border-line bg-paper p-6 shadow-card">
              <h2 className="text-xl font-bold text-ink mb-4">Evidence</h2>
              <ul className="space-y-4">
                {project.metrics.map((metric) => (
                  <li key={metric} className="rounded-lg border border-line bg-wash/70 p-3 text-muted">{metric}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.tags?.length ? (
            <section className="rounded-lg border border-line bg-paper p-6 shadow-card">
              <h2 className="text-xl font-bold text-ink mb-4">Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-md border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-medium text-accent-dim">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>

      {hasActions ? (
        <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row gap-4">
          {project.url ? (
            <Link href={project.url} className="rounded-lg bg-accent px-6 py-3 text-center font-semibold text-accent-contrast transition hover:-translate-y-0.5 hover:bg-accent-dim hover:shadow-glow-sm">
              View Project
            </Link>
          ) : null}
          {project.repoUrl ? (
            <Link href={project.repoUrl} className="rounded-lg border border-line bg-paper px-6 py-3 text-center font-semibold text-ink transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent">
              GitHub
            </Link>
          ) : null}
        </div>
      ) : null}

      <footer className="mt-12">
        <Link href="/projects" className="inline-block text-accent hover:text-accent-dim font-semibold">
          Back to Case Studies
        </Link>
      </footer>
    </div>
  )
}
