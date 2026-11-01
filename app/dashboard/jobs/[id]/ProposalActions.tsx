'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { updateProposalStatus } from '@/lib/actions/proposals'
import { useRouter } from 'next/navigation'

export function ProposalActions({ proposalId, currentStatus }: { proposalId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAction = async (status: 'shortlisted' | 'accepted' | 'declined') => {
    setLoading(true)
    try {
      await updateProposalStatus(proposalId, status)
      router.refresh()
    } catch (error) {
      alert('Failed to update status')
    } finally {
      setLoading(false)
    }
  }

  if (currentStatus === 'accepted' || currentStatus === 'declined') {
    return (
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">Proposal {currentStatus}</p>
      </div>
    )
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10 flex gap-2">
      <Button size="sm" onClick={() => handleAction('accepted')} disabled={loading}>Accept</Button>
      <Button size="sm" variant="secondary" onClick={() => handleAction('shortlisted')} disabled={loading}>Shortlist</Button>
      <Button size="sm" variant="secondary" onClick={() => handleAction('declined')} disabled={loading} className="text-red-600 dark:text-red-400">Decline</Button>
    </div>
  )
}