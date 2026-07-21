import Link from 'next/link'

export default function Card({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <article className="group relative flex min-h-80 flex-col overflow-hidden rounded-lg border border-line bg-paper p-8 shadow-card transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover">
      <div className="absolute inset-x-0 top-0 h-1 bg-accent opacity-80" />
      <h3 className="mb-3 text-2xl font-bold leading-tight text-ink transition group-hover:text-accent">
        {title}
      </h3>
      <p className="mb-6 flex-1 text-lg leading-relaxed text-muted">
        {description}
      </p>
      <Link 
        href={href} 
        className="inline-flex items-center gap-2 font-semibold text-accent transition group-hover:translate-x-1 hover:text-accent-dim"
      >
        Read case study
        <span className="inline-block">→</span>
      </Link>
    </article>
  )
}
