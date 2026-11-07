export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-white/10"></div>
          <div className="mt-3 h-4 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-white/10"></div>
        </div>
        <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-white/10"></div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="h-40 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/10 md:col-span-2"></div>
        <div className="h-40 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/10"></div>
      </div>
      <div className="mt-6 h-64 animate-pulse rounded-2xl bg-gray-200 dark:bg-white/10"></div>
    </div>
  )
}