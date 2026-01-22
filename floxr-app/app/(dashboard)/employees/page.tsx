import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function EmployeesPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    const [employees] = await Promise.all([
        prisma.employee.findMany({
            where: { companyId: user.companyId },
            include: { department: true },
            orderBy: { createdAt: 'desc' },
            take: 50,
        }),
    ])

    const stats = {
        total: employees.length,
        onboarding: employees.filter((e) => e.status === 'ONBOARDING').length,
        active: employees.filter((e) => e.status === 'ACTIVE').length,
        offboarding: employees.filter((e) => e.status === 'OFFBOARDING').length,
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: 'var(--text-head)' }}>Employees</h1>
                    <p className="mt-1" style={{ color: 'var(--text-light)' }}>Manage your team members and onboarding</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/employees/import"
                        className="px-4 py-2.5 rounded-lg font-medium transition"
                        style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-head)', border: '1px solid var(--border)' }}
                    >
                        📥 Import CSV
                    </Link>
                    <Link
                        href="/employees/new"
                        className="px-4 py-2.5 rounded-lg font-medium transition text-white"
                        style={{ backgroundColor: 'var(--primary)' }}
                    >
                        + Add Employee
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <p className="text-sm" style={{ color: 'var(--text-light)' }}>Total</p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-head)' }}>{stats.total}</p>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <p className="text-sm" style={{ color: 'var(--text-light)' }}>Onboarding</p>
                    <p className="text-2xl font-bold text-yellow-500">{stats.onboarding}</p>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <p className="text-sm" style={{ color: 'var(--text-light)' }}>Active</p>
                    <p className="text-2xl font-bold text-green-500">{stats.active}</p>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <p className="text-sm" style={{ color: 'var(--text-light)' }}>Offboarding</p>
                    <p className="text-2xl font-bold text-red-500">{stats.offboarding}</p>
                </div>
            </div>

            {/* Employee Table */}
            {employees.length === 0 ? (
                <div className="rounded-xl p-12 text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                        <span className="text-3xl">👥</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-head)' }}>No employees yet</h3>
                    <p className="mb-6" style={{ color: 'var(--text-light)' }}>Get started by adding your first employee</p>
                    <Link
                        href="/employees/new"
                        className="inline-block px-6 py-3 rounded-lg font-medium transition text-white"
                        style={{ backgroundColor: 'var(--primary)' }}
                    >
                        + Add First Employee
                    </Link>
                </div>
            ) : (
                <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <table className="min-w-full">
                        <thead style={{ backgroundColor: 'var(--bg-subtle)' }}>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: 'var(--text-muted)' }}>Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: 'var(--text-muted)' }}>Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: 'var(--text-muted)' }}>Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: 'var(--text-muted)' }}>Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: 'var(--text-muted)' }}>Onboarding</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase" style={{ color: 'var(--text-muted)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, idx) => (
                                <tr key={employee.id} style={{ borderTop: idx > 0 ? '1px solid var(--border)' : 'none' }}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold mr-3">
                                                {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium" style={{ color: 'var(--text-head)' }}>
                                                    {employee.firstName} {employee.lastName}
                                                </div>
                                                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{employee.role || 'No title'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-body)' }}>{employee.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-body)' }}>{employee.department?.name || '—'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.status === 'ACTIVE' ? 'bg-green-500/20 text-green-600' :
                                            employee.status === 'ONBOARDING' ? 'bg-yellow-500/20 text-yellow-600' :
                                                employee.status === 'OFFBOARDING' ? 'bg-orange-500/20 text-orange-600' :
                                                    'bg-red-500/20 text-red-600'
                                            }`}>
                                            {employee.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-24 rounded-full h-2" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                                            <div className="h-2 rounded-full" style={{ width: `${0}%`, backgroundColor: 'var(--primary)' }} />
                                        </div>
                                        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{0}%</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link href={`/employees/${employee.id}`} style={{ color: 'var(--primary)' }}>View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
