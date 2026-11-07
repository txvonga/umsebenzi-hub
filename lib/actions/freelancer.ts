'use server'

import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { normaliseZimPhone } from '@/lib/phone'

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export async function updateFreelancerProfile(formData: FormData) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) throw new Error('Unauthorized')

  const headline = formData.get('headline') as string
  const bio = formData.get('bio') as string
  const category_id = formData.get('category_id') as string
  const hourly_rate = parseFloat(formData.get('hourly_rate') as string)
  const currency = formData.get('currency') as string
  const availability = formData.get('availability') as string
  const whatsapp_raw = formData.get('whatsapp_number') as string
  const skills_raw = formData.get('skills') as string
  const avatar_url = formData.get('avatar_url') as string
  const experience_level = formData.get('experience_level') as string
  const languages = formData.get('languages') as string

  const whatsapp_number = whatsapp_raw ? normaliseZimPhone(whatsapp_raw) : null

  await sql`
    UPDATE profiles 
    SET whatsapp_number = ${whatsapp_number}, avatar_url = ${avatar_url || null} 
    WHERE id = ${session.user.id}
  `

  let freelancerProfileId: string
  const existingProfile = await sql`SELECT id FROM freelancer_profiles WHERE user_id = ${session.user.id}`

  if (existingProfile.length > 0) {
    freelancerProfileId = existingProfile[0].id
    await sql`
      UPDATE freelancer_profiles 
      SET headline = ${headline}, bio = ${bio}, category_id = ${category_id}, 
          hourly_rate = ${hourly_rate}, currency = ${currency}::currency_type, 
          availability = ${availability}::availability_status,
          experience_level = ${experience_level}::experience_level,
          languages = ${languages}
      WHERE user_id = ${session.user.id}
    `
  } else {
    const baseSlug = slugify(session.user.name)
    const uniqueSlug = `${baseSlug}-${Math.floor(Math.random() * 1000)}`
    
    const newProfile = await sql`
      INSERT INTO freelancer_profiles (
        user_id, slug, headline, bio, category_id, hourly_rate, currency, availability, status, experience_level, languages
      ) VALUES (
        ${session.user.id}, ${uniqueSlug}, ${headline}, ${bio}, ${category_id}, ${hourly_rate}, ${currency}::currency_type, ${availability}::availability_status, 'pending', ${experience_level}::experience_level, ${languages}
      ) RETURNING id
    `
    freelancerProfileId = newProfile[0].id
  }

  if (skills_raw) {
    await sql`DELETE FROM freelancer_skills WHERE freelancer_id = ${freelancerProfileId}`
    const skillNames = skills_raw.split(',').map(s => s.trim()).filter(Boolean)
    for (const name of skillNames) {
      const skill = await sql`INSERT INTO skills (name) VALUES (${name}) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id`
      await sql`INSERT INTO freelancer_skills (freelancer_id, skill_id) VALUES (${freelancerProfileId}, ${skill[0].id}) ON CONFLICT DO NOTHING`
    }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/profile')
}