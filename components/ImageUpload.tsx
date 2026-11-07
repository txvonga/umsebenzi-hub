'use client'

import { useState } from 'react'
import { Avatar } from './Avatar'

export function ImageUpload({ initialImage, onUpload }: { initialImage: string | null, onUpload: (url: string) => void }) {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(initialImage)
  const [error, setError] = useState('')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Optional: compress image on client side before upload
    // For MVP, we rely on Cloudinary's automatic optimization
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Max 5MB.')
      return
    }

    setLoading(true)
    setError('')
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      
      if (data.secure_url) {
        setImage(data.secure_url)
        onUpload(data.secure_url)
      } else {
        setError('Upload failed. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong during upload.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-6">
      <Avatar name="User" src={image} size={80} />
      <div>
        <label className="cursor-pointer inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition">
          {loading ? 'Uploading...' : 'Upload Photo'}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={loading} />
        </label>
        <p className="text-xs text-gray-500 mt-2">JPG, PNG or WebP. Max 5MB.</p>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  )
}