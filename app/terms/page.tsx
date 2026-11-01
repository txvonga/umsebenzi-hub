export const metadata = { title: 'Terms of Service | Umsebenzi Hub' }

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
      <div className="space-y-6 text-gray-600 dark:text-gray-400">
        <p>Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>By creating an account on Umsebenzi Hub, you agree to these terms. If you do not agree, please do not use the platform.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. User Conduct</h2>
          <p>You agree not to post fraudulent jobs, request advance fees from freelancers, or use the platform for illegal activities. We reserve the right to suspend any account violating these rules.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Independent Contractors</h2>
          <p>Freelancers are independent contractors, not employees of Umsebenzi Hub. We do not guarantee payment for work completed and are not responsible for disputes between clients and freelancers.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. No Payments or Escrow</h2>
          <p>Umsebenzi Hub currently does not handle payments. All payment arrangements are made directly between the client and freelancer. We do not offer escrow protection at this time.</p>
        </section>
      </div>
    </div>
  )
}