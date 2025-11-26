import Link from 'next/link'
import Card from '../components/Card'
import { getMockPosts, getMockProjects } from '../lib/mock-data'

export default async function Home() {
  const posts = await getMockPosts()
  const projects = await getMockProjects()

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 lg:py-36 max-w-4xl mx-auto px-6">
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
            Making testing easier so you can be<span className="text-sky-600"> confident</span> in your code.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl">
            Learn testing best practices, modern web development, and building great developer experiences through hands-on tutorials and in-depth articles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link 
              href="/blog" 
              className="inline-block px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition"
            >
              Read Articles →
            </Link>
            <Link 
              href="/projects" 
              className="inline-block px-8 py-4 bg-slate-100 text-slate-900 font-semibold rounded-lg hover:bg-slate-200 transition"
            >
              View Work
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 md:py-28 max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-slate-600">
            A selection of projects and explorations in web development & testing.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map(p => (
            <Card key={p.slug} title={p.title} description={p.summary} href={`/projects/${p.slug}`} />
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-20 md:py-28 max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Latest Articles
          </h2>
          <p className="text-xl text-slate-600">
            In-depth guides and tutorials on testing, development, and best practices.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.slice(0, 4).map(post => (
            <Card key={post.slug} title={post.title} description={post.excerpt} href={`/blog/${post.slug}`} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/blog" className="inline-block text-lg font-semibold text-sky-600 hover:text-sky-700">
            View all articles →
          </Link>
        </div>
      </section>
    </>
  )
}
