'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function CallbackContent() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const handleCallback = async () => {
            // Check for error in URL
            const error = searchParams.get('error')
            const errorDescription = searchParams.get('error_description')

            if (error) {
                setStatus('error')
                setMessage(errorDescription || 'An error occurred during confirmation')
                return
            }

            // If we got here, the email was confirmed successfully
            setStatus('success')
            setMessage('Your email has been confirmed!')

            // Redirect to dashboard after 3 seconds
            setTimeout(() => {
                router.push('/dashboard')
            }, 3000)
        }

        handleCallback()
    }, [searchParams, router])

    // Floxr Logo
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
                        <linearGradient id="gearGradCB" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#FF6B6B', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <circle cx="0" cy="0" r="8" fill="none" stroke="url(#gearGradCB)" strokeWidth="1.8" />
                    <circle cx="0" cy="0" r="3" fill="url(#gearGradCB)" />
                    <rect x="-1.2" y="-9.5" width="2.4" height="3" fill="url(#gearGradCB)" rx="0.5" />
                    <rect x="-1.2" y="6.5" width="2.4" height="3" fill="url(#gearGradCB)" rx="0.5" />
                    <rect x="-9.5" y="-1.2" width="3" height="2.4" fill="url(#gearGradCB)" rx="0.5" />
                    <rect x="6.5" y="-1.2" width="3" height="2.4" fill="url(#gearGradCB)" rx="0.5" />
                </g>
            </g>
            <text x="59" y="45" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="36" fill="#0F172A" letterSpacing="2">xr</text>
        </svg>
    )

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md text-center">
                {/* Logo */}
                <div className="mb-8 flex justify-center">
                    <FloxrLogo />
                </div>

                {status === 'loading' && (
                    <div>
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-600">Confirming your email...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Confirmed! ✅</h1>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <p className="text-sm text-gray-500 mb-4">Redirecting to dashboard in 3 seconds...</p>
                        <Link
                            href="/dashboard"
                            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
                        >
                            Go to Dashboard →
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirmation Failed</h1>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <Link
                            href="/login"
                            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
                        >
                            Go to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
            </div>
        }>
            <CallbackContent />
        </Suspense>
    )
}
