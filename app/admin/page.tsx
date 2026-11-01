import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import { AdminActions } from './AdminActions'
import { ReportActions } from './ReportActions'
import { Icon } from '@/components/icons'
import { timeAgo } from '@/lib/format'

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
    SELECT f.id, f.headline, f.slug, f.created_at, p.full_name, p.id as user_id, p.is_verified
    FROM freelancer_profiles f
    JOIN profiles p ON f.user_id = p.id
    WHERE f.status = 'pending'
    ORDER BY f.created_at ASC
  `

  // Fetch pending reports
  const reports = await sql`
    SELECT r.*, p.full_name as reporter_name
    FROM reports r
    JOIN profiles p ON r.reporter_id = p.id
    WHERE r.status = 'pending'
    ORDER BY r.created_at DESC
  `

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Review pending content and manage safety reports.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
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
                <AdminActions id={freelancer.id} type="freelancer" userId={freelancer.user_id} isVerified={freelancer.is_verified} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reports Section */}
      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
          <Icon name="alert" size={20} />
          Safety Reports
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-400">{reports.length}</span>
        </h2>
        {reports.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-[#121212] p-6 rounded-2xl border border-gray-200 dark:border-white/10">No pending reports. Great job!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reports.map((report) => (
              <div key={report.id} className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/30 dark:bg-red-900/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-red-800 dark:text-red-400">{report.reason}</h3>
                    <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                      {report.target_type === 'job' ? 'Job' : 'Freelancer'} ID: {report.target_id.split('-')[0]}...
                    </p>
                  </div>
                  <span className="text-xs text-red-500">{timeAgo(report.created_at)}</span>
                </div>
                <p className="mt-3 text-sm text-red-700 dark:text-red-300 bg-white/50 dark:bg-black/20 p-3 rounded-lg">
                  {report.details || 'No additional details provided.'}
                </p>
                <p className="mt-2 text-xs text-red-500">Reported by: {report.reporter_name}</p>
                <ReportActions id={report.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}