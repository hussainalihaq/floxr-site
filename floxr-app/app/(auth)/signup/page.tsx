'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        workEmail: '',
        password: '',
        agreeToTerms: false,
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.workEmail,
                    password: formData.password,
                    name: formData.fullName,
                    companyName: formData.companyName,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed')
            }

            // Auto-login after successful registration
            const loginResponse = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.workEmail, password: formData.password }),
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
        <div className="min-h-screen flex bg-[#0a0e1a]">
            {/* Left Side - Visual Sidebar (hidden on mobile) */}
            <div className="relative hidden lg:flex flex-col w-5/12 h-screen">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')",
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/95 via-[#0a0e1a]/60 to-[#0a0e1a]/30 z-10" />
                <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay z-10" />

                {/* Content Container */}
                <div className="relative z-20 flex flex-col justify-between h-full p-12">
                    {/* Logo */}
                    <div>
                        <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                            <style>{`
                                @keyframes rotate-gear-signup { 
                                    from { transform: rotate(0deg); } 
                                    to { transform: rotate(360deg); } 
                                }
                                .gear-rotate-signup { animation: rotate-gear-signup 4s linear infinite; transform-origin: 0px 0px; }
                            `}</style>
                            <text x="0" y="32" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" fill="white" letterSpacing="1">fl</text>
                            <g transform="translate(32, 24)">
                                <g className="gear-rotate-signup">
                                    <defs>
                                        <linearGradient id="gearGradSignup" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                                            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="0" cy="0" r="6" fill="none" stroke="url(#gearGradSignup)" strokeWidth="1.5" />
                                    <circle cx="0" cy="0" r="2.5" fill="url(#gearGradSignup)" />
                                    <rect x="-1" y="-7.5" width="2" height="2.5" fill="url(#gearGradSignup)" rx="0.5" />
                                    <rect x="-1" y="5" width="2" height="2.5" fill="url(#gearGradSignup)" rx="0.5" />
                                    <rect x="-7.5" y="-1" width="2.5" height="2" fill="url(#gearGradSignup)" rx="0.5" />
                                    <rect x="5" y="-1" width="2.5" height="2" fill="url(#gearGradSignup)" rx="0.5" />
                                    <rect transform="rotate(45)" x="-1" y="-7.5" width="2" height="2.5" fill="url(#gearGradSignup)" rx="0.5" />
                                    <rect transform="rotate(45)" x="-1" y="5" width="2" height="2.5" fill="url(#gearGradSignup)" rx="0.5" />
                                    <rect transform="rotate(-45)" x="-1" y="-7.5" width="2" height="2.5" fill="url(#gearGradSignup)" rx="0.5" />
                                    <rect transform="rotate(-45)" x="-1" y="5" width="2" height="2.5" fill="url(#gearGradSignup)" rx="0.5" />
                                </g>
                            </g>
                            <text x="42" y="32" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" fill="white" letterSpacing="1">xr</text>
                        </svg>
                    </div>

                    {/* Testimonial */}
                    <div className="flex flex-col gap-8">
                        <h1 className="text-4xl xl:text-5xl font-black leading-tight tracking-tight text-white drop-shadow-md">
                            Automate onboarding, attendance, and payroll.
                        </h1>
                        <div className="backdrop-blur-md bg-white/10 border border-white/10 p-6 rounded-xl shadow-2xl">
                            <div className="flex flex-col gap-4">
                                {/* Stars */}
                                <div className="flex gap-1 text-yellow-400">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-lg font-medium leading-relaxed text-white/90">
                                    &quot;Floxr revolutionized our HR department. We are saving 40+ hours per week on manual data entry. It&apos;s the upgrade we didn&apos;t know we desperately needed.&quot;
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                    <div
                                        className="w-12 h-12 rounded-full bg-center bg-cover border-2 border-white/20"
                                        style={{
                                            backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80')",
                                        }}
                                    />
                                    <div>
                                        <div className="text-base font-bold text-white">Sarah Jenkins</div>
                                        <div className="text-sm font-normal text-white/60">HR Director, Acme Corp</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16 bg-[#0a0e1a]">
                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-8 left-8">
                    <svg width="100" height="32" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                        <style>{`
                            @keyframes rotate-gear-mobile { 
                                from { transform: rotate(0deg); } 
                                to { transform: rotate(360deg); } 
                            }
                            .gear-rotate-mobile { animation: rotate-gear-mobile 4s linear infinite; transform-origin: 0px 0px; }
                        `}</style>
                        <text x="0" y="32" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" fill="white" letterSpacing="1">fl</text>
                        <g transform="translate(32, 24)">
                            <g className="gear-rotate-mobile">
                                <defs>
                                    <linearGradient id="gearGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <circle cx="0" cy="0" r="6" fill="none" stroke="url(#gearGradMobile)" strokeWidth="1.5" />
                                <circle cx="0" cy="0" r="2.5" fill="url(#gearGradMobile)" />
                                <rect x="-1" y="-7.5" width="2" height="2.5" fill="url(#gearGradMobile)" rx="0.5" />
                                <rect x="-1" y="5" width="2" height="2.5" fill="url(#gearGradMobile)" rx="0.5" />
                                <rect x="-7.5" y="-1" width="2.5" height="2" fill="url(#gearGradMobile)" rx="0.5" />
                                <rect x="5" y="-1" width="2.5" height="2" fill="url(#gearGradMobile)" rx="0.5" />
                            </g>
                        </g>
                        <text x="42" y="32" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="28" fill="white" letterSpacing="1">xr</text>
                    </svg>
                </div>

                <div className="w-full max-w-[520px]">
                    {/* Heading */}
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                            Create your free account
                        </h2>
                        <p className="text-base text-slate-400">
                            Streamline your HR workflow today. No credit card required.
                        </p>
                    </div>

                    {/* Social Signup */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            onClick={handleGoogleSignup}
                            disabled={googleLoading}
                            className="flex items-center justify-center gap-3 px-4 py-3 bg-[#1a1f2e] border border-slate-700 rounded-xl font-medium text-white hover:bg-[#252b3d] transition disabled:opacity-50"
                        >
                            {googleLoading ? (
                                <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin" />
                            ) : (
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            )}
                            Google
                        </button>
                        <button
                            className="flex items-center justify-center gap-3 px-4 py-3 bg-[#1a1f2e] border border-slate-700 rounded-xl font-medium text-white hover:bg-[#252b3d] transition"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#00A4EF" d="M11.4 24H0V12.6h11.4V24z" />
                                <path fill="#FFB900" d="M24 24H12.6V12.6H24V24z" />
                                <path fill="#F25022" d="M11.4 11.4H0V0h11.4v11.4z" />
                                <path fill="#7FBA00" d="M24 11.4H12.6V0H24v11.4z" />
                            </svg>
                            Microsoft
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[#0a0e1a] text-slate-400">Or continue with email</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-[#1a1f2e] border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white text-sm placeholder-slate-500"
                                    placeholder="e.g. Sarah Jenkins"
                                />
                            </div>
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-slate-300 mb-2">
                                    Company Name
                                </label>
                                <input
                                    id="companyName"
                                    type="text"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-[#1a1f2e] border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white text-sm placeholder-slate-500"
                                    placeholder="e.g. Acme Corp"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="workEmail" className="block text-sm font-medium text-slate-300 mb-2">
                                Work Email
                            </label>
                            <input
                                id="workEmail"
                                type="email"
                                value={formData.workEmail}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-[#1a1f2e] border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white text-sm placeholder-slate-500"
                                placeholder="name@company.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={8}
                                className="w-full px-4 py-3 bg-[#1a1f2e] border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white text-sm placeholder-slate-500"
                                placeholder="Min. 8 characters"
                            />
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-3 mt-2">
                            <div className="flex items-center h-5">
                                <input
                                    id="agreeToTerms"
                                    type="checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-slate-600 bg-[#1a1f2e] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#0a0e1a] cursor-pointer"
                                />
                            </div>
                            <label htmlFor="agreeToTerms" className="text-sm text-slate-400 leading-tight cursor-pointer">
                                I agree to the{' '}
                                <Link href="/terms" className="text-blue-500 hover:text-blue-400 hover:underline">
                                    Terms & Conditions
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-blue-500 hover:text-blue-400 hover:underline">
                                    Privacy Policy
                                </Link>
                                .
                            </label>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !formData.agreeToTerms}
                            className="mt-4 flex w-full items-center justify-center rounded-xl h-12 bg-blue-600 text-white text-base font-bold tracking-wide hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0e1a] focus:ring-blue-500 shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Footer Login Link */}
                    <p className="mt-8 text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-blue-500 hover:text-blue-400 transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
