/**
 * @jest-environment node
 */
import { GET } from './route'

describe('GET /api/hello', () => {
  it('returns hello message', async () => {
    const response = await GET()
    const data = await response.json()

    expect(data).toHaveProperty('message')
    expect(typeof data.message).toBe('string')
  })

  it('returns 200 status code', async () => {
    const response = await GET()
    expect(response.status).toBe(200)
  })
})
