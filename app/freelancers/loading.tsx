export default function FreelancersLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-white/10"></div>
        <div className="mt-3 h-4 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-white/10"></div>
      </div>
      <div className="h-20 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-white/10"></div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-72 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/10"></div>
        ))}
      </div>
    </div>
  )
}