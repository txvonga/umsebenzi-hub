import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) return NextResponse.json({ isAdmin: false })

  const profiles = await sql`SELECT role FROM profiles WHERE id = ${session.user.id}`
  const isAdmin = profiles[0]?.role === 'admin'

  return NextResponse.json({ isAdmin })
}