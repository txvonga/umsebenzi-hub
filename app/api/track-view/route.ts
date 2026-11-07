import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { freelancerId } = await req.json()
    
    if (freelancerId) {
      await sql`
        UPDATE freelancer_profiles 
        SET view_count = view_count + 1 
        WHERE id = ${freelancerId}
      `
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}