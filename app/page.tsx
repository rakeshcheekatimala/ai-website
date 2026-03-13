import Link from 'next/link'
import Card from '../components/Card'
import LocationBanner from '../components/LocationBanner'
import SocailLinks from '../components/SocailLinks'
import { getMockPosts, getMockProjects } from '../lib/mock-data'

export default async function Home() {
  const posts = await getMockPosts()
  const projects = await getMockProjects()

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-28 lg:py-36 max-w-4xl mx-auto px-6">
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-50">
            Hello, I&apos;m Rakesh!
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl">
          Currently based in Singapore with 10+ years of experience building scalable frontend systems and developer tooling.
          I&apos;ve shipped products across payments, property, e-commerce, and enterprise platforms. 
          I care deeply about the craft behind them by implementing the principles of clean architecture, reliable tests, and systems that hold up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link 
              href="https://rakeshcheekatimala.substack.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-teal-600 font-semibold rounded-lg hover:bg-teal-500 transition"
              style={{ color: '#ffffff' }}
            >
              Read Articles →
            </Link>
            <Link 
              href="/work" 
              className="inline-block px-8 py-4 bg-slate-800 font-semibold rounded-lg hover:bg-slate-700 border border-slate-700 transition"
              style={{ color: '#ffffff' }}
            >
              View Work
            </Link>
          </div>

          <SocailLinks />
        </div>
      </section>

      {/* Location Banner */}
      <div className="max-w-4xl mx-auto px-6">
        <LocationBanner />
      </div>
    </>
  )
}
