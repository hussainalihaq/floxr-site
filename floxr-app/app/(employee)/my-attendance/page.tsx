import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function MyAttendancePage() {
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
        select: { id: true, firstName: true, lastName: true }
    })

    if (!employee) {
        redirect('/dashboard')
    }

    // Get timesheets for last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const timesheets = await prisma.timesheet.findMany({
        where: {
            employeeId: employee.id,
            clockIn: { gte: thirtyDaysAgo }
        },
        orderBy: { clockIn: 'desc' }
    })

    // Calculate total hours this month
    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)

    const thisMonthHours = timesheets
        .filter(t => new Date(t.clockIn) >= monthStart)
        .reduce((sum, t) => sum + (t.hoursWorked ? Number(t.hoursWorked) : 0), 0)

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="employee-page">
            <div className="page-header">
                <h1 className="page-title">My Attendance</h1>
                <p className="page-subtitle">View your attendance history</p>
            </div>

            {/* Stats */}
            <div className="stats-row small-stats">
                <div className="stat-card employee-stat">
                    <div className="stat-icon purple">
                        <span>⏱️</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{thisMonthHours.toFixed(1)}h</span>
                        <span className="stat-label">This Month</span>
                    </div>
                </div>
                <div className="stat-card employee-stat">
                    <div className="stat-icon blue">
                        <span>📅</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{timesheets.filter(t => new Date(t.clockIn) >= monthStart).length}</span>
                        <span className="stat-label">Days Worked</span>
                    </div>
                </div>
            </div>

            {/* Timesheet Table */}
            <div className="table-section">
                <div className="table-container">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Clock In</th>
                                <th>Clock Out</th>
                                <th>Hours</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timesheets.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="empty-state">
                                        <div className="empty-content">
                                            <span className="empty-emoji">📋</span>
                                            <h3>No attendance records</h3>
                                            <p>Clock in from your dashboard to start tracking</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                timesheets.map((ts) => (
                                    <tr key={ts.id}>
                                        <td>{formatDate(ts.clockIn)}</td>
                                        <td>{formatTime(ts.clockIn)}</td>
                                        <td>{ts.clockOut ? formatTime(ts.clockOut) : '—'}</td>
                                        <td>{ts.hoursWorked ? `${Number(ts.hoursWorked).toFixed(1)}h` : '—'}</td>
                                        <td>
                                            <span className={`status-badge ${ts.clockOut ? 'completed' : 'active'}`}>
                                                {ts.clockOut ? 'Completed' : 'In Progress'}
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
