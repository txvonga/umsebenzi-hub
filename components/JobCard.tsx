import Link from 'next/link'
import { Icon } from './icons'
import { SkillTag } from './ui/SkillTag'
import { Badge } from './ui/Badge'
import { SaveButton } from './SaveButton'
import { formatBudget, timeAgo } from '@/lib/format'
import type { JobSummary } from '@/types'

const WORK_MODE_LABEL: Record<JobSummary['work_mode'], string> = { remote: 'Remote', hybrid: 'Hybrid', on_site: 'On-site' }
const JOB_TYPE_LABEL: Record<JobSummary['job_type'], string> = { freelance_project: 'Project', part_time: 'Part-time', full_time: 'Full-time', contract: 'Contract', internship: 'Internship' }

export function JobCard({ j, isSaved = false }: { j: JobSummary, isSaved?: boolean }) {
  return (
    <article className="relative rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-brand/30 hover:shadow-lg dark:border-white/10 dark:bg-[#121212] dark:hover:border-white/20 dark:hover:bg-white/5">
      <SaveButton itemType="job" itemId={j.id} initialSaved={isSaved} />
      
      <div className="flex items-start justify-between gap-3 pr-8">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            <Link href={`/jobs/${j.slug}`} className="focus-visible:outline-none focus-visible:underline">{j.title}</Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {j.client_name}
            {j.client_verified && <span className="ml-2 inline-flex items-center gap-1 text-brand"><Icon name="check-badge" size={14} /> Verified</span>}
          </p>
        </div>
        <Badge tone="neutral" className="bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-white/80 border-none">{JOB_TYPE_LABEL[j.job_type]}</Badge>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{j.description_short}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {j.skills.slice(0, 3).map((s) => <SkillTag key={s}>{s}</SkillTag>)}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm border-t border-gray-100 dark:border-white/5 pt-4">
        <span className="font-semibold text-brand">{formatBudget(j.budget_min, j.budget_max, j.currency, j.budget_type)}</span>
        <span className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400"><Icon name="globe" size={14} /> {WORK_MODE_LABEL[j.work_mode]}</span>
        {j.city && <span className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400"><Icon name="map-pin" size={14} /> {j.city}</span>}
        <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">{timeAgo(j.posted_at)}</span>
      </div>
    </article>
  )
}