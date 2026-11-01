'use client'

import { useState } from 'react'
import { submitReport } from '@/lib/actions/safety'
import { Button } from './ui/Button'
import { Icon } from './icons'

export function ReportButton({ targetType, targetId }: { targetType: 'job' | 'freelancer', targetId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      await submitReport(formData)
      setSuccess(true)
      setTimeout(() => { setIsOpen(false); setSuccess(false) }, 2000)
    } catch (error) {
      alert('Failed to submit report.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
      >
        <Icon name="alert" size={16} /> Report
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#121212]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Report {targetType}</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <Icon name="x" size={20} />
              </button>
            </div>

            {success ? (
              <div className="rounded-lg bg-green-50 p-4 text-center text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
                Thank you. Our admin team will review this shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="target_type" value={targetType} />
                <input type="hidden" name="target_id" value={targetId} />
                
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
                  <select name="reason" required className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white">
                    <option value="">Select a reason...</option>
                    <option value="Scam or Fraud">Scam or Fraud</option>
                    <option value="Asking for payment">Asking for payment</option>
                    <option value="Inappropriate content">Inappropriate content</option>
                    <option value="Fake profile">Fake profile</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Details (Optional)</label>
                  <textarea name="details" rows={3} placeholder="Please provide any additional information..." className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">{loading ? 'Submitting...' : 'Submit Report'}</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}