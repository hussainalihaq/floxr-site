'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Timesheet {
    id: string
    clockIn: string
    clockOut: string | null
    hoursWorked: number | null
    status: string
}

interface MyDashboardClientProps {
    employeeId: string
    employeeName: string
    todayTimesheet: Timesheet | null
    stats: {
        leaveBalance: number
        pendingLeaves: number
        lastPayroll: { id: string; netPay: number; paidAt: string | null } | null
    }
}

export default function MyDashboardClient({
    employeeId,
    employeeName,
    todayTimesheet,
    stats
}: MyDashboardClientProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [currentTimesheet, setCurrentTimesheet] = useState<Timesheet | null>(todayTimesheet)

    const isClockedIn = currentTimesheet && !currentTimesheet.clockOut

    const handleClockToggle = async () => {
        setLoading(true)
        setMessage(null)

        try {
            const res = await fetch('/api/timesheets/clock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employeeId }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to clock in/out')
            }

            setMessage({ type: 'success', text: data.message })
            router.refresh()
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message })
        } finally {
            setLoading(false)
        }
    }

    const formatTime = (isoString: string) => {
        return new Date(isoString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 0,
        }).format(amount)
    }

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 17) return 'Good afternoon'
        return 'Good evening'
    }

    return (
        <div className="employee-dashboard">
            {/* Welcome Header */}
            <div className="welcome-header">
                <h1 className="welcome-greeting">{getGreeting()}, {employeeName.split(' ')[0]}! 👋</h1>
                <p className="welcome-date">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
            </div>

            {/* Clock In/Out Card - Prominent */}
            <div className="clock-card">
                <div className="clock-status">
                    {isClockedIn ? (
                        <>
                            <div className="status-indicator active"></div>
                            <div className="status-text">
                                <span className="status-label">You are clocked in</span>
                                <span className="clock-time">Since {formatTime(currentTimesheet!.clockIn)}</span>
                            </div>
                        </>
                    ) : currentTimesheet?.clockOut ? (
                        <>
                            <div className="status-indicator completed"></div>
                            <div className="status-text">
                                <span className="status-label">Today's shift completed</span>
                                <span className="clock-time">
                                    {formatTime(currentTimesheet.clockIn)} - {formatTime(currentTimesheet.clockOut)}
                                    {currentTimesheet.hoursWorked && (
                                        <span className="hours-badge">{currentTimesheet.hoursWorked.toFixed(1)}h</span>
                                    )}
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="status-indicator inactive"></div>
                            <div className="status-text">
                                <span className="status-label">Not clocked in yet</span>
                                <span className="clock-time">Start your day when ready</span>
                            </div>
                        </>
                    )}
                </div>

                <button
                    onClick={handleClockToggle}
                    disabled={loading}
                    className={`clock-button ${isClockedIn ? 'clock-out' : 'clock-in'}`}
                >
                    {loading ? (
                        <span className="button-loading">Processing...</span>
                    ) : isClockedIn ? (
                        <>
                            <span className="clock-icon">🔴</span>
                            <span>Clock Out</span>
                        </>
                    ) : (
                        <>
                            <span className="clock-icon">🟢</span>
                            <span>Clock In</span>
                        </>
                    )}
                </button>
            </div>

            {/* Status Message */}
            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* Quick Stats */}
            <div className="quick-stats">
                <div className="stat-card employee-stat">
                    <div className="stat-icon blue">
                        <span>📅</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.leaveBalance}</span>
                        <span className="stat-label">Leave Balance</span>
                    </div>
                </div>

                <div className="stat-card employee-stat">
                    <div className="stat-icon yellow">
                        <span>⏳</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.pendingLeaves}</span>
                        <span className="stat-label">Pending Requests</span>
                    </div>
                </div>

                <div className="stat-card employee-stat">
                    <div className="stat-icon green">
                        <span>💰</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">
                            {stats.lastPayroll ? formatCurrency(stats.lastPayroll.netPay) : '—'}
                        </span>
                        <span className="stat-label">Last Payslip</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h2 className="section-title">Quick Actions</h2>
                <div className="action-cards">
                    <a href="/my-leave" className="action-card">
                        <span className="action-icon">✈️</span>
                        <span className="action-label">Request Leave</span>
                    </a>
                    <a href="/my-attendance" className="action-card">
                        <span className="action-icon">📊</span>
                        <span className="action-label">View Attendance</span>
                    </a>
                    <a href="/my-payslips" className="action-card">
                        <span className="action-icon">📄</span>
                        <span className="action-label">View Payslips</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
