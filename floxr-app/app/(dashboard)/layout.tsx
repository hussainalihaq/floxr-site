import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import './dashboard.css'
import ThemeToggle from '@/components/ThemeToggle'
import UserMenu from '@/components/UserMenu'

// Animated Floxr Logo Component (matches floxr.co)
function FloxrLogo() {
    return (
        <Link href="/dashboard" className="flex items-center gap-0.5 group">
            <span className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-head)' }}>fl</span>
            <div className="relative w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 animate-spin-slow">
                    <defs>
                        <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#FF6B6B" />
                        </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="6" fill="none" stroke="url(#gearGrad)" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="2.5" fill="url(#gearGrad)" />
                    <rect x="11" y="3" width="2" height="3" fill="url(#gearGrad)" rx="0.5" />
                    <rect x="11" y="18" width="2" height="3" fill="url(#gearGrad)" rx="0.5" />
                    <rect x="3" y="11" width="3" height="2" fill="url(#gearGrad)" rx="0.5" />
                    <rect x="18" y="11" width="3" height="2" fill="url(#gearGrad)" rx="0.5" />
                    <rect x="5.5" y="5.5" width="2" height="2.5" fill="url(#gearGrad)" rx="0.5" transform="rotate(45 6.5 6.75)" />
                    <rect x="16.5" y="5.5" width="2" height="2.5" fill="url(#gearGrad)" rx="0.5" transform="rotate(-45 17.5 6.75)" />
                    <rect x="5.5" y="16" width="2" height="2.5" fill="url(#gearGrad)" rx="0.5" transform="rotate(-45 6.5 17.25)" />
                    <rect x="16.5" y="16" width="2" height="2.5" fill="url(#gearGrad)" rx="0.5" transform="rotate(45 17.5 17.25)" />
                </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text-head)' }}>xr</span>
        </Link>
    )
}

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen theme-transition" style={{ backgroundColor: 'var(--bg-page)' }}>
            {/* Header */}
            <header className="sticky top-0 z-10 theme-transition" style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between px-6 py-4">
                    {/* Logo & Navigation */}
                    <div className="flex items-center gap-8">
                        <FloxrLogo />
                        <nav className="hidden md:flex items-center gap-6">
                            <Link href="/dashboard" className="text-sm font-medium transition hover:opacity-80" style={{ color: 'var(--text-body)' }}>
                                Dashboard
                            </Link>
                            <Link href="/employees" className="text-sm font-medium transition hover:opacity-80" style={{ color: 'var(--text-body)' }}>
                                Employees
                            </Link>
                            <Link href="/settings/company" className="text-sm font-medium transition hover:opacity-80" style={{ color: 'var(--text-body)' }}>
                                Settings
                            </Link>
                        </nav>
                    </div>

                    {/* Right side - Theme toggle & User Menu */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <span className="text-sm hidden sm:block" style={{ color: 'var(--text-muted)' }}>{user.company.name}</span>
                        <UserMenu user={user} />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="min-h-[calc(100vh-65px)] theme-transition">{children}</main>
        </div>
    )
}
