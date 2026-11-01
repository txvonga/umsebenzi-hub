import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/icons'
import { Badge } from '@/components/ui/Badge'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { LinkButton } from '@/components/ui/Button'
import { formatBudget, timeAgo } from '@/lib/format'
import { jobWhatsAppMessage } from '@/lib/phone'

export default async function JobDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  // Fetch the specific job by slug
  const jobs = await sql`
    SELECT j.*, p.full_name as client_name, c.name as category_name
    FROM jobs j
    JOIN profiles p ON j.client_id = p.id
    LEFT JOIN categories c ON j.category_id = c.id
    WHERE j.slug = ${params.slug} AND j.status = 'approved'
  `

  const job = jobs[0]

  if (!job) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#121212]">
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge tone="neutral" className="bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300">{job.category_name}</Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">Posted {timeAgo(job.created_at)}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{job.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-white">
                <Icon name="briefcase" size={16} /> {job.client_name}
              </span>
              <span className="flex items-center gap-1.5"><Icon name="globe" size={16} /> {job.work_mode.replace('_', '-')}</span>
              <span className="flex items-center gap-1.5"><Icon name="map-pin" size={16} /> {job.city || 'Remote / Anywhere'}</span>
            </div>
          </div>
          
          <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100 dark:bg-white/5 dark:border-white/10 shrink-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
            <p className="text-2xl font-bold text-brand">{formatBudget(job.budget_min, job.budget_max, job.currency, job.budget_type)}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-white/10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Job Description</h2>
          <p className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">
            {job.description}
          </p>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-white/10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {/* Placeholder skills until we build the skills table */}
            <span className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300">Communication</span>
            <span className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-white/10 dark:text-gray-300">{job.category_name}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-brand/5 p-6 rounded-2xl border border-brand/20">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Interested in this job?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Contact the client directly on WhatsApp.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href={`/jobs/${job.slug}/apply`} variant="secondary">
              Apply Now
            </LinkButton>
            <WhatsAppButton 
              phone="+263771234567" // Mock phone
              message={jobWhatsAppMessage(job.title, job.slug)} 
            />
          </div>
        </div>

      </div>
    </div>
  )
}