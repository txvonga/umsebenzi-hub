'use server'

import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Helper to create a URL-friendly slug (e.g., "Tapiwa Moyo" -> "tapiwa-moyo")
function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export async function updateFreelancerProfile(formData: FormData) {
  const session = await auth.api.getSession({ headers: headers() })
  
  if (!session) {
    throw new Error('Unauthorized')
  }

  const headline = formData.get('headline') as string
  const bio = formData.get('bio') as string
  const category_id = formData.get('category_id') as string
  const hourly_rate = parseFloat(formData.get('hourly_rate') as string)
  const currency = formData.get('currency') as string
  const availability = formData.get('availability') as string

  // Check if profile already exists
  const existingProfile = await sql`
    SELECT id FROM freelancer_profiles WHERE user_id = ${session.user.id}
  `

  if (existingProfile.length > 0) {
    // Update existing
    await sql`
      UPDATE freelancer_profiles 
      SET headline = ${headline}, bio = ${bio}, category_id = ${category_id}, 
          hourly_rate = ${hourly_rate}, currency = ${currency}::currency_type, availability = ${availability}::availability_status
      WHERE user_id = ${session.user.id}
    `
  } else {
    // Create new (defaults to 'pending' status until admin approves)
    const baseSlug = slugify(session.user.name)
    const uniqueSlug = `${baseSlug}-${Math.floor(Math.random() * 1000)}`
    
    await sql`
      INSERT INTO freelancer_profiles (
        user_id, slug, headline, bio, category_id, hourly_rate, currency, availability, status
      ) VALUES (
        ${session.user.id}, ${uniqueSlug}, ${headline}, ${bio}, ${category_id}, ${hourly_rate}, ${currency}::currency_type, ${availability}::availability_status, 'pending'
      )
    `
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/profile')
}