import Link from 'next/link'
import { clsx } from 'clsx'
import { site } from '@/lib/site'

export function Logo({
  href = '/',
  size = 'md',
  className,
}: {
  href?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const dims = { sm: 28, md: 34, lg: 42 }[size]
  const text = {
    sm: 'text-[17px]',
    md: 'text-xl',
    lg: 'text-3xl',
  }[size]

  return (
    <Link
      href={href}
      aria-label={`${site.name} — home`}
      className={clsx(
        'inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0A]',
        className,
      )}
    >
      <LogoMark size={dims} />
      <span className={clsx('font-bold tracking-tight lowercase', text)}>
        <span className="text-gray-900 dark:text-white">umsebenzi</span>
        <span className="text-brand"> hub</span>
      </span>
    </Link>
  )
}

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Red rounded background */}
      <rect width="40" height="40" rx="10" fill="#E53E3E" />
      
      {/* White 'U' shape */}
      <path 
        d="M 11 13 V 22 A 9 9 0 0 0 29 22 V 13" 
        stroke="#FFFFFF" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        fill="none" 
      />
      
      {/* Black connecting lines */}
      <path 
        d="M 11 13 L 20 20 L 29 13" 
        stroke="#000000" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
      
      {/* Black nodes */}
      <circle cx="11" cy="13" r="3" fill="#000000" />
      <circle cx="29" cy="13" r="3" fill="#000000" />
      <circle cx="20" cy="20" r="3.5" fill="#000000" />
    </svg>
  )
}