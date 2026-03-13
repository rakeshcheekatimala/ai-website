import { NextResponse } from 'next/server'
import { getMockPosts } from '../../../lib/mock-data'

export async function GET() {
  const posts = await getMockPosts()
  return NextResponse.json({ posts })
}
