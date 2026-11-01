import { sql } from '@/lib/db'

export async function getJobs({
  q, category, mode,
}: { q?: string; category?: string; mode?: string }) {
  
  let query = sql`
    SELECT j.*, p.full_name as client_name, c.name as category_name
    FROM jobs j
    JOIN profiles p ON j.client_id = p.id
    LEFT JOIN categories c ON j.category_id = c.id
    WHERE j.status = 'approved'
  `;

  if (q) {
    query = sql`${query} AND j.title ILIKE ${'%' + q + '%'}`;
  }
  if (mode) {
    query = sql`${query} AND j.work_mode = ${mode}`;
  }
  if (category) {
    query = sql`${query} AND c.slug = ${category}`;
  }

  query = sql`${query} ORDER BY j.is_featured DESC, j.created_at DESC`;

  const data = await query;

  return data.map((item: any) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    client_name: item.client_name,
    client_verified: true,
    category: item.category_name || 'Other',
    work_mode: item.work_mode,
    job_type: item.job_type,
    budget_type: item.budget_type,
    budget_min: Number(item.budget_min),
    budget_max: Number(item.budget_max),
    currency: item.currency,
    city: item.city,
    posted_at: item.created_at.toISOString(),
    skills: [], // We will connect skills to jobs in a later step
    description_short: item.description.substring(0, 100) + '...',
  }))
}