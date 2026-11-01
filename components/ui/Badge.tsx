import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type Tone = 'green' | 'neutral' | 'dark'
const tones: Record<Tone, string> = {
  green: 'bg-brand-light text-brand-dark',
  neutral: 'bg-surface text-muted',
  dark: 'bg-ink text-white',
}

export function Badge({
  tone = 'green',
  className,
  ...props
}: ComponentPropsWithoutRef<'span'> & { tone?: Tone }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}