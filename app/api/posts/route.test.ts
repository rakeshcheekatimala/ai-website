/**
 * @jest-environment node
 */
import { GET } from './route'

// Mock getMockPosts
jest.mock('../../../lib/mock-data', () => ({
  getMockPosts: jest.fn().mockResolvedValue([
    {
      title: 'Test Post 1',
      slug: 'test-post-1',
      excerpt: 'Test excerpt 1',
      content: '',
      date: '2024-01-01',
    },
    {
      title: 'Test Post 2',
      slug: 'test-post-2',
      excerpt: 'Test excerpt 2',
      content: '',
      date: '2024-02-01',
    },
  ]),
}))

describe('GET /api/posts', () => {
  it('returns posts in JSON format', async () => {
    const response = await GET()
    const data = await response.json()

    expect(data).toHaveProperty('posts')
    expect(Array.isArray(data.posts)).toBe(true)
    expect(data.posts).toHaveLength(2)
  })

  it('returns posts with correct structure', async () => {
    const response = await GET()
    const data = await response.json()

    expect(data.posts[0]).toHaveProperty('title')
    expect(data.posts[0]).toHaveProperty('slug')
    expect(data.posts[0]).toHaveProperty('excerpt')
    expect(data.posts[0]).toHaveProperty('date')
  })

  it('returns 200 status code', async () => {
    const response = await GET()
    expect(response.status).toBe(200)
  })
})
