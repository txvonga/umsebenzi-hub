'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp } from '@/lib/auth-client'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/Logo'

export default function SignupPage() {
  const router = useRouter()
  const [role, setRole] = useState<'freelancer' | 'client'>('freelancer')
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: role, // Pass role to backend
    } as any)

    if (error) {
      setError(error.message || 'Failed to sign up')
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh() // Force refresh so the Navbar updates
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-white/10 dark:bg-[#121212]">
        <div className="text-center">
          <Logo className="mx-auto justify-center" />
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Create an account</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Join Umsebenzi Hub today.</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
          
          <div className="flex gap-2 rounded-xl bg-gray-100 p-1 dark:bg-white/5">
            <button type="button" onClick={() => setRole('freelancer')} className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${role === 'freelancer' ? 'bg-white text-gray-900 shadow dark:bg-[#121212] dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'}`}>I want to work</button>
            <button type="button" onClick={() => setRole('client')} className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${role === 'client' ? 'bg-white text-gray-900 shadow dark:bg-[#121212] dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'}`}>I want to hire</button>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" placeholder="Tapiwa Moyo" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" placeholder="you@example.com" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" placeholder="••••••••" />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</Button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account? <Link href="/login" className="font-medium text-brand hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}