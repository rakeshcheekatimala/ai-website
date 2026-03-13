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

  const points: [number, number][] = []
  for (let i = 0; i <= numPoints; i++) {
    const f = i / numPoints
    const A = Math.sin((1 - f) * Math.PI) / Math.sin(Math.PI)
    const B = Math.sin(f * Math.PI) / Math.sin(Math.PI)
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

function PulsingDot({ color }: { color: string }) {
  const el = document.createElement('div')
  el.style.cssText = `
    width: 16px; height: 16px; position: relative;
  `
  el.innerHTML = `
    <style>
      @keyframes pulse-ring {
        0% { transform: scale(0.5); opacity: 0.8; }
        100% { transform: scale(2.5); opacity: 0; }
      }
    </style>
    <div style="
      width:16px; height:16px; border-radius:50%;
      background:${color}; position:absolute; top:0; left:0;
    "></div>
    <div style="
      width:16px; height:16px; border-radius:50%;
      background:${color}; position:absolute; top:0; left:0;
      animation: pulse-ring 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      opacity:0.6;
    "></div>
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

    // Calculate midpoint for center
    const midLon = (SINGAPORE[0] + userCoords[0]) / 2
    const midLat = (SINGAPORE[1] + userCoords[1]) / 2

    // Calculate angular distance to determine zoom
    const dLon = Math.abs(SINGAPORE[0] - userCoords[0])
    const dLat = Math.abs(SINGAPORE[1] - userCoords[1])
    const maxSpan = Math.max(dLon, dLat)
    // Zoom: further apart → lower zoom. Clamp between 1 and 4
    const zoom = Math.max(1, Math.min(4, 6 - Math.log2(maxSpan + 1)))

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [midLon, midLat],
      zoom,
      interactive: false,
      attributionControl: false,
    })

    map.current.on('load', () => {
      if (!map.current) return

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
          'line-color': '#f43f5e',
          'line-width': 6,
          'line-blur': 8,
          'line-opacity': 0.4,
        },
      })

      // Main dashed line
      map.current.addLayer({
        id: 'arc-dash',
        type: 'line',
        source: 'arc',
        paint: {
          'line-color': '#f43f5e',
          'line-width': 2.5,
          'line-dasharray': [4, 4],
        },
      })

      // Singapore marker (origin)
      const sgEl = PulsingDot({ color: '#f43f5e' })
      new mapboxgl.Marker({ element: sgEl, anchor: 'center' })
        .setLngLat(SINGAPORE)
        .addTo(map.current)

      // User location marker
      const userEl = document.createElement('div')
      userEl.innerHTML = `
        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.268 0 0 6.268 0 14C0 24.5 14 36 14 36C14 36 28 24.5 28 14C28 6.268 21.732 0 14 0Z" fill="#94a3b8"/>
          <circle cx="14" cy="14" r="5" fill="white"/>
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
          <p className="text-slate-600 text-sm">Map unavailable — add NEXT_PUBLIC_MAPBOX_TOKEN to .env</p>
        </div>
      )}

      {/* Text section */}
      <div className="px-8 py-7 text-center border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <p className="text-slate-200 text-lg leading-relaxed">
          I&apos;m from{' '}
          <span className="text-white font-semibold">Singapore</span>, roughly{' '}
          <span className="text-rose-400 font-bold font-mono">
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
