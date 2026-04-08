'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LeaveRequest {
    id: string
    type: string
    startDate: string
    endDate: string
    reason: string | null
    status: string
    createdAt: string
}

interface MyLeaveClientProps {
    employeeId: string
    leaveRequests: LeaveRequest[]
    leaveBalance: number
}

export default function MyLeaveClient({ employeeId, leaveRequests, leaveBalance }: MyLeaveClientProps) {
    const router = useRouter()
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Form state
    const [type, setType] = useState('ANNUAL')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [reason, setReason] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            const res = await fetch('/api/leave-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeId,
                    type,
                    startDate,
                    endDate,
                    reason,
                })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit request')
            }

            setMessage({ type: 'success', text: 'Leave request submitted successfully!' })
            setShowForm(false)
            setType('ANNUAL')
            setStartDate('')
            setEndDate('')
            setReason('')
            router.refresh()
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message })
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'approved'
            case 'REJECTED': return 'rejected'
            default: return 'pending'
        }
    }

    return (
        <div className="employee-page">
            <div className="page-header">
                <div className="page-header-left">
                    <h1 className="page-title">My Leave</h1>
                    <p className="page-subtitle">Request and manage your leave</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary"
                >
                    {showForm ? 'Cancel' : '+ Request Leave'}
                </button>
            </div>

            {/* Leave Balance Card */}
            <div className="leave-balance-card">
                <div className="balance-info">
                    <span className="balance-number">{leaveBalance}</span>
                    <span className="balance-label">Days Remaining</span>
                </div>
                <div className="balance-breakdown">
                    <div className="breakdown-item">
                        <span className="breakdown-value">{20 - leaveBalance}</span>
                        <span className="breakdown-label">Used</span>
                    </div>
                    <div className="breakdown-item">
                        <span className="breakdown-value">20</span>
                        <span className="breakdown-label">Annual</span>
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
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Leave Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="form-input"
                                    required
                                >
                                    <option value="ANNUAL">Annual Leave</option>
                                    <option value="SICK">Sick Leave</option>
                                    <option value="PERSONAL">Personal Leave</option>
                                    <option value="UNPAID">Unpaid Leave</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Reason (Optional)</label>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="form-input"
                                rows={3}
                                placeholder="Brief reason for leave..."
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </form>
                </div>
            )}

            {/* Leave Requests Table */}
            <div className="table-section">
                <div className="table-header">
                    <h2 className="table-title">Request History</h2>
                </div>
                <div className="table-container">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Dates</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Submitted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="empty-state">
                                        <div className="empty-content">
                                            <span className="empty-emoji">🏖️</span>
                                            <h3>No leave requests yet</h3>
                                            <p>Click "Request Leave" to submit your first request</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                leaveRequests.map((lr) => (
                                    <tr key={lr.id}>
                                        <td>
                                            <span className="leave-type-badge">{lr.type}</span>
                                        </td>
                                        <td>
                                            {formatDate(lr.startDate)} - {formatDate(lr.endDate)}
                                        </td>
                                        <td>{lr.reason || '—'}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusColor(lr.status)}`}>
                                                {lr.status}
                                            </span>
                                        </td>
                                        <td>{formatDate(lr.createdAt)}</td>
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
