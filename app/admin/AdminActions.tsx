'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { updateJobStatus, updateFreelancerStatus } from '@/lib/actions/admin'

export function AdminActions({ id, type }: { id: string, type: 'job' | 'freelancer' }) {
  const [loading, setLoading] = useState(false)

  const handleAction = async (status: 'approved' | 'rejected') => {
    setLoading(true)
    try {
      if (type === 'job') {
        await updateJobStatus(id, status)
      } else {
        await updateFreelancerStatus(id, status)
      }
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 flex gap-2">
      <Button size="sm" onClick={() => handleAction('approved')} disabled={loading}>
        {loading ? '...' : 'Approve'}
      </Button>
      <Button size="sm" variant="secondary" onClick={() => handleAction('rejected')} disabled={loading} className="text-red-600 hover:text-red-700 dark:text-red-400">
        Reject
      </Button>
    </div>
  )
}