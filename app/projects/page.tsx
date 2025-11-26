import { getMockProjects } from '../../lib/mock-data'
import Card from '../../components/Card'

export default async function ProjectsPage() {
  const projects = await getMockProjects()

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Work
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
          A collection of projects, tools, and experiments exploring modern web development practices.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map(p => (
          <Card key={p.slug} title={p.title} description={p.summary} href={`/projects/${p.slug}`} />
        ))}
      </div>
    </div>
  )
}
