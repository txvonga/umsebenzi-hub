'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/auth-client'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/Logo'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signIn.email({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      setError(error.message || 'Invalid email or password')
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
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Log in to your account.</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
          
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" placeholder="you@example.com" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="mt-1 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 focus:border-brand focus:outline-none dark:border-white/10 dark:bg-black dark:text-white" placeholder="••••••••" />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</Button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account? <Link href="/signup" className="font-medium text-brand hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}