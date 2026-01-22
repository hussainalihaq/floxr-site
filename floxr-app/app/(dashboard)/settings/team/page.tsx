import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function TeamSettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    const teamMembers = await prisma.user.findMany({
        where: { companyId: user.companyId },
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            lastLoginAt: true,
            createdAt: true,
        },
    })

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: 'var(--text-head)' }}>Team Members</h1>
                    <p className="mt-2" style={{ color: 'var(--text-light)' }}>Manage your team and their access levels</p>
                </div>
                <button
                    disabled
                    className="px-6 py-2.5 rounded-lg font-semibold cursor-not-allowed opacity-50"
                    style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                >
                    + Invite Member (Coming Soon)
                </button>
            </div>

            {/* Team Members Table */}
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <table className="min-w-full" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                    <thead style={{ backgroundColor: 'var(--bg-subtle)' }}>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                                Last Login
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembers.map((member, idx) => (
                            <tr key={member.id} style={{ borderBottom: idx < teamMembers.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-3">
                                            {member.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="text-sm font-medium" style={{ color: 'var(--text-head)' }}>{member.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-body)' }}>
                                    {member.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${member.role === 'OWNER' ? 'bg-purple-500/20 text-purple-400' :
                                            member.role === 'ADMIN' ? 'bg-indigo-500/20 text-indigo-400' :
                                                'bg-slate-500/20 text-slate-400'
                                        }`}>
                                        {member.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-light)' }}>
                                    {member.lastLoginAt
                                        ? new Date(member.lastLoginAt).toLocaleDateString()
                                        : 'Never'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button
                                        disabled={member.role === 'OWNER' || member.id === user.id}
                                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{ color: 'var(--primary)' }}
                                    >
                                        {member.role === 'OWNER' || member.id === user.id ? '—' : 'Edit'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Info */}
            <div className="mt-6 rounded-xl p-4" style={{ backgroundColor: 'var(--primary-subtle)', border: '1px solid var(--primary)' }}>
                <p className="text-sm" style={{ color: 'var(--text-body)' }}>
                    <strong>Note:</strong> Team invitation and role management features are coming in Phase 2.
                    The API endpoints are already built and ready to use!
                </p>
            </div>
        </div>
    )
}
