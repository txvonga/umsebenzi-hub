import { site } from '@/lib/site'

export const metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-ink">Contact us</h1>
      <p className="mt-3 text-muted">
        We&apos;re a small team. Email is the fastest way to reach us and we usually reply within a
        day.
      </p>
      <ul className="mt-6 space-y-2 text-sm">
        <li>
          General enquiries:{' '}
          <a href={`mailto:${site.supportEmail}`} className="text-brand underline">
            {site.supportEmail}
          </a>
        </li>
        <li>
          Report a scam or safety issue:{' '}
          <a href={`mailto:${site.supportEmail}?subject=Safety report`} className="text-brand underline">
            {site.supportEmail}
          </a>
        </li>
      </ul>
    </article>
  )
}