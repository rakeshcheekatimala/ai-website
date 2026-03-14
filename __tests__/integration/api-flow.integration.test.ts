/**
 * @jest-environment node
 */

/**
 * Integration test for API flow
 * Tests the interaction between multiple API endpoints
 */
import { NextRequest } from 'next/server'
import { GET as getGeolocation } from '../../app/api/geolocation/route'
import { GET as getPosts } from '../../app/api/posts/route'
import { GET as getHello } from '../../app/api/hello/route'

// Mock dependencies
jest.mock('../../lib/mock-data', () => ({
  getMockPosts: jest.fn().mockResolvedValue([
    {
      title: 'Test Post',
      slug: 'test-post',
      excerpt: 'Test excerpt',
      content: '',
      date: '2024-01-01',
    },
  ]),
}))

describe('API Integration Flow', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
    jest.spyOn(console, 'log').mockImplementation()
    jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('all API endpoints return valid JSON responses', async () => {
    // Test hello endpoint
    const helloResponse = await getHello()
    const helloData = await helloResponse.json()
    expect(helloData).toHaveProperty('message')
    expect(typeof helloData.message).toBe('string')

    // Test posts endpoint
    const postsResponse = await getPosts()
    const postsData = await postsResponse.json()
    expect(postsData).toHaveProperty('posts')
    expect(Array.isArray(postsData.posts)).toBe(true)

    // Test geolocation endpoint with localhost
    const geoRequest = {
      headers: new Headers({ 'x-forwarded-for': '127.0.0.1' }),
    } as NextRequest
    const geoResponse = await getGeolocation(geoRequest)
    const geoData = await geoResponse.json()
    expect(geoData).toHaveProperty('distance')
    expect(geoData).toHaveProperty('city')
    expect(geoData).toHaveProperty('country')
  })

  it('API endpoints return correct status codes', async () => {
    const helloResponse = await getHello()
    expect(helloResponse.status).toBe(200)

    const postsResponse = await getPosts()
    expect(postsResponse.status).toBe(200)

    const geoRequest = {
      headers: new Headers({ 'x-forwarded-for': '127.0.0.1' }),
    } as NextRequest
    const geoResponse = await getGeolocation(geoRequest)
    expect(geoResponse.status).toBe(200)
  })

  it('geolocation API handles various IP formats', async () => {
    const testIPs = ['127.0.0.1', '::1', '8.8.8.8']

    for (const ip of testIPs) {
      if (ip === '8.8.8.8') {
        ;(global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            status: 'success',
            lat: 37.4056,
            lon: -122.0775,
            city: 'Mountain View',
            country: 'United States',
            timezone: 'America/Los_Angeles',
          }),
        })
      }

      const request = {
        headers: new Headers({ 'x-forwarded-for': ip }),
      } as NextRequest

      const response = await getGeolocation(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('distance')
      expect(data).toHaveProperty('latitude')
      expect(data).toHaveProperty('longitude')
      expect(typeof data.distance).toBe('number')
    }
  })

  it('posts API returns structured data', async () => {
    const response = await getPosts()
    const data = await response.json()

    expect(data.posts).toHaveLength(1)
    const post = data.posts[0]
    expect(post).toHaveProperty('title')
    expect(post).toHaveProperty('slug')
    expect(post).toHaveProperty('excerpt')
    expect(post).toHaveProperty('date')
    expect(typeof post.title).toBe('string')
    expect(typeof post.slug).toBe('string')
  })
})
