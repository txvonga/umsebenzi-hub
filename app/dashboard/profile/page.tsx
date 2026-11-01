import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import { ProfileForm } from './ProfileForm'

export default async function EditProfilePage() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) redirect('/login')

  // Fetch categories for the dropdown
  const categories = await sql`SELECT id, name FROM categories ORDER BY name ASC`

  // Fetch existing profile (if it exists)
  const profiles = await sql`
    SELECT * FROM freelancer_profiles WHERE user_id = ${session.user.id}
  `
  const profile = profiles[0] || null

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit your profile</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This is how clients will see you in the directory. Fill it out to stand out.
        </p>
      </div>
      
      <ProfileForm profile={profile} categories={categories} />
    </div>
  )
}