import { sql } from '@/lib/db'
import { site } from '@/lib/site'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch approved freelancers and jobs
  const freelancers = await sql`SELECT slug FROM freelancer_profiles WHERE status = 'approved'`
  const jobs = await sql`SELECT slug FROM jobs WHERE status = 'approved'`

  const freelancerUrls = freelancers.map((f) => ({
    url: `${site.url}/freelancers/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const jobUrls = jobs.map((j) => ({
    url: `${site.url}/jobs/${j.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  const staticUrls = [
    { url: site.url, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${site.url}/freelancers`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${site.url}/jobs`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${site.url}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${site.url}/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${site.url}/safety`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  return [...staticUrls, ...freelancerUrls, ...jobUrls]
}