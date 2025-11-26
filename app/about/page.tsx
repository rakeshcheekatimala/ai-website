export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
        About
      </h1>
      
      <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
        <p>
          I'm a passionate educator and developer focused on helping others write better tests, build more robust applications, and improve their development workflow. My goal is to make testing and quality assurance accessible to everyone.
        </p>
        
        <p>
          Through blog posts, talks, and open-source projects, I share practical knowledge about testing strategies, web development best practices, and building tools that make developers' lives easier.
        </p>
        
        <p>
          When I'm not writing code or content, you'll find me speaking at conferences, mentoring other developers, or exploring new technologies that could improve how we build for the web.
        </p>

        <div className="pt-8 border-t border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Let's Connect
          </h2>
          <p className="mb-6">
            Interested in collaborating or just want to chat? Feel free to reach out on social media or drop me an email.
          </p>
          <div className="flex gap-4">
            <a href="#" className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition">
              Twitter
            </a>
            <a href="#" className="px-6 py-3 bg-slate-100 text-slate-900 font-semibold rounded-lg hover:bg-slate-200 transition">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
