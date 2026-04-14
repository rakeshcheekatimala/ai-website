import Link from 'next/link'

export default function Card({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <article className="group flex flex-col rounded-lg border border-line bg-paper p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover">
      <h3 className="text-2xl font-bold text-ink mb-3 transition group-hover:text-accent">
        {title}
      </h3>
      <p className="text-muted text-lg mb-6 flex-1 leading-relaxed">
        {description}
      </p>
      <Link 
        href={href} 
        className="inline-flex font-semibold text-accent hover:text-accent-dim gap-2 group-hover:gap-3 transition-all items-center"
      >
        Read case study
        <span className="inline-block">→</span>
      </Link>
    </article>
  )
}
