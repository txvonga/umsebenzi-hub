import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import { AdminActions } from './AdminActions'

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) redirect('/login')

  const profiles = await sql`SELECT role FROM profiles WHERE id = ${session.user.id}`
  if (profiles[0]?.role !== 'admin') redirect('/dashboard')

  // Fetch pending jobs
  const pendingJobs = await sql`
    SELECT j.id, j.title, j.created_at, p.full_name as client_name
    FROM jobs j
    JOIN profiles p ON j.client_id = p.id
    WHERE j.status = 'pending'
    ORDER BY j.created_at ASC
  `

  // Fetch pending freelancers
  const pendingFreelancers = await sql`
    SELECT f.id, f.headline, f.slug, f.created_at, p.full_name
    FROM freelancer_profiles f
    JOIN profiles p ON f.user_id = p.id
    WHERE f.status = 'pending'
    ORDER BY f.created_at ASC
  `

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Review and approve pending content before it goes live.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Pending Jobs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center justify-between">
            Pending Jobs
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">{pendingJobs.length}</span>
          </h2>
          {pendingJobs.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-[#121212] p-6 rounded-2xl border border-gray-200 dark:border-white/10">No pending jobs.</p>
          ) : (
            pendingJobs.map((job) => (
              <div key={job.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
                <h3 className="font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">By {job.client_name}</p>
                <AdminActions id={job.id} type="job" />
              </div>
            ))
          )}
        </div>

        {/* Pending Freelancers */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center justify-between">
            Pending Freelancers
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">{pendingFreelancers.length}</span>
          </h2>
          {pendingFreelancers.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-[#121212] p-6 rounded-2xl border border-gray-200 dark:border-white/10">No pending freelancers.</p>
          ) : (
            pendingFreelancers.map((freelancer) => (
              <div key={freelancer.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
                <h3 className="font-semibold text-gray-900 dark:text-white">{freelancer.full_name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">{freelancer.headline}</p>
                <AdminActions id={freelancer.id} type="freelancer" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}