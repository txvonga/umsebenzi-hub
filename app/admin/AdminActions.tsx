'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { updateJobStatus, updateFreelancerStatus, toggleUserVerification } from '@/lib/actions/admin'

export function AdminActions({ 
  id, 
  type, 
  userId, 
  isVerified 
}: { 
  id: string, 
  type: 'job' | 'freelancer',
  userId?: string,
  isVerified?: boolean
}) {
  const [loading, setLoading] = useState(false)

  const handleAction = async (status: 'approved' | 'rejected') => {
    setLoading(true)
    try {
      if (type === 'job') await updateJobStatus(id, status)
      else await updateFreelancerStatus(id, status)
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!userId) return
    setLoading(true)
    try {
      await toggleUserVerification(userId, isVerified || false)
    } catch (error) {
      alert('Failed to verify')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button size="sm" onClick={() => handleAction('approved')} disabled={loading}>
        {loading ? '...' : 'Approve'}
      </Button>
      <Button size="sm" variant="secondary" onClick={() => handleAction('rejected')} disabled={loading} className="text-red-600 hover:text-red-700 dark:text-red-400">
        Reject
      </Button>
      {type === 'freelancer' && userId && (
        <Button size="sm" variant="secondary" onClick={handleVerify} disabled={loading} className={isVerified ? 'text-gray-500' : 'text-brand'}>
          {isVerified ? 'Remove Verification' : 'Verify User'}
        </Button>
      )}
    </div>
  )
}