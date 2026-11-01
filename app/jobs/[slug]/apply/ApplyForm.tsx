'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitProposal } from '@/lib/actions/proposals'
import { Button } from '@/components/ui/Button'

export function ApplyForm({ jobId }: { jobId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    try {
      await submitProposal(formData)
      router.push('/dashboard/proposals')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#121212]">
      <input type="hidden" name="job_id" value={jobId} />
      
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</div>}

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Cover Letter</label>
        <textarea 
          name="cover_letter" 
          rows={6} 
          required 
          minLength={50}
          placeholder="Explain why you are the best fit for this job. Mention your relevant experience..." 
          className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" 
        />
        <p className="mt-1 text-xs text-gray-500">Minimum 50 characters.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Proposed Rate</label>
          <input name="proposed_rate" type="number" required min="1" placeholder="e.g. 200" className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
          <select name="currency" required className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white">
            <option value="USD">USD ($)</option>
            <option value="ZiG">ZiG</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-white/10">
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Proposal'}
        </Button>
      </div>
    </form>
  )
}