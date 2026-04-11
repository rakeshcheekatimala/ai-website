export type Project = {
  title: string
  slug: string
  summary: string
  outcome?: string
  context?: string
  role?: string
  metrics?: string[]
  highlights?: string[]
  tags?: string[]
  url?: string
  repoUrl?: string
}

export const mockProjects: Project[] = [
  {
    title: 'Payments Performance Modernization',
    slug: 'payments-performance-modernization',
    summary: 'Refactored a revenue-critical payments experience with lazy loading and cleaner frontend boundaries.',
    outcome: 'Reduced bundle size by 60% and supported faster checkout performance.',
    context: 'Payments flows need to feel instant and stay reliable because every extra second can affect conversion, support load, and customer trust.',
    role: 'Led frontend refactoring across performance, architecture, and delivery quality.',
    metrics: ['60% bundle-size reduction', '25% sales lift from new payment methods', '3% sales lift from save-card capability'],
    highlights: [
      'Split heavy frontend paths with lazy loading so checkout users downloaded less code up front.',
      'Contributed to new payment methods and save-card capability across production payment journeys.',
      'Used performance audits to keep the work tied to measurable user and business outcomes.'
    ],
    tags: ['React', 'TypeScript', 'Performance', 'Payments', 'Lighthouse']
  },
  {
    title: 'eKYC Micro-Frontend Platform',
    slug: 'ekyc-micro-frontend-platform',
    summary: 'Designed a micro-frontend foundation for registration, verification, and outcome flows.',
    outcome: 'Streamlined delivery across eKYC journeys while keeping teams aligned on shared frontend standards.',
    context: 'Identity flows sit at the intersection of compliance, customer onboarding, and cross-team delivery, so the architecture has to be clear and resilient.',
    role: 'Led the frontend architecture and implementation using React, Rollup, shared UI patterns, and cross-team technical standards.',
    metrics: ['3 eKYC journey areas aligned', 'Shared component standards', 'Reusable Rollup-based frontend packaging'],
    highlights: [
      'Created a scalable micro-frontend approach for registration, verification, and outcome flows.',
      'Standardized shared UI patterns with Storybook documentation for more consistent delivery.',
      'Improved team velocity by making frontend integration boundaries easier to reason about.'
    ],
    tags: ['React', 'Rollup', 'Micro-Frontend', 'Storybook', 'Architecture']
  },
  {
    title: 'Developer Tooling & Quality System',
    slug: 'developer-tooling-quality-system',
    summary: 'Built internal tooling and quality practices that made frontend delivery easier to operate.',
    outcome: 'Improved developer experience through internal CLI automation, component documentation, testing standards, and CI quality gates.',
    context: 'Sustainable frontend teams need more than components; they need guardrails, observability, and repeatable workflows that reduce delivery friction.',
    role: 'Built Node.js automation, Storybook documentation, Lighthouse audit workflows, and testing standards across frontend applications.',
    metrics: ['30% test coverage increase at 99.co', '75% minimum coverage gate in CI', 'Automated Lighthouse audit workflows'],
    highlights: [
      'Built internal CLI tools with Node.js to automate repeated development tasks.',
      'Used Storybook to document reusable UI components and improve design consistency.',
      'Set up Cypress and CI coverage gates to catch regressions earlier in the delivery lifecycle.'
    ],
    tags: ['Node.js', 'Storybook', 'Cypress', 'Jest', 'CI/CD', 'Developer Experience']
  }
]
