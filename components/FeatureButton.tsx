'use client'

import { Icon } from './icons'

export function FeatureButton({ type }: { type: 'profile' | 'job' }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    alert(`Feature this ${type} is coming soon! This will allow users to pay to boost their ${type} to the top of the directory.`)
  }

  return (
    <button 
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-dark transition-colors"
    >
      <Icon name="sparkles" size={16} /> Feature this {type}
    </button>
  )
}