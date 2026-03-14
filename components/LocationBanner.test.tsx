import { render, screen, waitFor } from '@testing-library/react'
import LocationBanner from './LocationBanner'

// Mock mapbox-gl
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
    addSource: jest.fn(),
    addLayer: jest.fn(),
    fitBounds: jest.fn(),
    remove: jest.fn(),
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
  })),
  accessToken: '',
}))

// Mock mapbox-gl CSS
jest.mock('mapbox-gl/dist/mapbox-gl.css', () => ({}))

// Store original env
const originalEnv = process.env

// Mock the module to control MAPBOX_TOKEN
jest.mock('mapbox-gl', () => {
  const actualMapbox = jest.requireActual('mapbox-gl')
  return {
    ...actualMapbox,
    Map: jest.fn(() => ({
      on: jest.fn(),
      addSource: jest.fn(),
      addLayer: jest.fn(),
      fitBounds: jest.fn(),
      remove: jest.fn(),
    })),
    Marker: jest.fn(() => ({
      setLngLat: jest.fn().mockReturnThis(),
      addTo: jest.fn().mockReturnThis(),
    })),
    accessToken: '',
  }
})

beforeEach(() => {
  process.env = { ...originalEnv, NEXT_PUBLIC_MAPBOX_TOKEN: 'test-token' }
})

afterEach(() => {
  process.env = originalEnv
})

describe('LocationBanner', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('shows loading state initially', () => {
    ;(global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}))
    
    render(<LocationBanner />)
    
    const loadingElement = document.querySelector('.animate-pulse')
    expect(loadingElement).toBeInTheDocument()
  })

  it('renders location data after successful fetch', async () => {
    const mockLocationData = {
      distance: 1234,
      city: 'New York',
      country: 'USA',
      timezone: 'America/New_York',
      latitude: 40.7128,
      longitude: -74.0060,
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockLocationData,
    })

    render(<LocationBanner />)

    await waitFor(() => {
      expect(screen.getByText(/1,234km/)).toBeInTheDocument()
    })

    expect(screen.getByText(/Singapore/)).toBeInTheDocument()
  })

  it('renders nothing when fetch returns error', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ error: 'Failed to get location' }),
    })

    const { container } = render(<LocationBanner />)

    await waitFor(() => {
      expect(container.firstChild).toBeNull()
    })
  })

  it('renders nothing when fetch fails', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    const { container } = render(<LocationBanner />)

    await waitFor(() => {
      expect(container.firstChild).toBeNull()
    })
  })

  it('renders the banner with location info', async () => {
    const mockLocationData = {
      distance: 1234,
      city: 'New York',
      country: 'USA',
      timezone: 'America/New_York',
      latitude: 40.7128,
      longitude: -74.0060,
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockLocationData,
    })

    render(<LocationBanner />)

    await waitFor(() => {
      expect(screen.getByText(/1,234km/)).toBeInTheDocument()
    })
    
    expect(screen.getByText(/Singapore/)).toBeInTheDocument()
    expect(screen.getByText(/away from your current location/)).toBeInTheDocument()
  })
})
