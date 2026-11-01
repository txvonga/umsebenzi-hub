import Link from 'next/link'
import { clsx } from 'clsx'
import { site } from '@/lib/site'

export function Logo({ href = '/', size = 'md', className }: { href?: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const dims = { sm: 28, md: 34, lg: 42 }[size]
  const text = { sm: 'text-[15px]', md: 'text-lg', lg: 'text-2xl' }[size]

  return (
    <Link
      href={href}
      aria-label={`${site.name} — home`}
      className={clsx('inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand', className)}
    >
      <LogoMark size={dims} />
      <span className={clsx('font-bold tracking-tight', text)}>
        <span className="text-gray-900 dark:text-white transition-colors">Umsebenzi</span>
        <span className="text-brand"> Hub</span>
      </span>
    </Link>
  )
}

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="#E53E3E" />
      <rect x="8" y="13" width="24" height="16" rx="3" fill="#FFFFFF" />
      <path d="M15 13V11a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="m14 21 4 4 8-8" stroke="#E53E3E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}