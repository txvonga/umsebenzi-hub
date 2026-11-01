import Link from 'next/link'
import { LinkButton } from '../ui/Button'
import { Icon } from '../icons'
import { formatBudget, timeAgo } from '@/lib/format'

export function ClientDashboard({ profile, recentJobs = [] }: { profile: any, recentJobs: any[] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-2xl bg-brand p-8 text-white relative overflow-hidden flex flex-col justify-center">
          <h2 className="text-2xl font-bold relative z-10">Need to hire someone?</h2>
          <p className="mt-2 text-sm text-white/90 relative z-10 max-w-md">
            Post a job for free and receive proposals from vetted Zimbabwean freelancers.
          </p>
          <div className="mt-6 relative z-10">
            <LinkButton href="/dashboard/jobs/new" variant="dark" className="border-transparent bg-black hover:bg-black/80">
              Post a new job <Icon name="arrow-right" size={16} />
            </LinkButton>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212] flex flex-col justify-center">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
          <div className="space-y-3">
            <Link href="/dashboard/jobs" className="block text-sm font-medium text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-brand">My Posted Jobs</Link>
            <Link href="/dashboard/saved" className="block text-sm font-medium text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-brand">Saved Freelancers</Link>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Your recent jobs</h3>
          <Link href="/dashboard/jobs" className="text-sm font-medium text-brand hover:underline">View all</Link>
        </div>
        
        {recentJobs.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-sm">
            You haven&apos;t posted any jobs yet.
          </div>
        ) : (
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{job.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {job.category_name} • {formatBudget(job.budget_min, job.budget_max, job.currency, job.budget_type)}
                  </p>
                </div>
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                  job.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                  job.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400'
                }`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}