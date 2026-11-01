'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { updateReportStatus } from '@/lib/actions/admin'

export function ReportActions({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  const handleAction = async (status: 'resolved' | 'dismissed') => {
    setLoading(true)
    try {
      await updateReportStatus(id, status)
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4 flex gap-2">
      <Button size="sm" onClick={() => handleAction('resolved')} disabled={loading} className="bg-red-600 hover:bg-red-700">
        Resolve & Remove Target
      </Button>
      <Button size="sm" variant="secondary" onClick={() => handleAction('dismissed')} disabled={loading}>
        Dismiss
      </Button>
    </div>
  )
}