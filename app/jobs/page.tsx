import { getJobs } from '@/lib/data/jobs'
import { JobCard } from '@/components/JobCard'
import { SearchBar } from '@/components/SearchBar'

export const metadata = { title: 'Find Work | Umsebenzi Hub' }

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; mode?: string }
}) {
  const jobs = await getJobs(searchParams)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find work</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Fresh opportunities from clients across the country.</p>
      </div>

      <SearchBar />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {jobs.length > 0 ? (
          jobs.map((j) => <JobCard key={j.id} j={j} />)
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500 dark:text-gray-400">
            No jobs found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}