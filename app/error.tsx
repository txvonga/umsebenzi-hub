'use client'

import { useEffect } from 'react'
import { Button, LinkButton } from '@/components/ui/Button'
import { LogoMark } from '@/components/Logo'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <LogoMark size={56} />
      <h1 className="mt-6 text-3xl font-bold text-ink">Something went wrong</h1>
      <p className="mt-3 text-muted">
        Please try again. If the problem continues, refresh the page or come back in a few minutes.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <LinkButton href="/" variant="secondary">
          Back to home
        </LinkButton>
      </div>
    </div>
  )
}