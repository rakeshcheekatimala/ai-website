'use client'
import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface LocationData {
  distance: number
  city: string
  country: string
  timezone: string
  latitude: number
  longitude: number
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
const SINGAPORE: [number, number] = [103.8198, 1.3521]

function createGreatCircleArc(
  start: [number, number],
  end: [number, number],
  numPoints = 100
): [number, number][] {
  const toRad = (d: number) => (d * Math.PI) / 180
  const toDeg = (r: number) => (r * 180) / Math.PI

  const [lon1, lat1] = [toRad(start[0]), toRad(start[1])]
  const [lon2, lat2] = [toRad(end[0]), toRad(end[1])]

  // Angular distance between the two points
  const d = 2 * Math.asin(Math.sqrt(
    Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon2 - lon1) / 2), 2)
  ))

  const points: [number, number][] = []
  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints
    const A = Math.sin((1 - f) * d) / Math.sin(d)
    const B = Math.sin(f * d) / Math.sin(d)
    const x =
      A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2)
    const y =
      A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2)
    const z = A * Math.sin(lat1) + B * Math.sin(lat2)
    const lat = toDeg(Math.atan2(z, Math.sqrt(x * x + y * y)))
    const lon = toDeg(Math.atan2(y, x))
    points.push([lon, lat])
  }
  return points
}

function createAvatarMarker() {
  const el = document.createElement('div')
  el.style.cssText = 'width: 40px; height: 52px; cursor: default;'
  el.innerHTML = `
    <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <rect x="12" y="24" width="16" height="14" rx="3" fill="#F5C842"/>
      <!-- Head -->
      <rect x="11" y="10" width="18" height="16" rx="5" fill="#F5C842"/>
      <!-- Eyes -->
      <rect x="14" y="15" width="4" height="4" rx="1" fill="#1a1a2e"/>
      <rect x="22" y="15" width="4" height="4" rx="1" fill="#1a1a2e"/>
      <!-- Smile -->
      <path d="M15 22 Q20 26 25 22" stroke="#1a1a2e" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- Legs -->
      <rect x="13" y="37" width="6" height="10" rx="2" fill="#3b4a6b"/>
      <rect x="21" y="37" width="6" height="10" rx="2" fill="#3b4a6b"/>
      <!-- Arms -->
      <rect x="4" y="24" width="8" height="5" rx="2" fill="#F5C842"/>
      <rect x="28" y="24" width="8" height="5" rx="2" fill="#F5C842"/>
    </svg>
  `
  return el
}

export default function LocationBanner() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(true)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    fetch('/api/geolocation')
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setLocation(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!location || !MAPBOX_TOKEN || !mapContainer.current) return
    if (map.current) return

    const userCoords: [number, number] = [location.longitude, location.latitude]

    mapboxgl.accessToken = MAPBOX_TOKEN

    // Calculate midpoint for initial center
    const midLon = (SINGAPORE[0] + userCoords[0]) / 2
    const midLat = (SINGAPORE[1] + userCoords[1]) / 2

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [midLon, midLat],
      zoom: 1,
      interactive: false,
      attributionControl: true,
    })

    map.current.on('load', () => {
      if (!map.current) return

      // Fit map to show both points with padding
      const minLon = Math.min(SINGAPORE[0], userCoords[0])
      const maxLon = Math.max(SINGAPORE[0], userCoords[0])
      const minLat = Math.min(SINGAPORE[1], userCoords[1])
      const maxLat = Math.max(SINGAPORE[1], userCoords[1])
      map.current.fitBounds(
        [[minLon, minLat], [maxLon, maxLat]],
        { padding: { top: 60, bottom: 60, left: 80, right: 80 }, maxZoom: 4, duration: 0 }
      )

      const arcCoords = createGreatCircleArc(SINGAPORE, userCoords, 120)

      map.current.addSource('arc', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: arcCoords },
        },
      })

      // Glow layer underneath
      map.current.addLayer({
        id: 'arc-glow',
        type: 'line',
        source: 'arc',
        paint: {
          'line-color': '#ef4444',
          'line-width': 6,
          'line-blur': 8,
          'line-opacity': 0.35,
        },
      })

      // Main dashed red line
      map.current.addLayer({
        id: 'arc-dash',
        type: 'line',
        source: 'arc',
        paint: {
          'line-color': '#ef4444',
          'line-width': 2,
          'line-dasharray': [5, 4],
        },
      })

      // Singapore marker — avatar character
      const sgEl = createAvatarMarker()
      new mapboxgl.Marker({ element: sgEl, anchor: 'bottom' })
        .setLngLat(SINGAPORE)
        .addTo(map.current)

      // User location marker — white pin
      const userEl = document.createElement('div')
      userEl.innerHTML = `
        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.268 0 0 6.268 0 14C0 24.5 14 36 14 36C14 36 28 24.5 28 14C28 6.268 21.732 0 14 0Z" fill="white"/>
          <circle cx="14" cy="14" r="5" fill="#94a3b8"/>
        </svg>
      `
      new mapboxgl.Marker({ element: userEl, anchor: 'bottom' })
        .setLngLat(userCoords)
        .addTo(map.current)
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [location])

  if (loading) {
    return (
      <div className="rounded-2xl overflow-hidden border border-slate-800 my-8 animate-pulse bg-slate-900/60 h-80" />
    )
  }

  if (!location) return null

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
      {MAPBOX_TOKEN ? (
        <div ref={mapContainer} className="w-full h-80" />
      ) : (
        <div className="w-full h-80 bg-slate-900 flex items-center justify-center">
          <p className="text-slate-400 text-sm">Map unavailable — add NEXT_PUBLIC_MAPBOX_TOKEN to .env</p>
        </div>
      )}

      {/* Text section */}
      <div className="px-8 py-7 text-center border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <p className="text-slate-200 text-lg leading-relaxed">
          I&apos;m from{' '}
          <span className="text-white font-semibold">Singapore</span>, roughly{' '}
          <span className="text-teal-400 font-bold font-mono">
            {location.distance.toLocaleString()}km
          </span>{' '}
          away from your current location, according to your IP address.
        </p>
        <p className="text-slate-500 text-sm mt-3">
          Thanks to{' '}
          <a
            href="https://leerob.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 underline underline-offset-2 hover:text-slate-200 transition-colors"
          >
            Jane
          </a>{' '}
          for this whimsical idea!
        </p>
      </div>
    </div>
  )
}
