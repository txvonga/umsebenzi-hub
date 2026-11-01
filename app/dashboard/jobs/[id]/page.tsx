import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { sql } from '@/lib/db'
import { Avatar } from '@/components/Avatar'
import { Icon } from '@/components/icons'
import { ProposalActions } from './ProposalActions'
import Link from 'next/link'

export default async function ManageJobPage({ params }: { params: { id: string } }) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) redirect('/login')

  // Verify the job belongs to this client
  const jobs = await sql`
    SELECT * FROM jobs WHERE id = ${params.id} AND client_id = ${session.user.id}
  `
  const job = jobs[0]
  if (!job) notFound()

  // Fetch proposals for this job
  const proposals = await sql`
    SELECT p.*, pr.full_name, pr.city, f.headline, f.slug as freelancer_slug
    FROM proposals p
    JOIN profiles pr ON p.freelancer_id = pr.id
    LEFT JOIN freelancer_profiles f ON f.user_id = pr.id
    WHERE p.job_id = ${job.id}
    ORDER BY p.created_at DESC
  `

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/dashboard/jobs" className="text-sm font-medium text-brand hover:underline mb-4 inline-flex items-center gap-1">
          <Icon name="arrow-right" size={14} className="rotate-180" /> Back to jobs
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{job.title}</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Status: <span className="capitalize font-medium">{job.status}</span></p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Proposals received ({proposals.length})</h2>
        
        {proposals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-white/20 dark:bg-white/5">
            <p className="text-gray-500 dark:text-gray-400">No proposals yet. Check back soon.</p>
          </div>
        ) : (
          proposals.map((proposal) => (
            <div key={proposal.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
              <div className="flex items-start gap-4">
                <Avatar name={proposal.full_name} src={null} size={48} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      <Link href={`/freelancers/${proposal.freelancer_slug}`} className="hover:text-brand hover:underline">{proposal.full_name}</Link>
                    </h3>
                    <span className="font-bold text-gray-900 dark:text-white">{proposal.proposed_rate} {proposal.currency}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{proposal.headline || 'Freelancer'} • {proposal.city || 'Zimbabwe'}</p>
                  
                  <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-700 dark:bg-white/5 dark:text-gray-300">
                    <p className="whitespace-pre-wrap">{proposal.cover_letter}</p>
                  </div>

                  <ProposalActions proposalId={proposal.id} currentStatus={proposal.status} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}