import Image from 'next/image'
import { getInitials } from '@/lib/utils'

export function Avatar({
  name,
  src,
  size = 56,
}: {
  name: string
  src: string | null
  size?: number
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={`${name}'s profile picture`}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-brand-light font-semibold text-brand-dark"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  )
}