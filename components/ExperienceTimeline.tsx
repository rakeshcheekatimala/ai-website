import { experiences } from '../experiences'

export default function ExperienceTimeline() {
  return (
    <section className="py-10 md:py-16">
      <div className="mb-12 max-w-4xl">
        <h2 className="mb-4 text-5xl font-bold leading-none tracking-tight text-ink md:text-7xl">
          Work &amp; Experience
        </h2>
        <p className="text-lg md:text-xl text-muted max-w-2xl">
          A snapshot of the roles that shaped how I think about building reliable, scalable, and user-centric applications.
        </p>
      </div>

      <ol className="relative space-y-8">
        {experiences.map((exp, index) => (
          <li key={`${exp.company}-${exp.role}-${index}`}>
            <div className="group grid gap-4 rounded-lg border border-line bg-paper p-6 shadow-card transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover md:grid-cols-[0.22fr_1fr] md:p-8">
              <div className="flex items-center gap-3 md:block">
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-wash text-sm font-bold text-accent transition group-hover:border-accent/40 group-hover:bg-accent-soft">
                  {index + 1}
                </span>
                <p className="mt-0 text-sm font-medium text-subtle md:mt-4">
                  {exp.start} - {exp.end}
                </p>
              </div>
              <div>
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
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
