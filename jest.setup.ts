import '@testing-library/jest-dom'

// Polyfill for Next.js API routes
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// Mock fetch globally
global.fetch = jest.fn()

// Mock scrollIntoView (not available in jsdom) - only for jsdom environment
if (typeof Element !== 'undefined') {
  Element.prototype.scrollIntoView = jest.fn()
}
