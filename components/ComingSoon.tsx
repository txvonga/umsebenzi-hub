import { LinkButton } from './ui/Button'
import { Icon } from './icons'

export function ComingSoon({
  title,
  description,
  backHref = '/',
  backLabel = 'Back to home',
}: {
  title: string
  description: string
  backHref?: string
  backLabel?: string
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
        <Icon name="sparkles" size={26} />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-ink">{title}</h1>
      <p className="mt-3 text-muted">{description}</p>
      <div className="mt-8">
        <LinkButton href={backHref} variant="secondary">
          {backLabel}
        </LinkButton>
      </div>
    </div>
  )
}