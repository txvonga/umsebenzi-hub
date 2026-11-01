import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import Link from 'next/link'
import { timeAgo } from '@/lib/format'
import { Icon } from '@/components/icons'

export default async function MyProposalsPage() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) redirect('/login')

  const proposals = await sql`
    SELECT p.*, j.title as job_title, j.slug as job_slug, pr.full_name as client_name
    FROM proposals p
    JOIN jobs j ON p.job_id = j.id
    JOIN profiles pr ON j.client_id = pr.id
    WHERE p.freelancer_id = ${session.user.id}
    ORDER BY p.created_at DESC
  `

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Proposals</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Track the jobs you have applied for.</p>
      </div>

      <div className="space-y-4">
        {proposals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-white/20 dark:bg-white/5">
            <p className="text-gray-500 dark:text-gray-400">You haven&apos;t sent any proposals yet.</p>
            <Link href="/jobs" className="mt-4 inline-block font-medium text-brand hover:underline">Browse Jobs</Link>
          </div>
        ) : (
          proposals.map((p) => (
            <div key={p.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    <Link href={`/jobs/${p.job_slug}`} className="hover:text-brand hover:underline">{p.job_title}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Client: {p.client_name}</p>
                  <p className="mt-2 text-xs text-gray-400">Sent {timeAgo(p.created_at)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
                    p.status === 'accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                    p.status === 'shortlisted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                    p.status === 'declined' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                    'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-400'
                  }`}>
                    {p.status}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Your Rate: {p.proposed_rate} {p.currency}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}