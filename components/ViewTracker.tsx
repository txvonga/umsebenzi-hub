'use client'

import { useEffect } from 'react'

export function ViewTracker({ freelancerId }: { freelancerId: string }) {
  useEffect(() => {
    // Fire and forget tracking
    fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ freelancerId })
    }).catch(console.error)
  }, [freelancerId])

  return null // This component doesn't render anything visually
}