import Link from 'next/link'
import { getPostBySlug, getAllPostSlugs } from '../../../lib/mdx'

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) return <p className="text-center py-20">Post not found</p>

  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <Link href="/blog" className="text-sky-600 hover:text-sky-700 mb-8 inline-block font-semibold">
        ← Back to Blog
      </Link>
      
      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          {post.title}
        </h1>
        <p className="text-xl text-slate-600 mb-4">{post.date}</p>
        <div className="h-px bg-slate-200"></div>
      </header>
      
      <div className="prose prose-lg max-w-none">
        {post.content}
      </div>

      <footer className="mt-16 pt-8 border-t border-slate-200">
        <Link href="/blog" className="inline-block text-sky-600 hover:text-sky-700 font-semibold">
          ← Back to Blog
        </Link>
      </footer>
    </article>
  )
}
