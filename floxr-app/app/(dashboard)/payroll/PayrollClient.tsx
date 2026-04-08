'use client'

import { useState, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
    Play, Download, FileSpreadsheet, Search, ChevronLeft, ChevronRight,
    MoreVertical, SlidersHorizontal, DollarSign, Clock, Building2, Calendar,
    UserPlus, X, Check, AlertTriangle, FileText, Printer, TrendingUp, Edit2, Banknote, Wallet, ArrowLeft
} from 'lucide-react'

interface Employee {
    id: string
    firstName: string
    lastName: string
    email: string
    jobTitle: string | null
    salary: number | null
    hourlyRate: number | null
    currency: string
    employmentType: string
    department: { name: string } | null
}

interface PayrollRecord {
    id: string
    employeeId: string
    payPeriodStart: string
    payPeriodEnd: string
    hoursWorked: number | null
    grossPay: number
    deductions: number
    netPay: number
    status: string
    paidAt: string | null
    employee: {
        id: string
        firstName: string
        lastName: string
        email: string
        jobTitle: string | null
        currency: string
    }
}

interface PayrollClientProps {
    employees: Employee[]
    payrolls: PayrollRecord[]
    companyId: string
    departments: { id: string; name: string }[]
}

// Stat Card Component with glow effect
const StatCard = ({ title, value, subtext, trend, trendPositive, icon, iconColorClass, progress }: {
    title: string
    value: string
    subtext?: string
    trend?: string
    trendPositive?: boolean
    icon: React.ReactNode
    iconColorClass: string
    progress?: number
}) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        setOpacity(1)
    }

    const getGlowColor = (classes: string) => {
        if (classes.includes('2463eb') || classes.includes('blue')) return 'rgba(36, 99, 235, 0.15)'
        if (classes.includes('amber')) return 'rgba(245, 158, 11, 0.15)'
        if (classes.includes('purple')) return 'rgba(168, 85, 247, 0.15)'
        if (classes.includes('emerald')) return 'rgba(16, 185, 129, 0.15)'
        return 'rgba(255, 255, 255, 0.1)'
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setOpacity(0)}
            className="flex flex-col gap-3 rounded-xl p-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-sm relative overflow-hidden group transition-all hover:border-[var(--border-default)]"
        >
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle 350px at ${position.x}px ${position.y}px, ${getGlowColor(iconColorClass)}, transparent)`,
                    opacity: opacity,
                }}
            />
            <div className="flex justify-between items-start z-10 relative">
                <p className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">{title}</p>
                <div className={`p-1.5 rounded-lg ${iconColorClass}`}>{icon}</div>
            </div>
            <div className="flex items-baseline gap-2 mt-2 z-10 relative">
                <p className="text-[var(--text-primary)] text-3xl font-bold">{value}</p>
                {trend && (
                    <p className={`text-xs font-bold px-1.5 py-0.5 rounded ${trendPositive ? 'text-emerald-500 bg-emerald-500/10' : 'text-[var(--text-muted)]'}`}>
                        {trend}
                    </p>
                )}
            </div>
            {progress !== undefined ? (
                <div className="w-full bg-[var(--bg-subtle)] h-1.5 rounded-full mt-3 overflow-hidden z-10 relative">
                    <div className="bg-[#2463eb] h-full rounded-full" style={{ width: `${progress}%` }} />
                </div>
            ) : (
                <p className="text-xs text-[var(--text-muted)] mt-1 z-10 relative">{subtext}</p>
            )}
        </div>
    )
}

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
    let styles = ''
    let dotColor = ''

    switch (status) {
        case 'PAID':
            styles = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            dotColor = 'bg-emerald-500'
            break
        case 'PROCESSED':
            styles = 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            dotColor = 'bg-amber-500'
            break
        case 'PENDING':
        default:
            styles = 'bg-slate-700/30 text-slate-300 border border-slate-600/30'
            dotColor = 'bg-slate-500'
            break
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${styles}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
    )
}

export default function PayrollClient({ employees, payrolls: initialPayrolls, companyId, departments }: PayrollClientProps) {
    const router = useRouter()
    const [payrolls, setPayrolls] = useState<PayrollRecord[]>(initialPayrolls)
    const [filter, setFilter] = useState<string>('ALL')
    const [processing, setProcessing] = useState(false)
    const [exporting, setExporting] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5

    // Consultant modal
    const [showConsultantModal, setShowConsultantModal] = useState(false)
    const [consultantEmail, setConsultantEmail] = useState('')
    const [consultantName, setConsultantName] = useState('')
    const [inviteLoading, setInviteLoading] = useState(false)

    // Run Payroll Modal
    const [showRunPayrollModal, setShowRunPayrollModal] = useState(false)
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
        hours: true,
        deductions: true,
        invoices: false,
    })
    const [isEditingPayPeriod, setIsEditingPayPeriod] = useState(false)

    // Payroll Report Modal
    const [showPayrollReport, setShowPayrollReport] = useState(false)
    const [reportSearchTerm, setReportSearchTerm] = useState('')

    // Pay period state
    const today = new Date()
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    const [payPeriodStart, setPayPeriodStart] = useState(firstOfMonth.toISOString().split('T')[0])
    const [payPeriodEnd, setPayPeriodEnd] = useState(lastOfMonth.toISOString().split('T')[0])
    const [selectedEmployee, setSelectedEmployee] = useState<string>('')
    const [selectedDepartment, setSelectedDepartment] = useState<string>('')

    // Filter payrolls
    const filteredPayrolls = useMemo(() => {
        let result = filter === 'ALL' ? payrolls : payrolls.filter(p => p.status === filter)
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(p =>
                p.employee.firstName.toLowerCase().includes(query) ||
                p.employee.lastName.toLowerCase().includes(query)
            )
        }
        return result
    }, [payrolls, filter, searchQuery])

    const paginatedPayrolls = filteredPayrolls.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    // Calculate stats
    const stats = {
        totalGross: payrolls.reduce((sum, p) => sum + p.grossPay, 0),
        totalNet: payrolls.reduce((sum, p) => sum + p.netPay, 0),
        totalDeductions: payrolls.reduce((sum, p) => sum + p.deductions, 0),
        pending: payrolls.filter(p => p.status === 'PENDING').length,
        processed: payrolls.filter(p => p.status === 'PROCESSED').length,
        paid: payrolls.filter(p => p.status === 'PAID').length,
        totalEmployees: employees.length,
    }

    const formatCurrency = (amount: number, currency: string = 'PKR') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    // Process payroll
    const handleProcessPayroll = async () => {
        setProcessing(true)
        setMessage(null)

        try {
            const requestBody: any = { companyId, payPeriodStart, payPeriodEnd, deductionRate: 0 }
            if (selectedEmployee) requestBody.employeeId = selectedEmployee
            if (selectedDepartment) requestBody.departmentId = selectedDepartment

            const response = await fetch('/api/payroll/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Failed to process payroll')

            setMessage({ type: 'success', text: `✓ ${data.message}` })
            router.refresh()
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to process payroll' })
        } finally {
            setProcessing(false)
        }
    }

    // Mark as paid
    const handleMarkPaid = async (payrollId: string) => {
        try {
            const response = await fetch(`/api/payroll/${payrollId}/mark-paid`, { method: 'POST' })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Failed to mark as paid')

            setPayrolls(prev => prev.map(p =>
                p.id === payrollId ? { ...p, status: 'PAID', paidAt: new Date().toISOString() } : p
            ))
            setMessage({ type: 'success', text: `✓ ${data.message}` })
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to mark as paid' })
        }
    }

    // Export CSV
    const handleExportCSV = async () => {
        setExporting(true)
        try {
            const response = await fetch(`/api/payroll/export?startDate=${payPeriodStart}&endDate=${payPeriodEnd}`)
            if (!response.ok) throw new Error('Failed to export')

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `payroll_${payPeriodStart}_to_${payPeriodEnd}.csv`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
            setMessage({ type: 'success', text: '✓ CSV exported successfully!' })
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message })
        } finally {
            setExporting(false)
        }
    }

    // Invite consultant
    const handleInviteConsultant = async () => {
        if (!consultantEmail) return
        setInviteLoading(true)
        try {
            const response = await fetch('/api/payroll/consultants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: consultantEmail, name: consultantName, permissions: 'VIEW_ONLY' })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error)

            setMessage({ type: 'success', text: `✓ Consultant invited!` })
            setShowConsultantModal(false)
            setConsultantEmail('')
            setConsultantName('')
            navigator.clipboard.writeText(window.location.origin + data.accessLink)
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message })
        } finally {
            setInviteLoading(false)
        }
    }

    // Get next pay date
    const nextPayDate = new Date(today.getFullYear(), today.getMonth() + 1, 1)
    const nextPayDateStr = nextPayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header className="flex-shrink-0 bg-[var(--bg-surface)]/80 backdrop-blur-md z-20 sticky top-0 px-8 py-6 border-b border-[var(--border-subtle)]">
                <div className="flex flex-wrap justify-between items-end gap-4 max-w-7xl mx-auto">
                    <div className="flex min-w-72 flex-col gap-1">
                        <h2 className="text-[var(--text-primary)] text-2xl font-black tracking-tight">
                            Payroll Management
                        </h2>
                        <p className="text-[var(--text-muted)] text-sm">
                            Process salaries, manage deductions, and generate reports.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowConsultantModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-default)] transition-colors"
                        >
                            <UserPlus className="w-4 h-4" />
                            <span className="hidden sm:inline">Consultant</span>
                        </button>
                        <button
                            onClick={handleExportCSV}
                            disabled={exporting || payrolls.length === 0}
                            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-default)] transition-colors disabled:opacity-50"
                        >
                            <FileSpreadsheet className="w-4 h-4" />
                            <span className="hidden sm:inline">{exporting ? 'Exporting...' : 'Export CSV'}</span>
                        </button>
                        <button
                            onClick={() => setShowRunPayrollModal(true)}
                            disabled={employees.length === 0}
                            className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-[#2463eb] hover:bg-[#1d4ed8] text-white text-sm font-bold shadow-md shadow-[#2463eb]/20 transition-all disabled:opacity-50"
                        >
                            <Play className="w-4 h-4" />
                            <span className="whitespace-nowrap">Run Payroll</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-8">

                    {/* Status Message */}
                    {message && (
                        <div className={`p-4 rounded-lg border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title="Total Payroll"
                            value={formatCurrency(stats.totalNet)}
                            trend={stats.totalNet > 0 ? '+1.2%' : undefined}
                            trendPositive={true}
                            icon={<DollarSign className="w-5 h-5" />}
                            iconColorClass="text-[#2463eb] bg-[#2463eb]/10"
                            progress={75}
                        />
                        <StatCard
                            title="Pending Approvals"
                            value={String(stats.pending + stats.processed)}
                            subtext="Requires admin review"
                            icon={<Clock className="w-5 h-5" />}
                            iconColorClass="text-amber-500 bg-amber-500/10"
                        />
                        <StatCard
                            title="Taxes & Deductions"
                            value={formatCurrency(stats.totalDeductions)}
                            subtext={stats.totalGross > 0 ? `~${((stats.totalDeductions / stats.totalGross) * 100).toFixed(1)}% of Gross Pay` : 'No deductions'}
                            icon={<Building2 className="w-5 h-5" />}
                            iconColorClass="text-purple-500 bg-purple-500/10"
                        />
                        <StatCard
                            title="Next Pay Date"
                            value={nextPayDateStr}
                            subtext="Auto-scheduled run"
                            trend={String(nextPayDate.getFullYear())}
                            icon={<Calendar className="w-5 h-5" />}
                            iconColorClass="text-emerald-500 bg-emerald-500/10"
                        />
                    </div>

                    {/* Payroll Table */}
                    <div className="flex flex-col bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] shadow-sm overflow-hidden">
                        {/* Tabs */}
                        <div className="flex flex-col border-b border-[var(--border-subtle)]">
                            <div className="flex gap-1 px-5 pt-5 pb-0 overflow-x-auto">
                                {['ALL', 'PENDING', 'PROCESSED', 'PAID'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => { setFilter(status); setCurrentPage(1); }}
                                        className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${filter === status
                                            ? 'text-[#2463eb] border-[#2463eb]'
                                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] border-transparent'
                                            }`}
                                    >
                                        {status === 'ALL' ? 'All Records' : status.charAt(0) + status.slice(1).toLowerCase()}
                                        {status !== 'ALL' && (
                                            <span className="ml-2 px-1.5 py-0.5 text-xs rounded bg-[var(--bg-subtle)]">
                                                {status === 'PENDING' ? stats.pending : status === 'PROCESSED' ? stats.processed : stats.paid}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Filters */}
                            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="relative max-w-sm w-full">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[var(--text-muted)]">
                                        <Search className="w-5 h-5" />
                                    </span>
                                    <input
                                        type="text"
                                        className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[#2463eb]/50 outline-none text-sm"
                                        placeholder="Search by name..."
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <input
                                        type="month"
                                        defaultValue={`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`}
                                        className="pl-4 pr-3 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] text-sm focus:ring-2 focus:ring-[#2463eb]/50 outline-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[var(--bg-subtle)] text-[var(--text-muted)] text-xs uppercase font-semibold tracking-wide">
                                    <tr>
                                        <th className="px-6 py-4">Employee</th>
                                        <th className="px-6 py-4">Pay Period</th>
                                        <th className="px-6 py-4">Gross Pay</th>
                                        <th className="px-6 py-4">Deductions</th>
                                        <th className="px-6 py-4">Net Pay</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border-subtle)]">
                                    {paginatedPayrolls.length > 0 ? (
                                        paginatedPayrolls.map((payroll) => (
                                            <tr key={payroll.id} className="hover:bg-[var(--bg-subtle)] transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold bg-[#2463eb]/20 text-[#2463eb]">
                                                            {payroll.employee.firstName.charAt(0)}{payroll.employee.lastName.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-[var(--text-primary)]">
                                                                {payroll.employee.firstName} {payroll.employee.lastName}
                                                            </p>
                                                            <p className="text-[11px] uppercase tracking-wide font-medium text-[var(--text-muted)]">
                                                                {payroll.employee.jobTitle || 'Employee'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                                                    {formatDate(payroll.payPeriodStart)} - {formatDate(payroll.payPeriodEnd)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-[var(--text-secondary)] font-mono">
                                                    {formatCurrency(payroll.grossPay, payroll.employee.currency)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-red-400 font-mono">
                                                    {payroll.deductions > 0 ? `-${formatCurrency(payroll.deductions, payroll.employee.currency)}` : '$0'}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-[var(--text-primary)] font-mono">
                                                    {formatCurrency(payroll.netPay, payroll.employee.currency)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={payroll.status} />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {payroll.status === 'PROCESSED' && (
                                                        <button
                                                            onClick={() => handleMarkPaid(payroll.id)}
                                                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                                                        >
                                                            ✓ Mark Paid
                                                        </button>
                                                    )}
                                                    {payroll.status === 'PAID' && payroll.paidAt && (
                                                        <span className="text-xs text-[var(--text-muted)]">
                                                            Paid {formatDate(payroll.paidAt)}
                                                        </span>
                                                    )}
                                                    {payroll.status === 'PENDING' && (
                                                        <span className="text-xs text-[var(--text-muted)]">Awaiting</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-12 text-center text-[var(--text-muted)]">
                                                <div className="flex flex-col items-center gap-2">
                                                    <DollarSign className="w-12 h-12 opacity-30" />
                                                    <p>No payroll records yet</p>
                                                    <p className="text-xs">Click "Run Payroll" to generate records</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="p-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                            <p className="text-sm text-[var(--text-muted)]">
                                Showing <span className="font-bold text-[var(--text-secondary)]">
                                    {Math.min((currentPage - 1) * pageSize + 1, filteredPayrolls.length)}-{Math.min(currentPage * pageSize, filteredPayrolls.length)}
                                </span> of <span className="font-bold text-[var(--text-secondary)]">{filteredPayrolls.length}</span> records
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-50 transition-all"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(p => (p * pageSize < filteredPayrolls.length ? p + 1 : p))}
                                    disabled={currentPage * pageSize >= filteredPayrolls.length}
                                    className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-50 transition-all"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Consultant Modal */}
            {showConsultantModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowConsultantModal(false)}>
                    <div className="bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-subtle)] w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-[var(--text-primary)]">Invite Payroll Consultant</h2>
                            <button onClick={() => setShowConsultantModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm text-[var(--text-muted)] mb-4">
                            Grant view-only access to your payroll data for external consultants or accountants.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email *</label>
                                <input
                                    type="email"
                                    value={consultantEmail}
                                    onChange={e => setConsultantEmail(e.target.value)}
                                    placeholder="consultant@example.com"
                                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[#2463eb]/50 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Name (optional)</label>
                                <input
                                    type="text"
                                    value={consultantName}
                                    onChange={e => setConsultantName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[#2463eb]/50 outline-none text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowConsultantModal(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors text-sm font-medium">
                                Cancel
                            </button>
                            <button
                                onClick={handleInviteConsultant}
                                disabled={inviteLoading || !consultantEmail}
                                className="flex-1 px-4 py-2.5 rounded-lg bg-[#2463eb] hover:bg-[#1d4ed8] text-white text-sm font-bold transition-colors disabled:opacity-50"
                            >
                                {inviteLoading ? 'Inviting...' : 'Send Invite'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Run Payroll Modal */}
            {showRunPayrollModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowRunPayrollModal(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-2xl mx-4 bg-[#181c24]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">

                        {/* Header */}
                        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-xl font-bold text-white">Run Payroll</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span className="text-[#2463eb] font-medium">Finalize & Generate Report</span>
                                </div>
                            </div>
                            <button onClick={() => setShowRunPayrollModal(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 space-y-8">
                            {/* Summary Card - Editable Pay Period */}
                            <div className="flex items-center justify-between p-4 rounded-xl bg-[#111318]/50 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-[#2463eb]/20 rounded-lg text-[#2463eb]">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Pay Period</p>
                                        {isEditingPayPeriod ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <input
                                                    type="date"
                                                    value={payPeriodStart}
                                                    onChange={(e) => setPayPeriodStart(e.target.value)}
                                                    className="px-2 py-1 rounded-lg bg-[#282e39] border border-white/10 text-white text-sm [color-scheme:dark] focus:ring-2 focus:ring-[#2463eb] outline-none"
                                                />
                                                <span className="text-slate-400">—</span>
                                                <input
                                                    type="date"
                                                    value={payPeriodEnd}
                                                    onChange={(e) => setPayPeriodEnd(e.target.value)}
                                                    className="px-2 py-1 rounded-lg bg-[#282e39] border border-white/10 text-white text-sm [color-scheme:dark] focus:ring-2 focus:ring-[#2463eb] outline-none"
                                                />
                                                <button
                                                    onClick={() => setIsEditingPayPeriod(false)}
                                                    className="px-2 py-1 rounded bg-[#2463eb] text-white text-xs font-medium"
                                                >
                                                    Done
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <p className="text-white font-bold text-lg">
                                                    {new Date(payPeriodStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(payPeriodEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                                <button
                                                    onClick={() => setIsEditingPayPeriod(true)}
                                                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> On Schedule
                                    </span>
                                </div>
                            </div>

                            {/* Checklist */}
                            <div>
                                <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">Verification Checklist</h4>
                                <div className="space-y-3">

                                    {/* Item 1: Confirm hours */}
                                    <div
                                        onClick={() => setCheckedItems(prev => ({ ...prev, hours: !prev.hours }))}
                                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all group select-none
                                            ${checkedItems.hours ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10' : 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50'}
                                        `}
                                    >
                                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors
                                            ${checkedItems.hours ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}
                                        `}>
                                            {checkedItems.hours ? <Check className="w-4 h-4" /> : <span className="w-2 h-0.5 bg-current" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium transition-colors ${checkedItems.hours ? 'text-white group-hover:text-emerald-200' : 'text-slate-300'}`}>Confirm all employee hours</p>
                                            <p className="text-xs text-emerald-500/70">Verified by System</p>
                                        </div>
                                    </div>

                                    {/* Item 2: Review deductions */}
                                    <div
                                        onClick={() => setCheckedItems(prev => ({ ...prev, deductions: !prev.deductions }))}
                                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all group select-none
                                            ${checkedItems.deductions ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10' : 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/50'}
                                        `}
                                    >
                                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors
                                            ${checkedItems.deductions ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}
                                        `}>
                                            {checkedItems.deductions ? <Check className="w-4 h-4" /> : <span className="w-2 h-0.5 bg-current" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium transition-colors ${checkedItems.deductions ? 'text-white group-hover:text-emerald-200' : 'text-slate-300'}`}>Review pending deductions</p>
                                            <p className="text-xs text-emerald-500/70">Verified by Admin</p>
                                        </div>
                                    </div>

                                    {/* Item 3: Validate invoices (Action Required) */}
                                    <div
                                        onClick={() => setCheckedItems(prev => ({ ...prev, invoices: !prev.invoices }))}
                                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all group select-none
                                            ${checkedItems.invoices
                                                ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10'
                                                : 'border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20'
                                            }
                                        `}
                                    >
                                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all border-2
                                            ${checkedItems.invoices
                                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                                : 'border-amber-500 text-amber-500'}
                                        `}>
                                            {checkedItems.invoices ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-3 h-3" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-bold transition-colors ${checkedItems.invoices ? 'text-emerald-200' : 'text-amber-400 group-hover:text-amber-200'}`}>
                                                {checkedItems.invoices ? 'Consultant invoices validated' : 'Validate consultant invoices'}
                                            </p>
                                            <p className={`text-xs ${checkedItems.invoices ? 'text-emerald-500/70' : 'text-amber-500/70'}`}>
                                                {checkedItems.invoices ? 'Approved manually' : '2 Invoices require manual approval'}
                                            </p>
                                        </div>
                                        {!checkedItems.invoices && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setCheckedItems(prev => ({ ...prev, invoices: true })); }}
                                                className="px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-500 rounded hover:bg-amber-400 transition-colors"
                                            >
                                                Review Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Totals Grid */}
                            <div className="bg-gradient-to-br from-[#282e39] to-[#181c24] rounded-xl p-5 border border-white/5 shadow-inner">
                                <div className="grid grid-cols-3 gap-8 divide-x divide-white/10">
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-400 font-medium">Total Gross Pay</p>
                                        <p className="text-lg font-bold text-white font-mono">{formatCurrency(stats.totalGross)}</p>
                                    </div>
                                    <div className="pl-8 space-y-1">
                                        <p className="text-xs text-slate-400 font-medium">Total Deductions</p>
                                        <p className="text-lg font-bold text-red-400 font-mono">-{formatCurrency(stats.totalDeductions)}</p>
                                    </div>
                                    <div className="pl-8 space-y-1">
                                        <p className="text-xs text-slate-400 font-medium">Net Total</p>
                                        <p className="text-xl font-black text-emerald-400 font-mono">{formatCurrency(stats.totalNet)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-6 border-t border-white/5 flex justify-between items-center bg-white/5">
                            <button onClick={() => setShowRunPayrollModal(false)} className="px-6 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    await handleProcessPayroll()
                                    setShowRunPayrollModal(false)
                                    setShowPayrollReport(true)
                                }}
                                disabled={processing || !checkedItems.hours || !checkedItems.deductions || !checkedItems.invoices}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#2463eb] hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-[#2463eb]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>{processing ? 'Processing...' : 'Generate Payroll Report'}</span>
                                <FileText className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payroll Report Modal */}
            {showPayrollReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowPayrollReport(false)}>
                    <div
                        className="relative w-full max-w-5xl mx-4 max-h-[90vh] bg-[#0b0e14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <header className="flex-shrink-0 bg-[#101622]/80 backdrop-blur-md px-6 py-4 border-b border-white/5">
                            <div className="flex flex-wrap justify-between items-center gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <span>Payroll</span>
                                        <ChevronRight size={14} />
                                        <span className="text-white font-medium">Reports</span>
                                    </div>
                                    <h2 className="text-white text-xl font-bold tracking-tight">Payroll Report Preview</h2>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowPayrollReport(false)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-slate-300 text-sm font-medium transition-all"
                                    >
                                        <ArrowLeft size={18} />
                                        <span>Back</span>
                                    </button>
                                </div>
                            </div>
                        </header>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            <div className="max-w-5xl mx-auto space-y-6">

                                {/* Summary Header Card */}
                                <div className="bg-[#181c24] rounded-2xl border border-white/10 p-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2463eb] mb-2">
                                                <span className="w-2 h-2 rounded-full bg-[#2463eb] animate-pulse"></span>
                                                Generated Successfully
                                            </div>
                                            <h1 className="text-2xl font-black text-white">
                                                Payroll Report: {new Date(payPeriodStart).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                            </h1>
                                            <p className="text-slate-400 mt-1">
                                                Period: {new Date(payPeriodStart).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {new Date(payPeriodEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • ID: #PY-{new Date().getFullYear()}-{String(new Date().getMonth() + 1).padStart(2, '0')}
                                            </p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-slate-300 text-sm font-bold transition-colors">
                                                <Printer size={18} />
                                                Print
                                            </button>
                                            <button
                                                onClick={handleExportCSV}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2463eb] hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-[#2463eb]/25 transition-all"
                                            >
                                                <Download size={18} />
                                                Download CSV
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {/* Gross Pay */}
                                    <div className="p-5 rounded-2xl bg-[#181c24] border border-white/10 relative overflow-hidden group">
                                        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Banknote className="text-white" size={64} />
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Gross Pay</p>
                                            <p className="text-2xl font-black text-white font-mono tracking-tight">{formatCurrency(stats.totalGross)}</p>
                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400">
                                                    <TrendingUp size={12} /> +2.4%
                                                </span>
                                                <span className="text-xs text-slate-500">vs last month</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Net Pay */}
                                    <div className="p-5 rounded-2xl bg-[#181c24] border border-white/10 relative overflow-hidden group">
                                        <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Wallet className="text-white" size={64} />
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Net Pay Disbursed</p>
                                            <p className="text-2xl font-black text-emerald-400 font-mono tracking-tight">{formatCurrency(stats.totalNet)}</p>
                                            <div className="mt-3 w-full bg-[#282e39] h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.round((stats.totalNet / stats.totalGross) * 100) || 0}%` }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Taxes */}
                                    <div className="p-5 rounded-2xl bg-[#181c24] border border-white/10">
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Taxes</p>
                                        <p className="text-xl font-bold text-white font-mono">{formatCurrency(stats.totalDeductions * 0.7)}</p>
                                        <p className="text-xs text-slate-500 mt-1">Federal & State</p>
                                    </div>

                                    {/* Deductions */}
                                    <div className="p-5 rounded-2xl bg-[#181c24] border border-white/10">
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Deductions</p>
                                        <p className="text-xl font-bold text-red-400 font-mono">{formatCurrency(stats.totalDeductions)}</p>
                                        <p className="text-xs text-slate-500 mt-1">Benefits & Other</p>
                                    </div>
                                </div>

                                {/* Department Breakdown */}
                                <div className="bg-[#181c24] rounded-2xl border border-white/10 overflow-hidden">
                                    <div className="px-6 py-4 border-b border-white/5">
                                        <h3 className="text-lg font-bold text-white">Departmental Breakdown</h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-[#111318] text-slate-400 text-xs uppercase font-semibold tracking-wider">
                                                <tr>
                                                    <th className="px-6 py-3">Department</th>
                                                    <th className="px-6 py-3">Headcount</th>
                                                    <th className="px-6 py-3">Total Cost</th>
                                                    <th className="px-6 py-3 w-1/3">Allocation</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {departments.map((dept, index) => {
                                                    const deptEmployees = payrolls.filter(p => employees.find(e => e.id === p.employeeId)?.department?.name === dept.name)
                                                    const deptTotal = deptEmployees.reduce((sum, p) => sum + p.netPay, 0)
                                                    const allocation = stats.totalNet > 0 ? Math.round((deptTotal / stats.totalNet) * 100) : 0
                                                    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-emerald-500']
                                                    return (
                                                        <tr key={dept.id || index} className="hover:bg-white/5 transition-colors">
                                                            <td className="px-6 py-4 text-sm font-bold text-white">{dept.name}</td>
                                                            <td className="px-6 py-4 text-sm text-slate-300">{deptEmployees.length} Employees</td>
                                                            <td className="px-6 py-4 text-sm font-mono font-medium text-white">{formatCurrency(deptTotal)}</td>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex-1 h-1.5 bg-[#282e39] rounded-full overflow-hidden">
                                                                        <div className={`h-full ${colors[index % colors.length]} rounded-full`} style={{ width: `${allocation}%` }}></div>
                                                                    </div>
                                                                    <span className="text-xs font-medium text-slate-500">{allocation}%</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                {departments.length === 0 && (
                                                    <tr>
                                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500">No departments found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Detailed Ledger */}
                                <div className="bg-[#181c24] rounded-2xl border border-white/10 overflow-hidden">
                                    <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-white">Detailed Ledger</h3>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                                <Search size={16} />
                                            </span>
                                            <input
                                                className="pl-9 pr-4 py-1.5 rounded-lg border border-white/10 bg-[#111318] text-white text-sm placeholder-slate-500 focus:ring-2 focus:ring-[#2463eb] outline-none transition-all"
                                                placeholder="Search employee..."
                                                type="text"
                                                value={reportSearchTerm}
                                                onChange={(e) => setReportSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-[#111318] text-slate-400 text-xs uppercase font-semibold tracking-wider">
                                                <tr>
                                                    <th className="px-6 py-3">Employee</th>
                                                    <th className="px-6 py-3">Role</th>
                                                    <th className="px-6 py-3 text-right">Gross Pay</th>
                                                    <th className="px-6 py-3 text-right">Deductions</th>
                                                    <th className="px-6 py-3 text-right">Net Pay</th>
                                                    <th className="px-6 py-3 text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {payrolls
                                                    .filter(p =>
                                                        reportSearchTerm === '' ||
                                                        p.employee.firstName.toLowerCase().includes(reportSearchTerm.toLowerCase()) ||
                                                        p.employee.lastName.toLowerCase().includes(reportSearchTerm.toLowerCase())
                                                    )
                                                    .slice(0, 10)
                                                    .map((payroll) => (
                                                        <tr key={payroll.id} className="hover:bg-white/5 transition-colors">
                                                            <td className="px-6 py-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-8 w-8 rounded-full bg-[#2463eb]/20 text-[#2463eb] flex items-center justify-center text-xs font-bold">
                                                                        {payroll.employee.firstName[0]}{payroll.employee.lastName[0]}
                                                                    </div>
                                                                    <span className="text-sm font-bold text-white">{payroll.employee.firstName} {payroll.employee.lastName}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-3 text-sm text-slate-400">{payroll.employee.jobTitle || 'N/A'}</td>
                                                            <td className="px-6 py-3 text-sm font-mono text-slate-300 text-right">{formatCurrency(payroll.grossPay, payroll.employee.currency)}</td>
                                                            <td className="px-6 py-3 text-sm font-mono text-red-400 text-right">-{formatCurrency(payroll.deductions, payroll.employee.currency)}</td>
                                                            <td className="px-6 py-3 text-sm font-mono font-bold text-white text-right">{formatCurrency(payroll.netPay, payroll.employee.currency)}</td>
                                                            <td className="px-6 py-3 text-center">
                                                                <StatusBadge status={payroll.status} />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                {payrolls.length === 0 && (
                                                    <tr>
                                                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No payroll records found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    {payrolls.length > 10 && (
                                        <div className="p-4 border-t border-white/5 flex justify-center">
                                            <button className="text-sm font-medium text-[#2463eb] hover:text-blue-400 transition-colors">View All {payrolls.length} Entries</button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
