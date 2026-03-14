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

const summaryText = `I am a detail-oriented Software Engineer with a strong passion for building high-quality, scalable web applications. I approach software development with a design thinking mindset, focusing on creating intuitive user experiences while maintaining clean, maintainable, and modular code.

I enjoy solving complex engineering problems and continuously improving systems through best engineering practices, modern JavaScript frameworks, and agile methodologies. My development philosophy centers on building reusable components, writing reliable tests, and delivering production-ready applications that scale.

I have hands-on experience building modern frontend applications using JavaScript and TypeScript ecosystems, with a strong focus on performance, maintainability, and developer experience.

Core Technical Expertise:
• Developing modern web applications using React.js, Redux, Hooks
• Component-driven architecture with reusable and modular design patterns
• Styling solutions using Styled Components and SASS
• Writing robust unit tests using Jest and React Testing Library
• Implementing End-to-End testing with Cypress
• Building scalable applications using TypeScript
• Applying Agile methodologies and collaborative engineering practices

Open Source Contributions:
• Delete Duplicate Rows in Excel — https://github.com/rakeshcheekatimala/delete_duplicate_rows_excel
• Open Hangouts — https://github.com/rakeshcheekatimala/openHangouts
• React Boilerplate — https://github.com/rakeshcheekatimala/react-boiler-plate

I actively explore ways to contribute to the developer ecosystem and enjoy building tools that improve developer productivity.`

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

const systemPrompt = `You are Rakesh Cheekatimala's personal AI assistant on his portfolio website. Your job is to answer questions about Rakesh's professional background, skills, work experience, and projects. Be concise, friendly, and professional. Speak in third person about Rakesh (e.g. "Rakesh has worked at...").

If asked something unrelated to Rakesh's professional background, politely redirect the conversation back to topics you can help with.

--- ABOUT RAKESH ---
${summaryText}

--- WORK EXPERIENCE ---
${buildExperienceContext()}`

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
