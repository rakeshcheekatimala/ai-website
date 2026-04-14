import { getMockProjects } from '../../lib/mock-data'
import Card from '../../components/Card'

export default async function ProjectsPage() {
  const projects = await getMockProjects()

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-16">
        <p className="text-sm font-semibold uppercase text-accent mb-4">
          Case Studies
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-ink mb-6">
          Engineering work with measurable value
        </h1>
        <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-3xl">
          A focused set of frontend architecture, performance, quality, and developer experience work from production systems, shaped for quick hiring-leader review.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        {projects.map(p => (
          <Card key={p.slug} title={p.title} description={p.impact ?? p.outcome ?? p.summary} href={`/projects/${p.slug}`} />
        ))}
      </div>
    </div>
  )
}
