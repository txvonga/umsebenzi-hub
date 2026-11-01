import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import { JobForm } from './JobForm'

export default async function NewJobPage() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) redirect('/login')

  // Ensure only clients can post jobs
  const profiles = await sql`SELECT role FROM profiles WHERE id = ${session.user.id}`
  if (profiles[0]?.role === 'freelancer') {
    redirect('/dashboard')
  }

  const categories = await sql`SELECT id, name FROM categories ORDER BY name ASC`

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Post a new job</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Tell us what you need. Your job will be reviewed and published shortly.
        </p>
      </div>
      <JobForm categories={categories} />
    </div>
  )
}