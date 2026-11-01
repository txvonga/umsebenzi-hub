'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from './icons'
import { Button } from './ui/Button'
import { CATEGORIES } from '@/lib/mock-data'

export function SearchBar() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [mode, setMode] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set('q', q.trim())
    if (category) params.set('category', category)
    if (mode) params.set('mode', mode)
    router.push(`/freelancers?${params.toString()}`)
  }

  return (
    <form onSubmit={onSubmit} role="search" className="rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#121212] dark:shadow-2xl sm:p-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Skill or keyword</span>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"><Icon name="search" size={18} /></span>
          <input
            type="search" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Try “web developer”, “logo”, “bookkeeping”…"
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:border-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-gray-500 transition-colors"
          />
        </label>

        <label className="sm:w-48 relative">
          <span className="sr-only">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-4 pr-10 text-sm text-gray-900 focus-visible:border-brand focus-visible:outline-none dark:border-white/10 dark:bg-black dark:text-white transition-colors">
            <option value="">All categories</option>
            {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
        </label>

        <label className="sm:w-40 relative">
          <span className="sr-only">Work type</span>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-4 pr-10 text-sm text-gray-900 focus-visible:border-brand focus-visible:outline-none dark:border-white/10 dark:bg-black dark:text-white transition-colors">
            <option value="">Any work type</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="on_site">On-site</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
        </label>

        <Button type="submit" size="lg" className="sm:min-w-[120px]">Search</Button>
      </div>
    </form>
  )
}