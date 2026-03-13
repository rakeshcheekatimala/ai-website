import { NextRequest, NextResponse } from 'next/server'

const SINGAPORE = { lat: 1.3521, lon: 103.8198 }

// Mock data for localhost/development
const MOCK_LOCATIONS: { [key: string]: any } = {
  '::1': { latitude: 17.3850, longitude: 78.4867, city: 'Hyderabad', country_name: 'India', timezone: 'Asia/Kolkata' },
  '127.0.0.1': { latitude: 17.3850, longitude: 78.4867, city: 'Hyderabad', country_name: 'India', timezone: 'Asia/Kolkata' }
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c)
}

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
               request.headers.get('x-real-ip') || 
               request.ip ||
               '0.0.0.0'
    
    console.log('Client IP:', ip)

    let geo = null

    // Use mock data for localhost
    if (ip in MOCK_LOCATIONS) {
      geo = MOCK_LOCATIONS[ip]
      console.log('Using mock location for localhost')
    } else {
      // Try ip-api.com (free tier, no API key needed, allows 45 requests/minute from single IP)
      try {
        const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,lat,lon,city,country,timezone`, {
          headers: { 'Accept': 'application/json' }
        })

        if (!geoResponse.ok) {
          throw new Error(`Geolocation API error: ${geoResponse.status}`)
        }

        const data = await geoResponse.json()

        if (data.status !== 'success') {
          throw new Error(`Geolocation lookup failed: ${data.message}`)
        }

        geo = {
          latitude: data.lat,
          longitude: data.lon,
          city: data.city,
          country_name: data.country,
          timezone: data.timezone
        }
      } catch (error) {
        console.error('ip-api.com error:', error)
        // Fallback: return mock location
        geo = MOCK_LOCATIONS['::1']
        console.log('Using fallback mock location')
      }
    }

    if (!geo || !geo.latitude || !geo.longitude) {
      return NextResponse.json({ 
        error: 'Could not determine location',
        ip: ip
      }, { status: 400 })
    }

    const distance = calculateDistance(SINGAPORE.lat, SINGAPORE.lon, geo.latitude, geo.longitude)

    return NextResponse.json({
      distance,
      city: geo.city || 'Unknown',
      country: geo.country_name || 'Unknown',
      timezone: geo.timezone || 'Unknown',
      latitude: geo.latitude,
      longitude: geo.longitude,
      ip: ip
    })
  } catch (error) {
    console.error('Geolocation error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
