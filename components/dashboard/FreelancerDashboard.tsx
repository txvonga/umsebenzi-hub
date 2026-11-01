import Link from 'next/link'
import { LinkButton } from '../ui/Button'
import { Icon } from '../icons'

export function FreelancerDashboard({ profile, completeness, whatsappClicks }: { profile: any, completeness: number, whatsappClicks: number }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile completeness</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {completeness === 100 ? 'Your profile is fully complete. Great job!' : 'Complete your profile to get hired faster.'}
            </p>
          </div>
          <span className="text-2xl font-bold text-brand">{completeness}%</span>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
          <div 
            className="h-full bg-brand rounded-full transition-all duration-500" 
            style={{ width: `${completeness}%` }}
          ></div>
        </div>
        <div className="mt-6">
          <LinkButton href={`/dashboard/profile`} size="sm">
            {completeness === 100 ? 'View Profile' : 'Complete Profile'}
          </LinkButton>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Your Activity</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">Profile views</span>
              <span className="font-medium text-gray-900 dark:text-white">12</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">WhatsApp clicks</span>
              <span className="font-medium text-brand">{whatsappClicks}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">Proposals sent</span>
              <Link href="/dashboard/proposals" className="font-medium text-brand hover:underline">View</Link>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
          <div className="space-y-3">
            <Link href="/dashboard/proposals" className="block text-sm font-medium text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-brand">My Proposals</Link>
            <Link href="/dashboard/saved" className="block text-sm font-medium text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-brand">Saved Items</Link>
            <Link href="/dashboard/profile" className="block text-sm font-medium text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-brand">Edit Profile</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212] flex flex-col items-center justify-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand mb-4">
            <Icon name="search" size={24} />
          </span>
          <h3 className="font-semibold text-gray-900 dark:text-white">Find work</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">Browse the latest jobs.</p>
          <LinkButton href="/jobs" variant="secondary" size="sm">Browse Jobs</LinkButton>
        </div>
      </div>
    </div>
  )
}