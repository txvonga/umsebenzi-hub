import { sql } from '@/lib/db'
import { FreelancerCard } from '@/components/FreelancerCard'
import { notFound } from 'next/navigation'

export default async function SeoFreelancerPage({ params }: { params: { category: string, city: string } }) {
  const decodedCity = decodeURIComponent(params.city).replace('-', ' ')

  const freelancersData = await sql`
    SELECT f.*, p.full_name, p.city, p.avatar_url, c.name as category_name
    FROM freelancer_profiles f
    JOIN profiles p ON f.user_id = p.id
    JOIN categories c ON f.category_id = c.id
    WHERE f.status = 'approved' AND c.slug = ${params.category} AND LOWER(p.city) = LOWER(${decodedCity})
  `

  if (freelancersData.length === 0 && params.category === 'invalid') notFound()

  const freelancers = freelancersData.map((item: any) => ({
    id: item.id, slug: item.slug, full_name: item.full_name, headline: item.headline,
    avatar_url: item.avatar_url, city: item.city || 'Zimbabwe', category: item.category_name,
    skills: [], hourly_rate: Number(item.hourly_rate), currency: item.currency,
    availability: item.availability, is_verified: true, rating: 5.0, reviews_count: 0,
    whatsapp_number: '+263771234567',
  }))

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl capitalize">
          {params.category.replace('-', ' ')} in {decodedCity}
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Find the best {params.category.replace('-', ' ')} freelancers in {decodedCity}. Hired directly on WhatsApp.
        </p>
      </div>

      {freelancers.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400">No freelancers found in this category and city yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {freelancers.map((f) => <FreelancerCard key={f.id} f={f} />)}
        </div>
      )}
    </div>
  )
}