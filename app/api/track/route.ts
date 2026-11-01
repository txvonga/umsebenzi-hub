import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: headers() })
    if (!session) return NextResponse.json({ success: false }, { status: 401 })

    const { targetType, targetId, eventType } = await req.json()

    await sql`
      INSERT INTO contact_events (user_id, target_type, target_id, event_type)
      VALUES (${session.user.id}, ${targetType}, ${targetId}, ${eventType})
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}