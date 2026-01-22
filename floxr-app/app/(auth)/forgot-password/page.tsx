'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send reset email')
            }

            setSent(true)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Floxr Logo Component with rotating gear
    const FloxrLogo = () => (
        <svg width="135" height="60" viewBox="0 0 135 60" xmlns="http://www.w3.org/2000/svg">
            <style>{`
        @keyframes rotate-gear { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        .gear-rotate { animation: rotate-gear 4s linear infinite; transform-origin: 0px 0px; }
      `}</style>
            <text x="10" y="45" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="36" fill="#0F172A" letterSpacing="2">fl</text>
            <g transform="translate(48, 35)">
                <g className="gear-rotate">
                    <defs>
                        <linearGradient id="gearGradFP" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FF6B6B', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <circle cx="0" cy="0" r="8" fill="none" stroke="url(#gearGradFP)" strokeWidth="1.8" />
                    <circle cx="0" cy="0" r="3" fill="url(#gearGradFP)" />
                    <rect x="-1.2" y="-9.5" width="2.4" height="3" fill="url(#gearGradFP)" rx="0.5" />
                    <rect x="-1.2" y="6.5" width="2.4" height="3" fill="url(#gearGradFP)" rx="0.5" />
                    <rect x="-9.5" y="-1.2" width="3" height="2.4" fill="url(#gearGradFP)" rx="0.5" />
                    <rect x="6.5" y="-1.2" width="3" height="2.4" fill="url(#gearGradFP)" rx="0.5" />
                    <rect transform="rotate(45)" x="-1.2" y="-9.5" width="2.4" height="3" fill="url(#gearGradFP)" rx="0.5" />
                    <rect transform="rotate(45)" x="-1.2" y="6.5" width="2.4" height="3" fill="url(#gearGradFP)" rx="0.5" />
                    <rect transform="rotate(-45)" x="-1.2" y="-9.5" width="2.4" height="3" fill="url(#gearGradFP)" rx="0.5" />
                    <rect transform="rotate(-45)" x="-1.2" y="6.5" width="2.4" height="3" fill="url(#gearGradFP)" rx="0.5" />
                </g>
            </g>
            <text x="59" y="45" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="36" fill="#0F172A" letterSpacing="2">xr</text>
        </svg>
    )

    if (sent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="w-full max-w-md text-center">
                    <div className="mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>Check your email</h1>
                        <p className="mt-2" style={{ color: '#4B5563' }}>
                            We sent a password reset link to <strong>{email}</strong>
                        </p>
                    </div>
                    <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md">
                {/* Logo with rotating gear */}
                <div className="mb-10">
                    <FloxrLogo />
                </div>

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: '#111827' }}>Forgot Password?</h1>
                    <p className="text-sm" style={{ color: '#6B7280' }}>No worries, we'll send you reset instructions.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900 text-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/login" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
