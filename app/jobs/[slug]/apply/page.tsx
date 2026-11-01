import { sql } from '@/lib/db'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { ApplyForm } from './ApplyForm'
import { Icon } from '@/components/icons'

export default async function ApplyPage({ params }: { params: { slug: string } }) {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) redirect('/login')

  const jobs = await sql`
    SELECT j.id, j.title, p.full_name as client_name
    FROM jobs j
    JOIN profiles p ON j.client_id = p.id
    WHERE j.slug = ${params.slug} AND j.status = 'approved'
  `

  const job = jobs[0]
  if (!job) notFound()

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-brand mb-2">Applying for</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{job.title}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <Icon name="briefcase" size={16} /> {job.client_name}
        </p>
      </div>

      <ApplyForm jobId={job.id} />
    </div>
  )
}