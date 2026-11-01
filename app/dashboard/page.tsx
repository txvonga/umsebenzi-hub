import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { sql } from '@/lib/db'
import { FreelancerDashboard } from '@/components/dashboard/FreelancerDashboard'
import { ClientDashboard } from '@/components/dashboard/ClientDashboard'

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) redirect('/login')

  // 1. Fetch the main profile
  let profileResult = await sql`SELECT * FROM profiles WHERE id = ${session.user.id}`
  let profile = profileResult[0]

  // 2. Create profile if it doesn't exist
  if (!profile) {
    const userRole = (session.user as any).role || 'freelancer'
    await sql`INSERT INTO profiles (id, full_name, role) VALUES (${session.user.id}, ${session.user.name}, ${userRole})`
    profileResult = await sql`SELECT * FROM profiles WHERE id = ${session.user.id}`
    profile = profileResult[0]
  }

  let clientJobs: any[] = []
  let completeness = 0

  // 3. Role-specific data fetching
  if (profile.role === 'client') {
    clientJobs = await sql`
      SELECT j.*, c.name as category_name 
      FROM jobs j
      LEFT JOIN categories c ON j.category_id = c.id
      WHERE j.client_id = ${session.user.id}
      ORDER BY j.created_at DESC
      LIMIT 3
    `
  } else {
    // Calculate Freelancer Completeness
    const fProfiles = await sql`SELECT * FROM freelancer_profiles WHERE user_id = ${session.user.id}`
    const fProfile = fProfiles[0]
    
    let skillsCount = 0
    if (fProfile) {
      const skills = await sql`SELECT id FROM freelancer_skills WHERE freelancer_id = ${fProfile.id}`
      skillsCount = skills.length
    }

    let filled = 0
    if (fProfile?.headline) filled++
    if (fProfile?.bio) filled++
    if (fProfile?.category_id) filled++
    if (fProfile?.hourly_rate) filled++
    if (profile.whatsapp_number) filled++ // From the main profiles table
    if (skillsCount > 0) filled++

    // 6 total fields possible
    completeness = Math.round((filled / 6) * 100)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {profile.full_name.split(' ')[0]}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {profile.role === 'client' ? 'Manage your job posts and hires.' : 'Manage your profile and proposals.'}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand capitalize">
          {profile.role}
        </div>
      </div>

      {profile.role === 'client' ? (
        <ClientDashboard profile={profile} recentJobs={clientJobs} />
      ) : (
        <FreelancerDashboard profile={profile} completeness={completeness} />
      )}
    </div>
  )
}