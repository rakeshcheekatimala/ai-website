import { openai } from '@ai-sdk/openai'
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type UIMessage,
} from 'ai'
import { NextRequest } from 'next/server'
import { experiences } from '../../../experiences'
import { mockProjects } from '../../../lib/projects'

// Simple in-memory rate limiter: max 10 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10
const WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

const summaryText = `Rakesh Cheekatimala is a Singapore-based Senior Frontend Platform Engineer with 10+ years of experience across payments, eKYC, property, e-commerce, enterprise platforms, and developer tooling.

Positioning:
• Builds revenue-critical frontend systems that teams can trust
• Strong in React, TypeScript, frontend architecture, performance, testing, CI/CD, Storybook, and developer tooling
• Connects engineering decisions to business outcomes, especially in payments, onboarding, and platform work

Selected impact:
• Reduced a payments application bundle size by 60% through lazy loading and frontend refactoring
• Contributed to new payment methods that helped drive a 25% sales lift
• Built save-card capability that helped drive an additional 3% sales lift
• Designed a React and Rollup micro-frontend solution for eKYC registration, verification, and outcome flows
• Improved test automation coverage by 30% at 99.co
• Built internal Node.js CLI tooling, Storybook documentation, Cypress workflows, Lighthouse audit practices, and CI quality gates

Open Source Contributions:
• Delete Duplicate Rows in Excel — https://github.com/rakeshcheekatimala/delete_duplicate_rows_excel
• Open Hangouts — https://github.com/rakeshcheekatimala/openHangouts
• React Boilerplate — https://github.com/rakeshcheekatimala/react-boiler-plate

Writing:
• Writes about frontend architecture, testing, developer experience, and practical AI experiments`

function buildExperienceContext(): string {
  return experiences
    .map((exp) => {
      const highlights = exp.highlights.map((h) => `  - ${h}`).join('\n')
      const tags = exp.tags.join(', ')
      return `${exp.role} at ${exp.company} (${exp.start} – ${exp.end})${exp.location ? `, ${exp.location}` : ''}
Summary: ${exp.summary}
Highlights:
${highlights}
Technologies: ${tags}`
    })
    .join('\n\n')
}

function buildProjectContext(): string {
  return mockProjects
    .map((project) => {
      const metrics = project.metrics?.map((metric) => `  - ${metric}`).join('\n') ?? '  - Not specified'
      const highlights = project.highlights?.map((highlight) => `  - ${highlight}`).join('\n') ?? '  - Not specified'
      const tags = project.tags?.join(', ') ?? 'Not specified'
      return `${project.title}
Summary: ${project.summary}
Outcome: ${project.outcome ?? 'Not specified'}
Context: ${project.context ?? 'Not specified'}
Role: ${project.role ?? 'Not specified'}
Metrics:
${metrics}
Highlights:
${highlights}
Technologies: ${tags}`
    })
    .join('\n\n')
}

const systemPrompt = `You are Rakesh Cheekatimala's personal AI assistant on his portfolio website. Your job is to answer questions about Rakesh's professional background, skills, work experience, case studies, and projects. Be concise, friendly, and professional. Speak in third person about Rakesh (e.g. "Rakesh has worked at...").

When someone asks why Rakesh is valuable, connect his work to business outcomes: revenue-critical frontend systems, payments performance, eKYC architecture, testing quality, developer tooling, and team velocity.

If asked something unrelated to Rakesh's professional background, politely redirect the conversation back to topics you can help with.

Do not invent employers, credentials, private client details, or metrics. If the answer is not in the context below, say what you can verify and suggest asking Rakesh directly for the missing detail.

--- ABOUT RAKESH ---
${summaryText}

--- WORK EXPERIENCE ---
${buildExperienceContext()}

--- CASE STUDIES ---
${buildProjectContext()}`

export async function POST(req: NextRequest) {
  // Fail fast if the key is missing (misconfigured deployment)
  if (!process.env.OPENAI_API_KEY) {
    return new Response('Service unavailable', { status: 503 })
  }

  // Rate limit by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  if (isRateLimited(ip)) {
    return new Response('Too many requests. Please wait a moment.', { status: 429 })
  }

  const { messages }: { messages: UIMessage[] } = await req.json()

  // Clamp history to last 20 messages to cap token usage
  const recentMessages = messages.slice(-20)

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const result = streamText({
        model: openai('gpt-4o-mini'),
        system: systemPrompt,
        messages: await convertToModelMessages(recentMessages),
      })
      writer.merge(result.toUIMessageStream())
    },
    onError: () => 'An error occurred. Please try again.',
  })

  return createUIMessageStreamResponse({ stream })
}
