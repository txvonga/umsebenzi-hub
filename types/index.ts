export type Currency = 'USD' | 'ZiG'
export type Availability = 'available' | 'busy' | 'unavailable'
export type JobType =
  | 'freelance_project'
  | 'part_time'
  | 'full_time'
  | 'contract'
  | 'internship'
export type WorkMode = 'remote' | 'hybrid' | 'on_site'
export type ExperienceLevel = 'entry' | 'intermediate' | 'expert'
export type BudgetType = 'fixed' | 'hourly'

export type IconName =
  | 'search' | 'map-pin' | 'check' | 'check-badge' | 'star'
  | 'menu' | 'x' | 'arrow-right' | 'arrow-up-right'
  | 'whatsapp' | 'briefcase' | 'globe' | 'building'
  | 'code' | 'palette' | 'pen-tool' | 'megaphone' | 'video'
  | 'user-check' | 'calculator' | 'headphones' | 'database'
  | 'book-open' | 'grid' | 'shield' | 'alert' | 'lock'
  | 'users' | 'sparkles'

export interface Category {
  slug: string
  name: string
  icon: IconName
  count: number
}

export interface FreelancerSummary {
  id: string
  slug: string
  full_name: string
  headline: string
  avatar_url: string | null
  city: string
  category: string
  skills: string[]
  hourly_rate: number
  currency: Currency
  availability: Availability
  is_verified: boolean
  rating: number | null
  reviews_count: number
  whatsapp_number: string
}

export interface JobSummary {
  id: string
  slug: string
  title: string
  client_name: string
  client_verified: boolean
  category: string
  work_mode: WorkMode
  job_type: JobType
  budget_type: BudgetType
  budget_min: number
  budget_max: number
  currency: Currency
  city: string | null
  posted_at: string
  skills: string[]
  description_short: string
}