'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { Icon } from './icons'
import { LinkButton, Button } from './ui/Button'
import { ThemeToggle } from './ThemeToggle'
import { useSession, signOut } from '@/lib/auth-client'

const NAV_LINKS = [
  { href: '/freelancers', label: 'Find talent' },
  { href: '/jobs', label: 'Find work' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { data: session, isPending } = useSession()
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if the logged-in user is an admin
  useEffect(() => {
    if (session?.user?.id) {
      fetch('/api/check-admin')
        .then(res => res.json())
        .then(data => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false))
    } else {
      setIsAdmin(false)
    }
  }, [session])

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-[#0A0A0A]/80 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-200 dark:bg-white/10"></div>
          ) : session ? (
            <>
              {isAdmin && (
                <LinkButton href="/admin" variant="secondary" size="sm" className="text-brand border-brand/20 bg-brand/5">
                  Admin
                </LinkButton>
              )}
              <LinkButton href="/dashboard" variant="ghost" size="sm">Dashboard</LinkButton>
              <Button variant="secondary" size="sm" onClick={async () => {
                await signOut()
                window.location.href = '/'
              }}>Log out</Button>
            </>
          ) : (
            <>
              <LinkButton href="/login" variant="ghost" size="sm">Log in</LinkButton>
              <LinkButton href="/signup" size="sm">Sign up</LinkButton>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button type="button" onClick={() => setOpen((v) => !v)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10 transition-colors">
            <Icon name={open ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-gray-200 bg-white dark:border-white/10 dark:bg-[#0A0A0A] md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/5 transition-colors">
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-gray-200 dark:border-white/10 pt-3">
              {session ? (
                <>
                  {isAdmin && (
                    <LinkButton href="/admin" variant="secondary" onClick={() => setOpen(false)}>
                      Admin Dashboard
                    </LinkButton>
                  )}
                  <LinkButton href="/dashboard" onClick={() => setOpen(false)}>Dashboard</LinkButton>
                  <Button variant="secondary" onClick={async () => { 
                    await signOut(); 
                    setOpen(false); 
                    window.location.href = '/';
                  }}>Log out</Button>
                </>
              ) : (
                <>
                  <LinkButton href="/login" variant="ghost" onClick={() => setOpen(false)}>Log in</LinkButton>
                  <LinkButton href="/signup" onClick={() => setOpen(false)}>Sign up</LinkButton>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}