import Link from 'next/link'
import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const base = 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0A0A0A] disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark shadow-[0_0_20px_rgba(229,62,62,0.2)]',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 border border-transparent dark:border-white/10',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white',
  dark: 'bg-black text-white border border-transparent hover:bg-gray-800 dark:bg-black dark:border-white/20 dark:hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm sm:text-base',
  lg: 'px-5 py-3 text-base',
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & { variant?: Variant; size?: Size }
type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & { variant?: Variant; size?: Size }

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />
}

export function LinkButton({ variant = 'primary', size = 'md', className, ...props }: LinkButtonProps) {
  return <Link className={clsx(base, variants[variant], sizes[size], className)} {...props} />
}