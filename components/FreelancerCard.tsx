import Link from 'next/link'
import { Avatar } from './Avatar'
import { Icon } from './icons'
import { SkillTag } from './ui/SkillTag'
import { SaveButton } from './SaveButton'
import { formatRate } from '@/lib/format'
import type { FreelancerSummary } from '@/types'

export function FreelancerCard({ f, isSaved = false }: { f: FreelancerSummary, isSaved?: boolean }) {
  return (
    <article className="group relative rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-brand/40 hover:shadow-lg dark:border-white/10 dark:bg-[#121212] dark:hover:border-brand/40 dark:hover:shadow-[0_0_20px_rgba(229,62,62,0.1)]">
      <SaveButton itemType="freelancer" itemId={f.id} initialSaved={isSaved} />
      
      <div className="flex items-start gap-4">
        <Avatar name={f.full_name} src={f.avatar_url} size={56} />
        <div className="min-w-0 flex-1 pr-8">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
              <Link href={`/freelancers/${f.slug}`} className="focus-visible:outline-none focus-visible:underline">
                {f.full_name}
              </Link>
            </h3>
            {f.is_verified && <span className="text-brand" title="Verified profile"><Icon name="check-badge" size={16} /></span>}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{f.headline}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {f.skills.slice(0, 3).map((s) => <SkillTag key={s}>{s}</SkillTag>)}
        {f.skills.length > 3 && <SkillTag>+{f.skills.length - 3}</SkillTag>}
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 text-sm">
        <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <Icon name="map-pin" size={14} /> {f.city}
        </span>
        <span className="font-semibold text-gray-900 dark:text-white">{formatRate(f.hourly_rate, f.currency)}</span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4 text-xs">
        <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400">
          {f.rating != null && <><Icon name="star" size={13} className="text-brand" /> {f.rating.toFixed(1)} ({f.reviews_count})</>}
        </span>
        <span className={f.availability === 'available' ? 'inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 font-medium text-brand' : 'inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-white/5 px-2.5 py-1 font-medium text-gray-500 dark:text-gray-400'}>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
          {f.availability === 'available' ? 'Available' : f.availability === 'busy' ? 'Busy' : 'Unavailable'}
        </span>
      </div>
    </article>
  )
}