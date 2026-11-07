import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import { ProfileForm } from './ProfileForm'

export default async function EditProfilePage() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) redirect('/login')

  const categories = await sql`SELECT id, name FROM categories ORDER BY name ASC`

  const profiles = await sql`
    SELECT * FROM freelancer_profiles WHERE user_id = ${session.user.id}
  `
  const profile = profiles[0] || null

  // Fetch the user's WhatsApp number and Avatar URL
  const userProfiles = await sql`SELECT whatsapp_number, avatar_url FROM profiles WHERE id = ${session.user.id}`
  const whatsapp_number = userProfiles[0]?.whatsapp_number || ''
  const avatar_url = userProfiles[0]?.avatar_url || null

  let skills: string[] = []
  if (profile) {
    const skillsData = await sql`
      SELECT s.name FROM freelancer_skills fs
      JOIN skills s ON fs.skill_id = s.id
      WHERE fs.freelancer_id = ${profile.id}
    `
    skills = skillsData.map((s: any) => s.name)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit your profile</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          This is how clients will see you in the directory. Fill it out to stand out.
        </p>
      </div>
      
      <ProfileForm 
        profile={profile} 
        categories={categories} 
        whatsapp_number={whatsapp_number} 
        existingSkills={skills} 
        avatar_url={avatar_url}
      />
    </div>
  )
}