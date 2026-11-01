import { Icon } from './icons'
import { clsx } from 'clsx'
import { whatsappHref } from '@/lib/phone'

export function WhatsAppButton({
  phone,
  message,
  label = 'Chat on WhatsApp',
  className,
}: {
  phone: string
  message: string
  label?: string
  className?: string
}) {
  return (
    <a
      href={whatsappHref(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        className,
      )}
    >
      <Icon name="whatsapp" size={18} />
      {label}
    </a>
  )
}