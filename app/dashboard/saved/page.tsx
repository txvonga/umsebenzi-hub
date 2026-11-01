import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { FreelancerCard } from '@/components/FreelancerCard'

export default async function SavedItemsPage() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) redirect('/login')

  // Fetch saved jobs
  const savedJobsData = await sql`
    SELECT j.*, p.full_name as client_name, c.name as category_name
    FROM saved_items s
    JOIN jobs j ON s.item_id = j.id
    JOIN profiles p ON j.client_id = p.id
    LEFT JOIN categories c ON j.category_id = c.id
    WHERE s.user_id = ${session.user.id} AND s.item_type = 'job'
    ORDER BY s.created_at DESC
  `

  // Fetch saved freelancers
  const savedFreelancersData = await sql`
    SELECT f.*, p.full_name, p.city, p.avatar_url, c.name as category_name
    FROM saved_items s
    JOIN freelancer_profiles f ON s.item_id = f.id
    JOIN profiles p ON f.user_id = p.id
    LEFT JOIN categories c ON f.category_id = c.id
    WHERE s.user_id = ${session.user.id} AND s.item_type = 'freelancer'
    ORDER BY s.created_at DESC
  `

  // Map to our UI types
  const jobs = savedJobsData.map((item: any) => ({
    id: item.id, slug: item.slug, title: item.title, client_name: item.client_name, client_verified: true,
    category: item.category_name || 'Other', work_mode: item.work_mode, job_type: item.job_type,
    budget_type: item.budget_type, budget_min: Number(item.budget_min), budget_max: Number(item.budget_max),
    currency: item.currency, city: item.city, posted_at: item.created_at.toISOString(),
    skills: [], description_short: item.description.substring(0, 100) + '...',
  }))

  const freelancers = savedFreelancersData.map((item: any) => ({
    id: item.id, slug: item.slug, full_name: item.full_name, headline: item.headline,
    avatar_url: item.avatar_url, city: item.city || 'Zimbabwe', category: item.category_name || 'Other',
    skills: [], hourly_rate: Number(item.hourly_rate), currency: item.currency,
    availability: item.availability, is_verified: true, rating: 5.0, reviews_count: 0,
    whatsapp_number: '+263771234567',
  }))

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Items</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Jobs and freelancers you have bookmarked.</p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Saved Jobs</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No saved jobs yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {jobs.map((j) => <JobCard key={j.id} j={j} isSaved={true} />)}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Saved Freelancers</h2>
          {freelancers.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No saved freelancers yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {freelancers.map((f) => <FreelancerCard key={f.id} f={f} isSaved={true} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}