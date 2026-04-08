import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function MyPayslipsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    // Get employee record
    const employee = await prisma.employee.findFirst({
        where: {
            email: user.email,
            companyId: user.companyId,
        },
        select: { id: true, firstName: true, lastName: true, currency: true }
    })

    if (!employee) {
        redirect('/dashboard')
    }

    // Get payroll records
    const payrolls = await prisma.payroll.findMany({
        where: {
            employeeId: employee.id,
            status: { in: ['PROCESSED', 'PAID'] }
        },
        orderBy: { payPeriodEnd: 'desc' },
        take: 24 // Last 2 years
    })

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const formatCurrency = (amount: any) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: employee.currency || 'PKR',
            minimumFractionDigits: 0,
        }).format(Number(amount))
    }

    const totalEarningsThisYear = payrolls
        .filter(p => new Date(p.payPeriodEnd).getFullYear() === new Date().getFullYear())
        .reduce((sum, p) => sum + Number(p.netPay), 0)

    return (
        <div className="employee-page">
            <div className="page-header">
                <h1 className="page-title">My Payslips</h1>
                <p className="page-subtitle">View your payment history</p>
            </div>

            {/* Earnings Summary */}
            <div className="stats-row small-stats">
                <div className="stat-card employee-stat">
                    <div className="stat-icon green">
                        <span>💰</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{formatCurrency(totalEarningsThisYear)}</span>
                        <span className="stat-label">Total Earnings ({new Date().getFullYear()})</span>
                    </div>
                </div>
                <div className="stat-card employee-stat">
                    <div className="stat-icon blue">
                        <span>📄</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{payrolls.length}</span>
                        <span className="stat-label">Payslips</span>
                    </div>
                </div>
            </div>

            {/* Payslips Table */}
            <div className="table-section">
                <div className="table-container">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Pay Period</th>
                                <th>Hours</th>
                                <th>Gross Pay</th>
                                <th>Deductions</th>
                                <th>Net Pay</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrolls.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="empty-state">
                                        <div className="empty-content">
                                            <span className="empty-emoji">💵</span>
                                            <h3>No payslips yet</h3>
                                            <p>Your payslips will appear here once processed</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                payrolls.map((p) => (
                                    <tr key={p.id}>
                                        <td>
                                            <span className="date-range">
                                                {formatDate(p.payPeriodStart)} - {formatDate(p.payPeriodEnd)}
                                            </span>
                                        </td>
                                        <td>{p.hoursWorked ? `${Number(p.hoursWorked).toFixed(1)}h` : '—'}</td>
                                        <td className="amount">{formatCurrency(p.grossPay)}</td>
                                        <td className="amount deduction">{formatCurrency(p.deductions)}</td>
                                        <td className="amount net">{formatCurrency(p.netPay)}</td>
                                        <td>
                                            <span className={`status-badge ${p.status.toLowerCase()}`}>
                                                {p.status === 'PAID' ? `Paid ${p.paidAt ? formatDate(p.paidAt) : ''}` : p.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
