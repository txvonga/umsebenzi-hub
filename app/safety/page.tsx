import { Icon } from '@/components/icons'
import { LinkButton } from '@/components/ui/Button'

export const metadata = { title: 'Safety Tips | Umsebenzi Hub' }

export default function SafetyPage() {
  const scams = [
    { title: 'Fake Cheques & Overpayments', desc: 'A client sends a cheque for more than the agreed amount and asks you to wire back the difference. The original cheque will bounce weeks later, and you will lose the money you sent back.' },
    { title: 'Advance-Fee "Training" or "Registration"', desc: 'A "client" asks you to pay a fee for training, equipment, or registration before you can start the job. Legitimate employers never charge you to get hired.' },
    { title: 'Crypto and Gift Card Requests', desc: 'Anyone asking to pay you (or asking you to pay them) in Bitcoin, USDT, or gift cards (like Steam or iTunes cards) is almost certainly a scammer. These transactions cannot be reversed.' },
    { title: 'Fake International Clients', desc: 'Be cautious of overseas clients who want to move the conversation off-platform immediately to WhatsApp or Telegram and refuse to do a video call or provide verifiable company details.' },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-6">
          <Icon name="shield" size={32} />
        </span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Trust & Safety</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Umsebenzi Hub is built on trust. We want everyone to have a safe and successful experience. Please read these rules carefully.
        </p>
      </div>

      <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6 sm:p-8 mb-12">
        <h2 className="text-xl font-bold text-brand-dark dark:text-brand flex items-center gap-2 mb-2">
          <Icon name="alert" size={20} />
          Never pay a fee to get a job
        </h2>
        <p className="text-brand-dark/80 dark:text-brand/80">
          And never accept payment you cannot confirm. If anyone asks you for money to secure a job, it is a scam. Report them immediately.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Common Scams to Avoid</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {scams.map((scam, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{scam.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{scam.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Have you been targeted?</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-lg mx-auto">
          If you encounter a suspicious job or profile, please use the "Report" button on their profile or contact our support team immediately.
        </p>
        <LinkButton href="/contact" variant="secondary">Contact Support</LinkButton>
      </div>
    </div>
  )
}