import Link from 'next/link'
import { mockProjects } from '../../../lib/mock-data'

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = mockProjects.find(p => p.slug === params.slug)
  if (!project) return <p className="text-center py-20">Project not found</p>

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <Link href="/projects" className="text-sky-600 hover:text-sky-700 mb-8 inline-block font-semibold">
        ← Back to Work
      </Link>
      
      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          {project.title}
        </h1>
        <div className="h-px bg-slate-200"></div>
      </header>
      
      <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
        <p>{project.summary}</p>
        <p>
          This is an example project showcasing modern web development practices. In a real application, this would link to the live project, GitHub repository, and detailed case study.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 flex gap-4">
        <Link href="#" className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition">
          View Project
        </Link>
        <Link href="#" className="px-6 py-3 bg-slate-100 text-slate-900 font-semibold rounded-lg hover:bg-slate-200 transition">
          GitHub
        </Link>
      </div>

      <footer className="mt-12">
        <Link href="/projects" className="inline-block text-sky-600 hover:text-sky-700 font-semibold">
          ← Back to Work
        </Link>
      </footer>
    </div>
  )
}
