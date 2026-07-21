# Portfolio Redesign Audit, Inventory, and Implementation Map

This document records the redesign process required by the content-lock brief. It treats existing source content as locked and maps that content to the redesigned presentation without rewriting website copy.

## Existing Website Audit

Pages and surfaces:

- Home: hero, proof metrics, value pillars, selected case studies, hiring CTA, social actions.
- Work: role-by-role experience timeline.
- Case Studies: project listing.
- Case Study Detail: problem, constraints, role, decisions, impact, evidence, stack, optional actions.
- About: biography paragraphs, certifications, contact links, Singapore location note.
- Blog index and blog detail: article frontmatter and MDX article bodies.
- Footer: site links, social links, writing link, copyright.
- API surfaces: hello, posts, geolocation, chat.

Usability and visual-design problems identified:

- The previous CTA dark block had insufficient contrast because global heading and paragraph color rules overrode utility classes.
- Homepage proof content was accidentally duplicated after the first redesign pass.
- Navigation was visually plain and lacked strong active/focus treatment.
- Project cards were functional but lacked hierarchy, scanning affordances, and visual structure.
- Experience presentation was readable but did not create a strong career-journey rhythm.
- Footer was visually disconnected from the redesigned body.

Accessibility problems identified:

- Global element color overrides made dark-surface contrast unreliable.
- Focus states needed a stronger visible treatment.
- Mobile navigation needed clearer touch target styling.
- Motion needed reduced-motion support.

Responsive-layout problems identified:

- Homepage content needed stronger first-screen hierarchy on large screens.
- Cards needed more deliberate collapse behavior on mobile.
- Timeline needed to avoid fragile absolute-position timeline dots on smaller screens.

## Content Inventory and Migration Map

| Source section | Exact text | Link | Type | Associated item | Redesigned location |
|---|---|---|---|---|---|
| Header logo | Rakesh | / | Brand text | Site | Header |
| Header nav | Work | /work | Navigation | Work page | Header and mobile menu |
| Header nav | Case Studies | /projects | Navigation | Projects page | Header and mobile menu |
| Header nav | About | /about | Navigation | About page | Header and mobile menu |
| Home hero label | Senior Software Engineer — Platforms & Applied AI | none | Label | Home | Home hero |
| Home headline | I build revenue critical systems that customers can trust. | none | H1 | Home | Home hero |
| Home description | I'm Rakesh Cheekatimala, a Singapore-based engineer with 10+ years across payments, eKYC, property, commerce, and enterprise platforms. I focus on performance, clean architecture, reliable tests, and developer tooling that helps teams ship with confidence. | none | Paragraph | Home | Home hero |
| Home CTA | Connect on LinkedIn | https://www.linkedin.com/in/rakesh-cheekatimala/ | Action | LinkedIn | Home hero and hiring CTA |
| Home CTA | Ask My Agent | none | Button | Chat modal | Home hero |
| Social | Twitter | https://x.com/RCheekatim12238 | Action | Social | Home social links and footer |
| Social | LinkedIn | https://www.linkedin.com/in/rakesh-cheekatimala/ | Action | Social | Home social links, footer, About |
| Social | GitHub | https://github.com/rakeshcheekatimala | Action | Social | Home social links, footer, About |
| Social | Substack | https://rakeshcheekatimala.substack.com | Action | Writing | Home social links |
| Home metric | 60% | none | Metric | Proof strip | Home proof grid |
| Home metric label | bundle-size reduction on a payments app | none | Metric label | Proof strip | Home proof grid |
| Home metric | 25% | none | Metric | Proof strip | Home proof grid |
| Home metric label | sales lift from new payment methods | none | Metric label | Proof strip | Home proof grid |
| Home metric | 30% | none | Metric | Proof strip | Home proof grid |
| Home metric label | test automation coverage increase | none | Metric label | Proof strip | Home proof grid |
| Home metric | 10+ | none | Metric | Proof strip | Home proof grid |
| Home metric label | years across Singapore engineering teams | none | Metric label | Proof strip | Home proof grid |
| Home section label | What I'm hired to improve | none | Label | Value pillars | Home value pillar section |
| Home section headline | Calm engineering judgment for frontend systems. | none | H2 | Value pillars | Home value pillar section |
| Value pillar | Revenue-critical frontend | none | Card title | Value pillar | Home value pillar grid |
| Value pillar description | Payments, checkout, and onboarding work where speed, reliability, and business outcomes have to move together. | none | Card description | Value pillar | Home value pillar grid |
| Value pillar | Platform architecture | none | Card title | Value pillar | Home value pillar grid |
| Value pillar description | Micro-frontends, shared UI standards, Storybook documentation, and integration boundaries that help teams scale cleanly. | none | Card description | Value pillar | Home value pillar grid |
| Value pillar | Delivery confidence | none | Card title | Value pillar | Home value pillar grid |
| Value pillar description | Testing strategy, CI quality gates, Lighthouse workflows, Sentry visibility, and internal tooling that reduce delivery friction. | none | Card description | Value pillar | Home value pillar grid |
| Home project section | Case Studies | /projects | Label/action | Projects | Home project preview section |
| Project card action | Read case study | /projects/[slug] | Action | Projects | Home project cards and project cards |
| Hiring CTA label | For hiring teams | none | Label | Home CTA | Home hiring CTA |
| Hiring CTA headline | Looking for a senior engineer who can connect platform quality to business outcomes? | none | H2 | Home CTA | Home hiring CTA |
| Hiring CTA action | Review work history | /work | Action | Work page | Home hiring CTA |
| Projects page label | Case Studies | none | Label | Projects page | Projects page header |
| Projects page headline | Engineering work with measurable value | none | H1 | Projects page | Projects page header |
| Projects page description | A focused set of frontend architecture, performance, quality, and developer experience work from production systems, shaped for quick hiring-leader review. | none | Paragraph | Projects page | Projects page header |
| Project title | Payments Performance Modernization | /projects/payments-performance-modernization | Project name | Payments project | Project cards and detail page |
| Project summary | Refactored a revenue-critical payments experience with lazy loading and cleaner frontend boundaries. | none | Project summary | Payments project | Project data and fallbacks |
| Project outcome | Reduced bundle size by 60% and supported faster checkout performance. | none | Project outcome | Payments project | Home/project listing/detail |
| Project context | Payments flows need to feel instant and stay reliable because every extra second can affect conversion, support load, and customer trust. | none | Project context | Payments project | Detail page Problem |
| Project role | Led frontend refactoring across performance, architecture, and delivery quality. | none | Role | Payments project | Detail page My Role fallback |
| Project problem | The payments experience had to stay fast and reliable while supporting business-critical checkout improvements. | none | Problem | Payments project | Detail page Problem |
| Project constraints | The work touched revenue-sensitive flows, so changes needed to reduce frontend weight without weakening reliability or delivery confidence. | none | Constraints | Payments project | Detail page Constraints |
| Project decision | Split heavy paths with lazy loading so checkout users downloaded less code up front. | none | Decision | Payments project | Detail page Decisions |
| Project decision | Kept architecture boundaries clear while contributing to new payment methods and save-card capability. | none | Decision | Payments project | Detail page Decisions |
| Project decision | Used performance audits to keep technical changes connected to user and business outcomes. | none | Decision | Payments project | Detail page Decisions |
| Project impact | Reduced bundle size by 60%, contributed to payment methods tied to a 25% sales lift, and supported save-card work tied to an additional 3% lift. | none | Impact | Payments project | Cards and detail page |
| Project role details | Owned the frontend refactoring approach and kept performance, architecture, and delivery quality aligned across the checkout journey. | none | Role detail | Payments project | Detail page My Role |
| Project metric | 60% bundle-size reduction | none | Evidence | Payments project | Detail page Evidence |
| Project metric | 25% sales lift from new payment methods | none | Evidence | Payments project | Detail page Evidence |
| Project metric | 3% sales lift from save-card capability | none | Evidence | Payments project | Detail page Evidence |
| Project highlight | Split heavy frontend paths with lazy loading so checkout users downloaded less code up front. | none | Highlight | Payments project | Detail fallback |
| Project highlight | Contributed to new payment methods and save-card capability across production payment journeys. | none | Highlight | Payments project | Detail fallback |
| Project highlight | Used performance audits to keep the work tied to measurable user and business outcomes. | none | Highlight | Payments project | Detail fallback |
| Project tags | React, TypeScript, Performance, Payments, Lighthouse | none | Technologies | Payments project | Detail page Stack |
| Project title | eKYC Micro-Frontend Platform | /projects/ekyc-micro-frontend-platform | Project name | eKYC project | Project cards and detail page |
| Project summary | Designed a micro-frontend foundation for registration, verification, and outcome flows. | none | Project summary | eKYC project | Project data and fallbacks |
| Project outcome | Streamlined delivery across eKYC journeys while keeping teams aligned on shared frontend standards. | none | Project outcome | eKYC project | Home/project listing/detail |
| Project context | Identity flows sit at the intersection of compliance, customer onboarding, and cross-team delivery, so the architecture has to be clear and resilient. | none | Project context | eKYC project | Detail page Problem |
| Project role | Led the frontend architecture and implementation using React, Rollup, shared UI patterns, and cross-team technical standards. | none | Role | eKYC project | Detail page My Role fallback |
| Project problem | Registration, verification, and outcome flows needed a frontend foundation that multiple teams could reason about consistently. | none | Problem | eKYC project | Detail page Problem |
| Project constraints | The platform had to support compliance-sensitive onboarding work while preserving clear integration boundaries and shared standards. | none | Constraints | eKYC project | Detail page Constraints |
| Project decision | Created a Rollup-based micro-frontend approach for eKYC registration, verification, and outcome flows. | none | Decision | eKYC project | Detail page Decisions |
| Project decision | Standardized shared UI patterns with Storybook documentation to reduce drift across journeys. | none | Decision | eKYC project | Detail page Decisions |
| Project decision | Made integration boundaries easier to understand so teams could move faster without fragmenting the frontend. | none | Decision | eKYC project | Detail page Decisions |
| Project impact | Aligned three eKYC journey areas around reusable frontend packaging, shared component standards, and clearer delivery boundaries. | none | Impact | eKYC project | Cards and detail page |
| Project role details | Led frontend architecture and implementation across React, Rollup, shared UI patterns, and cross-team technical standards. | none | Role detail | eKYC project | Detail page My Role |
| Project metric | 3 eKYC journey areas aligned | none | Evidence | eKYC project | Detail page Evidence |
| Project metric | Shared component standards | none | Evidence | eKYC project | Detail page Evidence |
| Project metric | Reusable Rollup-based frontend packaging | none | Evidence | eKYC project | Detail page Evidence |
| Project highlight | Created a scalable micro-frontend approach for registration, verification, and outcome flows. | none | Highlight | eKYC project | Detail fallback |
| Project highlight | Standardized shared UI patterns with Storybook documentation for more consistent delivery. | none | Highlight | eKYC project | Detail fallback |
| Project highlight | Improved team velocity by making frontend integration boundaries easier to reason about. | none | Highlight | eKYC project | Detail fallback |
| Project tags | React, Rollup, Micro-Frontend, Storybook, Architecture | none | Technologies | eKYC project | Detail page Stack |
| Project title | Developer Tooling & Quality System | /projects/developer-tooling-quality-system | Project name | Developer tooling project | Project cards and detail page |
| Project summary | Built internal tooling and quality practices that made frontend delivery easier to operate. | none | Project summary | Developer tooling project | Project data and fallbacks |
| Project outcome | Improved developer experience through internal CLI automation, component documentation, testing standards, and CI quality gates. | none | Project outcome | Developer tooling project | Home/project listing/detail |
| Project context | Sustainable frontend teams need more than components; they need guardrails, observability, and repeatable workflows that reduce delivery friction. | none | Project context | Developer tooling project | Detail page Problem |
| Project role | Built Node.js automation, Storybook documentation, Lighthouse audit workflows, and testing standards across frontend applications. | none | Role | Developer tooling project | Detail page My Role fallback |
| Project problem | Frontend delivery needed repeatable guardrails for quality, documentation, performance, and developer workflow speed. | none | Problem | Developer tooling project | Detail page Problem |
| Project constraints | The work had to improve team confidence without creating process overhead or slowing product delivery. | none | Constraints | Developer tooling project | Detail page Constraints |
| Project decision | Built internal Node.js CLI automation to remove repeated development tasks. | none | Decision | Developer tooling project | Detail page Decisions |
| Project decision | Documented reusable UI components with Storybook and improved testing standards with Jest, Cypress, and CI coverage gates. | none | Decision | Developer tooling project | Detail page Decisions |
| Project decision | Used Lighthouse audit workflows to make performance checks part of the delivery system. | none | Decision | Developer tooling project | Detail page Decisions |
| Project impact | Improved developer experience with CLI automation, Storybook standards, Lighthouse workflows, and testing gates including a 30% coverage increase at 99.co. | none | Impact | Developer tooling project | Cards and detail page |
| Project role details | Built and connected the tooling, documentation, testing, and performance practices that made frontend work easier to operate. | none | Role detail | Developer tooling project | Detail page My Role |
| Project metric | 30% test coverage increase at 99.co | none | Evidence | Developer tooling project | Detail page Evidence |
| Project metric | 75% minimum coverage gate in CI | none | Evidence | Developer tooling project | Detail page Evidence |
| Project metric | Automated Lighthouse audit workflows | none | Evidence | Developer tooling project | Detail page Evidence |
| Project highlight | Built internal CLI tools with Node.js to automate repeated development tasks. | none | Highlight | Developer tooling project | Detail fallback |
| Project highlight | Used Storybook to document reusable UI components and improve design consistency. | none | Highlight | Developer tooling project | Detail fallback |
| Project highlight | Set up Cypress and CI coverage gates to catch regressions earlier in the delivery lifecycle. | none | Highlight | Developer tooling project | Detail fallback |
| Project tags | Node.js, Storybook, Cypress, Jest, CI/CD, Developer Experience | none | Technologies | Developer tooling project | Detail page Stack |
| Project detail nav | Back to Case Studies | /projects | Action | Project detail | Detail page top and bottom |
| Project detail label | Case Study | none | Label | Project detail | Detail page header |
| Detail section | Problem | none | H2 | Project detail | Detail content |
| Detail section | Constraints | none | H2 | Project detail | Detail content |
| Detail section | My Role | none | H2 | Project detail | Detail content |
| Detail section | Decisions | none | H2 | Project detail | Detail content |
| Detail section | Impact | none | H2 | Project detail | Detail content |
| Detail aside | Evidence | none | H2 | Project detail | Detail aside |
| Detail aside | Stack | none | H2 | Project detail | Detail aside |
| Work page headline | Work & Experience | none | H2 | Work page | Work page header |
| Work page description | A snapshot of the roles that shaped how I think about building reliable, scalable, and user-centric applications. | none | Paragraph | Work page | Work page header |
| About page title | About | none | H1 | About page | About header |
| About paragraph | I'm a senior platform engineer based in Singapore. Over the last 10+ years, I've worked across payments, eKYC, property, e-commerce, enterprise platforms, and developer tooling. | none | Paragraph | About | About content |
| About paragraph | My strongest work sits where product value and engineering quality meet: faster checkout flows, cleaner frontend architecture, reliable testing practices, shared component systems, and tools that help teams move with more confidence. | none | Paragraph | About | About content |
| About paragraph | I care about systems that hold up after launch. That means clear boundaries, practical documentation, measurable performance work, and code that the next engineer can understand without archaeology. | none | Paragraph | About | About content |
| About section | Certifications | none | H2 | About certifications | About content |
| About certification description | Recent AI and cloud credentials that support the Applied AI and platform direction. | none | Paragraph | About certifications | About content |
| About certification | Architecting Agentic AI Solutions | none | Certification title | NUS | About certifications |
| About certification issuer | National University of Singapore | none | Certification issuer | NUS | About certifications |
| About certification date | Issued Mar 2026 | none | Certification date | NUS | About certifications |
| About certification | Deploying and Operating AI Solutions - LLMOps | none | Certification title | NUS | About certifications |
| About certification issuer | National University of Singapore | none | Certification issuer | NUS | About certifications |
| About certification date | Issued Mar 2026 | none | Certification date | NUS | About certifications |
| About certification | AWS Certified AI Practitioner | none | Certification title | AWS | About certifications |
| About certification issuer | Amazon Web Services | none | Certification issuer | AWS | About certifications |
| About certification date | Issued Jan 2026 - Expires Jan 2029 | none | Certification date | AWS | About certifications |
| About certification | AWS Certified Solutions Architect - Associate | none | Certification title | AWS | About certifications |
| About certification issuer | Amazon Web Services | none | Certification issuer | AWS | About certifications |
| About certification date | Issued Mar 2026 - Expires Mar 2029 | none | Certification date | AWS | About certifications |
| About certification action | Verify on LinkedIn | https://sg.linkedin.com/in/rakesh-cheekatimala?trk=public_post_feed-actor-name | Action | Certifications | About certifications |
| About connect section | Let's Connect | none | H2 | About contact | About content |
| About connect paragraph | Interested in senior frontend platform work, architecture, payments, eKYC, or developer tooling? LinkedIn is the best place to start. | none | Paragraph | About contact | About content |
| About link | LinkedIn | https://www.linkedin.com/in/rakesh-cheekatimala/ | Action | About contact | About content |
| About link | GitHub | https://github.com/rakeshcheekatimala | Action | About contact | About content |
| About section | Based in Singapore | none | H2 | Location | About content |
| About location paragraph | A small geographic note for context, kept here rather than on the hiring-focused homepage. | none | Paragraph | Location | About content |
| Location fallback | Map unavailable - add NEXT_PUBLIC_MAPBOX_TOKEN to .env | none | UI state | Location | About content |
| Location dynamic text | I'm from Singapore, roughly [distance]km away from your current location, according to your IP address. | none | Dynamic paragraph | Location | About content |
| Chat title | Ask My Agent | none | Modal title | Chat | Modal |
| Chat subtitle | Hiring-focused answers about Rakesh's work | none | Modal subtitle | Chat | Modal |
| Chat empty state | Ask a focused hiring question. | none | Modal paragraph | Chat | Modal |
| Chat empty state | I can summarize Rakesh's experience, impact, case studies, and team fit. | none | Modal paragraph | Chat | Modal |
| Chat starter | Summarize Rakesh's frontend platform impact | none | Button | Chat | Modal |
| Chat starter | Which teams would Rakesh fit best? | none | Button | Chat | Modal |
| Chat starter | Show his payments and eKYC proof | none | Button | Chat | Modal |
| Chat starter | What delivery risks can he reduce? | none | Button | Chat | Modal |
| Chat input placeholder | Ask about Rakesh's fit, impact, or case studies... | none | Placeholder | Chat | Modal |
| Chat helper | Press Enter to send - Shift+Enter for new line - Esc to close | none | Helper text | Chat | Modal |
| Blog article | AI for Frontend: Practical Experiments | /blog/ai-for-frontend | Article title | Blog | Blog index/detail |
| Blog article date | 2025-06-10 | none | Date | Blog | Blog index/detail |
| Blog article excerpt | A hands-on look at simple AI integrations that improve UX and DX. | none | Excerpt | Blog | Blog index/detail |
| Blog article body | Full MDX body in content/blog/ai-for-frontend.mdx is locked and preserved unchanged. | none | Article body | Blog | Blog detail |
| Blog article | Designing delightful developer experiences | /blog/designing-developer-experiences | Article title | Blog | Blog index/detail |
| Blog article date | 2025-01-01 | none | Date | Blog | Blog index/detail |
| Blog article excerpt | Thoughts on how to craft interfaces and docs that respect developers' time and focus. | none | Excerpt | Blog | Blog index/detail |
| Blog article body | Full MDX body in content/blog/designing-developer-experiences.mdx is locked and preserved unchanged. | none | Article body | Blog | Blog detail |
| Blog article | Testing patterns that scale | /blog/testing-patterns | Article title | Blog | Blog index/detail |
| Blog article date | 2024-12-20 | none | Date | Blog | Blog index/detail |
| Blog article excerpt | A collection of testing strategies and patterns for modern apps. | none | Excerpt | Blog | Blog index/detail |
| Blog article body | Full MDX body in content/blog/testing-patterns.mdx is locked and preserved unchanged. | none | Article body | Blog | Blog detail |
| Blog article | Why uv is a Game-Changer for Python Development | /blog/uv-python-package-manager | Article title | Blog | Blog index/detail |
| Blog article date | 2025-12-06 | none | Date | Blog | Blog index/detail |
| Blog article excerpt | Exploring uv, the blazingly fast Python package manager and resolver that's reshaping how we manage dependencies. | none | Excerpt | Blog | Blog index/detail |
| Blog article body | Full MDX body in content/blog/uv.mdx is locked and preserved unchanged. | https://github.com/astral-sh/uv | Article body | Blog detail |
| Footer section | Site | none | Footer heading | Footer | Footer |
| Footer link | Home | / | Footer nav | Footer | Footer |
| Footer link | Work | /work | Footer nav | Footer | Footer |
| Footer link | Case Studies | /projects | Footer nav | Footer | Footer |
| Footer link | About | /about | Footer nav | Footer | Footer |
| Footer section | Social | none | Footer heading | Footer | Footer |
| Footer section | Writing | none | Footer heading | Footer | Footer |
| Footer text | Notes on frontend architecture, testing, AI experiments, and developer experience. | none | Paragraph | Footer writing | Footer |
| Footer link | Read on Substack | https://rakeshcheekatimala.substack.com | Action | Footer writing | Footer |
| Footer copyright | © [current year] - Built with Next.js and Tailwind. | none | Dynamic text | Footer | Footer |

Experience content is stored as structured data in experiences/index.ts and remains mapped one role at a time in the Work & Experience timeline. The role-to-company mappings are preserved:

- Senior Software Engineer, Singtel, Nov 2021 - Present, Singapore.
- Senior Frontend Engineer, 99.co, Jun 2021 - Oct 2021, Singapore.
- Software Engineer, Capita, Jun 2020 - Jun 2021, Singapore.
- Software Design Engineer, ITCAN, Mar 2019 - May 2020, Singapore.
- FullStack Developer, VISEO, Aug 2017 - Feb 2019, Singapore.
- Senior Software Engineer, Comtel, Nov 2015 - Aug 2017, Singapore.
- Software Engineer, Persistent Systems, Jan 2013 - Mar 2015, India.

All summaries, highlights, and tags for those roles remain in experiences/index.ts and are rendered under their original role/company/date.

## Proposed Sitemap

- /: Home
- /work: Work & Experience
- /projects: Case Studies
- /projects/payments-performance-modernization: Payments Performance Modernization
- /projects/ekyc-micro-frontend-platform: eKYC Micro-Frontend Platform
- /projects/developer-tooling-quality-system: Developer Tooling & Quality System
- /about: About
- /blog: Blog
- /blog/[slug]: Blog detail

## Redesigned Information Architecture

- Header: persistent navigation using existing labels only.
- Home: hero, proof metrics, value pillars, project previews, hiring CTA.
- Projects: editorial heading followed by project cards.
- Project detail: article-style header, main content sections, sticky evidence and stack rail.
- Work: structured career timeline using existing role data.
- About: paragraph cards, certifications, contact, location.
- Footer: existing Site, Social, Writing groups.

## Page-by-Page Layout

- Home desktop: two-column hero with copy/actions and metric grid; value cards; project cards; lighter hiring CTA.
- Home mobile: single-column hero, metric cards, value cards, project cards, CTA actions stacked.
- Projects desktop: wide editorial header and three-card grid.
- Projects mobile: single-column cards with preserved project titles/descriptions.
- Detail desktop: header card, content column, sticky aside for Evidence and Stack.
- Detail mobile: single-column article sections, aside content moves below.
- Work desktop: numbered role cards with date rail.
- Work mobile: role cards stacked with date metadata above each role.
- About desktop: readable card stack with certification grid.
- About mobile: stacked paragraphs, certification cards, contact buttons, location module.

## Design System

Typography:

- Display: Geist, Manrope, Space Grotesk or system fallback; heavy weight, tight hierarchy, controlled line-height.
- Body: Geist, Inter or system fallback; regular/medium weights, comfortable line-height.
- Metadata: uppercase labels using existing text only; no excessive monospace.

Color:

- Neutral foundation: #0A0403 from the Burnt Sienna theme.
- Elevated surface: #150A06.
- Primary text: #F4F4F5.
- Secondary text: #C49B84.
- Primary accent: #FF8435.
- Supporting accent: #FF9E73.
- Line: #2E201A.

Spacing and layout:

- Max page width: 80rem where broad scanning is useful.
- Reading width: approximately 48-64rem for paragraphs and detail content.
- Section spacing: 4rem desktop rhythm, tighter on mobile.
- Cards: controlled 12px-16px radius, thin border, soft depth.
- Grid: responsive two/three-column layouts with single-column mobile collapse.

Components:

- Header, mobile menu, footer.
- Hero section.
- Metric cards.
- Value pillar cards.
- Project cards.
- Project detail article sections.
- Evidence rail.
- Stack tags.
- Experience timeline cards.
- About cards.
- Certification cards.
- Chat modal and trigger.
- Location banner.

## Interaction and Motion Specifications

- Hover: small translate and border/accent feedback on cards and buttons.
- Section reveal: short opacity/translate reveal with reduced-motion opt-out.
- Navigation: hover/focus states on nav pills and mobile links.
- Buttons: visible focus rings and minimum touch target sizing.
- No scroll hijacking, no long transitions, no continuous background animation.

## Accessibility Checklist

- Semantic headings preserved by page.
- Links and buttons use correct elements.
- Mobile menu button has aria-label and aria-expanded.
- Focus states are visible.
- Color contrast issue from global color overrides was fixed by allowing utility classes to control foreground colors.
- Reduced-motion media query is present.
- Image alt text for the header profile image remains "Rakesh Cheekatimala".
- Important text remains real text, not embedded in images.

## Performance Strategy

- Keep the redesign primarily server-rendered.
- Avoid adding heavy animation libraries.
- Use CSS transitions instead of JS-driven motion.
- Continue Next.js image optimization for the profile image.
- Keep project cards and content data static.
- Preserve route-level code splitting.
- Monitor Mapbox only on the About location component where already present.

## Design Decisions

- Warm editorial background: improves visual distinction and supports a mature product-engineering feel without adding decorative blobs.
- Card-based project presentation: improves scanning and preserves project text in its original context.
- Sticky evidence rail on project detail pages: makes metrics easier to inspect without rewriting them.
- Timeline card system: preserves exact experience data while improving hierarchy and mobile readability.
- Lighter hiring CTA: fixes contrast and reduces the overly heavy dark block shown in review.
- Global color override removal: improves accessibility and prevents text color bugs on dark/light surfaces.
- Duplicate proof strip removal: preserves all proof metrics once and avoids accidental duplication.

## Implementation Structure

- app/globals.css: design tokens, focus states, motion/reduced-motion support.
- components/Header.tsx: persistent navigation and mobile menu.
- app/page.tsx: homepage layout.
- components/Card.tsx and app/projects/*: project presentation.
- components/ExperienceTimeline.tsx and app/work/page.tsx: experience presentation.
- app/about/page.tsx: about, certifications, contact, location.
- components/Footer.tsx: footer presentation.

## Final Validation Checklist

- Original content is preserved in source data and page components.
- No project metrics were changed.
- No project narratives were invented.
- No experience role/company/date relationships were merged or reassigned.
- No links were intentionally removed.
- Duplicate proof metric presentation was removed.
- Contrast bug in the hiring CTA was fixed.
- Keyboard focus states are visible.
- Reduced-motion preferences are respected.
