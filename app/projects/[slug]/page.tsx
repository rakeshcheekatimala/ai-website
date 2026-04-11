import Link from 'next/link'
import { mockProjects } from '../../../lib/mock-data'

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = mockProjects.find(p => p.slug === params.slug)
  if (!project) return <p className="text-center py-20 text-slate-400">Project not found</p>
  const hasActions = project.url || project.repoUrl

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <Link href="/projects" className="text-teal-400 hover:text-teal-300 mb-8 inline-block font-semibold">
        ← Back to Case Studies
      </Link>
      
      <header className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300 mb-4">
          Case Study
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-50 mb-6">
          {project.title}
        </h1>
        {project.outcome ? (
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            {project.outcome}
          </p>
        ) : null}
        <div className="h-px bg-slate-800"></div>
      </header>
      
      <div className="grid gap-8 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-10 text-lg text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-50 mb-3">The Work</h2>
            <p>{project.summary}</p>
            {project.context ? <p className="mt-4">{project.context}</p> : null}
          </section>

          {project.role ? (
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-3">My Role</h2>
              <p>{project.role}</p>
            </section>
          ) : null}

          {project.highlights?.length ? (
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-3">What Changed</h2>
              <ul className="space-y-3 text-slate-300">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-teal-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          {project.metrics?.length ? (
            <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-xl font-bold text-slate-50 mb-4">Signals</h2>
              <ul className="space-y-4">
                {project.metrics.map((metric) => (
                  <li key={metric} className="text-slate-300">{metric}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.tags?.length ? (
            <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-xl font-bold text-slate-50 mb-4">Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-300">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>

      {hasActions ? (
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
          {project.url ? (
            <Link href={project.url} className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-500 transition text-center">
              View Project
            </Link>
          ) : null}
          {project.repoUrl ? (
            <Link href={project.repoUrl} className="px-6 py-3 bg-slate-800 text-slate-50 font-semibold rounded-lg hover:bg-slate-700 border border-slate-700 transition text-center">
              GitHub
            </Link>
          ) : null}
        </div>
      ) : null}

      <footer className="mt-12">
        <Link href="/projects" className="inline-block text-teal-400 hover:text-teal-300 font-semibold">
          ← Back to Case Studies
        </Link>
      </footer>
    </div>
  )
}
