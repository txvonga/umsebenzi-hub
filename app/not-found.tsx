import Link from 'next/link'
import { LinkButton } from '@/components/ui/Button'
import { LogoMark } from '@/components/Logo'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <LogoMark size={56} />
      <h1 className="mt-6 text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 text-muted">
        The page you were looking for isn&apos;t here. It may have moved, or the link might be broken.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/">Back to home</LinkButton>
        <LinkButton href="/freelancers" variant="secondary">
          Browse talent
        </LinkButton>
      </div>
      <p className="mt-8 text-xs text-muted">
        Need help?{' '}
        <Link href="/contact" className="text-brand underline">
          Contact us
        </Link>
        .
      </p>
    </div>
  )
}