import type { Currency, BudgetType } from '@/types'

export function formatRate(amount: number, currency: Currency): string {
  return currency === 'USD' ? `$${amount}/hr` : `ZiG ${amount}/hr`
}

export function formatBudget(
  min: number,
  max: number,
  currency: Currency,
  type: BudgetType,
): string {
  const symbol = currency === 'USD' ? '$' : 'ZiG '
  const range = min === max ? `${symbol}${min}` : `${symbol}${min}–${max}`
  return type === 'hourly' ? `${range}/hr` : range
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const day = 86_400_000
  if (diff < day) return 'Today'
  if (diff < 2 * day) return 'Yesterday'
  if (diff < 7 * day) return `${Math.floor(diff / day)} days ago`
  if (diff < 30 * day) return `${Math.floor(diff / (7 * day))} weeks ago`
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}