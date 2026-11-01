import { site } from './site'

// Normalise any Zimbabwean phone number to E.164 (+263…).
export function normaliseZimPhone(input: string): string {
  const digits = input.replace(/\D/g, '')
  if (digits.startsWith('263')) return `+${digits}`
  if (digits.startsWith('0')) return `+263${digits.slice(1)}`
  return `+263${digits}`
}

// Build a WhatsApp click-to-chat URL with a pre-filled message.
export function whatsappHref(phone: string, message: string): string {
  const normalised = normaliseZimPhone(phone).replace('+', '')
  return `https://wa.me/${normalised}?text=${encodeURIComponent(message)}`
}

// Default message used on freelancer profiles — includes name + profile URL.
export function freelancerWhatsAppMessage(name: string, slug: string): string {
  return `Hi ${name}, I found your profile on ${site.name} (${site.url}/freelancers/${slug}). I'd like to talk about a project.`
}

// Default message used on job detail pages.
export function jobWhatsAppMessage(jobTitle: string, slug: string): string {
  return `Hi, I'm interested in "${jobTitle}" on ${site.name} (${site.url}/jobs/${slug}). Is the role still open?`
}