'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

// Floxr Logo Component with rotating gear (dark theme version)
const FloxrLogo = () => (
    <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
        <style>{`
            @keyframes rotate-gear { 
                from { transform: rotate(0deg); } 
                to { transform: rotate(360deg); } 
            }
            .gear-rotate { animation: rotate-gear 4s linear infinite; transform-origin: 0px 0px; }
        `}</style>
        <text x="0" y="32" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" fill="white" letterSpacing="1">fl</text>
        <g transform="translate(32, 24)">
            <g className="gear-rotate">
                <defs>
                    <linearGradient id="gearGradAuth" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <circle cx="0" cy="0" r="6" fill="none" stroke="url(#gearGradAuth)" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="2.5" fill="url(#gearGradAuth)" />
                <rect x="-1" y="-7.5" width="2" height="2.5" fill="url(#gearGradAuth)" rx="0.5" />
                <rect x="-1" y="5" width="2" height="2.5" fill="url(#gearGradAuth)" rx="0.5" />
                <rect x="-7.5" y="-1" width="2.5" height="2" fill="url(#gearGradAuth)" rx="0.5" />
                <rect x="5" y="-1" width="2.5" height="2" fill="url(#gearGradAuth)" rx="0.5" />
                <rect transform="rotate(45)" x="-1" y="-7.5" width="2" height="2.5" fill="url(#gearGradAuth)" rx="0.5" />
                <rect transform="rotate(45)" x="-1" y="5" width="2" height="2.5" fill="url(#gearGradAuth)" rx="0.5" />
                <rect transform="rotate(-45)" x="-1" y="-7.5" width="2" height="2.5" fill="url(#gearGradAuth)" rx="0.5" />
                <rect transform="rotate(-45)" x="-1" y="5" width="2" height="2.5" fill="url(#gearGradAuth)" rx="0.5" />
            </g>
        </g>
        <text x="42" y="32" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" fill="white" letterSpacing="1">xr</text>
    </svg>
)

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Login failed')
            }

            router.push('/dashboard')
            router.refresh()
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed'
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setGoogleLoading(true)
        setError('')

        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            })

            if (error) {
                throw error
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Google login failed'
            setError(errorMessage)
            setGoogleLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex bg-[#0a0e1a]">
            {/* Left Side - Branding Panel (hidden on mobile) */}
            <div className="hidden md:flex flex-col relative w-5/12 lg:w-1/2 bg-[#0d1117] p-12 justify-between overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/90 via-[#0d1117]/50 to-[#0d1117]/90" />
                </div>

                {/* Logo */}
                <div className="relative z-10">
                    <FloxrLogo />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col gap-8 mb-12">
                    <div className="space-y-4">
                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight">
                            Empower your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">HR operations.</span>
                        </h1>
                        <p className="text-lg text-gray-400 font-light max-w-md leading-relaxed">
                            Automate employee onboarding, attendance, and payroll workflows with intelligent precision.
                        </p>
                    </div>

                    {/* Testimonial Card */}
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-xl max-w-md mt-6">
                        <div className="flex items-start gap-4">
                            <div
                                className="w-12 h-12 rounded-full bg-gray-700 bg-center bg-cover border-2 border-blue-500/30 shrink-0"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80')" }}
                            />
                            <div>
                                <div className="flex text-blue-500 mb-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-300 italic mb-2">&quot;Floxr completely transformed how we handle payroll. It&apos;s simply seamless.&quot;</p>
                                <p className="text-sm font-semibold text-white">Hussain Haq</p>
                                <p className="text-xs text-gray-500">VP of People, TechFlow</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="relative z-10 flex justify-between text-xs text-gray-600">
                    <p>© 2025 Floxr Inc.</p>
                    <div className="flex gap-4">
                        <Link className="hover:text-gray-400" href="/privacy">Privacy</Link>
                        <Link className="hover:text-gray-400" href="/terms">Terms</Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-[#0a0e1a] overflow-y-auto relative">
                {/* Mobile Logo */}
                <div className="md:hidden absolute top-8 left-8 z-20">
                    <FloxrLogo />
                </div>

                {/* Form Container */}
                <div className="relative z-10 w-full max-w-[440px] backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl">
                    <div className="mb-8 text-center sm:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
                        <p className="text-gray-400 text-sm">Please enter your details to sign in.</p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-300" htmlFor="email">Work Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-[#1c1f27]/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-300" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full px-4 py-3 pr-12 bg-[#1c1f27]/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {showPassword ? (
                                            <>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </>
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Options Row */}
                        <div className="flex items-center justify-between mt-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-600 bg-[#1c1f27] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#0a0e1a] cursor-pointer"
                                />
                                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                            </label>
                            <Link className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors" href="/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-lg shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                            {!loading && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                        </button>

                        {/* Footer Link */}
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-400">
                                Don&apos;t have an account?{' '}
                                <Link className="font-medium text-blue-500 hover:text-blue-400 transition-colors" href="/signup">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Social Login Divider */}
                    <div className="mt-8 pt-6 border-t border-gray-800">
                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={googleLoading}
                                className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#252932] border border-gray-700 hover:bg-[#2d333f] hover:border-gray-600 transition-all disabled:opacity-50"
                            >
                                {googleLoading ? (
                                    <div className="w-5 h-5 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                )}
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#252932] border border-gray-700 hover:bg-[#2d333f] hover:border-gray-600 transition-all"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#00A4EF" d="M11.4 24H0V12.6h11.4V24z" />
                                    <path fill="#FFB900" d="M24 24H12.6V12.6H24V24z" />
                                    <path fill="#F25022" d="M11.4 11.4H0V0h11.4v11.4z" />
                                    <path fill="#7FBA00" d="M24 11.4H12.6V0H24v11.4z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:hidden mt-8 text-xs text-gray-500 text-center relative z-10">
                    © 2025 Floxr Inc. All rights reserved.
                </div>
            </div>
        </div>
    )
}
