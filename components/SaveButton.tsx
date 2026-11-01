'use client'

import { useState, useEffect } from 'react'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toggleSaveItem } from '@/lib/actions/saved'

export function SaveButton({ itemType, itemId, initialSaved = false }: { itemType: 'job' | 'freelancer', itemId: string, initialSaved?: boolean }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [saved, setSaved] = useState(initialSaved)
  const [loading, setLoading] = useState(false)

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent clicking the card link
    if (!session) {
      router.push('/login')
      return
    }

    setLoading(true)
    try {
      const result = await toggleSaveItem(itemType, itemId)
      setSaved(result.saved)
    } catch (error) {
      console.error('Failed to save', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      aria-label={saved ? 'Remove from saved' : 'Save item'}
      className={`absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:bg-white dark:bg-black/50 dark:hover:bg-black ${
        saved ? 'text-brand' : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    </button>
  )
}