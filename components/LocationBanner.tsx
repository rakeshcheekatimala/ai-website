'use client'
import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface LocationData {
  distance: number
  city: string
  country: string
  timezone: string
}

// Set your Mapbox token here (get one from https://account.mapbox.com/)
// For now using a placeholder - users will need to add their own
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export default function LocationBanner() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        console.log('Fetching geolocation...')
        const response = await fetch('/api/geolocation')
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Geolocation data:', data)
        setLocation(data)
        // Assuming the API returns coordinates, or we'll fetch them
        setUserCoords([data.longitude || 0, data.latitude || 0])
      } catch (error) {
        console.error('Failed to fetch location:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch location')
      } finally {
        setLoading(false)
      }
    }

    fetchLocation()
  }, [])

  // Initialize map when location is loaded and token is available
  useEffect(() => {
    if (!location || !userCoords || !MAPBOX_TOKEN || !mapContainer.current) return

    if (map.current) return // Map already initialized

    mapboxgl.accessToken = MAPBOX_TOKEN

    const singaporeCoords: [number, number] = [103.8198, 1.3521]

    // Calculate bounds to show both locations
    const bounds = new mapboxgl.LngLatBounds(
      [Math.min(singaporeCoords[0], userCoords[0]) - 5, Math.min(singaporeCoords[1], userCoords[1]) - 5],
      [Math.max(singaporeCoords[0], userCoords[0]) + 5, Math.max(singaporeCoords[1], userCoords[1]) + 5]
    )

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      bounds: bounds,
      fitBoundsOptions: { padding: 100 }
    })

    map.current.on('load', () => {
      if (!map.current) return

      // Add a source for the line
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [singaporeCoords, userCoords]
          }
        }
      })

      // Add line layer
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#818CF8',
          'line-width': 2,
          'line-dasharray': [5, 5]
        }
      })

      // Add Singapore marker
      new mapboxgl.Marker({ color: '#6366F1' })
        .setLngLat(singaporeCoords)
        .addTo(map.current)

      // Add user location marker
      new mapboxgl.Marker({ color: '#A78BFA' })
        .setLngLat(userCoords)
        .addTo(map.current)
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [location, userCoords])

  if (loading) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center my-8">
        <p className="text-slate-500">Loading location...</p>
      </div>
    )
  }

  if (error || !location) {
    console.warn('Location error or missing:', error, location)
    return null
  }

  if (!MAPBOX_TOKEN) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center my-8">
        <p className="text-slate-300 text-lg">
          I'm from Singapore, roughly{' '}
          <span className="text-indigo-400 font-bold">{location.distance.toLocaleString()}km</span>{' '}
          away from your current location, according to your IP address.
        </p>
        <p className="text-slate-500 text-sm mt-3">
          Thanks to{' '}
          <a href="#" className="text-indigo-400 hover:text-indigo-300 hover:underline">
            Jane
          </a>{' '}
          for this whimsical idea!
        </p>
        <p className="text-slate-600 text-xs mt-4">
          Note: Add NEXT_PUBLIC_MAPBOX_TOKEN to .env to enable the map visualization
        </p>
      </div>
    )
  }

  return (
    <div className="my-8">
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="w-full h-96 rounded-lg border border-slate-800 overflow-hidden mb-6"
      />
      
      {/* Location Text */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 text-center">
        <p className="text-slate-300 text-lg">
          I'm from Singapore, roughly{' '}
          <span className="text-indigo-400 font-bold">{location.distance.toLocaleString()}km</span>{' '}
          away from your current location, according to your IP address.
        </p>
        <p className="text-slate-500 text-sm mt-3">
          Thanks to{' '}
          <a href="#" className="text-indigo-400 hover:text-indigo-300 hover:underline">
            Jane
          </a>{' '}
          for this whimsical idea!
        </p>
      </div>
    </div>
  )
}
