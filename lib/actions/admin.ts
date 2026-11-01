'use server'

import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function verifyAdmin() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) throw new Error('Unauthorized')

  const profiles = await sql`SELECT role FROM profiles WHERE id = ${session.user.id}`
  if (profiles[0]?.role !== 'admin') throw new Error('Forbidden: Admin access required')
  
  return session
}

export async function updateJobStatus(jobId: string, status: 'approved' | 'rejected') {
  await verifyAdmin()
  await sql`UPDATE jobs SET status = ${status}::job_status WHERE id = ${jobId}`
  revalidatePath('/admin')
  revalidatePath('/jobs')
}

export async function updateFreelancerStatus(profileId: string, status: 'approved' | 'rejected') {
  await verifyAdmin()
  await sql`UPDATE freelancer_profiles SET status = ${status}::profile_status WHERE id = ${profileId}`
  revalidatePath('/admin')
  revalidatePath('/freelancers')
}

export async function toggleUserVerification(userId: string, currentStatus: boolean) {
  await verifyAdmin()
  await sql`UPDATE profiles SET is_verified = ${!currentStatus} WHERE id = ${userId}`
  revalidatePath('/admin')
  revalidatePath('/freelancers')
}

export async function updateReportStatus(reportId: string, status: 'resolved' | 'dismissed') {
  await verifyAdmin()
  await sql`UPDATE reports SET status = ${status} WHERE id = ${reportId}`
  revalidatePath('/admin')
}