'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addPortfolioItem } from '@/lib/actions/portfolio'
import { Button } from '@/components/ui/Button'
import { ImageUpload } from '@/components/ImageUpload'

export function PortfolioForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!imageUrl) {
      setError('Please upload an image first.')
      return
    }
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    formData.set('image_url', imageUrl)

    try {
      await addPortfolioItem(formData)
      router.refresh()
      ;(e.target as HTMLFormElement).reset()
      setImageUrl('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
      {error && <div className="text-sm text-red-500">{error}</div>}
      
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Image</label>
        <ImageUpload initialImage={null} onUpload={setImageUrl} />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Title</label>
        <input name="title" type="text" required placeholder="e.g. E-commerce Website" className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea name="description" rows={2} placeholder="Brief description..." className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Link (Optional)</label>
        <input name="link" type="url" placeholder="https://..." className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
      </div>

      <Button type="submit" disabled={loading} className="w-full">{loading ? 'Adding...' : 'Add to Portfolio'}</Button>
    </form>
  )
}