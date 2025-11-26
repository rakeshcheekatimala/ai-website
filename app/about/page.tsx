export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
        About
      </h1>
      
      <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
        <p>
          I’m a senior engineer with experience across frontend, platform, and backend systems. I focus on building reliable, user-centric solutions and simplifying complex problems so teams can move with clarity and confidence.
        </p>
        
        <p>
          Curiosity drives my work. I'm always learning, exploring new ideas, and turning technical challenges into solutions that are stable, scalable, and easy for others to build on.
        </p>
        
        <p>
         What matters most to me is creating a positive impact on my team, the products I help shape, and the people I work with. My goal is straightforward: continue improving, share what I learn, and build things that make work simpler and better for everyone.
        </p>

        <div className="pt-8 border-t border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Let's Connect
          </h2>
          <p className="mb-6">
            Interested in collaborating or just want to chat? Feel free to reach out on social media or drop me an email.
          </p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/rakesh-cheekatimala/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition">
              LinkedIn
            </a>
            <a href="https://github.com/rakeshcheekatimala" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-100 text-slate-900 font-semibold rounded-lg hover:bg-slate-200 transition">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
