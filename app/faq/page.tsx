export const metadata = { title: 'FAQ | Umsebenzi Hub' }

export default function FAQPage() {
  const faqs = [
    { q: 'How much does it cost to use Umsebenzi Hub?', a: 'It is completely free to create an account, post jobs, and apply for jobs. We never charge freelancers a fee to get hired.' },
    { q: 'How do I contact a freelancer or client?', a: 'All communication happens via WhatsApp. On any job or profile page, click the "Chat on WhatsApp" button, and it will open a pre-filled message on your phone.' },
    { q: 'How long does it take for my job or profile to go live?', a: 'Our admin team reviews all jobs and profiles to ensure they meet our safety guidelines. This usually takes less than 24 hours.' },
    { q: 'Does Umsebenzi Hub handle payments?', a: 'No, we do not process payments or hold funds in escrow. Clients and freelancers arrange payment directly between themselves.' },
    { q: 'How do I get a "Verified" badge?', a: 'Our team manually reviews profiles and ID documents for clients and freelancers who apply. Verified badges help build trust but are not a guarantee of work quality.' },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-500 dark:text-gray-400">Everything you need to know about Umsebenzi Hub.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}