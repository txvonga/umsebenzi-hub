'use server'

import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function addPortfolioItem(formData: FormData) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const image_url = formData.get('image_url') as string
  const link = formData.get('link') as string

  // Get the freelancer profile ID
  const profiles = await sql`SELECT id FROM freelancer_profiles WHERE user_id = ${session.user.id}`
  if (profiles.length === 0) throw new Error('Freelancer profile not found')
  const freelancer_id = profiles[0].id

  await sql`
    INSERT INTO portfolio_items (freelancer_id, title, description, image_url, link)
    VALUES (${freelancer_id}, ${title}, ${description}, ${image_url}, ${link})
  `

  revalidatePath('/dashboard/portfolio')
  revalidatePath('/dashboard/profile')
}

export async function deletePortfolioItem(id: string) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) throw new Error('Unauthorized')

  // Verify ownership
  const items = await sql`
    SELECT p.id FROM portfolio_items p
    JOIN freelancer_profiles f ON p.freelancer_id = f.id
    WHERE p.id = ${id} AND f.user_id = ${session.user.id}
  `
  if (items.length === 0) throw new Error('Unauthorized')

  await sql`DELETE FROM portfolio_items WHERE id = ${id}`
  revalidatePath('/dashboard/portfolio')
  revalidatePath('/dashboard/profile')
}