import Link from 'next/link'

export default function Card({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <article className="group flex flex-col p-8 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-indigo-500/40 hover:shadow-card-hover transition-all duration-300">
      <h3 className="text-2xl font-bold text-slate-50 mb-3 group-hover:text-indigo-300 transition">
        {title}
      </h3>
      <p className="text-slate-400 text-lg mb-6 flex-1 leading-relaxed">
        {description}
      </p>
      <Link 
        href={href} 
        className="inline-flex font-semibold text-indigo-400 hover:text-indigo-300 gap-2 group-hover:gap-3 transition-all items-center"
      >
        Read more
        <span className="inline-block">→</span>
      </Link>
    </article>
  )
}
