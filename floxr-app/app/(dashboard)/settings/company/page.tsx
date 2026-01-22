import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function CompanySettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    const company = await prisma.company.findUnique({
        where: { id: user.companyId },
    })

    if (!company) {
        redirect('/dashboard')
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold" style={{ color: 'var(--text-head)' }}>Company Settings</h1>
                <p className="mt-2" style={{ color: 'var(--text-light)' }}>Manage your company profile and preferences</p>
            </div>

            {/* Company Info Card */}
            <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-head)' }}>Company Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-light)' }}>Company Name</label>
                        <input
                            type="text"
                            defaultValue={company.name}
                            className="w-full px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-head)' }}
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-light)' }}>Email</label>
                        <input
                            type="email"
                            defaultValue={company.email}
                            className="w-full px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-head)' }}
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-light)' }}>Industry</label>
                        <input
                            type="text"
                            defaultValue={company.industry || 'Not set'}
                            className="w-full px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-head)' }}
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-light)' }}>Company Size</label>
                        <input
                            type="text"
                            defaultValue={company.size || 'Not set'}
                            className="w-full px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-head)' }}
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-light)' }}>Location</label>
                        <input
                            type="text"
                            defaultValue={company.location || 'Not set'}
                            className="w-full px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-head)' }}
                            disabled
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-light)' }}>Timezone</label>
                        <input
                            type="text"
                            defaultValue={company.timezone}
                            className="w-full px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-head)' }}
                            disabled
                        />
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span className="font-medium">Plan:</span> {company.plan} •{' '}
                        <span className="font-medium ml-2">Status:</span> {company.status}
                    </p>
                    <button
                        disabled
                        className="px-6 py-2 rounded-lg font-semibold cursor-not-allowed opacity-50"
                        style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                    >
                        Edit (Coming Soon)
                    </button>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                    href="/settings/team"
                    className="rounded-xl p-6 transition-all hover:shadow-lg"
                    style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text-head)' }}>👥 Team Management</h3>
                    <p className="text-sm" style={{ color: 'var(--text-light)' }}>Manage team members and roles</p>
                </Link>

                <div
                    className="rounded-xl p-6 opacity-50 cursor-not-allowed"
                    style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text-head)' }}>🔗 Integrations</h3>
                    <p className="text-sm" style={{ color: 'var(--text-light)' }}>Connect Slack, Google Workspace (Coming Soon)</p>
                </div>
            </div>
        </div>
    )
}
