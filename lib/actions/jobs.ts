'use server'

import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export async function createJob(formData: FormData) {
  const session = await auth.api.getSession({ headers: headers() })
  
  if (!session) {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category_id = formData.get('category_id') as string
  const job_type = formData.get('job_type') as string
  const work_mode = formData.get('work_mode') as string
  const budget_type = formData.get('budget_type') as string
  const budget_min = parseFloat(formData.get('budget_min') as string)
  const budget_max = parseFloat(formData.get('budget_max') as string)
  const currency = formData.get('currency') as string
  const city = formData.get('city') as string

  const baseSlug = slugify(title)
  const uniqueSlug = `${baseSlug}-${Math.floor(Math.random() * 1000)}`

  // Insert job with 'pending' status
  await sql`
    INSERT INTO jobs (
      client_id, title, slug, description, category_id, job_type, work_mode, 
      budget_type, budget_min, budget_max, currency, city, status
    ) VALUES (
      ${session.user.id}, ${title}, ${uniqueSlug}, ${description}, ${category_id}, 
      ${job_type}::job_type, ${work_mode}::work_mode, ${budget_type}::budget_type, 
      ${budget_min}, ${budget_max}, ${currency}::currency_type, ${city}, 'pending'
    )
  `

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/jobs')
}