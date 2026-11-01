import { createClient } from '@/utils/supabase/server' // If you still have supabase imports here, remove them!
import { sql } from '@/lib/db'

export async function getFreelancers({
  q, category, mode,
}: { q?: string; category?: string; mode?: string }) {
  
  let query = sql`
    SELECT f.*, p.full_name, p.city, p.avatar_url, p.whatsapp_number, c.name as category_name
    FROM freelancer_profiles f
    JOIN profiles p ON f.user_id = p.id
    LEFT JOIN categories c ON f.category_id = c.id
    WHERE f.status = 'approved'
  `;

  if (q) {
    query = sql`${query} AND f.headline ILIKE ${'%' + q + '%'}`;
  }
  if (category) {
    query = sql`${query} AND c.slug = ${category}`;
  }
  
  query = sql`${query} ORDER BY f.is_featured DESC, f.created_at DESC`;

  const data = await query;

  // Fetch skills for each freelancer
  const freelancersWithSkills = await Promise.all(data.map(async (item: any) => {
    const skillsData = await sql`
      SELECT s.name FROM freelancer_skills fs
      JOIN skills s ON fs.skill_id = s.id
      WHERE fs.freelancer_id = ${item.id}
    `
    return {
      id: item.id,
      slug: item.slug,
      full_name: item.full_name,
      headline: item.headline,
      avatar_url: item.avatar_url,
      city: item.city || 'Zimbabwe',
      category: item.category_name || 'Other',
      skills: skillsData.map((s: any) => s.name),
      hourly_rate: Number(item.hourly_rate),
      currency: item.currency,
      availability: item.availability,
      is_verified: true,
      rating: 5.0,
      reviews_count: 0,
      whatsapp_number: item.whatsapp_number || '+263771234567',
    }
  }))

  return freelancersWithSkills
}