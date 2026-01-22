'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface UserMenuProps {
    user: {
        name: string
        email: string
        role: string
        company: {
            name: string
        }
    }
}

export default function UserMenu({ user }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogout = async () => {
        setLoading(true)
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-1 rounded-lg transition"
                style={{ backgroundColor: isOpen ? 'var(--bg-subtle)' : 'transparent' }}
            >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-head)' }}>{user.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.role}</p>
                </div>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--text-muted)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div
                        className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg z-20 overflow-hidden"
                        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                    >
                        {/* User Info */}
                        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                            <p className="text-sm font-medium" style={{ color: 'var(--text-head)' }}>{user.name}</p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{user.company.name}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                            <Link
                                href="/settings/company"
                                className="flex items-center gap-3 px-4 py-2.5 text-sm transition"
                                style={{ color: 'var(--text-body)' }}
                                onClick={() => setIsOpen(false)}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Settings
                            </Link>

                            <Link
                                href="/settings/team"
                                className="flex items-center gap-3 px-4 py-2.5 text-sm transition"
                                style={{ color: 'var(--text-body)' }}
                                onClick={() => setIsOpen(false)}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Team Members
                            </Link>
                        </div>

                        {/* Logout */}
                        <div style={{ borderTop: '1px solid var(--border)' }}>
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition disabled:opacity-50"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {loading ? 'Logging out...' : 'Log out'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
