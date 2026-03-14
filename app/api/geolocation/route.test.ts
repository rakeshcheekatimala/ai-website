/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET } from './route'

describe('GET /api/geolocation', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
    jest.spyOn(console, 'log').mockImplementation()
    jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns mock location for localhost IPv6', async () => {
    const mockRequest = {
      headers: new Headers({ 'x-forwarded-for': '::1' }),
    } as NextRequest

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(data.city).toBe('Hyderabad')
    expect(data.country).toBe('India')
    expect(data.distance).toBeGreaterThan(0)
    expect(data.latitude).toBe(17.3850)
    expect(data.longitude).toBe(78.4867)
  })

  it('returns mock location for localhost IPv4', async () => {
    const mockRequest = {
      headers: new Headers({ 'x-forwarded-for': '127.0.0.1' }),
    } as NextRequest

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(data.city).toBe('Hyderabad')
    expect(data.country).toBe('India')
  })

  it('fetches real location from ip-api.com for non-localhost IP', async () => {
    const mockRequest = {
      headers: new Headers({ 'x-forwarded-for': '8.8.8.8' }),
    } as NextRequest

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

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('ip-api.com/json/8.8.8.8'),
      expect.any(Object)
    )
    expect(data.city).toBe('Mountain View')
    expect(data.country).toBe('United States')
    expect(data.latitude).toBe(37.4056)
    expect(data.longitude).toBe(-122.0775)
  })

  it('falls back to mock location when ip-api.com fails', async () => {
    const mockRequest = {
      headers: new Headers({ 'x-forwarded-for': '8.8.8.8' }),
    } as NextRequest

    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(data.city).toBe('Hyderabad')
    expect(data.country).toBe('India')
  })

  it('calculates distance correctly', async () => {
    const mockRequest = {
      headers: new Headers({ 'x-forwarded-for': '::1' }),
    } as NextRequest

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(typeof data.distance).toBe('number')
    expect(data.distance).toBeGreaterThan(0)
  })

  it('returns 400 when location data is invalid', async () => {
    const mockRequest = {
      headers: new Headers({ 'x-forwarded-for': '8.8.8.8' }),
    } as NextRequest

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'success',
        lat: null,
        lon: null,
      }),
    })

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Could not determine location')
  })

  it('uses x-real-ip header when x-forwarded-for is not present', async () => {
    const mockRequest = {
      headers: new Headers({ 'x-real-ip': '1.2.3.4' }),
    } as NextRequest

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'success',
        lat: 1.0,
        lon: 2.0,
        city: 'Test City',
        country: 'Test Country',
        timezone: 'UTC',
      }),
    })

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('1.2.3.4'),
      expect.any(Object)
    )
  })
})
