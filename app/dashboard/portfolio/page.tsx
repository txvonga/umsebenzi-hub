import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { sql } from '@/lib/db'
import { PortfolioForm } from './PortfolioForm'
import { deletePortfolioItem } from '@/lib/actions/portfolio'
import Image from 'next/image'

export default async function PortfolioPage() {
  const session = await auth.api.getSession({ headers: headers() })
  if (!session) redirect('/login')

  const profiles = await sql`SELECT id FROM freelancer_profiles WHERE user_id = ${session.user.id}`
  const profile = profiles[0]
  if (!profile) redirect('/dashboard/profile')

  const items = await sql`
    SELECT * FROM portfolio_items 
    WHERE freelancer_id = ${profile.id} 
    ORDER BY created_at DESC
  `

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Showcase your best work to win more clients.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add New Item</h2>
          <PortfolioForm />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Work ({items.length}/12)</h2>
          <div className="space-y-4">
            {items.length === 0 ? (
              <p className="text-sm text-gray-500">No portfolio items yet.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#121212]">
                  <div className="h-20 w-20 shrink-0 relative rounded-lg overflow-hidden bg-gray-100">
                    <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{item.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{item.description}</p>
                  </div>
                  <form action={async () => {
                    'use server'
                    await deletePortfolioItem(item.id)
                  }}>
                    <button type="submit" className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
                  </form>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}