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

interface LeaveRequest {
    id: string
    employeeId: string
    startDate: string
    endDate: string
    leaveType: string
    status: string
    reason: string | null
    days: number
    approvedBy: string | null
    createdAt: string
    employee: {
        id: string
        firstName: string
        lastName: string
        department: { name: string } | null
    }
}

interface LeaveClientProps {
    employees: Employee[]
    leaveRequests: LeaveRequest[]
    stats: {
        pendingCount: number
        approvedThisMonth: number
        totalRequests: number
    }
    canApprove: boolean
}

const leaveTypes = [
    { value: 'PTO', label: 'Paid Time Off' },
    { value: 'SICK', label: 'Sick Leave' },
    { value: 'UNPAID', label: 'Unpaid Leave' },
    { value: 'MATERNITY', label: 'Maternity Leave' },
    { value: 'PATERNITY', label: 'Paternity Leave' },
    { value: 'BEREAVEMENT', label: 'Bereavement Leave' },
    { value: 'OTHER', label: 'Other' },
]

export default function LeaveClient({ employees, leaveRequests, stats, canApprove }: LeaveClientProps) {
    const router = useRouter()
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'DENIED'>('ALL')

    const [form, setForm] = useState({
        employeeId: '',
        startDate: '',
        endDate: '',
        leaveType: 'PTO',
        reason: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            const res = await fetch('/api/leave-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit leave request')
            }

            setMessage({ type: 'success', text: 'Leave request submitted successfully' })
            setForm({ employeeId: '', startDate: '', endDate: '', leaveType: 'PTO', reason: '' })
            setShowForm(false)
            router.refresh()
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message })
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (id: string) => {
        try {
            const res = await fetch(`/api/leave-requests/${id}/approve`, {
                method: 'POST',
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to approve')
            }

            router.refresh()
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message })
        }
    }

    const handleDeny = async (id: string) => {
        try {
            const res = await fetch(`/api/leave-requests/${id}/deny`, {
                method: 'POST',
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to deny')
            }

            router.refresh()
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message })
        }
    }

    const filteredRequests = leaveRequests.filter(lr => {
        if (filter === 'ALL') return true
        return lr.status === filter
    })

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }

    return (
        <div className="leave-page">
            {/* Header */}
            <div className="page-header-flex">
                <div>
                    <h1 className="page-title">Leave Management</h1>
                    <p className="page-subtitle">Submit and manage leave requests</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                >
                    {showForm ? 'Cancel' : '+ New Leave Request'}
                </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-row">
                <div className="stat-card small">
                    <div className="stat-icon orange">
                        <span>⏳</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.pendingCount}</span>
                        <span className="stat-label">Pending Requests</span>
                    </div>
                </div>
                <div className="stat-card small">
                    <div className="stat-icon green">
                        <span>✅</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.approvedThisMonth}</span>
                        <span className="stat-label">Approved This Month</span>
                    </div>
                </div>
                <div className="stat-card small">
                    <div className="stat-icon blue">
                        <span>📋</span>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{stats.totalRequests}</span>
                        <span className="stat-label">Total Requests</span>
                    </div>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* Leave Request Form */}
            {showForm && (
                <div className="form-section">
                    <h2 className="section-title">New Leave Request</h2>
                    <form onSubmit={handleSubmit} className="leave-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Employee *</label>
                                <select
                                    value={form.employeeId}
                                    onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                                    required
                                    className="form-input"
                                >
                                    <option value="">Select Employee...</option>
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.firstName} {emp.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Leave Type *</label>
                                <select
                                    value={form.leaveType}
                                    onChange={(e) => setForm({ ...form, leaveType: e.target.value })}
                                    required
                                    className="form-input"
                                >
                                    {leaveTypes.map(lt => (
                                        <option key={lt.value} value={lt.value}>{lt.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Start Date *</label>
                                <input
                                    type="date"
                                    value={form.startDate}
                                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">End Date *</label>
                                <input
                                    type="date"
                                    value={form.endDate}
                                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                    required
                                    className="form-input"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Reason (Optional)</label>
                            <textarea
                                value={form.reason}
                                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                                className="form-input textarea"
                                rows={3}
                                placeholder="Explain the reason for leave..."
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" disabled={loading} className="btn-primary">
                                {loading ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Leave Requests Table */}
            <div className="table-section">
                <div className="table-header">
                    <h2 className="table-title">Leave Requests</h2>
                    <div className="table-filters">
                        {(['ALL', 'PENDING', 'APPROVED', 'DENIED'] as const).map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`filter-pill ${filter === status ? 'active' : ''}`}
                            >
                                {status === 'ALL' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="table-container">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Type</th>
                                <th>Dates</th>
                                <th>Days</th>
                                <th>Status</th>
                                {canApprove && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={canApprove ? 6 : 5} className="empty-state">
                                        <div className="empty-content">
                                            <span className="empty-emoji">🏖️</span>
                                            <h3>No leave requests</h3>
                                            <p>Click "New Leave Request" to submit one</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredRequests.map((request) => (
                                    <tr key={request.id}>
                                        <td>
                                            <div className="employee-name">
                                                <div className="employee-avatar">
                                                    {request.employee.firstName.charAt(0)}{request.employee.lastName.charAt(0)}
                                                </div>
                                                <span>{request.employee.firstName} {request.employee.lastName}</span>
                                            </div>
                                        </td>
                                        <td>{leaveTypes.find(lt => lt.value === request.leaveType)?.label || request.leaveType}</td>
                                        <td>{formatDate(request.startDate)} - {formatDate(request.endDate)}</td>
                                        <td>{request.days}</td>
                                        <td>
                                            <span className={`status-badge ${request.status.toLowerCase()}`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        {canApprove && (
                                            <td>
                                                {request.status === 'PENDING' && (
                                                    <div className="action-buttons">
                                                        <button
                                                            onClick={() => handleApprove(request.id)}
                                                            className="btn-small approve"
                                                        >
                                                            ✓ Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeny(request.id)}
                                                            className="btn-small deny"
                                                        >
                                                            ✗ Deny
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        )}
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
