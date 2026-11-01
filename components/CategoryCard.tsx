import Link from 'next/link'
import { Icon } from './icons'
import type { Category } from '@/types'

export function CategoryCard({ c }: { c: Category }) {
  return (
    <Link
      href={`/freelancers/${c.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-brand/30 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-white/10 dark:bg-[#121212] dark:hover:border-white/20 dark:hover:bg-white/5"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 group-hover:text-brand dark:bg-white/5 dark:text-white transition-colors">
        <Icon name={c.icon} size={22} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-base font-semibold text-gray-900 dark:text-white">{c.name}</span>
        <span className="block text-sm text-gray-500 dark:text-gray-400 mt-0.5">{c.count} pros</span>
      </span>
      <Icon name="arrow-right" size={18} className="text-gray-400 group-hover:text-brand dark:text-gray-500 dark:group-hover:text-white transition-colors" />
    </Link>
  )
}