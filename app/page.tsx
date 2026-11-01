import Link from 'next/link'
import { SearchBar } from '@/components/SearchBar'
import { CategoryCard } from '@/components/CategoryCard'
import { FreelancerCard } from '@/components/FreelancerCard'
import { JobCard } from '@/components/JobCard'
import { Icon } from '@/components/icons'
import { LinkButton } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CATEGORIES, FEATURED_FREELANCERS, LATEST_JOBS } from '@/lib/mock-data'
import { site } from '@/lib/site'

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-glow-gradient border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mx-auto bg-white/50 text-gray-800 border border-gray-200 shadow-sm dark:bg-white/10 dark:text-white dark:border-none dark:shadow-none">
              <Icon name="sparkles" size={12} className="text-brand" />
              {site.tagline}
            </Badge>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              Zimbabwean talent, <br className="hidden sm:block"/>
              <span className="text-brand">ready for work</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
              Umsebenzi Hub connects skilled Zimbabweans from Harare to Victoria Falls with clients
              who need reliable work done. Hire through WhatsApp in minutes. No fees to get hired.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <SearchBar />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Popular:</span>
              {['Web developer', 'Logo design', 'Virtual assistant', 'Copywriting'].map((k) => (
                <Link key={k} href={`/freelancers?q=${encodeURIComponent(k)}`} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 hover:border-brand/50 hover:text-brand dark:border-white/10 dark:bg-white/5 dark:hover:border-brand/50 dark:hover:text-white transition-colors">
                  {k}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section aria-labelledby="categories-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="categories-heading" className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Browse by category</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Find the right skill for the job in one tap.</p>
          </div>
          <LinkButton href="/freelancers" variant="ghost" size="sm" className="text-brand hover:bg-brand/10">View all <Icon name="arrow-right" size={16} /></LinkButton>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => <li key={c.slug}><CategoryCard c={c} /></li>)}
        </ul>
      </section>

      {/* FEATURED FREELANCERS */}
      <section aria-labelledby="featured-heading" className="border-y border-gray-200 bg-gray-50 dark:border-white/5 dark:bg-[#0A0A0A]/50 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="featured-heading" className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Featured freelancers</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Verified, ready-to-work talent from across Zimbabwe.</p>
            </div>
            <LinkButton href="/freelancers" variant="ghost" size="sm" className="text-brand hover:bg-brand/10">See all talent <Icon name="arrow-right" size={16} /></LinkButton>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_FREELANCERS.map((f) => <FreelancerCard key={f.id} f={f} />)}
          </div>
        </div>
      </section>

      {/* LATEST JOBS */}
      <section aria-labelledby="jobs-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="jobs-heading" className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Latest jobs</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Fresh opportunities from clients across the country.</p>
          </div>
          <LinkButton href="/jobs" variant="ghost" size="sm" className="text-brand hover:bg-brand/10">See all jobs <Icon name="arrow-right" size={16} /></LinkButton>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {LATEST_JOBS.map((j) => <JobCard key={j.id} j={j} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section aria-labelledby="how-heading" className="bg-gray-100 dark:bg-[#121212] border-y border-gray-200 dark:border-white/5 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="how-heading" className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">How Umsebenzi Hub works</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Simple for both sides. No fuss, no fees to get hired.</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white dark:bg-[#0A0A0A] p-8 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">For freelancers</h3>
              <ol className="mt-6 space-y-6">
                {[
                  ['Create your profile', 'Add your skills, portfolio and rate in USD or ZiG.'],
                  ['Get verified & approved', 'Our team reviews your profile before anything goes live.'],
                  ['Get hired on WhatsApp', 'Clients contact you directly. Reply quickly, win the work.'],
                ].map(([title, desc], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand font-bold">{i + 1}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{title}</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#0A0A0A] p-8 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">For clients</h3>
              <ol className="mt-6 space-y-6">
                {[
                  ['Post a job or search talent', 'Tell us what you need, fixed or hourly, in USD or ZiG.'],
                  ['Review proposals or profiles', 'Shortlist, invite, and message directly on WhatsApp.'],
                  ['Get the work done', 'Deliverables in hand. No middleman, no surprises.'],
                ].map(([title, desc], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand font-bold">{i + 1}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{title}</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section aria-labelledby="trust-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brand/20 bg-brand/5 p-6 sm:p-10 relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-brand/10 dark:bg-brand/20 blur-3xl transition-colors duration-300"></div>
          
          <div className="relative flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <Icon name="shield" size={24} />
            </span>
            <div>
              <h2 id="trust-heading" className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">Never pay a fee to get a job</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                And never accept payment you cannot confirm. Beware of fake cheques, training or registration fees, and any request for crypto or gift cards.
              </p>
            </div>
          </div>

          <div className="relative mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['check-badge', 'Verified profiles', 'Our team checks IDs before a Verified badge is shown.'],
              ['alert', 'Report a scam', 'Any job or profile can be reported in one tap.'],
              ['lock', 'WhatsApp-first', 'No payments or card details are ever collected by us.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="rounded-2xl bg-white dark:bg-[#0A0A0A] p-5 border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none transition-colors">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon name={icon as any} size={20} />
                </span>
                <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUAL CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-brand p-8 text-white relative overflow-hidden">
            <h3 className="text-2xl font-bold relative z-10">Ready to find work?</h3>
            <p className="mt-2 text-sm text-white/90 relative z-10">Create your freelancer profile in minutes. It&apos;s free to get hired.</p>
            <LinkButton href="/signup?role=freelancer" variant="dark" className="mt-8 relative z-10 border-transparent bg-black hover:bg-black/80">Create your profile <Icon name="arrow-right" size={16} /></LinkButton>
          </div>
          <div className="rounded-3xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 p-8 text-gray-900 dark:text-white relative overflow-hidden shadow-sm dark:shadow-none transition-colors">
            <h3 className="text-2xl font-bold relative z-10">Need to hire?</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 relative z-10">Post a job or browse vetted freelancers and contact them directly on WhatsApp.</p>
            <LinkButton href="/signup?role=client" variant="primary" className="mt-8 relative z-10">Post a job <Icon name="arrow-right" size={16} /></LinkButton>
          </div>
        </div>
      </section>
    </>
  )
}