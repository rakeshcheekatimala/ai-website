import { experiences } from '../experiences'

export default function ExperienceTimeline() {
  return (
    <section className="py-16 md:py-24">
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4">
          Work &amp; Experience
        </h2>
        <p className="text-lg md:text-xl text-muted max-w-2xl">
          A snapshot of the roles that shaped how I think about building reliable, scalable, and user-centric applications.
        </p>
      </div>

      <ol className="relative border-l border-line space-y-12 pl-6 md:pl-8">
        {experiences.map((exp, index) => (
          <li key={`${exp.company}-${exp.role}-${index}`} className="ml-2 md:ml-4">
            <div className="absolute -left-[9px] md:-left-[11px] mt-1.5 h-4 w-4 md:h-5 md:w-5 rounded-full border-2 border-accent bg-wash" />

            <div className="rounded-lg border border-line bg-paper p-6 shadow-card transition-all duration-300 hover:border-accent/30 hover:shadow-card-hover md:p-8">
              <header className="mb-4 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-semibold text-ink">
                    {exp.role}
                  </h3>
                  <p className="text-graphite text-lg">
                    {exp.company}
                    {exp.location ? (
                      <span className="text-subtle text-base"> - {exp.location}</span>
                    ) : null}
                  </p>
                </div>
                <p className="text-sm md:text-base font-medium text-subtle whitespace-nowrap">
                  {exp.start} - {exp.end}
                </p>
              </header>

              <p className="text-muted text-base md:text-lg leading-relaxed mb-4">
                {exp.summary}
              </p>

              {exp.highlights.length > 0 && (
                <ul className="list-disc list-inside space-y-1.5 text-muted text-sm md:text-base mb-4">
                  {exp.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-medium text-accent-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
