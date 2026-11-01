import { sql } from '@/lib/db'
import { JobCard } from '@/components/JobCard'

export default async function SeoJobPage({ params }: { params: { mode: string, category: string } }) {
  const jobsData = await sql`
    SELECT j.*, p.full_name as client_name, c.name as category_name
    FROM jobs j
    JOIN profiles p ON j.client_id = p.id
    JOIN categories c ON j.category_id = c.id
    WHERE j.status = 'approved' AND j.work_mode = ${params.mode}::work_mode AND c.slug = ${params.category}
    ORDER BY j.created_at DESC
  `

  const jobs = jobsData.map((item: any) => ({
    id: item.id, slug: item.slug, title: item.title, client_name: item.client_name, client_verified: true,
    category: item.category_name, work_mode: item.work_mode, job_type: item.job_type,
    budget_type: item.budget_type, budget_min: Number(item.budget_min), budget_max: Number(item.budget_max),
    currency: item.currency, city: item.city, posted_at: item.created_at.toISOString(),
    skills: [], description_short: item.description.substring(0, 100) + '...',
  }))

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl capitalize">
          {params.mode.replace('_', '-')} {params.category.replace('-', ' ')} Jobs
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Browse the latest {params.mode.replace('_', '-')} {params.category.replace('-', ' ')} opportunities in Zimbabwe.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400">No jobs found for this search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {jobs.map((j) => <JobCard key={j.id} j={j} />)}
        </div>
      )}
    </div>
  )
}