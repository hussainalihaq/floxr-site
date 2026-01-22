import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold" style={{ color: 'var(--text-head)' }}>Welcome back, {user.name}! 👋</h2>
                <p className="mt-2" style={{ color: 'var(--text-light)' }}>
                    You're logged in to <span className="font-semibold" style={{ color: 'var(--text-body)' }}>{user.company.name}</span>
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm" style={{ color: 'var(--text-light)' }}>Total Employees</p>
                            <p className="text-3xl font-bold mt-2" style={{ color: 'var(--text-head)' }}>0</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)' }}>
                            <span className="text-2xl">👥</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm" style={{ color: 'var(--text-light)' }}>Onboarding</p>
                            <p className="text-3xl font-bold mt-2" style={{ color: 'var(--text-head)' }}>0</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
                            <span className="text-2xl">🚀</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm" style={{ color: 'var(--text-light)' }}>Completed</p>
                            <p className="text-3xl font-bold mt-2" style={{ color: 'var(--text-head)' }}>0</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                            <span className="text-2xl">✅</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phase 1 Complete Card */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-8">
                <h3 className="text-2xl font-bold mb-4">🎉 Phase 1 Complete!</h3>
                <p className="text-white/90 mb-6">Your authentication system is working! You successfully:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-green-300">✓</span> Signed up with email/password
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-300">✓</span> Created your company
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-300">✓</span> Logged in successfully
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-300">✓</span> Accessed the dashboard
                    </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm text-white/90">
                        <strong>Next:</strong> Phase 2 - Employee Management & Onboarding Workflows
                    </p>
                </div>
            </div>

            {/* Account Info */}
            <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-head)' }}>Account Information</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Name</dt>
                        <dd className="text-base font-medium" style={{ color: 'var(--text-head)' }}>{user.name}</dd>
                    </div>
                    <div>
                        <dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Email</dt>
                        <dd className="text-base font-medium" style={{ color: 'var(--text-head)' }}>{user.email}</dd>
                    </div>
                    <div>
                        <dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Role</dt>
                        <dd className="text-base font-medium">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--primary-subtle)', color: 'var(--primary)' }}>
                                {user.role}
                            </span>
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm" style={{ color: 'var(--text-muted)' }}>Company</dt>
                        <dd className="text-base font-medium" style={{ color: 'var(--text-head)' }}>{user.company.name}</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
