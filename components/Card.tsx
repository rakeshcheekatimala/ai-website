import Link from 'next/link'

export default function Card({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <article className="group flex flex-col p-8 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition">
        {title}
      </h3>
      <p className="text-slate-600 text-lg mb-6 flex-1 leading-relaxed">
        {description}
      </p>
      <Link 
        href={href} 
        className="inline-flex font-semibold text-sky-600 hover:text-sky-700 gap-2 group-hover:gap-3 transition-all items-center"
      >
        Read more
        <span className="inline-block">→</span>
      </Link>
    </article>
  )
}
