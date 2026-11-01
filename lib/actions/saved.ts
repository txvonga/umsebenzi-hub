'use server'

import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function toggleSaveItem(itemType: 'job' | 'freelancer', itemId: string) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) throw new Error('Unauthorized')

  // Check if it's already saved
  const existing = await sql`
    SELECT id FROM saved_items 
    WHERE user_id = ${session.user.id} 
    AND item_type = ${itemType} 
    AND item_id = ${itemId}
  `

  if (existing.length > 0) {
    // Unsave
    await sql`DELETE FROM saved_items WHERE id = ${existing[0].id}`
    revalidatePath('/dashboard/saved')
    return { saved: false }
  } else {
    // Save
    await sql`
      INSERT INTO saved_items (user_id, item_type, item_id)
      VALUES (${session.user.id}, ${itemType}, ${itemId})
    `
    revalidatePath('/dashboard/saved')
    return { saved: true }
  }
}