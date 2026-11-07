import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Avatar } from '@/components/Avatar'
import { Icon } from '@/components/icons'
import { SkillTag } from '@/components/ui/SkillTag'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ReportButton } from '@/components/ReportButton'
import { FeatureButton } from '@/components/FeatureButton'
import { ViewTracker } from '@/components/ViewTracker'
import { formatRate } from '@/lib/format'
import { freelancerWhatsAppMessage } from '@/lib/phone'

export default async function FreelancerProfilePage({ params }: { params: { slug: string } }) {
  const freelancers = await sql`
    SELECT f.*, p.full_name, p.city, p.avatar_url, p.whatsapp_number, c.name as category_name
    FROM freelancer_profiles f
    JOIN profiles p ON f.user_id = p.id
    LEFT JOIN categories c ON f.category_id = c.id
    WHERE f.slug = ${params.slug} AND f.status = 'approved'
  `

  const freelancer = freelancers[0]
  if (!freelancer) notFound()

  const skillsData = await sql`
    SELECT s.name FROM freelancer_skills fs
    JOIN skills s ON fs.skill_id = s.id
    WHERE fs.freelancer_id = ${freelancer.id}
  `

  const portfolioItems = await sql`
    SELECT * FROM portfolio_items WHERE freelancer_id = ${freelancer.id} ORDER BY created_at DESC
  `

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <ViewTracker freelancerId={freelancer.id} />

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#121212]">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <Avatar name={freelancer.full_name} src={freelancer.avatar_url} size={96} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{freelancer.full_name}</h1>
                <span className="text-brand" title="Verified profile"><Icon name="check-badge" size={24} /></span>
              </div>
              <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">{freelancer.headline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><Icon name="map-pin" size={14} /> {freelancer.city || 'Zimbabwe'}</span>
                <span className="flex items-center gap-1"><Icon name="briefcase" size={14} /> {freelancer.category_name}</span>
                <span className="flex items-center gap-1"><Icon name="globe" size={14} /> {freelancer.languages || 'English'}</span>
                <span className="flex items-center gap-1 capitalize"><Icon name="star" size={14} /> {freelancer.experience_level || 'Intermediate'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FeatureButton type="profile" />
            <ReportButton targetType="freelancer" targetId={freelancer.id} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 border-y border-gray-200 py-6 dark:border-white/10">
          <div className="flex-1 min-w-[150px]">
            <p className="text-sm text-gray-500 dark:text-gray-400">Hourly Rate</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatRate(freelancer.hourly_rate, freelancer.currency)}</p>
          </div>
          <div className="flex-1 min-w-[150px]">
            <p className="text-sm text-gray-500 dark:text-gray-400">Availability</p>
            <p className="text-xl font-bold capitalize text-brand">{freelancer.availability}</p>
          </div>
          <div className="flex-1 min-w-[150px] flex items-center sm:justify-end">
            <WhatsAppButton 
              phone={freelancer.whatsapp_number || '+263771234567'} 
              message={freelancerWhatsAppMessage(freelancer.full_name, freelancer.slug)} 
              className="w-full sm:w-auto" 
              targetType="freelancer"
              targetId={freelancer.id}
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">About</h2>
          <p className="mt-3 whitespace-pre-wrap text-gray-600 dark:text-gray-300">{freelancer.bio || 'This freelancer has not added a bio yet.'}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Skills & Expertise</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {skillsData.length > 0 ? (
              skillsData.map((s: any) => <SkillTag key={s.name}>{s.name}</SkillTag>)
            ) : (
              <p className="text-sm text-gray-500">No skills listed yet.</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Portfolio</h2>
          {portfolioItems.length === 0 ? (
            <p className="text-sm text-gray-500">No portfolio items added yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {portfolioItems.map((item: any) => (
                <div key={item.id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5 aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image_url} alt={item.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition group-hover:opacity-100 flex flex-col justify-end p-4">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-white/80 line-clamp-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}