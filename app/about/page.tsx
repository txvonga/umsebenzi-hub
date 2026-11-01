import { site } from '@/lib/site'

export const metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">About {site.name}</h1>
      <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{site.tagline}</p>

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
        <p>
          {site.name} is a Zimbabwean marketplace for freelancers and remote workers. Our mission is
          simple: help skilled Zimbabweans get discovered and hired, from Harare to Bulawayo, Mutare
          to Victoria Falls, while giving local businesses, NGOs, startups and international
          companies a trusted way to find reliable talent.
        </p>
        <p>
          We believe in simple language, fair dealing and honest work. Every profile and job is
          reviewed before it goes live. Every contact happens on WhatsApp. And we will never charge
          anyone a fee to get hired.
        </p>
      </div>
    </article>
  )
}