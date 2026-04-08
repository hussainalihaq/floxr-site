'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Employee {
    id: string
    firstName: string
    lastName: string
    email: string
    department: { name: string } | null
}

interface Timesheet {
    id: string
    employeeId: string
    clockIn: string
    clockOut: string | null
    hoursWorked: number | null
    status: string
    notes: string | null
    employee: {
        id: string
        firstName: string
        lastName: string
    }
}

interface AttendanceClientProps {
    employees: Employee[]
    todayTimesheets: Timesheet[]
    stats: {
        clockedInCount: number
        totalHoursToday: number
        totalEmployees: number
    }
}

export default function AttendanceClient({ employees, todayTimesheets, stats }: AttendanceClientProps) {
    const router = useRouter()
    const [selectedEmployee, setSelectedEmployee] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleClockToggle = async () => {
        if (!selectedEmployee) {
            setMessage({ type: 'error', text: 'Please select an employee' })
            return
        }

        setLoading(true)
        setMessage(null)

        try {
            const res = await fetch('/api/timesheets/clock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employeeId: selectedEmployee }),
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

    // Check if selected employee is currently clocked in
    const selectedEmployeeClocked = todayTimesheets.find(
        t => t.employeeId === selectedEmployee && !t.clockOut
    )

    const formatTime = (isoString: string) => {
        return new Date(isoString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="attendance-page">
            {/* Header */}
            <div className="page-header">
                <h1 className="page-title">Attendance</h1>
                <p className="page-subtitle">Track employee clock in/out and view today's attendance</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-row">
                <div className="stat-card small">
                    <div className="stat-icon green">
                        <span>✅</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.clockedInCount}</span>
                        <span className="stat-label">Currently Clocked In</span>
                    </div>
                </div>
                <div className="stat-card small">
                    <div className="stat-icon blue">
                        <span>⏱️</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.totalHoursToday}h</span>
                        <span className="stat-label">Total Hours Today</span>
                    </div>
                </div>
                <div className="stat-card small">
                    <div className="stat-icon purple">
                        <span>👥</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.totalEmployees}</span>
                        <span className="stat-label">Total Employees</span>
                    </div>
                </div>
            </div>

            {/* Clock In/Out Section */}
            <div className="form-section">
                <h2 className="section-title">Quick Clock In/Out</h2>
                <div className="clock-controls">
                    <select
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        className="form-input employee-select"
                    >
                        <option value="">Select Employee...</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>
                                {emp.firstName} {emp.lastName} {emp.department ? `(${emp.department.name})` : ''}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleClockToggle}
                        disabled={loading || !selectedEmployee}
                        className={`btn-primary clock-btn ${selectedEmployeeClocked ? 'clock-out' : 'clock-in'}`}
                    >
                        {loading ? 'Processing...' : selectedEmployeeClocked ? '🔴 Clock Out' : '🟢 Clock In'}
                    </button>
                </div>
            </div>

            {/* Status Message */}
            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* Today's Attendance Table */}
            <div className="table-section">
                <div className="table-header">
                    <h2 className="table-title">Today's Attendance</h2>
                </div>

                <div className="table-container">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Clock In</th>
                                <th>Clock Out</th>
                                <th>Hours</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayTimesheets.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="empty-state">
                                        <div className="empty-content">
                                            <span className="empty-emoji">⏰</span>
                                            <h3>No attendance records today</h3>
                                            <p>Use the quick clock in above to start tracking</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                todayTimesheets.map((timesheet) => (
                                    <tr key={timesheet.id}>
                                        <td>
                                            <div className="employee-name">
                                                <div className="employee-avatar">
                                                    {timesheet.employee.firstName.charAt(0)}{timesheet.employee.lastName.charAt(0)}
                                                </div>
                                                <span>{timesheet.employee.firstName} {timesheet.employee.lastName}</span>
                                            </div>
                                        </td>
                                        <td>{formatTime(timesheet.clockIn)}</td>
                                        <td>{timesheet.clockOut ? formatTime(timesheet.clockOut) : '—'}</td>
                                        <td>{timesheet.hoursWorked ? `${timesheet.hoursWorked.toFixed(2)}h` : '—'}</td>
                                        <td>
                                            <span className={`status-badge ${timesheet.clockOut ? 'completed' : 'active'}`}>
                                                {timesheet.clockOut ? 'Completed' : 'Active'}
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
