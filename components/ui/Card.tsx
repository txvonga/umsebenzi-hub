import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

export function Card({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx('rounded-2xl border border-gray-200 bg-white shadow-card dark:border-white/10 dark:bg-[#121212] dark:shadow-card-dark transition-colors duration-300', className)}
      {...props}
    />
  )
}