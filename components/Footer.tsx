import Link from 'next/link'
import { Logo } from './Logo'
import { Icon } from './icons'
import { site } from '@/lib/site'

const groups = [
  {
    title: 'For freelancers',
    links: [
      { href: '/jobs', label: 'Find work' },
      { href: '/signup', label: 'Create a profile' },
      { href: '/safety', label: 'Safety tips' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'For clients',
    links: [
      { href: '/freelancers', label: 'Find talent' },
      { href: '/signup', label: 'Post a job' },
      { href: '/safety', label: 'Trust & safety' },
      { href: '/contact', label: 'Contact us' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/terms', label: 'Terms' },
      { href: '/privacy', label: 'Privacy' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white text-gray-900 dark:border-white/5 dark:bg-[#0A0A0A] dark:text-white transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm font-semibold text-gray-900 dark:text-white">
              {site.tagline}
            </p>
            <p className="mt-3 max-w-xs text-sm text-gray-500 dark:text-gray-400">
              {site.description}
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {g.title}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-gray-500 hover:text-brand dark:text-gray-400 dark:hover:text-brand transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-gray-200 dark:border-white/10 pt-8 text-xs text-gray-500 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Made in Zimbabwe 🇿🇼
          </p>
          <p className="inline-flex items-center gap-1.5 font-medium text-gray-700 dark:text-white/80">
            <Icon name="shield" size={14} className="text-brand" /> Never pay a fee to get a job.
          </p>
        </div>
      </div>
    </footer>
  )
}