'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [companyName, setCompanyName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const router = useRouter()

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
                        <linearGradient id="gearGradSP" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FF6B6B', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <circle cx="0" cy="0" r="8" fill="none" stroke="url(#gearGradSP)" strokeWidth="1.8" />
                    <circle cx="0" cy="0" r="3" fill="url(#gearGradSP)" />
                    <rect x="-1.2" y="-9.5" width="2.4" height="3" fill="url(#gearGradSP)" rx="0.5" />
                    <rect x="-1.2" y="6.5" width="2.4" height="3" fill="url(#gearGradSP)" rx="0.5" />
                    <rect x="-9.5" y="-1.2" width="3" height="2.4" fill="url(#gearGradSP)" rx="0.5" />
                    <rect x="6.5" y="-1.2" width="3" height="2.4" fill="url(#gearGradSP)" rx="0.5" />
                    <rect transform="rotate(45)" x="-1.2" y="-9.5" width="2.4" height="3" fill="url(#gearGradSP)" rx="0.5" />
                    <rect transform="rotate(45)" x="-1.2" y="6.5" width="2.4" height="3" fill="url(#gearGradSP)" rx="0.5" />
                    <rect transform="rotate(-45)" x="-1.2" y="-9.5" width="2.4" height="3" fill="url(#gearGradSP)" rx="0.5" />
                    <rect transform="rotate(-45)" x="-1.2" y="6.5" width="2.4" height="3" fill="url(#gearGradSP)" rx="0.5" />
                </g>
            </g>
            <text x="59" y="45" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="36" fill="#0F172A" letterSpacing="2">xr</text>
        </svg>
    )

    // Eye icon for password toggle
    const EyeIcon = ({ show }: { show: boolean }) => (
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {show ? (
                <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </>
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            )}
        </svg>
    )

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name, companyName }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed')
            }

            // Auto-login after successful registration
            const loginResponse = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (loginResponse.ok) {
                router.push('/dashboard')
                router.refresh()
            } else {
                router.push('/login?registered=true')
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignup = async () => {
        setGoogleLoading(true)
        setError('')

        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?signup=true`,
                },
            })

            if (error) {
                throw error
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Google signup failed'
            setError(errorMessage)
            setGoogleLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Side - Signup Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 bg-white py-12">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="mb-10">
                        <FloxrLogo />
                    </div>

                    {/* Heading */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started Free</h1>
                        <p className="text-gray-500 text-sm">Create your account and start onboarding</p>
                    </div>

                    {/* Google Signup Button */}
                    <button
                        onClick={handleGoogleSignup}
                        disabled={googleLoading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 mb-6"
                    >
                        {googleLoading ? (
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        )}
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or continue with email</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                <input
                                    id="companyName"
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 text-sm"
                                    placeholder="Acme Inc."
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Work Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 text-sm"
                                placeholder="you@company.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                                >
                                    <EyeIcon show={showPassword} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                            {!loading && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">Sign In</Link>
                        </p>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-4">
                        By signing up, you agree to our{' '}
                        <Link href="/terms" className="text-indigo-600 hover:underline">Terms</Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 items-center justify-center p-12">
                <div className="max-w-lg w-full">
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">
                        <div className="mb-8 flex justify-center">
                            <svg viewBox="0 0 200 200" className="w-56 h-56">
                                <circle cx="30" cy="40" r="2" fill="white" opacity="0.7" />
                                <circle cx="170" cy="30" r="1.5" fill="white" opacity="0.8" />
                                <circle cx="180" cy="100" r="1" fill="white" opacity="0.6" />
                                <circle cx="20" cy="150" r="1.5" fill="white" opacity="0.7" />
                                <path d="M85,140 L85,70 Q85,50 100,40 Q115,50 115,70 L115,140 Z" fill="#6366f1" stroke="#4338ca" strokeWidth="1" />
                                <circle cx="100" cy="85" r="10" fill="#93c5fd" stroke="#4338ca" strokeWidth="1" />
                                <circle cx="100" cy="85" r="6" fill="#dbeafe" />
                                <path d="M100,40 L90,55 L110,55 Z" fill="#fbbf24" />
                                <path d="M85,100 L65,130 L85,130 Z" fill="#4f46e5" />
                                <path d="M115,100 L135,130 L115,130 Z" fill="#4f46e5" />
                                <path d="M88,140 Q95,165 100,160 Q105,165 112,140 Z" fill="#ef4444" />
                                <path d="M92,155 Q98,175 100,170 Q102,175 108,155 Z" fill="#fbbf24" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-3">Start Your Journey</h2>
                            <p className="text-white/80 text-base">Join thousands automating their onboarding</p>
                        </div>
                        <div className="flex justify-center gap-2 mt-8">
                            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                            <div className="w-8 h-2 bg-white rounded-full"></div>
                            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
