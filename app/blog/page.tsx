import { getMockPosts } from '../../lib/mock-data'
import Card from '../../components/Card'

export default async function BlogPage() {
  const posts = await getMockPosts()

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-ink mb-6">
          Blog
        </h1>
        <p className="text-xl md:text-2xl text-muted leading-relaxed">
          In-depth articles about testing, web development, and building better tools for developers.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map(post => (
          <article key={post.slug}>
            <Card title={post.title} description={post.excerpt} href={`/blog/${post.slug}`} />
            <p className="text-sm text-subtle mt-4">{post.date}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
