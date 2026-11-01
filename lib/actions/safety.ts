'use server'

import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function submitReport(formData: FormData) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) throw new Error('Unauthorized')

  const target_type = formData.get('target_type') as string
  const target_id = formData.get('target_id') as string
  const reason = formData.get('reason') as string
  const details = formData.get('details') as string

  await sql`
    INSERT INTO reports (reporter_id, target_type, target_id, reason, details)
    VALUES (${session.user.id}, ${target_type}, ${target_id}, ${reason}, ${details})
  `

  revalidatePath('/admin')
}