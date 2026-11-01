import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import { LinkButton } from '@/components/ui/Button'
import { formatBudget, timeAgo } from '@/lib/format'

export default async function MyJobsPage() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) redirect('/login')

  const jobs = await sql`
    SELECT j.*, c.name as category_name 
    FROM jobs j
    LEFT JOIN categories c ON j.category_id = c.id
    WHERE j.client_id = ${session.user.id}
    ORDER BY j.created_at DESC
  `

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your posted jobs</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Manage your jobs and view proposals.</p>
        </div>
        <LinkButton href="/dashboard/jobs/new">Post a new job</LinkButton>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-white/20 dark:bg-white/5">
            <p className="text-gray-500 dark:text-gray-400">You haven&apos;t posted any jobs yet.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                    job.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                    job.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{job.category_name}</span>
                  <span>{formatBudget(job.budget_min, job.budget_max, job.currency, job.budget_type)}</span>
                  <span>Posted {timeAgo(job.created_at)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LinkButton href={`/dashboard/jobs/${job.id}`} variant="secondary" size="sm">
                  Manage
                </LinkButton>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}