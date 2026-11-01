import { getFreelancers } from '@/lib/data/freelancers'
import { FreelancerCard } from '@/components/FreelancerCard'
import { SearchBar } from '@/components/SearchBar'

export const metadata = { title: 'Find Talent | Umsebenzi Hub' }

export default async function FreelancersPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; mode?: string }
}) {
  const freelancers = await getFreelancers(searchParams)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find talent</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Browse vetted freelancers across Zimbabwe.</p>
      </div>

      <SearchBar />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {freelancers.length > 0 ? (
          freelancers.map((f) => <FreelancerCard key={f.id} f={f} />)
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500 dark:text-gray-400">
            No freelancers found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}