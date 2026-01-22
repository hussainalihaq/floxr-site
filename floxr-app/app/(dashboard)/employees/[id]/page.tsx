import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function EmployeeDetailPage({
    params,
}: {
    params: { id: string }
}) {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    const employee = await prisma.employee.findFirst({
        where: {
            id: params.id,
            companyId: user.companyId,
        },
        include: {
            department: true,
            documents: {
                orderBy: { createdAt: 'desc' },
            },
            equipment: {
                include: { equipment: true },
                where: { returnedAt: null },
            },
        },
    })

    if (!employee) {
        redirect('/employees')
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <Link href="/employees" className="text-indigo-400 hover:text-indigo-300 text-sm mb-2 inline-block">
                    ← Back to Employees
                </Link>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                            {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                {employee.firstName} {employee.lastName}
                            </h1>
                            <p className="text-slate-400">{employee.jobTitle || 'No title'} • {employee.department?.name || 'No department'}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${employee.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                                employee.status === 'ONBOARDING' ? 'bg-yellow-500/20 text-yellow-400' :
                                    employee.status === 'OFFBOARDING' ? 'bg-orange-500/20 text-orange-400' :
                                        'bg-red-500/20 text-red-400'
                            }`}>
                            {employee.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact Info */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-slate-400">Work Email</p>
                                <p className="text-white">{employee.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Personal Email</p>
                                <p className="text-white">{employee.personalEmail || '—'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Phone</p>
                                <p className="text-white">{employee.phone || '—'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">WhatsApp</p>
                                <p className="text-white flex items-center gap-2">
                                    {employee.whatsappNumber || employee.phone || '—'}
                                    {(employee.whatsappNumber || employee.phone) && (
                                        <span className="text-green-400">💬</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Job Details */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Employment Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-slate-400">Employment Type</p>
                                <p className="text-white">{employee.employmentType.replace('_', ' ')}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Start Date</p>
                                <p className="text-white">{new Date(employee.startDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Salary</p>
                                <p className="text-white">
                                    {employee.salary
                                        ? `${employee.currency} ${Number(employee.salary).toLocaleString()}`
                                        : '—'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Tax ID ({employee.taxIdType || 'Not set'})</p>
                                <p className="text-white">{employee.taxId || '—'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Documents</h2>
                            <button className="text-sm text-indigo-400 hover:text-indigo-300">
                                + Request Document
                            </button>
                        </div>
                        {employee.documents.length === 0 ? (
                            <p className="text-slate-400 text-sm">No documents requested yet</p>
                        ) : (
                            <div className="space-y-3">
                                {employee.documents.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                                        <div>
                                            <p className="text-white text-sm">{doc.title}</p>
                                            <p className="text-xs text-slate-400">{doc.documentType}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${doc.status === 'VERIFIED' ? 'bg-green-500/20 text-green-400' :
                                                doc.status === 'SUBMITTED' ? 'bg-blue-500/20 text-blue-400' :
                                                    doc.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                                                        'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {doc.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Equipment */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Assigned Equipment</h2>
                            <button className="text-sm text-indigo-400 hover:text-indigo-300">
                                + Assign Equipment
                            </button>
                        </div>
                        {employee.equipment.length === 0 ? (
                            <p className="text-slate-400 text-sm">No equipment assigned</p>
                        ) : (
                            <div className="space-y-3">
                                {employee.equipment.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">
                                                {item.equipment.type === 'LAPTOP' ? '💻' :
                                                    item.equipment.type === 'PHONE' ? '📱' :
                                                        item.equipment.type === 'MONITOR' ? '🖥️' :
                                                            item.equipment.type === 'ACCESS_CARD' ? '🪪' : '📦'}
                                            </span>
                                            <div>
                                                <p className="text-white text-sm">{item.equipment.name}</p>
                                                <p className="text-xs text-slate-400">{item.equipment.serialNumber || 'No serial'}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-400">
                                            Since {new Date(item.assignedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Onboarding Progress */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Onboarding Progress</h2>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <span className="text-xs font-semibold text-indigo-400">
                                    {employee.onboardingStatus.replace('_', ' ')}
                                </span>
                                <span className="text-xs font-semibold text-indigo-400">
                                    {employee.onboardingProgress}%
                                </span>
                            </div>
                            <div className="overflow-hidden h-3 text-xs flex rounded-full bg-slate-700">
                                <div
                                    style={{ width: `${employee.onboardingProgress}%` }}
                                    className="flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button className="w-full px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg text-left transition">
                                ✉️ Send WhatsApp Message
                            </button>
                            <button className="w-full px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg text-left transition">
                                📄 Request Documents
                            </button>
                            <button className="w-full px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg text-left transition">
                                🖥️ Assign Equipment
                            </button>
                            <button className="w-full px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded-lg text-left transition">
                                🚪 Start Offboarding
                            </button>
                        </div>
                    </div>

                    {/* Activity Timeline */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Timeline</h2>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5" />
                                <div>
                                    <p className="text-sm text-white">Added to system</p>
                                    <p className="text-xs text-slate-400">{new Date(employee.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5" />
                                <div>
                                    <p className="text-sm text-white">Start date</p>
                                    <p className="text-xs text-slate-400">{new Date(employee.startDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
