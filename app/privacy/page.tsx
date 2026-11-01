export const metadata = { title: 'Privacy Policy | Umsebenzi Hub' }

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-gray-600 dark:text-gray-400">
        <p>Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as your name, email address, phone number, and professional details when you create an account.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
          <p>We use your information to operate the platform, connect freelancers with clients, send important updates, and maintain the security of the platform.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Data Protection Act Compliance</h2>
          <p>We comply with Zimbabwe&apos;s Cyber and Data Protection Act [Chapter 12:07]. We implement reasonable security measures to protect your personal data from unauthorised access, alteration, or destruction.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Sharing Your Information</h2>
          <p>If you are a freelancer, your public profile (name, skills, bio) is visible to the public. Your contact number is only revealed via the WhatsApp click-to-chat feature. We do not sell your personal data to third parties.</p>
        </section>
      </div>
    </div>
  )
}