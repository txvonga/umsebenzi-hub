'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateFreelancerProfile } from '@/lib/actions/freelancer'
import { Button } from '@/components/ui/Button'
import { ImageUpload } from '@/components/ImageUpload'

export function ProfileForm({ 
  profile, 
  categories, 
  whatsapp_number, 
  existingSkills,
  avatar_url
}: { 
  profile: any, 
  categories: any[], 
  whatsapp_number: string,
  existingSkills: string[],
  avatar_url: string | null
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [newAvatarUrl, setNewAvatarUrl] = useState(avatar_url || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    // Manually append the avatar URL from state
    formData.set('avatar_url', newAvatarUrl)
    
    try {
      await updateFreelancerProfile(formData)
      setSuccess('Profile saved! It will be reviewed by an admin shortly.')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#121212]">
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
      {success && <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">{success}</div>}

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Profile Photo</label>
        <ImageUpload initialImage={newAvatarUrl} onUpload={setNewAvatarUrl} />
      </div>

      <div className="border-t border-gray-200 dark:border-white/10 pt-6">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Professional Headline</label>
        <input name="headline" type="text" required defaultValue={profile?.headline || ''} placeholder="e.g. Full-stack developer building fast web apps" className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
        <textarea name="bio" rows={5} required defaultValue={profile?.bio || ''} placeholder="Tell clients about your experience, skills, and how you can help them..." className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp Number</label>
          <input name="whatsapp_number" type="tel" required defaultValue={whatsapp_number} placeholder="e.g. 0771234567" className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
          <p className="mt-1 text-xs text-gray-500">We will convert this to +263 format automatically.</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills (comma separated)</label>
          <input name="skills" type="text" defaultValue={existingSkills.join(', ')} placeholder="e.g. React, Next.js, Tailwind" className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
          <select name="category_id" required defaultValue={profile?.category_id || ''} className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white">
            <option value="" disabled>Select a category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Availability</label>
          <select name="availability" required defaultValue={profile?.availability || 'available'} className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white">
            <option value="available">Available for work</option>
            <option value="busy">Busy (but open to offers)</option>
            <option value="unavailable">Not available</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hourly Rate</label>
          <input name="hourly_rate" type="number" required min="1" defaultValue={profile?.hourly_rate || ''} placeholder="25" className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
          <select name="currency" required defaultValue={profile?.currency || 'USD'} className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white">
            <option value="USD">USD ($)</option>
            <option value="ZiG">ZiG</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-white/10">
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Profile'}</Button>
      </div>
    </form>
  )
}