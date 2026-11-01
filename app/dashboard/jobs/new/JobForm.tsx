'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createJob } from '@/lib/actions/jobs'
import { Button } from '@/components/ui/Button'

export function JobForm({ categories }: { categories: any[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    try {
      await createJob(formData)
      router.push('/dashboard/jobs')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#121212]">
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</div>}

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
        <input name="title" type="text" required placeholder="e.g. Build a WordPress site for a restaurant" className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea name="description" rows={5} required placeholder="Describe the project, deliverables, and required skills..." className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
          <select name="category_id" required className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white">
            <option value="" disabled>Select a category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Type</label>
          <select name="job_type" required className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white">
            <option value="freelance_project">Freelance Project</option>
            <option value="part_time">Part-time</option>
            <option value="full_time">Full-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Work Mode</label>
          <select name="work_mode" required className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white">
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="on_site">On-site</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">City (Optional)</label>
          <input name="city" type="text" placeholder="e.g. Harare" className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Budget Type</label>
          <select name="budget_type" required className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white">
            <option value="fixed">Fixed Price</option>
            <option value="hourly">Hourly Rate</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Min Budget</label>
          <input name="budget_min" type="number" required min="1" placeholder="100" className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Budget</label>
          <input name="budget_max" type="number" required min="1" placeholder="500" className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
        <select name="currency" required className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white">
          <option value="USD">USD ($)</option>
          <option value="ZiG">ZiG</option>
        </select>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-white/10">
        <Button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Job'}
        </Button>
      </div>
    </form>
  )
}